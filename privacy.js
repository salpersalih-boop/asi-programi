/* Planova — Gizlilik Politikası ve KVKK Aydınlatma Metni (bağımsız modül) */
(function () {
  'use strict';
  const VERSION = '2026-11';
  const CONTACT = 'salpersalih@gmail.com';

  const HTML = `
<h3>Gizlilik Politikası ve KVKK Aydınlatma Metni</h3>
<p class="pv-date">Sürüm: ${VERSION}</p>

<h4>1. Veri sorumlusu</h4>
<p>Planova uygulamasının veri sorumlusu Alper Salih Somkaya'dır. İletişim: <b>${CONTACT}</b></p>

<h4>2. Hangi verileri işliyoruz?</h4>
<ul>
<li><b>Hesap verileri:</b> e-posta adresi, (Google ile girişte) Google hesabındaki ad ve profil resmi, şifren (yalnızca Firebase'de şifrelenmiş olarak tutulur; bize görünmez).</li>
<li><b>Uygulama verileri:</b> görevler, alışkanlıklar, spor ve okuma kayıtları, notlar, odak süreleri, rozetler, tercihlerin, kullanıcı adın ve (kullanırsan) konum bilgin.</li>
<li><b>Onay kaydı:</b> bu metni hangi sürümle ve ne zaman kabul ettiğin.</li>
</ul>

<h4>3. Amaç ve hukuki sebep</h4>
<p>Verilerin yalnızca hesabını açmak, giriş yapmanı sağlamak ve verilerini cihazların arasında eşitlemek için işlenir. Hukuki sebep: sözleşmenin kurulması ve ifası ile açık rızandır (KVKK m.5/2-c ve m.5/1). Verilerini reklam, profilleme veya satış için kullanmayız.</p>

<h4>4. Verilerin nerede tutulur, kimlere aktarılır?</h4>
<p>Verilerin Google Firebase (Authentication ve Cloud Firestore) üzerinde saklanır. Sunucular Türkiye dışında olabilir; bu nedenle kayıt olurken verdiğin açık rıza, yurt dışına aktarım için de geçerlidir. Verilerine kurallar gereği yalnızca sen erişebilirsin. Yasal bir zorunluluk dışında üçüncü kişilerle paylaşılmaz.</p>

<h4>5. Ne kadar süre saklanır?</h4>
<p>Hesabın açık olduğu sürece. Hesabını sildiğinde verilerin de silinir.</p>

<h4>6. Haklarının neler?</h4>
<p>KVKK m.11 gereği; verilerinin işlenip işlenmediğini öğrenme, bilgi isteme, düzeltme, silme ve yok etme, işlemeye itiraz etme haklarına sahipsin. Başvuru için: <b>${CONTACT}</b>. Rızanı istediğin zaman geri çekebilirsin; bu durumda hesabın kapatılır.</p>

<h4>7. Çerezler / yerel depolama</h4>
<p>Uygulama; oturum, tercihlerin ve çevrimdışı çalışma için tarayıcının yerel depolamasını ve önbelleğini kullanır. Reklam veya takip çerezi kullanılmaz.</p>

<p class="pv-note">Bu metin bilgilendirme amaçlıdır; hukuki danışmanlık değildir.</p>`;

  const MIN_SEC = 5;
  let timer = null;

  function build() {
    let el = document.getElementById('pv-modal');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'pv-modal';
    el.className = 'pv-modal hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<div class="pv-card"><div class="pv-body" id="pv-body">' + HTML +
      '</div><div class="pv-foot"><div class="pv-hint" id="pv-hint"></div>' +
      '<button type="button" class="btn btn-primary pv-accept" id="pv-accept"></button></div></div>';
    el.addEventListener('click', (e) => {
      if (e.target === el && !el.dataset.require) close();
    });
    document.body.appendChild(el);
    return el;
  }

  function open(opts) {
    const require = !!(opts && opts.require);
    const el = build();
    const body = el.querySelector('#pv-body');
    const btn = el.querySelector('#pv-accept');
    const hint = el.querySelector('#pv-hint');
    if (timer) clearInterval(timer);
    if (require) el.dataset.require = '1'; else delete el.dataset.require;
    el.classList.remove('hidden');
    body.scrollTop = 0;

    if (!require) {
      hint.textContent = '';
      btn.disabled = false;
      btn.textContent = 'Kapat';
      btn.onclick = close;
      return;
    }

    const started = Date.now();
    const state = () => {
      const left = Math.max(0, MIN_SEC - Math.floor((Date.now() - started) / 1000));
      const atEnd = body.scrollTop + body.clientHeight >= body.scrollHeight - 12;
      const ok = left === 0 && atEnd;
      btn.disabled = !ok;
      btn.textContent = ok ? 'Okudum, kabul ediyorum' : (left > 0 ? 'Okudum, kabul ediyorum (' + left + ')' : 'Okudum, kabul ediyorum');
      hint.textContent = ok ? '' : (atEnd ? 'Lütfen metni biraz daha oku…' : 'Devam etmek için metnin en altına kadar kaydır.');
    };
    body.onscroll = state;
    state();
    timer = setInterval(state, 250);
    btn.onclick = () => {
      if (btn.disabled) return;
      const cb = document.getElementById('auth-consent');
      if (cb) { cb.dataset.read = '1'; cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
      close();
    };
  }

  function close() {
    if (timer) { clearInterval(timer); timer = null; }
    const el = document.getElementById('pv-modal');
    if (el) el.classList.add('hidden');
  }

  // [data-privacy] bağlantıları: sayfa değiştirmeden pencere açar (yakalama aşamasında, başka dinleyicilerden önce)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-privacy]');
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const wrap = document.getElementById('auth-consent-wrap');
    const needRead = !!a.closest('#auth-overlay') && wrap && !wrap.classList.contains('hidden');
    open({ require: needRead });
  }, true);

  // Onay kutusu: metin okunmadan işaretlenemez, tıklayınca önce metin açılır
  document.addEventListener('click', (e) => {
    const cb = e.target.closest('#auth-consent');
    if (!cb || e.target.closest('[data-privacy]')) return;
    if (cb.dataset.read !== '1') {
      e.preventDefault();
      open({ require: true });
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    const el = document.getElementById('pv-modal');
    if (e.key === 'Escape' && el && !el.classList.contains('hidden') && !el.dataset.require) close();
  });

  window.PlanovaPrivacy = { open, close, VERSION };
})();
