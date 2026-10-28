using Microsoft.EntityFrameworkCore;
using ASI.Api.Data;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5000");

// ─── Servisler ───
builder.Services.AddControllers();

// SQLite veritabanı — Live Server veya dosya izleyicilerin sayfayı yenilemesini engellemek için
// asi.db dosyasını workspace dışındaki AppData klasöründe saklıyoruz.
var appDataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ASI");
Directory.CreateDirectory(appDataDir);
var dbPath = Path.Combine(appDataDir, "asi.db");

// Eğer AppData'da henüz db yoksa ve yerel klasörde mevcutsa kopyala
var localDb = Path.Combine(Directory.GetCurrentDirectory(), "asi.db");
if (!File.Exists(dbPath) && File.Exists(localDb))
{
    File.Copy(localDb, dbPath, true);
}

builder.Services.AddDbContext<AsiDbContext>(opt =>
    opt.UseSqlite($"Data Source={dbPath}"));

// CORS — yalnızca bu bilgisayardaki sayfalar erişebilsin
// (localhost / 127.0.0.1 her port: node server.js, Live Server; "null": çift tıklanarak açılan file:// sayfası).
// Eskiden AllowAnyOrigin vardı: açık olan HERHANGİ bir web sitesi /api/reset çağırıp verileri silebilirdi.
builder.Services.AddCors(opt =>
    opt.AddDefaultPolicy(policy =>
        policy.SetIsOriginAllowed(origin =>
                  origin == "null" ||
                  (Uri.TryCreate(origin, UriKind.Absolute, out var uri) && uri.IsLoopback))
              .AllowAnyMethod()
              .AllowAnyHeader()));

var app = builder.Build();

// ─── Veritabanını otomatik oluştur / migrate et ───
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AsiDbContext>();
    DbInitializer.Initialize(ctx);
}

app.UseCors();
app.MapControllers();

// Kök URL'de durum bilgisi
app.MapGet("/", () => new
{
    app    = "ASİ ✨ API",
    status = "Çalışıyor 🟢",
    db     = $"SQLite ({dbPath})",
    time   = DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss")
});

app.Run();
