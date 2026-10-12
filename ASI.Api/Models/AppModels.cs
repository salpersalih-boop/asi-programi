using System.ComponentModel.DataAnnotations;

namespace ASI.Api.Models
{
    // ─── Görev (Kanban Kartı) ───
    public class TaskItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

        public string Text { get; set; } = string.Empty;

        public long Created { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }

    // ─── Hedef ───
    public class GoalItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
        public string Id { get; set; } = Guid.NewGuid().ToString("N")[..8];

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
}
