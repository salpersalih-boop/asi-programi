using Microsoft.EntityFrameworkCore;
using ASI.Api.Models;

namespace ASI.Api.Data
{
    public class AsiDbContext : DbContext
    {
        public AsiDbContext(DbContextOptions<AsiDbContext> options) : base(options) { }

        public DbSet<TaskItem>          Tasks               { get; set; }
        public DbSet<StudyItem>         Studies             { get; set; }
        public DbSet<NoteItem>          Notes               { get; set; }
        public DbSet<QuickNote>         QuickNotes          { get; set; }
        public DbSet<GoalItem>          Goals               { get; set; }
        public DbSet<AttendanceCourse>  AttendanceCourses   { get; set; }
        public DbSet<AttendanceRecord>  AttendanceRecords   { get; set; }
        public DbSet<ExerciseItem>      Exercises           { get; set; }
        public DbSet<WorkoutLog>        WorkoutLogs         { get; set; }
        public DbSet<BookItem>          Books               { get; set; }
        public DbSet<ReadingSession>    ReadingSessions     { get; set; }
        public DbSet<ReadingGoals>      ReadingGoals        { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            // AttendanceRecord için bileşik unique indeks
            mb.Entity<AttendanceRecord>()
              .HasIndex(r => new { r.CourseId, r.Week })
              .IsUnique();

            // WorkoutLog için Date + ExerciseId bileşik unique indeks
            mb.Entity<WorkoutLog>()
              .HasIndex(l => new { l.Date, l.ExerciseId })
              .IsUnique();

            // Okuma hedefleri tek satırdır (Id = 1); otomatik artan kimlik kullanılmaz
            mb.Entity<ReadingGoals>()
              .Property(g => g.Id)
              .ValueGeneratedNever();

            mb.Entity<ReadingSession>()
              .HasIndex(s => s.BookId);
        }
    }
}
