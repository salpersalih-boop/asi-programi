/* ═══════════════════════════════════════════════════════
   Planova — Firebase Yapılandırması v2
   ─────────────────────────────────────────────────────
   ÖNEMLİ: Bu proje ES-module derleyicisi (Vite/Webpack) olmadan
   doğrudan tarayıcıda çalışır. Bu nedenle:
   • "import { initializeApp } from 'firebase/app'" KULLANILAMAZ
   • Bunun yerine CDN'den yüklenen compat SDK kullanılır
   • Bu dosya sadece yapılandırmayı global değişkene atar;
     gerçek başlatma auth.js içinde yapılır (tek seferlik).
   ═══════════════════════════════════════════════════════ */

// Eğer daha önce başlatılmışsa tekrar başlatma (çift init'i önler)
if (typeof window.PLANOVA_FIREBASE_CONFIG === 'undefined') {
  window.PLANOVA_FIREBASE_CONFIG = {
    apiKey:            'AIzaSyARUrHT1qQRZG13l5attCpxf2_i0yjbuVM',
    authDomain:        'planova-84ac2.firebaseapp.com',
    projectId:         'planova-84ac2',
    storageBucket:     'planova-84ac2.firebasestorage.app',
    messagingSenderId: '465157024132',
    appId:             '1:465157024132:web:c2b763d27dfeaad8ed15d1',
    measurementId:     'G-BFGJVCWZ39'
  };
}
