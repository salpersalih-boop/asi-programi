/* Planova service worker — çevrimdışı açılış + bildirim tıklaması.
   Yeni sürüm yayınlarken VERSION'ı artırın (index.html'deki ?v= ile aynı tutun). */
const VERSION = 'planova-5.9';
const SHELL = [
  './',
  './index.html',
  './style.css?v=5.9',
  './auth.js?v=5.9',
  './account.js?v=5.9',
  './script.js?v=5.9',
  './firebase-config.js',
  './planova-icon.png',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
// Dışarıdan önbelleğe alınabilecek statik kaynaklar (Firebase SDK, yazı tipleri)
const CDN = /^https:\/\/(www\.gstatic\.com\/firebasejs\/|cdn\.jsdelivr\.net\/npm\/firebase@|fonts\.googleapis\.com\/|fonts\.gstatic\.com\/)/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Sayfa açılışı: önce internet (güncel sürüm), yoksa önbellek
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !CDN.test(req.url)) return; // API, Firestore, namaz vakti servisi: dokunma

  // Statik dosyalar: önbellekten hemen ver, arkada güncelle
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            // Yalnızca başarılı yanıtlar önbelleğe girer. Doğrulanamayan (opak) yanıt sadece yazı tipleri için.
            const okFont = res && res.type === 'opaque' && /^fonts\./.test(url.hostname);
            if (res && (res.ok || okFont)) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});

// Bildirime dokununca uygulamayı aç / öne getir
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const page = (event.notification.data && event.notification.data.page) || '';
  const target = new URL('./' + (page ? '?page=' + page : ''), self.location.href).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) {
          c.postMessage({ type: 'open-page', page });
          return c.focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(target) : null;
    })
  );
});
