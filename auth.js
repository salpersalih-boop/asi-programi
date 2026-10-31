/* ═══════════════════════════════════════════════════════
   Planova — Kimlik Doğrulama & Bulut Senkronizasyonu v2.5
   ─────────────────────────────────────────────────────
   • Güvenli Oturum Kontrolü (Session Management)
   • Form yenilenmesini (event.preventDefault) engelleme
   • Çift başlatma (double-init) ve döngü (loop) koruması
   • Çevrimdışı ve Firestore hata toleransı (Asla ekranı kilitlemez)
   • Oturum açılınca anında Dashboard yönlendirmesi
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Sabitler ─────────────────────────────────────── */
  const PREFIX      = 'asi_';
  const UID_KEY     = 'planova_uid';
  const PENDING_KEY = 'planova_pending'; // buluta henüz gönderilmemiş anahtarlar (sayfa yenilense de kaybolmaz)
  const AVATAR_KEY  = 'asi_profile_avatar'; // { type: 'emoji'|'badge', emoji, id?, bg? }
  // Aynı hesapta buluttan veri uygulanırken korunan anahtarlar
  const KEEP_KEYS   = new Set([UID_KEY, 'asi_profile_name', 'asi_profile_photo', AVATAR_KEY]);
  // Yalnızca bu cihazda tutulan, buluta gönderilmeyen anahtarlar (günlük önbellekler vb.)
  const LOCAL_ONLY  = /^asi_prayer_cache_/;
  // Firestore belge sınırı 1 MiB; güvenli pay bırakıyoruz
  const MAX_DOC_BYTES = 900 * 1024;
  // Firestore batch başına en fazla 500 işlem
  const BATCH_LIMIT = 400;

  const cfg        = window.PLANOVA_FIREBASE_CONFIG || {};
  const configured = !!(window.firebase && cfg.apiKey && !/^YOUR_/i.test(cfg.apiKey));
  const $          = (id) => document.getElementById(id);
  const checkBadges = () => { try { window.ASI?.streak?.updateStreaksAndBadges(); } catch (e) { /* uygulama henüz yüklenmedi */ } };

  /* ── localStorage patch (senkronizasyon için) ─────── */
  const proto     = Object.getPrototypeOf(window.localStorage);
  const origSet   = proto.setItem;
  const origGet   = proto.getItem;
  const origRem   = proto.removeItem;

  /* ── Dışa açık API ────────────────────────────────── */
  const api = { configured, user: null, signOut: () => {}, refreshProfile: () => applyProfileUI() };
  window.PlanovaAuth = api;

  /* ── script.js dinamik yükleme (yalnızca bir kez) ─── */
  let appLoaded = false;
  function loadApp() {
    if (appLoaded) return;
    appLoaded = true;
    const s  = document.createElement('script');
    s.src    = 'script.js?v=5.9';
    document.body.appendChild(s);
  }

  /* ── Hızlı Giriş: hesapsız, yalnızca bu cihazda (bulut senkronizasyonu yok) ── */
  const QUICK_KEY = 'planova_quick';
  function enterQuick() {
    origSet.call(localStorage, QUICK_KEY, '1');
    const ov = $('auth-overlay');
    if (ov) ov.classList.add('hidden');
    const splash = $('splash-screen');
    if (splash) splash.style.display = 'none';
    const app = $('app');
    if (app) app.classList.remove('hidden');
    const st = $('sync-status');
    if (st) st.textContent = 'Hızlı mod (yalnızca bu cihaz)';
    loadApp();
    setTimeout(loadProfile, 250);
  }
  const wantsQuick = () => origGet.call(localStorage, QUICK_KEY) === '1';

  /* ── Profil olayları — Firebase olsun olmasın (Hızlı Giriş dahil) çalışır ── */
  let profileBound = false;
  function bindProfile() {
    if (profileBound) return;
    profileBound = true;

    // ─── Profil Kaydet
    const saveBtn = $('profile-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const name = (($('profile-name') || {}).value || '').trim().slice(0, 30);
        if (name) localStorage.setItem('asi_profile_name', name);
        else      localStorage.removeItem('asi_profile_name');
        applyProfileUI(name);
        checkBadges();
        saveBtn.textContent = '✅ Kaydedildi!';
        setTimeout(() => { saveBtn.textContent = '💾 Kaydet'; }, 1800);
      });
    }

    // Ad yazılırken baş harfleri canlı göster
    $('profile-name')?.addEventListener('input', (e) => applyProfileUI(e.target.value));

    // ─── Fotoğraf Seç
    const photoBtn  = $('profile-photo-btn');
    const photoFile = $('profile-photo-file');
    const photoBox  = document.querySelector('.profile-photo-box');
    if (photoBtn && photoFile) photoBtn.addEventListener('click', () => photoFile.click());
    if (photoBox  && photoFile) photoBox.addEventListener('click', () => photoFile.click());
    if (photoFile) {
      photoFile.addEventListener('change', async () => {
        const file = photoFile.files[0];
        if (!file) return;
        const data = await compressImage(file, 256);
        if (data) {
          localStorage.setItem('asi_profile_photo', data);
          localStorage.removeItem(AVATAR_KEY); // fotoğraf, emoji/rozetin yerine geçer
          applyProfileUI(($('profile-name') || {}).value);
          window.ASI?.profileAvatar?.markSelected();
          checkBadges();
        }
        photoFile.value = '';
      });
    }

    // ─── Fotoğrafı / emojiyi kaldır → baş harflere dön
    const removeBtn = $('profile-photo-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        localStorage.removeItem('asi_profile_photo');
        localStorage.removeItem(AVATAR_KEY);
        applyProfileUI(($('profile-name') || {}).value);
        window.ASI?.profileAvatar?.markSelected();
      });
    }
  }

  /* ══════════════════════════════════════════════════
     FİREBASE YAPILANDIRILMAMIŞSA (Yerel Çevrimdışı Mod)
  ══════════════════════════════════════════════════ */
  if (!configured) {
    console.warn('Planova: firebase-config.js yapılandırılmadı. Yerel mod devrede.');
    const run = () => {
      bindProfile();
      $('auth-quick')?.addEventListener('click', enterQuick);
      if (wantsQuick()) { enterQuick(); return; }
      const overlay = $('auth-overlay');
      if (!overlay) { loadApp(); return; }

      overlay.classList.remove('hidden');
      const msg = $('auth-msg');
      if (msg) {
        msg.className = 'auth-msg err';
        msg.textContent = 'Firebase bağlantısı bulunamadı (firebase-config.js dosyasını kontrol edin).';
      }

      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'auth-link';
      skipBtn.textContent = 'Şimdilik giriş yapmadan devam et';
      skipBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        const splash = $('splash-screen');
        if (splash) splash.style.display = 'none';
        const app = $('app');
        if (app) app.classList.remove('hidden');
        loadApp();
      });
      $('auth-switch')?.after(skipBtn);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
    return;
  }

  /* ══════════════════════════════════════════════════
     FİREBASE BAŞLATMA
  ══════════════════════════════════════════════════ */
  if (!firebase.apps.length) {
    firebase.initializeApp(cfg);
  }
  const fbAuth = firebase.auth();
  const db     = firebase.firestore();

  let uid       = null;
  let applying  = false;
  let flushing  = null;
  let syncTimer = null;

  /* ── Bekleyen (senkronize edilmemiş) anahtarlar — localStorage'da kalıcı ── */
  const dirty = new Set((() => {
    try { return JSON.parse(origGet.call(localStorage, PENDING_KEY) || '[]'); } catch { return []; }
  })());
  function persistDirty() {
    try {
      if (dirty.size) origSet.call(localStorage, PENDING_KEY, JSON.stringify(Array.from(dirty)));
      else origRem.call(localStorage, PENDING_KEY);
    } catch { /* kota dolu olabilir — bellekteki küme yine çalışır */ }
  }

  const isSyncable = (k) => !!k && k.startsWith(PREFIX) && !LOCAL_ONLY.test(k);
  const byteSize   = (v) => (v == null ? 0 : new Blob([v]).size);

  function markDirty(k) {
    dirty.add(k);
    persistDirty();
    clearTimeout(syncTimer);
    syncTimer = setTimeout(flush, 1200);
  }

  /* ── Firestore koleksiyon referansı ───────────────── */
  const col = () => db.collection('users').doc(uid).collection('data');

  /* ── Senkronize edilen localStorage anahtarları ───── */
  function localKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (isSyncable(k)) keys.push(k);
    }
    return keys;
  }

  /* ── localStorage patch — yalnızca senkronize edilen anahtarları dinle */
  proto.setItem = function (k, v) {
    origSet.call(this, k, v);
    if (this === localStorage && !applying && uid && isSyncable(k)) {
      setStatus('Kaydediliyor…');
      markDirty(k);
    }
  };
  proto.removeItem = function (k) {
    origRem.call(this, k);
    if (this === localStorage && !applying && uid && isSyncable(k)) {
      markDirty(k);
    }
  };

  /* ── Senkronizasyon Durum Bildirimi ───────────────── */
  function setStatus(text) {
    const el = $('sync-status');
    if (el) el.textContent = text;
  }

  /**
   * Bekleyen anahtarları buluta yazar.
   * • 400'lük parçalar halinde (Firestore batch sınırı 500)
   * • 1 MiB'a yaklaşan değerler atlanır (aksi halde tüm batch hata verir ve senkronizasyon kilitlenir)
   * • Aynı anda iki flush çalışmaz
   */
  async function flush() {
    if (flushing) return flushing;
    if (!uid || dirty.size === 0) return;
    flushing = (async () => {
      const keys = Array.from(dirty);
      const tooBig = [];
      try {
        for (let i = 0; i < keys.length; i += BATCH_LIMIT) {
          const part  = keys.slice(i, i + BATCH_LIMIT);
          const batch = db.batch();
          part.forEach((k) => {
            const v   = origGet.call(localStorage, k);
            const ref = col().doc(k);
            if (v === null) batch.delete(ref);
            else if (byteSize(v) > MAX_DOC_BYTES) tooBig.push(k);
            else batch.set(ref, { v, t: firebase.firestore.FieldValue.serverTimestamp() });
          });
          await batch.commit();
          part.forEach((k) => dirty.delete(k)); // yalnızca başarıyla yazılanlar temizlenir
          persistDirty();
        }
        if (tooBig.length) {
          console.warn('Planova: Bu veriler buluta sığmadığı için yalnızca bu cihazda tutuluyor:', tooBig);
          setStatus('⚠️ Bazı büyük veriler (görseller) yalnızca bu cihazda');
        } else {
          setStatus('Senkronize ✓ ' + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (e) {
        console.warn('Planova sync uyarısı (çevrimdışı olabilir):', e);
        setStatus('Sync beklemede (yerel mod)');
      } finally {
        flushing = null;
      }
    })();
    return flushing;
  }

  async function pullCloud() {
    const snap = await col().get();
    const map  = {};
    snap.forEach((d) => { map[d.id] = d.data().v; });
    return map;
  }

  /**
   * Bulut verisini localStorage'a uygular.
   * • Henüz gönderilmemiş (dirty) yerel değişiklikler EZİLMEZ
   * • Buluta sığmayan büyük yerel değerler silinmez
   * • keepProfile=false ise (hesap değişimi) önceki kullanıcının profili de silinir
   */
  function applyCloud(map, keepProfile = true) {
    applying = true;
    try {
      localKeys().forEach((k) => {
        if (k in map || dirty.has(k)) return;
        if (keepProfile && KEEP_KEYS.has(k)) return;
        if (byteSize(origGet.call(localStorage, k)) > MAX_DOC_BYTES) return;
        origRem.call(localStorage, k);
      });
      Object.keys(map).forEach((k) => {
        if (!dirty.has(k) && isSyncable(k)) origSet.call(localStorage, k, map[k]);
      });
    } finally {
      applying = false;
    }
  }

  /** Bulut ile yerel veri farklı mı? (bekleyen ve yerel-kalıcı anahtarlar hariç) */
  function differsFromCloud(map) {
    return Object.keys(map).some((k) => !dirty.has(k) && origGet.call(localStorage, k) !== map[k]) ||
      localKeys().some((k) => !KEEP_KEYS.has(k) && !dirty.has(k) && !(k in map) &&
        byteSize(origGet.call(localStorage, k)) <= MAX_DOC_BYTES);
  }

  function clearLocal() {
    applying = true;
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) origRem.call(localStorage, k);
      }
      origRem.call(localStorage, UID_KEY);
      dirty.clear();
      origRem.call(localStorage, PENDING_KEY);
    } finally {
      applying = false;
    }
  }

  // Kullanıcı bir metin alanında yazıyorsa sayfayı yenilemeyelim
  const isEditing = () => {
    const el = document.activeElement;
    return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  };
  let reloadWhenIdle = false;

  /* ── Sekme görünürlük değişiminde veri sync ─────────
     Başka cihazda yapılan değişiklikler gelince ekranın eski veriyle kalmaması
     (ve eski verinin bir sonraki kayıtta bulutu ezmemesi) için sayfa yenilenir. */
  document.addEventListener('visibilitychange', async () => {
    if (!uid) return;
    if (document.visibilityState === 'hidden') {
      await flush();
      return;
    }
    if (dirty.size) { await flush(); return; }
    try {
      const map = await pullCloud();
      if (differsFromCloud(map)) {
        applyCloud(map);
        setStatus('Buluttan güncellendi ✓');
        if (isEditing()) reloadWhenIdle = true;
        else window.location.reload();
      }
    } catch (e) { /* Çevrimdışı — sorun yok */ }
  });
  document.addEventListener('focusout', () => {
    if (reloadWhenIdle && !dirty.size) setTimeout(() => { if (!isEditing()) window.location.reload(); }, 300);
  });
  // Sekme kapatılırken bekleyen değişiklikleri göndermeyi dene
  window.addEventListener('pagehide', () => { if (dirty.size) flush(); });

  /* ══════════════════════════════════════════════════
     ARAYÜZ — GİRİŞ / KAYIT FORMU
  ══════════════════════════════════════════════════ */
  const overlay = $('auth-overlay');
  let mode = 'login'; // 'login' | 'register'

  const ERR = {
    'auth/invalid-email':           'Geçersiz e-posta formatı girdiniz.',
    'auth/user-not-found':          'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.',
    'auth/wrong-password':          'Girdiğiniz şifre hatalı.',
    'auth/invalid-credential':      'E-posta veya şifre hatalı.',
    'auth/email-already-in-use':    'Bu e-posta zaten kayıtlı. Lütfen "Giriş Yap" seçeneğini kullanın.',
    'auth/weak-password':           'Şifre en az 6 karakter olmalıdır.',
    'auth/too-many-requests':       'Çok fazla deneme yapıldı. Lütfen biraz bekleyip tekrar deneyin.',
    'auth/network-request-failed':  'İnternet bağlantısı hatası. Lütfen ağınızı kontrol edin.',
    'auth/popup-closed-by-user':    'Google giriş penceresi kapatıldı.',
    'auth/cancelled-popup-request': 'Google penceresi kapatıldı.',
    'auth/popup-blocked':           'Tarayıcı açılır pencereyi engelledi — lütfen izin verip tekrar deneyin.',
    'auth/operation-not-allowed':   'Bu yöntem Firebase Console\'da etkinleştirilmemiş!',
    'auth/unauthorized-domain':     'Bu alan adı Firebase Console > Authentication > Settings > Authorized Domains listesinde olmalıdır.',
  };

  function showMsg(text, ok) {
    const el = $('auth-msg');
    if (!el) return;
    el.textContent = text || '';
    el.className   = 'auth-msg' + (text ? (ok ? ' ok' : ' err') : '');
  }

  function setMode(m) {
    mode = m;
    const isLogin = m === 'login';
    $('auth-title').textContent  = isLogin ? 'Giriş Yap' : 'Hesap Oluştur';
    $('auth-submit').textContent = isLogin ? 'Giriş Yap' : 'Kayıt Ol';
    $('auth-pass2-wrap').classList.toggle('hidden', isLogin);
    const pass2 = $('auth-pass2');
    if (pass2) pass2.required = !isLogin;
    $('auth-switch').textContent = isLogin
      ? 'Hesabın yok mu? Kayıt ol'
      : 'Zaten hesabın var mı? Giriş yap';
    $('auth-forgot').classList.toggle('hidden', !isLogin);
    showMsg('');
  }

  /**
   * E-posta / şifre ile giriş veya kayıt.
   * Form submit olayını yakalar ve preventDefault() ile sayfa yenilenmesini engeller.
   */
  async function submit(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const email = ($('auth-email').value || '').trim();
    const pass  = $('auth-pass').value || '';
    if (!email || !pass) return showMsg('E-posta ve şifre gereklidir.');

    if (mode === 'register') {
      const pass2 = ($('auth-pass2').value || '');
      if (pass !== pass2) return showMsg('Şifreler birbiriyle eşleşmiyor.');
      if (pass.length < 6) return showMsg('Şifre en az 6 karakter olmalıdır.');
    }

    const btn = $('auth-submit');
    btn.disabled = true;
    showMsg('Lütfen bekleyin…', true);

    try {
      if (mode === 'login') {
        await fbAuth.signInWithEmailAndPassword(email, pass);
      } else {
        await fbAuth.createUserWithEmailAndPassword(email, pass);
      }
      // Başarılı olduğunda fbAuth.onAuthStateChanged tetiklenir ve yönlendirmeyi yapar
    } catch (err) {
      console.error('Planova Kimlik Hatası:', err);
      if (err.code === 'auth/operation-not-allowed') {
        showMsg("Firebase Console'da Email/Password yöntemi etkinleştirilmemiş! (Authentication > Sign-in method > Email/Password seçeneğini açıp Kaydet butonuna tıklayın).");
      } else {
        showMsg(ERR[err.code] || ('Hata: ' + err.message));
      }
      btn.disabled = false;
    }
  }

  /**
   * Google ile tek tıkla giriş / kayıt
   */
  async function googleLogin() {
    const btn = $('auth-google');
    btn.disabled = true;
    showMsg('Google ile bağlanılıyor…', true);
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await fbAuth.signInWithPopup(provider);
      // Başarılı olduğunda fbAuth.onAuthStateChanged devralır
    } catch (err) {
      console.error('Planova Google Auth Hatası:', err);
      if (err.code === 'auth/operation-not-allowed') {
        showMsg("Firebase Console'da Google sağlayıcısı etkinleştirilmemiş! (Authentication > Sign-in method > Google sağlayıcısını açıp Kaydet butonuna tıklayın).");
      } else {
        showMsg(ERR[err.code] || ('Google giriş hatası: ' + err.message));
      }
      btn.disabled = false;
    }
  }

  /**
   * Şifremi unuttum e-postası gönderme
   */
  async function forgotPassword() {
    const email = ($('auth-email').value || '').trim();
    if (!email) return showMsg('Önce e-posta adresinizi kutucuğa yazın.');
    try {
      await fbAuth.sendPasswordResetEmail(email);
      showMsg('Şifre sıfırlama bağlantısı e-postanıza gönderildi ✓', true);
    } catch (err) {
      showMsg(ERR[err.code] || ('Hata: ' + err.message));
    }
  }

  /* ══════════════════════════════════════════════════
     PROFİL YARDIMCILARI
  ══════════════════════════════════════════════════ */
  /** "Salih Alper" → "SA", "salih" → "S"; ad yoksa e-postanın ilk harfi, o da yoksa "?" */
  function getInitials(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (words.length) {
      return words.slice(0, 2).map((w) => Array.from(w)[0].toLocaleUpperCase('tr-TR')).join('');
    }
    const email = (api.user && api.user.email) || '';
    return email ? Array.from(email)[0].toLocaleUpperCase('tr-TR') : '?';
  }

  function readAvatar() {
    try {
      const a = JSON.parse(origGet.call(localStorage, AVATAR_KEY) || 'null');
      return a && a.emoji ? a : null;
    } catch { return null; }
  }

  /** Tek bir avatar kutusunu çizer: fotoğraf › emoji/rozet › baş harfler */
  function paintAvatar(box, img, label, { photo, avatar, initials }) {
    if (!img || !label) return;
    if (box) {
      box.classList.remove('is-emoji', 'is-badge', 'is-initials');
      box.style.background = '';
    }
    if (photo) {
      img.src = photo;
      img.classList.remove('hidden');
      label.classList.add('hidden');
      return;
    }
    img.classList.add('hidden');
    img.removeAttribute('src');
    label.classList.remove('hidden');
    if (avatar) {
      label.textContent = avatar.emoji;
      if (box) {
        box.classList.add(avatar.type === 'badge' ? 'is-badge' : 'is-emoji');
        if (avatar.bg) box.style.background = avatar.bg;
      }
    } else {
      label.textContent = initials;
      if (box) box.classList.add('is-initials');
      label.dataset.len = String(Array.from(initials).length);
    }
  }

  /** Profili her yerde günceller. nameOverride verilmezse kayıtlı ad kullanılır. */
  function applyProfileUI(nameOverride) {
    const name   = (nameOverride != null ? nameOverride : origGet.call(localStorage, 'asi_profile_name') || '').trim();
    const photo  = origGet.call(localStorage, 'asi_profile_photo') || '';
    const avatar = photo ? null : readAvatar();
    const state  = { photo, avatar, initials: getInitials(name) };

    paintAvatar($('top-avatar'), $('top-avatar-img'), $('top-avatar-initial'), state);
    paintAvatar(document.querySelector('.profile-photo-box'), $('profile-photo-img'), $('profile-photo-initial'), state);

    const top = $('top-avatar');
    if (top) top.title = name ? `${name} · Hesabı yönet` : 'Hesabı yönet';

    const greeting = $('dashboard-greeting');
    if (greeting) greeting.textContent = name ? 'Merhaba, ' + name + '! 👋' : 'Merhaba! 👋';

    const removeBtn = $('profile-photo-remove');
    if (removeBtn) removeBtn.classList.toggle('hidden', !photo && !avatar);
  }

  function loadProfile() {
    const inp = $('profile-name');
    if (inp) inp.value = origGet.call(localStorage, 'asi_profile_name') || '';
    applyProfileUI();
  }

  /**
   * Profil fotoğrafını ortadan KARE kırpıp küçültür.
   * (Eskiden oran korunuyordu; yuvarlak çerçevede fotoğrafın yalnızca bir köşesi/kenarı görünüyordu.)
   * EXIF yönünü tarayıcı otomatik uygular (createImageBitmap + imageOrientation).
   */
  async function compressImage(file, size = 256) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      const side = Math.min(bmp.width, bmp.height);
      const sx = Math.round((bmp.width - side) / 2);
      const sy = Math.round((bmp.height - side) / 2);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = Math.min(size, side);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bmp, sx, sy, side, side, 0, 0, canvas.width, canvas.height);
      bmp.close && bmp.close();
      return canvas.toDataURL('image/jpeg', 0.85);
    } catch (e) {
      console.warn('Planova: görsel işlenemedi', e);
      return '';
    }
  }

  /* ══════════════════════════════════════════════════
     OTURUM YÖNETİMİ — onAuthStateChanged
     Bu tek fonksiyon tüm oturum kontrolü ve yönlendirmeleri yönetir.
  ══════════════════════════════════════════════════ */
  api.signOut = async function () {
    if (!uid && wantsQuick()) { // hızlı moddan giriş ekranına dön (yerel veriler silinmez)
      origRem.call(localStorage, QUICK_KEY);
      window.location.reload();
      return;
    }
    try {
      await flush();
    } catch (e) {}
    if (dirty.size && !confirm('Bazı değişiklikler henüz buluta gönderilemedi (internet yok olabilir). Çıkış yaparsanız bu değişiklikler kaybolur. Yine de çıkılsın mı?')) {
      return;
    }
    clearLocal();
    origRem.call(localStorage, QUICK_KEY);
    await fbAuth.signOut();
    window.location.hash = '';
    window.location.reload();
  };

  fbAuth.onAuthStateChanged(async (user) => {
    /* ── Kullanıcı ÇIKIŞ YAPTI veya OTURUM YOK ─── */
    if (!user) {
      uid = null;
      api.user = null;
      if (wantsQuick()) { enterQuick(); return; }
      if (overlay) overlay.classList.remove('hidden');
      const splash = $('splash-screen');
      if (splash) splash.style.display = 'none';
      const app = $('app');
      if (app) app.classList.add('hidden');
      const submitBtn = $('auth-submit');
      if (submitBtn) submitBtn.disabled = false;
      return;
    }

    /* ── Kullanıcı OTURUM AÇTI / KAYIT OLDU ─── */
    uid      = user.uid;
    api.user = user;
    origRem.call(localStorage, QUICK_KEY);

    showMsg('Oturum açıldı, veriler yükleniyor…', true);

    try {
      // 1. Buluttan kullanıcı verilerini çek (hata durumunda yerel modla devam eder, ekranı ASLA kilitlemez)
      const prevUID = origGet.call(localStorage, UID_KEY);
      let map = {};
      let cloudOk = false;
      try {
        map = await pullCloud();
        cloudOk = true;
      } catch (cloudErr) {
        console.warn('Planova: Bulut verisi alınamadı (yerel modla devam ediliyor):', cloudErr);
        setStatus('Yerel mod');
      }

      // 2. Bulut ↔ yerel birleştirme
      if (prevUID && prevUID !== uid) {
        // Farklı hesaba geçildi: önceki kullanıcının hiçbir verisi (profil ve bekleyenler dahil) kalmasın
        dirty.clear();
        persistDirty();
        applyCloud(map, false);
      } else if (cloudOk && Object.keys(map).length > 0) {
        applyCloud(map);
      } else if (cloudOk) {
        // Bulut boş (ilk giriş): bu cihazdaki mevcut verileri buluta yükle
        localKeys().forEach((k) => dirty.add(k));
        persistDirty();
      }
      origSet.call(localStorage, UID_KEY, uid);
      if (dirty.size) flush();

      // 3. Giriş ekranını ve Splash ekranını anında kapat
      if (overlay) overlay.classList.add('hidden');
      const splash = $('splash-screen');
      if (splash) splash.style.display = 'none';

      // 4. Ana uygulama panelini görünür yap
      const app = $('app');
      if (app) app.classList.remove('hidden');

      // 5. Kullanıcı hesap bilgilerini arayüze yaz
      const em = $('account-email');
      if (em) em.textContent = user.email || '';
      const pe = $('profile-email');
      if (pe) pe.textContent = user.email || '';
      const se = $('splash-account-email');
      if (se) {
        se.textContent = user.email || '';
        $('splash-account')?.classList.remove('hidden');
      }
      setStatus('Senkronize ✓');

      // 6. Uygulamayı başlat (script.js dinamik yükleme)
      loadApp();

      // 7. Profil ve sayfa yönlendirmesi (window.location.hash veya Dashboard)
      setTimeout(() => {
        loadProfile();
        if (window.ASI && typeof window.ASI.navigateTo === 'function') {
          const currentHash = (window.location.hash || '').replace('#', '');
          if (!currentHash || currentHash === 'login' || currentHash === 'auth') {
            window.ASI.navigateTo('dashboard');
          }
        }
      }, 250);

    } catch (e) {
      console.error('Planova: Oturum açılışında beklenmeyen hata:', e);
      // Kritik fallback: kullanıcı giriş yaptıysa uygulamayı her koşulda aç
      if (overlay) overlay.classList.add('hidden');
      const splash = $('splash-screen');
      if (splash) splash.style.display = 'none';
      const app = $('app');
      if (app) app.classList.remove('hidden');
      loadApp();
    }
  });

  /* ══════════════════════════════════════════════════
     OLAYLARI BAĞLA (EVENT LISTENERS)
  ══════════════════════════════════════════════════ */

  api.openAccount = () => { if (window.PlanovaAccount) window.PlanovaAccount.open(); };

  function bind() {
    // ─── Form submit olayını dinle (e.preventDefault() güvencesi)
    const form = $('auth-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submit(e);
      });
    } else {
      $('auth-submit')?.addEventListener('click', (e) => submit(e));
    }

    $('auth-switch')?.addEventListener('click', () => setMode(mode === 'login' ? 'register' : 'login'));
    $('auth-forgot')?.addEventListener('click', forgotPassword);
    $('auth-google')?.addEventListener('click', googleLogin);
    $('auth-quick')?.addEventListener('click', enterQuick);

    // Enter tuşuna basıldığında formun yeniden yüklenmesini önle
    ['auth-email', 'auth-pass', 'auth-pass2'].forEach((id) => {
      const el = $(id);
      if (el) {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submit(e);
          }
        });
      }
    });

    // ─── Hesap çıkış butonları
    const sl = $('splash-logout');
    if (sl) sl.addEventListener('click', () => api.signOut());
    const lo = $('account-logout-btn');
    if (lo) lo.addEventListener('click', () => { if (confirm('Oturum kapatılsın mı?')) api.signOut(); });

    // ─── data-auth-only elemanlarını göster
    document.querySelectorAll('[data-auth-only]').forEach((el) => el.classList.remove('hidden'));

    // ─── Başlangıç formu
    setMode('login');

    bindProfile();

    // ─── Şifre Sıfırla (profil kartından)
    const resetPassBtn = $('profile-reset-pass');
    if (resetPassBtn) {
      resetPassBtn.classList.remove('hidden');
      resetPassBtn.addEventListener('click', async () => {
        if (!api.user?.email) return;
        try {
          await fbAuth.sendPasswordResetEmail(api.user.email);
          alert('Şifre sıfırlama bağlantısı ' + api.user.email + ' adresine gönderildi.');
        } catch (e) {
          alert('Hata: ' + (ERR[e.code] || e.message));
        }
      });
    }

    // Üst çubuktaki avatar → Hesabı yönet paneli: account.js belge düzeyinde yakalar
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

})();
