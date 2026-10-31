/* Planova · Hesabı Yönet paneli (bağımsız dosya)
   auth.js'e bağımlı değildir: yalnızca window.PlanovaAuth (user, signOut, refreshProfile) ve firebase.auth() kullanır.
   Üst çubuktaki avatar tıklamasını belge düzeyinde yakalar, bu yüzden düğme ne zaman çizilirse çizilsin çalışır. */
(function () {
  'use strict';
  var PANEL_VERSION = '5.9';

  const $ = (id) => document.getElementById(id);
  const A = () => window.PlanovaAuth || {};
  const QUICK_KEY = 'planova_quick';
  const wantsQuick = () => { try { return localStorage.getItem(QUICK_KEY) === '1'; } catch (_) { return false; } };
  const checkBadges = () => { try { window.ASI && window.ASI.streak && window.ASI.streak.updateStreaksAndBadges(); } catch (_) {} };

  const ERR = {
    'auth/weak-password':          'Şifre en az 6 karakter olmalıdır.',
    'auth/too-many-requests':      'Çok fazla deneme yapıldı. Lütfen biraz bekleyip tekrar deneyin.',
    'auth/network-request-failed': 'İnternet bağlantısı hatası. Lütfen ağınızı kontrol edin.',
    'auth/user-not-found':         'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.'
  };

  function getInitials(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (words.length) return words.slice(0, 2).map((w) => Array.from(w)[0].toLocaleUpperCase('tr-TR')).join('');
    const email = (A().user && A().user.email) || '';
    return email ? Array.from(email)[0].toLocaleUpperCase('tr-TR') : '?';
  }
  function readAvatar() {
    try {
      const a = JSON.parse(localStorage.getItem('asi_profile_avatar') || 'null');
      return a && a.emoji ? a : null;
    } catch (_) { return null; }
  }
  function paintAvatar(box, img, label, st) {
    if (!img || !label) return;
    if (box) { box.classList.remove('is-emoji', 'is-badge', 'is-initials'); box.style.background = ''; }
    if (st.photo) { img.src = st.photo; img.classList.remove('hidden'); label.classList.add('hidden'); return; }
    img.classList.add('hidden'); img.removeAttribute('src'); label.classList.remove('hidden');
    if (st.avatar) {
      label.textContent = st.avatar.emoji;
      if (box) { box.classList.add(st.avatar.type === 'badge' ? 'is-badge' : 'is-emoji'); if (st.avatar.bg) box.style.background = st.avatar.bg; }
    } else {
      label.textContent = st.initials;
      if (box) box.classList.add('is-initials');
    }
  }

  const AccountPanel = (() => {
    let root = null, built = false, msgTimer = null;

    const HTML = `
      <div class="acct-backdrop" data-acct-close></div>
      <section class="acct-panel" role="dialog" aria-modal="true" aria-label="Hesabı yönet">
        <header class="acct-head">
          <button type="button" class="acct-x" data-acct-close aria-label="Kapat">✕</button>
          <div class="acct-avatar-ring"><div class="acct-avatar" id="acct-avatar"><img class="acct-avatar-img hidden" alt=""><span class="acct-avatar-initial"></span></div></div>
          <div class="acct-name" id="acct-name"></div>
          <div class="acct-mail" id="acct-mail"></div>
          <span class="acct-chip" id="acct-prov"></span>
        </header>
        <div class="acct-stats" id="acct-stats">
          <div><strong id="acct-s-level">—</strong><small>Seviye</small></div>
          <div><strong id="acct-s-badges">—</strong><small>Rozet</small></div>
          <div><strong id="acct-s-streak">—</strong><small>Seri</small></div>
        </div>
        <div class="acct-body">
          <div class="acct-title">Hesabı yönet</div>
          <div class="acct-msg" id="acct-msg" role="status" aria-live="polite"></div>

          <div class="acct-item" data-key="name">
            <button type="button" class="acct-row"><span class="acct-ico">✏️</span><span class="acct-txt"><b>Adını değiştir</b><small>Profilinde ve ana sayfada görünür</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <label class="acct-lbl" for="acct-name-in">Görünen adın</label>
              <input type="text" id="acct-name-in" maxlength="30" autocomplete="nickname" placeholder="Örn: Salih">
              <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-name-save">Kaydet</button></div>
            </div></div>
          </div>

          <div class="acct-item" data-key="pass" id="acct-item-pass">
            <button type="button" class="acct-row"><span class="acct-ico">🔑</span><span class="acct-txt"><b id="acct-pass-title">Şifreni değiştir</b><small id="acct-pass-hint">Mevcut şifreni girip yenisini belirle</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <div id="acct-pass-form">
                <label class="acct-lbl" for="acct-pw-cur">Mevcut şifre</label>
                <div class="acct-pw"><input type="password" id="acct-pw-cur" autocomplete="current-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <label class="acct-lbl" for="acct-pw-new">Yeni şifre</label>
                <div class="acct-pw"><input type="password" id="acct-pw-new" autocomplete="new-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <div class="acct-meter"><span id="acct-meter-bar"></span></div><div class="acct-meter-lbl" id="acct-meter-lbl">En az 6 karakter</div>
                <label class="acct-lbl" for="acct-pw-new2">Yeni şifre (tekrar)</label>
                <div class="acct-pw"><input type="password" id="acct-pw-new2" autocomplete="new-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-pw-save">Şifreyi güncelle</button></div>
              </div>
              <div id="acct-pass-google" class="hidden">
                <p class="acct-note">Google hesabınla giriş yaptığın için ayrı bir şifren yok. E-postayla da girebilmek istersen şifre belirleme bağlantısını e-postana gönderebilirim.</p>
                <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-pw-mail">Bağlantıyı gönder</button></div>
              </div>
            </div></div>
          </div>

          <div class="acct-item" data-key="photo">
            <button type="button" class="acct-row" id="acct-photo-btn"><span class="acct-ico">🖼️</span><span class="acct-txt"><b>Profil resmi & rozetler</b><small>Emoji, fotoğraf ya da kazandığın rozet</small></span><span class="acct-chev">›</span></button>
          </div>

          <div class="acct-item hidden" data-key="login" id="acct-item-login">
            <button type="button" class="acct-row" id="acct-login-btn"><span class="acct-ico">📧</span><span class="acct-txt"><b>E-postayla giriş yap / hesap aç</b><small>Verilerin telefon ve bilgisayar arasında eşitlenir</small></span><span class="acct-chev">›</span></button>
          </div>

          <div class="acct-item danger" data-key="out" id="acct-item-out">
            <button type="button" class="acct-row"><span class="acct-ico">🚪</span><span class="acct-txt"><b>Çıkış yap</b><small id="acct-out-hint">Oturumu bu cihazda kapat</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <p class="acct-note" id="acct-out-note">Oturum kapatılsın mı? Verilerin hesabında güvende kalır.</p>
              <div class="acct-actions"><button type="button" class="acct-btn danger" id="acct-out-yes">Evet, çık</button><button type="button" class="acct-btn" data-acct-back>Vazgeç</button></div>
            </div></div>
          </div>

          <div class="acct-ver">Planova · panel v${PANEL_VERSION}</div>
        </div>
      </section>`;

    const q = (sel) => root.querySelector(sel);
    const isQuick = () => !A().user && wantsQuick();
    const providers = () => ((A().user && A().user.providerData) || []).map((p) => p.providerId);

    function say(text, kind) {
      const el = q('#acct-msg');
      clearTimeout(msgTimer);
      el.textContent = text || '';
      el.className = 'acct-msg' + (text ? ' show ' + (kind || '') : '');
      if (text && kind === 'ok') msgTimer = setTimeout(() => say(''), 4000);
    }

    function openItem(key) {
      say('');
      root.querySelectorAll('.acct-item').forEach((it) => {
        const open = it.dataset.key === key && !it.classList.contains('open');
        it.classList.toggle('open', open);
        if (open) setTimeout(() => it.querySelector('input')?.focus(), 220);
      });
    }

    function strength(pw) {
      let sc = 0;
      if (pw.length >= 6) sc++;
      if (pw.length >= 10) sc++;
      if (/[A-ZÇĞİÖŞÜ]/.test(pw) && /[a-zçğıöşü]/.test(pw)) sc++;
      if (/\d/.test(pw)) sc++;
      if (/[^A-Za-z0-9çğıöşüÇĞİÖŞÜ]/.test(pw)) sc++;
      return Math.min(4, sc);
    }

    function build() {
      if (built) return;
      built = true;
      root = document.createElement('div');
      root.id = 'acct-root';
      root.className = 'acct-root hidden';
      root.innerHTML = HTML;
      document.body.appendChild(root);

      root.addEventListener('click', (e) => {
        if (e.target.closest('[data-acct-close]')) return close();
        if (e.target.closest('[data-acct-back]')) return openItem('');
        const eye = e.target.closest('[data-eye]');
        if (eye) { const i = eye.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; return; }
        const row = e.target.closest('.acct-row');
        if (row && row.parentElement.querySelector('.acct-sub')) openItem(row.parentElement.dataset.key);
      });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !root.classList.contains('hidden')) close(); });

      // Ad değiştir
      const saveName = () => {
        const name = q('#acct-name-in').value.trim().slice(0, 30);
        if (name) localStorage.setItem('asi_profile_name', name); else localStorage.removeItem('asi_profile_name');
        try { A().refreshProfile && A().refreshProfile(); } catch (_) {}
        const pn = $('profile-name'); if (pn) pn.value = name;
        checkBadges();
        paint();
        say(name ? 'Adın güncellendi ✓' : 'Ad kaldırıldı, baş harfler gösterilecek', 'ok');
      };
      q('#acct-name-save').addEventListener('click', saveName);
      q('#acct-name-in').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveName(); });

      // Şifre: güç göstergesi
      q('#acct-pw-new').addEventListener('input', (e) => {
        const v = e.target.value, sc = v ? strength(v) : 0;
        q('#acct-meter-bar').style.width = (sc * 25) + '%';
        q('#acct-meter-bar').dataset.s = String(sc);
        q('#acct-meter-lbl').textContent = !v ? 'En az 6 karakter' : ['Çok zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü'][sc];
      });

      // Şifre değiştir
      q('#acct-pw-save').addEventListener('click', async () => {
        const cur = q('#acct-pw-cur').value, n1 = q('#acct-pw-new').value, n2 = q('#acct-pw-new2').value;
        if (!cur || !n1 || !n2) return say('Üç alanı da doldur.', 'err');
        if (n1.length < 6) return say('Yeni şifre en az 6 karakter olmalı.', 'err');
        if (n1 !== n2) return say('Yeni şifreler birbiriyle aynı değil.', 'err');
        if (n1 === cur) return say('Yeni şifre eskisiyle aynı olamaz.', 'err');
        const u = firebase.auth().currentUser;
        if (!u || !u.email) return say('Oturum bulunamadı, tekrar giriş yap.', 'err');
        const btn = q('#acct-pw-save'); btn.disabled = true; btn.textContent = 'Güncelleniyor…';
        try {
          await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, cur));
          await u.updatePassword(n1);
          ['#acct-pw-cur', '#acct-pw-new', '#acct-pw-new2'].forEach((id) => { q(id).value = ''; q(id).type = 'password'; });
          q('#acct-meter-bar').style.width = '0';
          q('#acct-meter-lbl').textContent = 'En az 6 karakter';
          openItem('');
          say('Şifren güncellendi ✓', 'ok');
        } catch (e) {
          const c = e && e.code;
          say(c === 'auth/wrong-password' || c === 'auth/invalid-credential' ? 'Mevcut şifren hatalı.'
            : c === 'auth/requires-recent-login' ? 'Güvenlik için çıkış yapıp yeniden giriş yap, sonra tekrar dene.'
            : (ERR[c] || (e && e.message) || 'Şifre değiştirilemedi.'), 'err');
        } finally { btn.disabled = false; btn.textContent = 'Şifreyi güncelle'; }
      });

      // Google hesabı: şifre belirleme bağlantısı
      q('#acct-pw-mail').addEventListener('click', async () => {
        if (!A().user || !A().user.email) return;
        const btn = q('#acct-pw-mail'); btn.disabled = true;
        try {
          await firebase.auth().sendPasswordResetEmail(A().user.email);
          openItem('');
          say(A().user.email + ' adresine bağlantı gönderildi ✓', 'ok');
        } catch (e) { say(ERR[e.code] || e.message, 'err'); }
        finally { btn.disabled = false; }
      });

      // Profil resmi → Ayarlar'daki profil kartı
      q('#acct-photo-btn').addEventListener('click', () => {
        close();
        if (window.ASI && window.ASI.navigateTo) {
          window.ASI.navigateTo('settings');
          setTimeout(() => { const c = $('settings-profile-card'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
        }
      });

      // Hızlı mod → giriş ekranı
      q('#acct-login-btn').addEventListener('click', async () => {
        if (!A().configured) {
          say('Giriş servisi (Firebase) yüklenemedi. Önbellek temizlenip sayfa yeniden açılıyor…', 'err');
          try {
            if (navigator.serviceWorker) (await navigator.serviceWorker.getRegistrations()).forEach((r) => r.unregister());
            if (window.caches) (await caches.keys()).forEach((k) => caches.delete(k));
          } catch (_) {}
          setTimeout(() => location.reload(), 900);
          return;
        }
        close();
        A().signOut();
      });

      // Çıkış
      q('#acct-out-yes').addEventListener('click', () => { close(); A().signOut(); });
    }

    function paint() {
      const name = (localStorage.getItem('asi_profile_name') || '').trim();
      const photo = localStorage.getItem('asi_profile_photo') || '';
      const avatar = photo ? null : readAvatar();
      const box = q('#acct-avatar');
      paintAvatar(box, box.querySelector('img'), box.querySelector('span'), { photo, avatar, initials: getInitials(name) });

      const quick = isQuick();
      q('#acct-name').textContent = name || (quick ? 'Misafir' : 'Planova kullanıcısı');
      q('#acct-mail').textContent = quick ? 'Giriş yapılmadı · veriler yalnızca bu cihazda' : ((A().user && A().user.email) || '');
      const prov = providers();
      q('#acct-prov').textContent = quick ? (A().configured ? '⚡ Hızlı mod' : '⚡ Hızlı mod · giriş servisi yok') : prov.includes('google.com') ? '🔵 Google ile giriş' : '✉️ E-posta ile giriş';
      q('#acct-prov').className = 'acct-chip ' + (quick ? 'quick' : 'ok');

      const txt = (id) => { const el = $(id); return el ? el.textContent.trim() : ''; };
      const lvl = txt('badges-level');
      q('#acct-s-level').textContent = lvl ? lvl.replace(/^\S+\s*Seviye\s*/, 'Sv. ').split('·')[0].trim() : '—';
      q('#acct-s-badges').textContent = txt('badges-total') || '—';
      q('#acct-s-streak').textContent = txt('top-streak-count') ? '🔥 ' + txt('top-streak-count') : '—';

      q('#acct-name-in').value = name;

      // Hesaba göre satırlar
      const hasPass = prov.includes('password');
      q('#acct-item-pass').classList.toggle('hidden', quick);
      q('#acct-pass-form').classList.toggle('hidden', !hasPass);
      q('#acct-pass-google').classList.toggle('hidden', hasPass);
      q('#acct-pass-title').textContent = hasPass ? 'Şifreni değiştir' : 'Şifre belirle';
      q('#acct-pass-hint').textContent = hasPass ? 'Mevcut şifreni girip yenisini belirle' : 'E-postayla da giriş yapabil';
      q('#acct-item-login').classList.toggle('hidden', !quick);
      q('#acct-item-out').classList.toggle('hidden', quick);
    }

    function open() {
      build();
      paint();
      openItem('');
      say('');
      root.classList.remove('hidden');
      requestAnimationFrame(() => root.classList.add('show'));
      document.body.classList.add('acct-lock');
      setTimeout(() => q('.acct-x').focus(), 60);
    }
    function close() {
      if (!root) return;
      root.classList.remove('show');
      document.body.classList.remove('acct-lock');
      setTimeout(() => root.classList.add('hidden'), 220);
      $('top-avatar')?.focus();
    }
    return { open, close, toggle() { (root && root.classList.contains('show')) ? close() : open(); } };
  })();

  /* Hata olursa sessiz kalma: ekranda göster */
  function showFailure(err) {
    console.error('Planova hesap paneli:', err);
    let t = document.getElementById('acct-fail');
    if (!t) {
      t = document.createElement('div');
      t.id = 'acct-fail';
      t.style.cssText = 'position:fixed;left:12px;right:12px;bottom:16px;z-index:99999;padding:12px 14px;border-radius:12px;background:#7f1d1d;color:#fff;font:600 13px/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.4)';
      document.body.appendChild(t);
    }
    t.textContent = 'Hesap paneli açılamadı: ' + ((err && err.message) || err);
    setTimeout(() => { t.remove(); }, 8000);
  }

  function toggleSafe() {
    try { AccountPanel.toggle(); } catch (e) { showFailure(e); }
  }

  // Avatar tıklaması: yakalama aşamasında, başka kodlardan önce
  document.addEventListener('click', function (e) {
    const btn = e.target && e.target.closest && e.target.closest('#top-avatar');
    if (!btn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    toggleSafe();
  }, true);

  window.PlanovaAccount = { open: () => { try { AccountPanel.open(); } catch (e) { showFailure(e); } }, close: () => AccountPanel.close(), version: PANEL_VERSION };
})();
