using Microsoft.EntityFrameworkCore;
using ASI.Api.Models;

namespace ASI.Api.Data
{
    public static class DbInitializer
    {
        public static readonly List<ExerciseItem> DefaultExercises = new()
        {
            // Göğüs
            new() { Id = "ex-ch-1", Name = "Bench Press",             Category = "gogus", Sets = 4, Reps = 10, Weight = "50 kg",           SortOrder = 1 },
            new() { Id = "ex-ch-2", Name = "Incline Dumbbell Press",  Category = "gogus", Sets = 3, Reps = 12, Weight = "18 kg",           SortOrder = 2 },
            new() { Id = "ex-ch-3", Name = "Chest Fly",               Category = "gogus", Sets = 3, Reps = 12, Weight = "14 kg",           SortOrder = 3 },
            new() { Id = "ex-ch-4", Name = "Push-up",                 Category = "gogus", Sets = 3, Reps = 15, Weight = "Vücut Ağırlığı", SortOrder = 4 },

            // Sırt
            new() { Id = "ex-ba-1", Name = "Lat Pulldown",            Category = "sirt",  Sets = 4, Reps = 10, Weight = "45 kg",           SortOrder = 5 },
            new() { Id = "ex-ba-2", Name = "Seated Row",              Category = "sirt",  Sets = 3, Reps = 12, Weight = "40 kg",           SortOrder = 6 },
            new() { Id = "ex-ba-3", Name = "Dumbbell Row",            Category = "sirt",  Sets = 3, Reps = 10, Weight = "20 kg",           SortOrder = 7 },

            // Omuz
            new() { Id = "ex-sh-1", Name = "Shoulder Press",          Category = "omuz",  Sets = 4, Reps = 10, Weight = "16 kg",           SortOrder = 8 },
            new() { Id = "ex-sh-2", Name = "Lateral Raise",           Category = "omuz",  Sets = 4, Reps = 12, Weight = "8 kg",            SortOrder = 9 },
            new() { Id = "ex-sh-3", Name = "Rear Delt Fly",           Category = "omuz",  Sets = 3, Reps = 15, Weight = "7 kg",            SortOrder = 10 },

            // Bacak
            new() { Id = "ex-le-1", Name = "Squat",                   Category = "bacak", Sets = 4, Reps = 10, Weight = "60 kg",           SortOrder = 11 },
            new() { Id = "ex-le-2", Name = "Leg Press",               Category = "bacak", Sets = 4, Reps = 12, Weight = "100 kg",          SortOrder = 12 },
            new() { Id = "ex-le-3", Name = "Leg Extension",           Category = "bacak", Sets = 3, Reps = 12, Weight = "35 kg",           SortOrder = 13 },
            new() { Id = "ex-le-4", Name = "Leg Curl",                Category = "bacak", Sets = 3, Reps = 12, Weight = "30 kg",           SortOrder = 14 },
            new() { Id = "ex-le-5", Name = "Calf Raise",              Category = "bacak", Sets = 4, Reps = 15, Weight = "40 kg",           SortOrder = 15 },

            // Kol
            new() { Id = "ex-ar-1", Name = "Biceps Curl",             Category = "kol",   Sets = 3, Reps = 12, Weight = "12 kg",           SortOrder = 16 },
            new() { Id = "ex-ar-2", Name = "Hammer Curl",             Category = "kol",   Sets = 3, Reps = 12, Weight = "12 kg",           SortOrder = 17 },
            new() { Id = "ex-ar-3", Name = "Triceps Pushdown",        Category = "kol",   Sets = 3, Reps = 12, Weight = "25 kg",           SortOrder = 18 },

            // Karın
            new() { Id = "ex-ab-1", Name = "Crunch",                  Category = "karin", Sets = 3, Reps = 20, Weight = "Vücut Ağırlığı", SortOrder = 19 },
            new() { Id = "ex-ab-2", Name = "Plank",                   Category = "karin", Sets = 3, Reps = 60, Weight = "60 sn",           SortOrder = 20 },
            new() { Id = "ex-ab-3", Name = "Leg Raise",               Category = "karin", Sets = 3, Reps = 15, Weight = "Vücut Ağırlığı", SortOrder = 21 }
        };

        public static void Initialize(AsiDbContext ctx)
        {
            ctx.Database.EnsureCreated();

            // SQLite Tablolarının varlığını garantiye al
            ctx.Database.ExecuteSqlRaw(@"
                CREATE TABLE IF NOT EXISTS Exercises (
                    Id TEXT PRIMARY KEY,
                    Name TEXT NOT NULL,
                    Category TEXT NOT NULL,
                    Sets INTEGER NOT NULL DEFAULT 3,
                    Reps INTEGER NOT NULL DEFAULT 10,
                    Weight TEXT DEFAULT '0 kg',
                    Notes TEXT DEFAULT '',
                    SortOrder INTEGER NOT NULL DEFAULT 0,
                    Created INTEGER NOT NULL DEFAULT 0
                );
            ");

            ctx.Database.ExecuteSqlRaw(@"
                CREATE TABLE IF NOT EXISTS WorkoutLogs (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Date TEXT NOT NULL,
                    ExerciseId TEXT NOT NULL,
                    ExerciseName TEXT NOT NULL,
                    Category TEXT NOT NULL,
                    Completed INTEGER NOT NULL DEFAULT 1,
                    Sets INTEGER NOT NULL DEFAULT 3,
                    Reps INTEGER NOT NULL DEFAULT 10,
                    Weight TEXT DEFAULT '0 kg',
                    CompletedAt INTEGER NOT NULL DEFAULT 0
                );
            ");

            ctx.Database.ExecuteSqlRaw(@"
                CREATE UNIQUE INDEX IF NOT EXISTS IX_WorkoutLogs_Date_ExerciseId ON WorkoutLogs (Date, ExerciseId);
            ");

            // Notes tablosu güncellemesi (önceden oluşturulmuşsa yeni sütunları ekle)
            try { ctx.Database.ExecuteSqlRaw("ALTER TABLE Notes ADD COLUMN CourseId TEXT DEFAULT ''"); } catch {}
            try { ctx.Database.ExecuteSqlRaw("ALTER TABLE Notes ADD COLUMN CourseName TEXT DEFAULT 'Genel'"); } catch {}
            try { ctx.Database.ExecuteSqlRaw("ALTER TABLE Notes ADD COLUMN Tag TEXT DEFAULT 'general'"); } catch {}
            try { ctx.Database.ExecuteSqlRaw("ALTER TABLE Notes ADD COLUMN IsExamTopic INTEGER DEFAULT 0"); } catch {}

            // Egzersizler tablosunu varsayılan 21 hareketle doldur
            if (!ctx.Exercises.Any())
            {
                ctx.Exercises.AddRange(DefaultExercises);
                ctx.SaveChanges();
            }
        }
    }
}
