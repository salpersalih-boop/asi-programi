using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASI.Api.Data;
using ASI.Api.Models;

namespace ASI.Api.Controllers
{
    // Ortak sabitler / doğrulama yardımcıları
    internal static class Allowed
    {
        public static readonly HashSet<string> TaskStatuses     = ["todo", "doing", "done"];
        public static readonly HashSet<string> GoalPeriod       = ["daily", "weekly", "monthly", "yearly"];
        public static readonly HashSet<string> AttendanceStatus = ["present", "absent", "excused"];
        public static readonly HashSet<string> BookStatus       = ["to_read", "reading", "completed"];

        public static string Today() => DateTime.Now.ToString("yyyy-MM-dd");
    }

    // ═══════════════════════════════════
    //  GÖREVLER — /api/tasks
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/tasks")]
    public class TasksController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Tasks.OrderByDescending(t => t.Created).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem item)
        {
            if (!Allowed.TaskStatuses.Contains(item.Status)) return BadRequest("Geçersiz durum (todo | doing | done).");
            item.Id = IdGen.New();
            item.Created = IdGen.Now();
            db.Tasks.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] TaskItem item)
        {
            if (!Allowed.TaskStatuses.Contains(item.Status)) return BadRequest("Geçersiz durum (todo | doing | done).");
            var existing = await db.Tasks.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title  = item.Title;
            existing.Desc   = item.Desc;
            existing.Color  = item.Color;
            existing.Status = item.Status;
            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.Tasks.FindAsync(id);
            if (item == null) return NotFound();
            db.Tasks.Remove(item);
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  DERSLER — /api/studies
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/studies")]
    public class StudiesController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Studies.OrderBy(s => s.Date).ThenBy(s => s.Time).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StudyItem item)
        {
            item.Id = IdGen.New();
            db.Studies.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] StudyItem item)
        {
            var existing = await db.Studies.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name      = item.Name;
            existing.Date      = item.Date;
            existing.Time      = item.Time;
            existing.Completed = item.Completed;
            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.Studies.FindAsync(id);
            if (item == null) return NotFound();
            db.Studies.Remove(item);
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  SPOR PROGRAMI — /api/exercises
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/exercises")]
    public class ExercisesController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Exercises.OrderBy(e => e.SortOrder).ThenBy(e => e.Id).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExerciseItem item)
        {
            item.Id = IdGen.New();
            item.Created = IdGen.Now();
            if (item.SortOrder == 0)
            {
                var maxOrder = await db.Exercises.MaxAsync(e => (int?)e.SortOrder) ?? 0;
                item.SortOrder = maxOrder + 1;
            }
            db.Exercises.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] ExerciseItem item)
        {
            var existing = await db.Exercises.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name      = item.Name;
            existing.Category  = item.Category;
            existing.Sets      = item.Sets;
            existing.Reps      = item.Reps;
            existing.Weight    = item.Weight;
            existing.Notes     = item.Notes;
            if (item.SortOrder > 0) existing.SortOrder = item.SortOrder;

            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.Exercises.FindAsync(id);
            if (item == null) return NotFound();

            db.Exercises.Remove(item);
            // İlişkili antrenman kayıtlarını da temizle
            db.WorkoutLogs.RemoveRange(db.WorkoutLogs.Where(l => l.ExerciseId == id));

            await db.SaveChangesAsync();
            return Ok();
        }

        // Eksik varsayılan hareketleri geri ekler (kullanıcının eklediklerine dokunmaz)
        [HttpPost("reset")]
        public async Task<IActionResult> ResetDefault()
        {
            var existingNames = await db.Exercises.Select(e => e.Name).ToListAsync();
            foreach (var def in DbInitializer.CreateDefaultExercises())
            {
                if (existingNames.Contains(def.Name)) continue;
                def.Id = IdGen.New(); // varsayılan ID başka bir kayıtla çakışmasın
                db.Exercises.Add(def);
            }
            await db.SaveChangesAsync();
            return Ok(await db.Exercises.OrderBy(e => e.SortOrder).ToListAsync());
        }
    }

    // ═══════════════════════════════════
    //  GÜNLÜK ANTRENMAN KAYITLARI — /api/workouts
    // ═══════════════════════════════════
    public class WorkoutLogUpdateDto
    {
        public int? Sets { get; set; }
        public int? Reps { get; set; }
        public string? Weight { get; set; }
        public bool? Completed { get; set; }
    }

    [ApiController]
    [Route("api/workouts")]
    public class WorkoutsController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetByDate([FromQuery] string? date)
        {
            var targetDate = string.IsNullOrWhiteSpace(date) ? Allowed.Today() : date.Trim();
            return Ok(await db.WorkoutLogs.Where(l => l.Date == targetDate).ToListAsync());
        }

        [HttpPost("toggle")]
        public async Task<IActionResult> Toggle([FromBody] WorkoutToggleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ExerciseId))
                return BadRequest("ExerciseId gereklidir.");

            var targetDate = string.IsNullOrWhiteSpace(dto.Date) ? Allowed.Today() : dto.Date.Trim();

            var log = await db.WorkoutLogs.FirstOrDefaultAsync(l => l.Date == targetDate && l.ExerciseId == dto.ExerciseId);

            if (log != null)
            {
                log.Completed = !log.Completed;
                if (dto.Sets.HasValue) log.Sets = dto.Sets.Value;
                if (dto.Reps.HasValue) log.Reps = dto.Reps.Value;
                if (!string.IsNullOrEmpty(dto.Weight)) log.Weight = dto.Weight;
                if (log.Completed) log.CompletedAt = IdGen.Now();
                await db.SaveChangesAsync();
                return Ok(log);
            }

            var exercise = await db.Exercises.FindAsync(dto.ExerciseId);
            if (exercise == null) return NotFound("Egzersiz bulunamadı.");

            var newLog = new WorkoutLog
            {
                Date         = targetDate,
                ExerciseId   = dto.ExerciseId,
                ExerciseName = exercise.Name,
                Category     = exercise.Category,
                Completed    = true,
                Sets         = dto.Sets ?? exercise.Sets,
                Reps         = dto.Reps ?? exercise.Reps,
                Weight       = string.IsNullOrEmpty(dto.Weight) ? exercise.Weight : dto.Weight,
                CompletedAt  = IdGen.Now()
            };

            db.WorkoutLogs.Add(newLog);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Aynı anda gelen çift tıklama: kayıt az önce başka bir istekle oluşturuldu
                return Conflict("Bu egzersiz için bugünün kaydı zaten oluşturuldu, sayfayı yenileyin.");
            }
            return Ok(newLog);
        }

        // Kısmi güncelleme: yalnızca gönderilen alanlar değişir
        // (eskiden tam WorkoutLog bekleniyordu; Date/ExerciseId gönderilmezse 400 dönüyordu)
        [HttpPut("log/{id:int}")]
        public async Task<IActionResult> UpdateLog(int id, [FromBody] WorkoutLogUpdateDto update)
        {
            var existing = await db.WorkoutLogs.FindAsync(id);
            if (existing == null) return NotFound();

            if (update.Sets.HasValue)      existing.Sets      = update.Sets.Value;
            if (update.Reps.HasValue)      existing.Reps      = update.Reps.Value;
            if (update.Weight != null)     existing.Weight    = update.Weight;
            if (update.Completed.HasValue) existing.Completed = update.Completed.Value;
            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var history = await db.WorkoutLogs
                .GroupBy(l => l.Date)
                .Select(g => new
                {
                    Date      = g.Key,
                    Completed = g.Count(l => l.Completed),
                    Total     = g.Count()
                })
                .OrderByDescending(h => h.Date)
                .Take(30)
                .ToListAsync();

            return Ok(history);
        }
    }

    // ═══════════════════════════════════
    //  NOT DEFTERİ — /api/notes
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/notes")]
    public class NotesController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Notes.OrderByDescending(n => n.Updated).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NoteItem item)
        {
            long now = IdGen.Now();
            item.Id          = IdGen.New();
            item.Created     = now;
            item.Updated     = now;
            if (string.IsNullOrEmpty(item.Tag)) item.Tag = "general";
            item.IsExamTopic = item.IsExamTopic || item.Tag == "exam";
            db.Notes.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] NoteItem item)
        {
            var existing = await db.Notes.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title       = item.Title;
            existing.Content     = item.Content;
            existing.CourseId    = item.CourseId;
            existing.CourseName  = item.CourseName;
            existing.Tag         = string.IsNullOrEmpty(item.Tag) ? "general" : item.Tag;
            existing.IsExamTopic = item.IsExamTopic || existing.Tag == "exam";
            existing.Color       = item.Color;
            existing.Updated     = IdGen.Now();
            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.Notes.FindAsync(id);
            if (item == null) return NotFound();
            db.Notes.Remove(item);
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  HIZLI NOTLAR — /api/quicknotes
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/quicknotes")]
    public class QuickNotesController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.QuickNotes.OrderByDescending(q => q.Created).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuickNote item)
        {
            if (string.IsNullOrWhiteSpace(item.Text)) return BadRequest("Not metni boş olamaz.");
            item.Id      = IdGen.New();
            item.Created = IdGen.Now();
            db.QuickNotes.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.QuickNotes.FindAsync(id);
            if (item == null) return NotFound();
            db.QuickNotes.Remove(item);
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  HEDEFLER — /api/goals
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/goals")]
    public class GoalsController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Goals.OrderBy(g => g.Created).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GoalItem item)
        {
            if (!Allowed.GoalPeriod.Contains(item.Period)) return BadRequest("Geçersiz periyot.");
            item.Id      = IdGen.New();
            item.Created = IdGen.Now();
            db.Goals.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] GoalItem item)
        {
            if (!Allowed.GoalPeriod.Contains(item.Period)) return BadRequest("Geçersiz periyot.");
            var existing = await db.Goals.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title     = item.Title;
            existing.Period    = item.Period;
            existing.Done      = item.Done;
            existing.PeriodKey = item.PeriodKey;
            existing.DayKey    = item.DayKey;
            await db.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var item = await db.Goals.FindAsync(id);
            if (item == null) return NotFound();
            db.Goals.Remove(item);
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  DEVAMSIZLIK — /api/attendance/courses & records
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/attendance")]
    public class AttendanceController(AsiDbContext db) : ControllerBase
    {
        // ─── Dersler ───
        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
            => Ok(await db.AttendanceCourses.ToListAsync());

        // Ders listesini toplu olarak değiştirir.
        // Listeden çıkarılan derslerin haftalık kayıtları da silinir (yetim kayıt kalmaz).
        [HttpPost("courses")]
        public async Task<IActionResult> SaveCourses([FromBody] List<AttendanceCourse> courses)
        {
            foreach (var c in courses)
            {
                if (string.IsNullOrEmpty(c.Id)) c.Id = IdGen.New();
            }
            var keepIds = courses.Select(c => c.Id).ToList();

            await using var tx = await db.Database.BeginTransactionAsync();
            db.AttendanceCourses.RemoveRange(await db.AttendanceCourses.ToListAsync());
            db.AttendanceRecords.RemoveRange(
                await db.AttendanceRecords.Where(r => !keepIds.Contains(r.CourseId)).ToListAsync());
            await db.SaveChangesAsync();

            db.AttendanceCourses.AddRange(courses);
            await db.SaveChangesAsync();
            await tx.CommitAsync();
            return Ok(courses);
        }

        // ─── Haftalık Kayıtlar ───
        [HttpGet("records")]
        public async Task<IActionResult> GetRecords()
            => Ok(await db.AttendanceRecords.ToListAsync());

        [HttpPost("records")]
        public async Task<IActionResult> UpsertRecord([FromBody] AttendanceRecord record)
        {
            if (record.Week < 1 || record.Week > 52) return BadRequest("Hafta 1-52 arasında olmalıdır.");

            var existing = await db.AttendanceRecords
                .FirstOrDefaultAsync(r => r.CourseId == record.CourseId && r.Week == record.Week);

            // "none" veya boş durum = kaydı sil
            if (string.IsNullOrEmpty(record.Status) || record.Status == "none")
            {
                if (existing != null)
                {
                    db.AttendanceRecords.Remove(existing);
                    await db.SaveChangesAsync();
                }
                return Ok();
            }

            if (!Allowed.AttendanceStatus.Contains(record.Status))
                return BadRequest("Geçersiz durum (present | absent | excused).");

            if (existing != null)
            {
                existing.Status = record.Status;
                await db.SaveChangesAsync();
                return Ok();
            }

            record.Id = 0; // kimliği veritabanı versin
            db.AttendanceRecords.Add(record);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Aynı ders+hafta için eşzamanlı ikinci istek: benzersiz indeks ihlali → güncellemeye dön
                db.ChangeTracker.Clear();
                var row = await db.AttendanceRecords
                    .FirstAsync(r => r.CourseId == record.CourseId && r.Week == record.Week);
                row.Status = record.Status;
                await db.SaveChangesAsync();
            }
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  KİTAPLAR — /api/books
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/books")]
    public class BooksController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await db.Books.OrderByDescending(b => b.Updated).ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var book = await db.Books.FindAsync(id);
            return book == null ? NotFound() : Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookItem item)
        {
            if (!Allowed.BookStatus.Contains(item.Status)) return BadRequest("Geçersiz durum (to_read | reading | completed).");
            if (string.IsNullOrWhiteSpace(item.Id) || await db.Books.AnyAsync(b => b.Id == item.Id))
                item.Id = IdGen.New();
            item.CurrentPage = Math.Min(item.CurrentPage, item.TotalPages);
            item.Created = item.Updated = IdGen.Now();
            db.Books.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        // Kısmi güncelleme (ön yüzdeki { ...kitap, ...gövde } davranışıyla aynı)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] BookPatchDto p)
        {
            var b = await db.Books.FindAsync(id);
            if (b == null) return NotFound();
            if (p.Status != null && !Allowed.BookStatus.Contains(p.Status))
                return BadRequest("Geçersiz durum (to_read | reading | completed).");

            if (p.Title != null)       b.Title       = p.Title;
            if (p.Author != null)      b.Author      = p.Author;
            if (p.TotalPages != null)  b.TotalPages  = p.TotalPages.Value;
            if (p.CurrentPage != null) b.CurrentPage = p.CurrentPage.Value;
            if (p.Status != null)      b.Status      = p.Status;
            if (p.Category != null)    b.Category    = p.Category;
            if (p.Rating != null)      b.Rating      = p.Rating.Value;
            if (p.StartDate != null)   b.StartDate   = p.StartDate;
            if (p.FinishDate != null)  b.FinishDate  = p.FinishDate;
            if (p.Notes != null)       b.Notes       = p.Notes;
            if (p.CoverImage != null)  b.CoverImage  = p.CoverImage;
            if (p.CoverColor != null)  b.CoverColor  = p.CoverColor;

            b.CurrentPage = Math.Min(b.CurrentPage, b.TotalPages);
            b.Updated = IdGen.Now();
            await db.SaveChangesAsync();
            return Ok(b);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await db.Books.FindAsync(id);
            if (book == null) return NotFound();
            db.Books.Remove(book);
            // İlgili okuma oturumlarını da temizle
            db.ReadingSessions.RemoveRange(db.ReadingSessions.Where(s => s.BookId == id));
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  OKUMA — /api/reading/sessions & /api/reading/goals
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/reading")]
    public class ReadingController(AsiDbContext db) : ControllerBase
    {
        [HttpGet("sessions")]
        public async Task<IActionResult> GetSessions()
            => Ok(await db.ReadingSessions
                .OrderByDescending(s => s.Date)
                .ThenByDescending(s => s.Timestamp)
                .ToListAsync());

        // Oturumu kaydeder ve kitabın ilerlemesini / durumunu günceller
        [HttpPost("sessions")]
        public async Task<IActionResult> CreateSession([FromBody] ReadingSession s)
        {
            if (s.EndPage < s.StartPage) return BadRequest("Bitiş sayfası başlangıçtan küçük olamaz.");

            s.Id = IdGen.New();
            if (string.IsNullOrWhiteSpace(s.Date)) s.Date = Allowed.Today();
            if (s.PagesRead <= 0) s.PagesRead = s.EndPage - s.StartPage;
            s.Timestamp = IdGen.Now();

            var book = string.IsNullOrEmpty(s.BookId) ? null : await db.Books.FindAsync(s.BookId);
            if (book != null)
            {
                if (string.IsNullOrEmpty(s.BookTitle)) s.BookTitle = book.Title;
                if (s.EndPage > book.CurrentPage) book.CurrentPage = Math.Min(book.TotalPages, s.EndPage);

                if (book.CurrentPage >= book.TotalPages)
                {
                    book.Status = "completed";
                    if (string.IsNullOrEmpty(book.FinishDate)) book.FinishDate = s.Date;
                }
                else if (book.Status == "to_read")
                {
                    book.Status = "reading";
                    if (string.IsNullOrEmpty(book.StartDate)) book.StartDate = s.Date;
                }
                book.Updated = IdGen.Now();
            }

            db.ReadingSessions.Add(s);
            await db.SaveChangesAsync();
            return Ok(s);
        }

        [HttpDelete("sessions/{id}")]
        public async Task<IActionResult> DeleteSession(string id)
        {
            var s = await db.ReadingSessions.FindAsync(id);
            if (s == null) return NotFound();
            db.ReadingSessions.Remove(s);
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("goals")]
        public async Task<IActionResult> GetGoals()
            => Ok(await db.ReadingGoals.FindAsync(1) ?? new ReadingGoals());

        // Kısmi güncelleme: gönderilmeyen hedefler değişmez
        [HttpPost("goals")]
        public async Task<IActionResult> SaveGoals([FromBody] ReadingGoalsDto dto)
        {
            var goals = await db.ReadingGoals.FindAsync(1);
            if (goals == null)
            {
                goals = new ReadingGoals();
                db.ReadingGoals.Add(goals);
            }
            if (dto.DailyPages.HasValue)   goals.DailyPages   = dto.DailyPages.Value;
            if (dto.WeeklyPages.HasValue)  goals.WeeklyPages  = dto.WeeklyPages.Value;
            if (dto.DailyMinutes.HasValue) goals.DailyMinutes = dto.DailyMinutes.Value;
            await db.SaveChangesAsync();
            return Ok(goals);
        }
    }

    // ═══════════════════════════════════
    //  SIFIRLAMA — /api/reset
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/reset")]
    public class ResetController(AsiDbContext db) : ControllerBase
    {
        // Tüm kullanıcı verisini siler, spor programını varsayılana döndürür.
        // (Eskiden egzersizler, antrenman kayıtları ve kitaplar silinmiyordu.)
        [HttpPost]
        public async Task<IActionResult> ResetAll()
        {
            await using var tx = await db.Database.BeginTransactionAsync();

            await db.Tasks.ExecuteDeleteAsync();
            await db.Studies.ExecuteDeleteAsync();
            await db.Notes.ExecuteDeleteAsync();
            await db.QuickNotes.ExecuteDeleteAsync();
            await db.Goals.ExecuteDeleteAsync();
            await db.AttendanceRecords.ExecuteDeleteAsync();
            await db.AttendanceCourses.ExecuteDeleteAsync();
            await db.WorkoutLogs.ExecuteDeleteAsync();
            await db.Exercises.ExecuteDeleteAsync();
            await db.ReadingSessions.ExecuteDeleteAsync();
            await db.Books.ExecuteDeleteAsync();
            await db.ReadingGoals.ExecuteDeleteAsync();

            db.Exercises.AddRange(DbInitializer.CreateDefaultExercises());
            await db.SaveChangesAsync();
            await tx.CommitAsync();

            return Ok(new { success = true, message = "Tüm veritabanı temizlendi." });
        }
    }
}
