using System.ComponentModel.DataAnnotations;

namespace ASI.Api.Models
{
    // ─── Kimlik üretici ───
    // Eskiden GUID'in ilk 8 karakteri kullanılıyordu (32 bit → kayıt sayısı arttıkça çakışma riski).
    // Artık tam 32 karakterlik GUID kullanılıyor; eski 8 karakterli ID'ler de çalışmaya devam eder.
    public static class IdGen
    {
        public static string New() => Guid.NewGuid().ToString("N");
        public static long Now() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Görev (Kanban Kartı) ───
    public class TaskItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Desc { get; set; }

        public string Color { get; set; } = "#7c5cfc";

        // "todo" | "doing" | "done"
        public string Status { get; set; } = "todo";

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Ders Programı ───
    public class StudyItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Name { get; set; } = string.Empty;

        // YYYY-MM-DD
        public string Date { get; set; } = string.Empty;

        // HH:mm
        public string Time { get; set; } = string.Empty;

        public bool Completed { get; set; } = false;
    }

    // ─── Egzersiz / Spor Hareketi Tanımı ───
    public class ExerciseItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Name { get; set; } = string.Empty;

        // "gogus" | "sirt" | "omuz" | "bacak" | "kol" | "karin" | "diger"
        [Required]
        public string Category { get; set; } = "gogus";

        public int Sets { get; set; } = 3;

        public int Reps { get; set; } = 10;

        public string Weight { get; set; } = "0 kg";

        public string Notes { get; set; } = string.Empty;

        public int SortOrder { get; set; } = 0;

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Günlük Egzersiz Tamamlama Kaydı ───
    public class WorkoutLog
    {
        [Key]
        public int Id { get; set; }

        // YYYY-MM-DD
        [Required]
        public string Date { get; set; } = string.Empty;

        [Required]
        public string ExerciseId { get; set; } = string.Empty;

        public string ExerciseName { get; set; } = string.Empty;

        public string Category { get; set; } = "gogus";

        public bool Completed { get; set; } = true;

        public int Sets { get; set; } = 3;

        public int Reps { get; set; } = 10;

        public string Weight { get; set; } = "0 kg";

        public long CompletedAt { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    public class WorkoutToggleDto
    {
        public string Date { get; set; } = string.Empty;
        public string ExerciseId { get; set; } = string.Empty;
        public int? Sets { get; set; }
        public int? Reps { get; set; }
        public string? Weight { get; set; }
    }

    // ─── Not Defteri ───
    public class NoteItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        // Ders Bilgisi
        public string CourseId { get; set; } = string.Empty;
        public string CourseName { get; set; } = "Genel";

        // Etiket / İşaret: "exam" (Sınavda Çıkabilir), "important" (Önemli), "review" (Tekrar Çalış), "general" (Genel)
        public string Tag { get; set; } = "general";

        public bool IsExamTopic { get; set; } = false;

        public string Color { get; set; } = "#f59e0b";

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        public long Updated { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Hızlı Not ───
    public class QuickNote
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        public string Text { get; set; } = string.Empty;

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Hedef ───
    public class GoalItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Title { get; set; } = string.Empty;

        // "daily" | "weekly" | "monthly" | "yearly"
        public string Period { get; set; } = "weekly";

        public bool Done { get; set; } = false;

        // Hangi haftaya ait (YYYY-MM-DD)
        public string PeriodKey { get; set; } = string.Empty;

        // Hangi güne ait (YYYY-MM-DD)
        public string DayKey { get; set; } = string.Empty;

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Devamsızlık — Ders Tanımı ───
    public class AttendanceCourse
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Day { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;
        public int Hours { get; set; } = 2;
        public int MaxWeeks { get; set; } = 4;
    }

    // ─── Devamsızlık — Haftalık Kayıt ───
    public class AttendanceRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CourseId { get; set; } = string.Empty;

        public int Week { get; set; }

        // "present" | "absent" | "excused"
        public string Status { get; set; } = "present";
    }

    // ─── Kitap ───
    public class BookItem
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        [Required]
        public string Title { get; set; } = "İsimsiz Kitap";

        public string Author { get; set; } = "Bilinmeyen Yazar";

        [Range(1, 100000)]
        public int TotalPages { get; set; } = 100;

        [Range(0, 100000)]
        public int CurrentPage { get; set; } = 0;

        // "to_read" | "reading" | "completed"
        public string Status { get; set; } = "to_read";

        public string Category { get; set; } = string.Empty;

        [Range(0, 5)]
        public int Rating { get; set; } = 0;

        public string StartDate { get; set; } = string.Empty;   // YYYY-MM-DD
        public string FinishDate { get; set; } = string.Empty;  // YYYY-MM-DD
        public string Notes { get; set; } = string.Empty;

        // base64 data URL (küçültülmüş kapak görseli)
        public string CoverImage { get; set; } = string.Empty;
        public string CoverColor { get; set; } = "#0284C7";

        public long Created { get; set; } = IdGen.Now();
        public long Updated { get; set; } = IdGen.Now();
    }

    // Kitap kısmi güncellemesi: yalnızca gönderilen alanlar değişir
    public class BookPatchDto
    {
        public string? Title { get; set; }
        public string? Author { get; set; }
        [Range(1, 100000)] public int? TotalPages { get; set; }
        [Range(0, 100000)] public int? CurrentPage { get; set; }
        public string? Status { get; set; }
        public string? Category { get; set; }
        [Range(0, 5)] public int? Rating { get; set; }
        public string? StartDate { get; set; }
        public string? FinishDate { get; set; }
        public string? Notes { get; set; }
        public string? CoverImage { get; set; }
        public string? CoverColor { get; set; }
    }

    // ─── Okuma Oturumu ───
    public class ReadingSession
    {
        [Key]
        public string Id { get; set; } = IdGen.New();

        public string BookId { get; set; } = string.Empty;
        public string BookTitle { get; set; } = string.Empty;

        public string Date { get; set; } = string.Empty; // YYYY-MM-DD

        [Range(0, 100000)] public int StartPage { get; set; }
        [Range(0, 100000)] public int EndPage { get; set; }
        [Range(0, 100000)] public int PagesRead { get; set; }

        // dakika
        [Range(0, 1440)] public int Duration { get; set; } = 20;

        public string Notes { get; set; } = string.Empty;

        public long Timestamp { get; set; } = IdGen.Now();
    }

    // ─── Okuma Hedefleri (tek satır, Id = 1) ───
    public class ReadingGoals
    {
        [Key]
        public int Id { get; set; } = 1;

        public int DailyPages { get; set; } = 20;
        public int WeeklyPages { get; set; } = 150;
        public int DailyMinutes { get; set; } = 30;
    }

    public class ReadingGoalsDto
    {
        [Range(0, 10000)] public int? DailyPages { get; set; }
        [Range(0, 100000)] public int? WeeklyPages { get; set; }
        [Range(0, 1440)] public int? DailyMinutes { get; set; }
    }
}
