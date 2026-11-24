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

  function build() {
    let el = document.getElementById('pv-modal');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'pv-modal';
    el.className = 'pv-modal hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<div class="pv-card"><div class="pv-body">' + HTML +
      '</div><button type="button" class="btn btn-primary pv-close">Kapat</button></div>';
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.closest('.pv-close')) close();
    });
    document.body.appendChild(el);
    return el;
  }
  function open() { build().classList.remove('hidden'); }
  function close() { const el = document.getElementById('pv-modal'); if (el) el.classList.add('hidden'); }

  // [data-privacy] bağlantıları metni açar
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-privacy]');
    if (!a) return;
    e.preventDefault();
    open();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  window.PlanovaPrivacy = { open, close, VERSION };
})();
