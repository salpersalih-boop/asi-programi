/* Planova · Hesabı Yönet paneli (bağımsız dosya)
   auth.js'e bağımlı değildir: yalnızca window.PlanovaAuth (user, signOut, refreshProfile) ve firebase.auth() kullanır.
   Üst çubuktaki avatar tıklamasını belge düzeyinde yakalar, bu yüzden düğme ne zaman çizilirse çizilsin çalışır. */
(function () {
  'use strict';
  var PANEL_VERSION = '7.7';

  const $ = (id) => document.getElementById(id);
  const A = () => window.PlanovaAuth || {};
  const QUICK_KEY = 'planova_quick';
  const wantsQuick = () => { try { return localStorage.getItem(QUICK_KEY) === '1'; } catch (_) { return false; } };
  const checkBadges = () => { try { window.ASI && window.ASI.streak && window.ASI.streak.updateStreaksAndBadges(); } catch (_) {} };

  const ERR = {
    'auth/weak-password':          'Şifre en az 8 karakter olmalıdır.',
    'auth/password-does-not-meet-requirements': 'Şifre en az 8 karakter olmalıdır.',
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
          <div class="acct-verify hidden" id="acct-verify">
            <div class="acct-verify-txt">✉️ E-postan henüz doğrulanmadı. Gelen kutundaki bağlantıya bas.</div>
            <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-verify-send">Bağlantıyı tekrar gönder</button><button type="button" class="acct-btn" id="acct-verify-check">Doğruladım</button></div>
          </div>
          <div class="acct-title">Hesabı yönet</div>
          <div class="acct-msg" id="acct-msg" role="status" aria-live="polite"></div>

          <div class="acct-item" data-key="profile">
            <button type="button" class="acct-row"><span class="acct-ico">👤</span><span class="acct-txt"><b>Profil & şifre</b><small>Adın, profil resmin ve şifren</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <div class="acct-sec-t">Görünen adın</div>
              <div class="acct-inline"><input type="text" id="acct-name-in" maxlength="30" autocomplete="nickname" placeholder="Örn: Salih" aria-label="Görünen adın"><button type="button" class="acct-btn primary" id="acct-name-save">Kaydet</button></div>
              <button type="button" class="acct-link-btn" id="acct-photo-btn">🖼️ Profil resmini & rozetini değiştir ›</button>
              <div id="acct-item-pass">
                <div class="acct-sec-t acct-sec-sep" id="acct-pass-title">Şifreni değiştir</div>
                <small class="acct-sec-hint" id="acct-pass-hint">Mevcut şifreni girip yenisini belirle</small>
              <div id="acct-pass-form">
                <label class="acct-lbl" for="acct-pw-cur">Mevcut şifre</label>
                <div class="acct-pw"><input type="password" id="acct-pw-cur" autocomplete="current-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <label class="acct-lbl" for="acct-pw-new">Yeni şifre</label>
                <div class="acct-pw"><input type="password" id="acct-pw-new" autocomplete="new-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <div class="acct-meter"><span id="acct-meter-bar"></span></div><div class="acct-meter-lbl" id="acct-meter-lbl">En az 8 karakter</div>
                <label class="acct-lbl" for="acct-pw-new2">Yeni şifre (tekrar)</label>
                <div class="acct-pw"><input type="password" id="acct-pw-new2" autocomplete="new-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
                <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-pw-save">Şifreyi güncelle</button></div>
                <button type="button" class="acct-forgot" id="acct-pw-forgot">Mevcut şifreni mi unuttun? E-postana sıfırlama bağlantısı gönder</button>
              </div>
              <div id="acct-pass-google" class="hidden">
                <p class="acct-note">Google hesabınla giriş yaptığın için ayrı bir şifren yok. E-postayla da girebilmek istersen şifre belirleme bağlantısını e-postana gönderebilirim.</p>
                <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-pw-mail">Bağlantıyı gönder</button></div>
              </div>
              </div>
            </div></div>
          </div>

          <div class="acct-item hidden" data-key="login" id="acct-item-login">
            <button type="button" class="acct-row" id="acct-login-btn"><span class="acct-ico">📧</span><span class="acct-txt"><b>E-postayla giriş yap / hesap aç</b><small>Verilerin telefon ve bilgisayar arasında eşitlenir</small></span><span class="acct-chev">›</span></button>
          </div>

          <div class="acct-item" data-key="data">
            <button type="button" class="acct-row"><span class="acct-ico">🛡️</span><span class="acct-txt"><b>Verilerim & gizlilik</b><small>Yedekle, geri yükle, KVKK metni</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <div class="acct-sec-t">Yedek</div>
              <small class="acct-sec-hint">Görevlerin, notların ve tercihlerin tek dosyada. Yedekten yüklemek mevcut verilerinin yerine geçer.</small>
              <div class="acct-actions"><button type="button" class="acct-btn primary" id="acct-export">Verilerimi indir</button><button type="button" class="acct-btn" id="acct-import">Yedekten yükle…</button></div>
              <input type="file" id="acct-import-file" accept="application/json,.json" hidden>
              <button type="button" class="acct-link-btn" data-privacy>🔒 KVKK Aydınlatma Metni & Kullanım Koşulları ›</button>
            </div></div>
          </div>

          <div class="acct-item" data-key="feedback">
            <button type="button" class="acct-row" id="acct-feedback-btn"><span class="acct-ico">💬</span><span class="acct-txt"><b>Geri bildirim</b><small>Sorunu ya da önerini yaz</small></span><span class="acct-chev">›</span></button>
          </div>

          <div class="acct-item danger" data-key="del" id="acct-item-del">
            <button type="button" class="acct-row"><span class="acct-ico">🗑️</span><span class="acct-txt"><b>Hesabımı sil</b><small>Hesap ve tüm veriler kalıcı olarak silinir</small></span><span class="acct-chev">›</span></button>
            <div class="acct-sub"><div class="acct-sub-in">
              <p class="acct-note">Hesabın ve buluttaki tüm verilerin kalıcı olarak silinir. İstersen önce "Verilerim &amp; gizlilik" bölümünden yedeğini indir.</p>
              <div id="acct-del-pass">
                <label class="acct-lbl" for="acct-del-pw">Şifren</label>
                <div class="acct-pw"><input type="password" id="acct-del-pw" autocomplete="current-password"><button type="button" class="acct-eye" data-eye aria-label="Göster/gizle">👁</button></div>
              </div>
              <p class="acct-note hidden" id="acct-del-google">Silmeden önce Google hesabınla doğrulama penceresi açılacak.</p>
              <label class="acct-lbl" for="acct-del-confirm">Onaylamak için SİL yaz</label>
              <input type="text" id="acct-del-confirm" autocomplete="off" placeholder="SİL">
              <div class="acct-actions"><button type="button" class="acct-btn danger" id="acct-del-yes">Kalıcı olarak sil</button><button type="button" class="acct-btn" data-acct-back>Vazgeç</button></div>
            </div></div>
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

    const CENTER = { profile: '👤 Profil & şifre', del: '🗑️ Hesabımı sil' };
    let centerState = null;
    function openCenter(key) {
      closeCenter();
      const it = q(`.acct-item[data-key="${key}"]`);
      const inner = it && it.querySelector('.acct-sub-in');
      if (!inner) return;
      const body = q('#acct-center-body'), msg = q('#acct-msg');
      centerState = { inner, home: inner.parentElement, msg, msgHome: msg.parentElement, msgNext: msg.nextSibling, key };
      body.appendChild(inner);
      body.appendChild(msg);
      q('#acct-center-title').textContent = CENTER[key];
      q('#acct-center').classList.toggle('is-danger', key === 'del');
      q('#acct-center').classList.remove('hidden');
      setTimeout(() => { const inp = inner.querySelector('input:not([type=hidden])'); if (inp) inp.focus(); }, 60);
    }
    function closeCenter() {
      if (!centerState) return;
      const c = centerState; centerState = null;
      c.home.appendChild(c.inner);
      c.msgHome.insertBefore(c.msg, c.msgNext);
      q('#acct-center').classList.add('hidden');
    }

    function openItem(key) {
      say('');
      closeCenter();
      if (CENTER[key]) { root.querySelectorAll('.acct-item.open').forEach((it) => it.classList.remove('open')); return openCenter(key); }
      root.querySelectorAll('.acct-item').forEach((it) => {
        const open = it.dataset.key === key && !it.classList.contains('open');
        it.classList.toggle('open', open);
        if (open) {
          const reveal = () => { try { it.scrollIntoView({ block: 'nearest' }); } catch (_) {} };
          setTimeout(reveal, 320);   // açılma animasyonu (.26s) bittikten sonra görünür alana kaydır
          setTimeout(reveal, 700);
          setTimeout(() => { reveal(); const inp = it.querySelector('input'); if (inp) inp.focus({ preventScroll: true }); }, 380);
        }
      });
    }

    function strength(pw) {
      let sc = 0;
      if (pw.length >= 8) sc++;
      if (pw.length >= 12) sc++;
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
      // Ortada açılan pencere (Profil & şifre, Hesabımı sil)
      const center = document.createElement('div');
      center.className = 'acct-center hidden';
      center.id = 'acct-center';
      center.innerHTML = '<div class="acct-center-card" role="dialog" aria-modal="true" aria-labelledby="acct-center-title">' +
        '<div class="acct-center-head"><b id="acct-center-title"></b><button type="button" class="acct-center-x" data-center-close aria-label="Kapat">✕</button></div>' +
        '<div class="acct-center-body" id="acct-center-body"></div></div>';
      root.appendChild(center);
      document.body.appendChild(root);

      root.addEventListener('click', (e) => {
        if (e.target.closest('[data-center-close]') || e.target.id === 'acct-center') { say(''); return closeCenter(); }
        if (e.target.closest('[data-acct-close]')) return close();
        if (e.target.closest('[data-acct-back]')) return openItem('');
        const eye = e.target.closest('[data-eye]');
        if (eye) { const i = eye.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; return; }
        const row = e.target.closest('.acct-row');
        if (row && row.parentElement.querySelector('.acct-sub')) openItem(row.parentElement.dataset.key);
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || root.classList.contains('hidden')) return;
        if (centerState) { say(''); closeCenter(); } else close();
      });

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
        q('#acct-meter-lbl').textContent = !v ? 'En az 8 karakter' : ['Çok zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü'][sc];
      });

      // Şifre değiştir
      q('#acct-pw-save').addEventListener('click', async () => {
        const cur = q('#acct-pw-cur').value, n1 = q('#acct-pw-new').value, n2 = q('#acct-pw-new2').value;
        if (!cur || !n1 || !n2) return say('Üç alanı da doldur.', 'err');
        if (n1.length < 8) return say('Yeni şifre en az 8 karakter olmalı.', 'err');
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
          q('#acct-meter-lbl').textContent = 'En az 8 karakter';
          openItem('');
          say('Şifren güncellendi ✓', 'ok');
        } catch (e) {
          const c = e && e.code;
          say(c === 'auth/wrong-password' || c === 'auth/invalid-credential' ? 'Mevcut şifren hatalı.'
            : c === 'auth/requires-recent-login' ? 'Güvenlik için çıkış yapıp yeniden giriş yap, sonra tekrar dene.'
            : (ERR[c] || (e && e.message) || 'Şifre değiştirilemedi.'), 'err');
        } finally { btn.disabled = false; btn.textContent = 'Şifreyi güncelle'; }
      });

      // Mevcut şifreyi unuttu: sıfırlama bağlantısı
      q('#acct-pw-forgot').addEventListener('click', async () => {
        if (!A().user || !A().user.email) return;
        const btn = q('#acct-pw-forgot'); btn.disabled = true;
        try {
          await firebase.auth().sendPasswordResetEmail(A().user.email);
          say(A().user.email + ' adresine şifre sıfırlama bağlantısı gönderildi ✓ Gelen kutunu (ve spam klasörünü) kontrol et.', 'ok');
        } catch (e) { say(ERR[e.code] || e.message, 'err'); }
        finally { btn.disabled = false; }
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



      // Geri bildirim: hazır e-posta taslağı açar
      q('#acct-feedback-btn').addEventListener('click', () => {
        const body = 'Merhaba,\n\n[Sorunu ya da önerini buraya yaz]\n\n---\nPlanova v' + PANEL_VERSION + '\nTarayıcı: ' + navigator.userAgent;
        window.location.href = 'mailto:salpersalih@gmail.com?subject=' + encodeURIComponent('Planova geri bildirim') + '&body=' + encodeURIComponent(body);
      });

      // E-posta doğrulama
      q('#acct-verify-send').addEventListener('click', async () => {
        const u = A().user; if (!u) return;
        const btn = q('#acct-verify-send'); btn.disabled = true;
        try { await u.sendEmailVerification(); say('Doğrulama bağlantısı ' + u.email + ' adresine gönderildi ✓', 'ok'); }
        catch (e) { say(ERR[e.code] || e.message || 'Gönderilemedi.', 'err'); }
        finally { btn.disabled = false; }
      });
      q('#acct-verify-check').addEventListener('click', async () => {
        const u = A().user; if (!u) return;
        try {
          await u.reload();
          if (u.emailVerified) { say('E-postan doğrulandı ✓', 'ok'); paint(); }
          else say('Henüz doğrulanmamış görünüyor. Bağlantıya bastığından emin ol.', 'err');
        } catch (e) { say(ERR[e.code] || e.message || 'Kontrol edilemedi.', 'err'); }
      });

      // Yedek: indir
      q('#acct-export').addEventListener('click', () => {
        try {
          const data = {};
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('asi_') && !/^asi_(prayer_cache_|consent$)/.test(k)) data[k] = localStorage.getItem(k);
          }
          const out = { app: 'Planova', format: 1, exportedAt: new Date().toISOString(), email: (A().user && A().user.email) || null, data };
          const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'planova-yedek-' + new Date().toISOString().slice(0, 10) + '.json';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 2000);
          say('Yedek dosyası indirildi ✓', 'ok');
        } catch (e) { say('Yedek oluşturulamadı: ' + e.message, 'err'); }
      });

      // Yedek: yükle
      q('#acct-import').addEventListener('click', () => q('#acct-import-file').click());
      q('#acct-import-file').addEventListener('change', async (e) => {
        const f = e.target.files[0]; e.target.value = '';
        if (!f) return;
        try {
          if (f.size > 8 * 1024 * 1024) throw new Error('Dosya çok büyük.');
          const j = JSON.parse(await f.text());
          if (!j || j.app !== 'Planova' || !j.data || typeof j.data !== 'object') throw new Error('Bu bir Planova yedek dosyası değil.');
          const keys = Object.keys(j.data).filter((k) => /^asi_[A-Za-z0-9_\-]+$/.test(k) && !/^asi_(prayer_cache_|consent$)/.test(k) && typeof j.data[k] === 'string');
          if (!keys.length) throw new Error('Dosyada geri yüklenecek veri yok.');
          if (!window.confirm(keys.length + ' kayıt yüklenecek ve mevcut verilerinin yerine geçecek. Devam edilsin mi?')) return;
          keys.forEach((k) => localStorage.setItem(k, j.data[k]));
          say(keys.length + ' kayıt geri yüklendi ✓ Sayfa yenileniyor…', 'ok');
          setTimeout(() => location.reload(), 1300);
        } catch (err) { say(err.message || 'Yedek okunamadı.', 'err'); }
      });

      // Hesabı ve verileri sil
      q('#acct-del-yes').addEventListener('click', async () => {
        const u = firebase.auth().currentUser;
        if (!u) return say('Oturum bulunamadı, tekrar giriş yap.', 'err');
        if (q('#acct-del-confirm').value.trim().toLocaleUpperCase('tr-TR') !== 'SİL') return say('Onaylamak için kutuya SİL yaz.', 'err');
        const hasPass = providers().includes('password');
        const pw = q('#acct-del-pw').value;
        if (hasPass && !pw) return say('Şifreni gir.', 'err');
        const btn = q('#acct-del-yes'); btn.disabled = true; btn.textContent = 'Siliniyor…';
        try {
          if (hasPass) await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, pw));
          else await u.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
          const db = firebase.firestore();
          const base = db.collection('users').doc(u.uid);
          const docs = (await base.collection('data').get()).docs;
          for (let i = 0; i < docs.length; i += 400) {
            const b = db.batch();
            docs.slice(i, i + 400).forEach((d) => b.delete(d.ref));
            await b.commit();
          }
          try { await base.delete(); } catch (_) {}
          await u.delete();
          try { A().wipeLocal && A().wipeLocal(); } catch (_) {}
          say('Hesabın ve verilerin silindi. Hoşça kal 👋', 'ok');
          setTimeout(() => location.reload(), 1300);
        } catch (e) {
          const c = e && e.code;
          say(c === 'auth/wrong-password' || c === 'auth/invalid-credential' ? 'Şifren hatalı.'
            : c === 'auth/popup-closed-by-user' ? 'Doğrulama penceresi kapatıldı.'
            : c === 'auth/requires-recent-login' ? 'Güvenlik için çıkış yapıp yeniden giriş yap, sonra tekrar dene.'
            : (ERR[c] || (e && e.message) || 'Hesap silinemedi.'), 'err');
        } finally { btn.disabled = false; btn.textContent = 'Kalıcı olarak sil'; }
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
      q('#acct-item-del').classList.toggle('hidden', quick);
      q('#acct-verify').classList.toggle('hidden', !(A().user && hasPass && A().user.emailVerified === false));
      q('#acct-del-pass').classList.toggle('hidden', !hasPass);
      q('#acct-del-google').classList.toggle('hidden', hasPass);
      q('#acct-del-pw').value = ''; q('#acct-del-confirm').value = '';
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
      closeCenter();
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
