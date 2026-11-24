/* Planova — KVKK Aydınlatma Metni ve Kullanım Koşulları (bağımsız modül) */
(function () {
  'use strict';
  const VERSION = '2026-11-2';
  const CONTACT = 'salpersalih@gmail.com';
  const MIN_SEC = 5;

  const HTML = `
<h3 class="pv-h">KVKK Aydınlatma Metni</h3>
<p class="pv-date">Sürüm: ${VERSION}</p>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, kişisel verilerinizin nasıl işlendiğini aşağıda açıklıyoruz.</p>

<h4>1. Veri sorumlusu</h4>
<p>Planova uygulamasının veri sorumlusu Alper Salih Somkaya'dır. İletişim: <b>${CONTACT}</b></p>

<h4>2. İşlenen veriler</h4>
<ul>
<li><b>Hesap verileri:</b> e-posta adresi; Google ile girişte Google hesabınızdaki ad ve profil resmi. Şifreniz yalnızca Firebase'de şifrelenmiş olarak tutulur, bize görünmez.</li>
<li><b>Uygulama verileri:</b> görevler, alışkanlıklar, spor ve okuma kayıtları, notlar, odak süreleri, rozetler, tercihleriniz ve kullanıcı adınız.</li>
<li><b>Onay kaydı:</b> bu metni hangi sürümle ve ne zaman kabul ettiğiniz.</li>
</ul>

<h4>3. Amaç ve hukuki sebep</h4>
<p>Verileriniz yalnızca hesabınızı açmak, giriş yapmanızı sağlamak ve verilerinizi cihazlarınız arasında eşitlemek için işlenir. Hukuki sebep: sözleşmenin kurulması ve ifası ile açık rızanızdır (KVKK m.5/2-c ve m.5/1). Verileriniz reklam, profilleme veya satış amacıyla kullanılmaz.</p>

<h4>4. Verilerin aktarımı</h4>
<p>Verileriniz Google Firebase (Authentication ve Cloud Firestore) altyapısında saklanır. Sunucular Türkiye dışında olabilir; kayıt sırasında verdiğiniz açık rıza yurt dışına aktarım için de geçerlidir. Verilerinize kurallar gereği yalnızca siz erişebilirsiniz; yasal zorunluluk dışında üçüncü kişilerle paylaşılmaz. Rızanızı geri çekmek isterseniz hesabınızın silinmesini talep edebilirsiniz. Ayrıca yazı tipleri Google Fonts üzerinden yüklenir; bu istek sırasında IP adresiniz Google ile paylaşılır.</p>

<h4>5. Saklama süresi</h4>
<p>Verileriniz hesabınız açık kaldığı sürece saklanır. Silme talebiniz üzerine makul süre içinde silinir veya anonim hale getirilir.</p>

<h4>6. Haklarınız (KVKK m. 11)</h4>
<ul>
<li>Verilerinizin işlenip işlenmediğini öğrenme ve bilgi talep etme,</li>
<li>İşleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
<li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
<li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
<li>Kanunda öngörülen şartlarda silinmesini veya yok edilmesini isteme,</li>
<li>Zararın giderilmesini talep etme.</li>
</ul>
<div class="pv-box">Başvurularınızı <b>${CONTACT}</b> adresine, hesabınızdaki e-posta adresinden göndermeniz yeterlidir. Talebiniz en geç 30 gün içinde yanıtlanır.</div>

<h3 class="pv-h pv-h2">Kullanım Koşulları</h3>
<h4>1. Hizmet</h4>
<p>Planova; görev, alışkanlık, spor, okuma ve odak takibi için hazırlanmış kişisel bir ajanda uygulamasıdır. Ücretsizdir ve “olduğu gibi” sunulur; kesintisiz veya hatasız çalışacağı garanti edilmez.</p>
<h4>2. Hesabınız</h4>
<p>Hesabınızın güvenliğinden ve şifrenizin gizli tutulmasından siz sorumlusunuz. Başkasına ait hesabı veya e-posta adresini kullanamazsınız.</p>
<h4>3. Kullanım kuralları</h4>
<p>Uygulamayı yasalara aykırı amaçlarla, hizmetin işleyişini bozacak veya başkalarının verilerine erişmeye çalışacak biçimde kullanamazsınız.</p>
<h4>4. Verileriniz</h4>
<p>Uygulamaya girdiğiniz veriler size aittir. Bunların işlenmesi yukarıdaki KVKK Aydınlatma Metni'ne göre yapılır. Önemli verilerinizin ayrıca yedeğini almanızı öneririz.</p>
<h4>5. Değişiklik ve kapatma</h4>
<p>Bu koşullar ve uygulama zaman zaman güncellenebilir; önemli değişikliklerde yeniden onayınız istenir. Hesabınızı istediğiniz zaman kapatmayı talep edebilirsiniz.</p>
<p class="pv-note">Bu metin bilgilendirme amaçlıdır; hukuki danışmanlık değildir.</p>`;

  let timer = null;

  function build() {
    let el = document.getElementById('pv-modal');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'pv-modal';
    el.className = 'pv-modal hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'KVKK Aydınlatma Metni ve Kullanım Koşulları');
    el.innerHTML =
      '<div class="pv-card">' +
        '<div class="pv-head"><b>KVKK Aydınlatma Metni</b>' +
        '<button type="button" class="pv-x" id="pv-x" aria-label="Kapat">✕</button></div>' +
        '<div class="pv-body" id="pv-body">' + HTML + '</div>' +
        '<div class="pv-foot"><div class="pv-hint" id="pv-hint"></div>' +
        '<button type="button" class="btn btn-primary pv-accept" id="pv-accept"></button></div>' +
      '</div>';
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.closest('#pv-x')) close();
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
      btn.textContent = left > 0 ? 'Okudum (' + left + ')' : 'Okudum';
      hint.textContent = ok ? '' : (!atEnd ? 'Devam etmek için metnin en altına kadar kaydır.' : '');
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

  // [data-privacy] bağlantıları: sayfa değiştirmeden pencere açar
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-privacy]');
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const wrap = document.getElementById('auth-consent-wrap');
    const needRead = !!a.closest('#auth-overlay') && wrap && !wrap.classList.contains('hidden');
    open({ require: needRead });
  }, true);

  // Onay kutusu: metin okunmadan işaretlenemez; tıklayınca önce metin açılır
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
    if (e.key === 'Escape' && el && !el.classList.contains('hidden')) close();
  });

  window.PlanovaPrivacy = { open, close, VERSION };
})();
