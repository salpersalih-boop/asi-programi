# Planova (ASİ) ✨ — Kişisel Ajanda & Üretkenlik Uygulaması

Planova; görev yönetimi (Kanban), spor programı, devamsızlık takibi, kitap/okuma takibi, haftalık hedefler, not defteri, Pomodoro ve namaz vakitlerini bir araya getiren kişisel bir ajanda uygulamasıdır.

---

## 🧭 Veriler nerede saklanıyor?

| Katman | Durum | Açıklama |
|---|---|---|
| **Tarayıcı (localStorage)** | ✅ Kullanılıyor | Tüm veriler önce tarayıcıda tutulur (`script.js` içindeki `apiFetch` yerel bir sahte API'dir). İnternet olmadan da çalışır. |
| **Firebase (Auth + Firestore)** | ✅ Kullanılıyor | Giriş yapıldığında `auth.js` veriyi `users/{uid}/data` altına senkronize eder; başka cihazlarda aynı veriyi görürsünüz. |
| **ASP.NET Core API + SQLite (`ASI.Api`)** | ⏸️ İsteğe bağlı | Ön yüz şu an bu API'yi **kullanmıyor**. Uç noktaları ön yüzün yerel API'siyle aynı yapıdadır; ileride sunucuya geçmek için hazır tutulur. |

---

## 🚀 Çalıştırma

### Ön yüz
```bash
node server.js
```
→ http://localhost:3000

Telefondan aynı Wi-Fi üzerinden test etmek için (yalnızca güvendiğiniz ağda):
```bash
# PowerShell
$env:HOST="0.0.0.0"; node server.js
```
Ardından telefonda `http://<bilgisayarın-IP-adresi>:3000` adresini açın.

> Firebase girişinin çalışması için kullandığınız adres (ör. `localhost`) Firebase Console › Authentication › Settings › **Authorized domains** listesinde olmalıdır.

### C# API (isteğe bağlı)
```bash
cd ASI.Api
dotnet run
```
→ http://localhost:5000 — veritabanı `%LOCALAPPDATA%\ASI\asi.db` konumunda otomatik oluşturulur.
Uç noktaları denemek için `ASI.Api/ASI.Api.http` dosyasını Visual Studio / VS Code (REST Client) ile açabilirsiniz.

---

## 🛠️ Proje Yapısı

- `index.html` — Arayüz
- `style.css` — Tema, karanlık mod, mobil uyum
- `script.js` — Uygulama mantığı ve yerel (localStorage) API
- `auth.js` — Firebase giriş / kayıt ve bulut senkronizasyonu
- `firebase-config.js` — Firebase proje ayarları
- `server.js` — Yerel geliştirme sunucusu (yalnızca statik dosya)
- `ASI.Api/` — .NET 9 Web API + EF Core 9 + SQLite
  - `Models/AppModels.cs` — Görev, ders, egzersiz, not, hedef, devamsızlık, **kitap, okuma oturumu, okuma hedefi**
  - `Data/AsiDbContext.cs`, `Data/DbInitializer.cs` — Veritabanı ve tablo oluşturma
  - `Controllers/AppControllers.cs` — REST uç noktaları

### API uç noktaları
`/api/tasks`, `/api/studies`, `/api/exercises` (+ `/reset`), `/api/workouts` (+ `/toggle`, `/history`, `/log/{id}`),
`/api/notes`, `/api/quicknotes`, `/api/goals`, `/api/attendance/courses`, `/api/attendance/records`,
`/api/books`, `/api/reading/sessions`, `/api/reading/goals`, `/api/reset`

---

## 🔒 Güvenlik notları

- `firebase-config.js` içindeki API anahtarının herkese açık olması normaldir; asıl koruma **Firestore güvenlik kurallarıdır**. Kurallar en az şöyle olmalıdır:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```
- C# API'nin kimlik doğrulaması yoktur; yalnızca kendi bilgisayarınızda çalıştırın (CORS yalnızca localhost'a izin verir).
