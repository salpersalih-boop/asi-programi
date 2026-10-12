# ASİ ✨ — Kişisel Ajanda & Üretkenlik Uygulaması

ASİ, üniversite ders programı, görev yönetimi (Kanban), devamsızlık takibi, haftalık hedefler, not defteri ve Pomodoro zamanlayıcısını bir araya getiren modern bir kişisel ajanda uygulamasıdır.

Veriler **ASP.NET Core (C#)** Web API ve **SQLite (`asi.db`)** veritabanında kalıcı olarak saklanır.

---

## 🚀 Hızlı Başlangıç

### 1. C# Backend API'yi Başlatma
Terminal veya PowerShell açıp `ASI.Api` klasörüne gidin:

```bash
cd ASI.Api
dotnet run
```

> API **`http://localhost:5000`** adresinde çalışmaya başlar ve `asi.db` veritabanı ilk çalıştırmada otomatik oluşturulur.

### 2. Frontend'i Açma
Ana dizindeki `index.html` dosyasını tarayıcınızda çift tıklayarak veya VS Code Live Server ile açabilirsiniz.

---

## 🛠️ Proje Mimarisi

- **Frontend:**
  - `index.html` — Semantik, modern arayüz yapısı
  - `style.css` — Glassmorphism, karanlık tema ve özel animasyonlar
  - `script.js` — Modüler istemci mantığı ve REST API (`fetch`) entegrasyonu
- **Backend (`ASI.Api`):**
  - **.NET 9.0 / ASP.NET Core Web API**
  - **Entity Framework Core 9.0 + SQLite**
  - `Models/AppModels.cs` — Görevler, Dersler, Notlar, Hedefler ve Devamsızlık modelleri
  - `Data/AsiDbContext.cs` — Veritabanı context yapısı
  - `Controllers/AppControllers.cs` — RESTful CRUD API uç noktaları
  - `Program.cs` — CORS, SQLite ve Web API servis yapılandırması

---

## 📦 Özellikler

1. **Dashboard (Ana Sayfa):** Günlük özet, motivasyon sözü, Pomodoro göstergesi ve tamamlanan görev istatistikleri.
2. **Görev Panosu (Kanban):** Sürükle-bırak desteği ile Yapılacaklar, Devam Edenler ve Tamamlananlar sütunları.
3. **Ders Programı:** Günlük ve haftalık ders takvimi.
4. **Devamsızlık Takibi:** 14 haftalık üniversite ders yoklama matrisi ve kritik devamsızlık uyarısı.
5. **Haftalık Hedefler:** Günlük hedefleri tamamlama ve haftalık ilerleme yüzdesi.
6. **Not Defterim:** Zengin not oluşturma, düzenleme ve otomatik kaydetme.
7. **Pomodoro Odaklanma:** 25 dk çalışma / 5 dk mola zamanlayıcısı.
8. **Yedekleme & Sıfırlama:** JSON dışa/içe aktarma ve tek tıkla veritabanı sıfırlama.
