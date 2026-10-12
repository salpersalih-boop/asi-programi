using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ASI.Api.Data;
using ASI.Api.Models;

namespace ASI.Api.Controllers
{
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
            item.Id = Guid.NewGuid().ToString("N")[..8];
            item.Created = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            db.Tasks.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] TaskItem item)
        {
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
            => Ok(await db.Studies.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StudyItem item)
        {
            item.Id = Guid.NewGuid().ToString("N")[..8];
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
            item.Id = Guid.NewGuid().ToString("N")[..8];
            item.Created = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
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

            // İlişkili log kayıtlarını da temizle
            var logs = await db.WorkoutLogs.Where(l => l.ExerciseId == id).ToListAsync();
            db.WorkoutLogs.RemoveRange(logs);

            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetDefault()
        {
            // Sadece eksik olanları tamamla veya tüm varsayılanları garanti et
            foreach (var def in DbInitializer.DefaultExercises)
            {
                if (!await db.Exercises.AnyAsync(e => e.Name == def.Name))
                {
                    db.Exercises.Add(new ExerciseItem
                    {
                        Id        = Guid.NewGuid().ToString("N")[..8],
                        Name      = def.Name,
                        Category  = def.Category,
                        Sets      = def.Sets,
                        Reps      = def.Reps,
                        Weight    = def.Weight,
                        SortOrder = def.SortOrder
                    });
                }
            }
            await db.SaveChangesAsync();
            return Ok(await db.Exercises.OrderBy(e => e.SortOrder).ToListAsync());
        }
    }

    // ═══════════════════════════════════
    //  GÜNLÜK ANTRENMAN KAYITLARI — /api/workouts
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/workouts")]
    public class WorkoutsController(AsiDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetByDate([FromQuery] string? date)
        {
            var targetDate = string.IsNullOrWhiteSpace(date)
                ? DateTime.Now.ToString("yyyy-MM-dd")
                : date.Trim();

            var logs = await db.WorkoutLogs
                .Where(l => l.Date == targetDate)
                .ToListAsync();

            return Ok(logs);
        }

        [HttpPost("toggle")]
        public async Task<IActionResult> Toggle([FromBody] WorkoutToggleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ExerciseId))
                return BadRequest("ExerciseId gereklidir.");

            var targetDate = string.IsNullOrWhiteSpace(dto.Date)
                ? DateTime.Now.ToString("yyyy-MM-dd")
                : dto.Date.Trim();

            var log = await db.WorkoutLogs.FirstOrDefaultAsync(l => l.Date == targetDate && l.ExerciseId == dto.ExerciseId);

            if (log != null)
            {
                log.Completed = !log.Completed;
                if (dto.Sets.HasValue)   log.Sets   = dto.Sets.Value;
                if (dto.Reps.HasValue)   log.Reps   = dto.Reps.Value;
                if (!string.IsNullOrEmpty(dto.Weight)) log.Weight = dto.Weight;
                log.CompletedAt = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                await db.SaveChangesAsync();
                return Ok(log);
            }
            else
            {
                var exercise = await db.Exercises.FindAsync(dto.ExerciseId);
                var newLog = new WorkoutLog
                {
                    Date         = targetDate,
                    ExerciseId   = dto.ExerciseId,
                    ExerciseName = exercise?.Name ?? "Egzersiz",
                    Category     = exercise?.Category ?? "gogus",
                    Completed    = true,
                    Sets         = dto.Sets ?? exercise?.Sets ?? 3,
                    Reps         = dto.Reps ?? exercise?.Reps ?? 10,
                    Weight       = dto.Weight ?? exercise?.Weight ?? "0 kg",
                    CompletedAt  = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                };

                db.WorkoutLogs.Add(newLog);
                await db.SaveChangesAsync();
                return Ok(newLog);
            }
        }

        [HttpPut("log/{id:int}")]
        public async Task<IActionResult> UpdateLog(int id, [FromBody] WorkoutLog update)
        {
            var existing = await db.WorkoutLogs.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Sets      = update.Sets;
            existing.Reps      = update.Reps;
            existing.Weight    = update.Weight;
            existing.Completed = update.Completed;
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
            long now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            item.Id          = Guid.NewGuid().ToString("N")[..8];
            item.Created     = now;
            item.Updated     = now;
            if (string.IsNullOrEmpty(item.Tag)) item.Tag = "general";
            if (item.Tag == "exam") item.IsExamTopic = true;
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
            existing.Tag         = item.Tag;
            existing.IsExamTopic = item.IsExamTopic || item.Tag == "exam";
            existing.Color       = item.Color;
            existing.Updated     = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
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
            item.Id      = Guid.NewGuid().ToString("N")[..8];
            item.Created = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
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
            => Ok(await db.Goals.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GoalItem item)
        {
            item.Id      = Guid.NewGuid().ToString("N")[..8];
            item.Created = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            db.Goals.Add(item);
            await db.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] GoalItem item)
        {
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

        [HttpPost("courses")]
        public async Task<IActionResult> SaveCourses([FromBody] List<AttendanceCourse> courses)
        {
            // Tümünü sil ve yeniden kaydet (basit batch replace)
            db.AttendanceCourses.RemoveRange(db.AttendanceCourses);
            foreach (var c in courses)
            {
                if (string.IsNullOrEmpty(c.Id))
                    c.Id = Guid.NewGuid().ToString("N")[..8];
            }
            db.AttendanceCourses.AddRange(courses);
            await db.SaveChangesAsync();
            return Ok(courses);
        }

        // ─── Haftalık Kayıtlar ───
        [HttpGet("records")]
        public async Task<IActionResult> GetRecords()
            => Ok(await db.AttendanceRecords.ToListAsync());

        [HttpPost("records")]
        public async Task<IActionResult> UpsertRecord([FromBody] AttendanceRecord record)
        {
            var existing = await db.AttendanceRecords
                .FirstOrDefaultAsync(r => r.CourseId == record.CourseId && r.Week == record.Week);

            if (string.IsNullOrEmpty(record.Status) || record.Status == "none")
            {
                if (existing != null)
                {
                    db.AttendanceRecords.Remove(existing);
                    await db.SaveChangesAsync();
                }
                return Ok();
            }

            if (existing == null)
            {
                db.AttendanceRecords.Add(record);
            }
            else
            {
                existing.Status = record.Status;
            }
            await db.SaveChangesAsync();
            return Ok();
        }
    }

    // ═══════════════════════════════════
    //  SIFIRLAMA — /api/reset
    // ═══════════════════════════════════
    [ApiController]
    [Route("api/reset")]
    public class ResetController(AsiDbContext db) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> ResetAll()
        {
            db.Tasks.RemoveRange(db.Tasks);
            db.Studies.RemoveRange(db.Studies);
            db.Notes.RemoveRange(db.Notes);
            db.QuickNotes.RemoveRange(db.QuickNotes);
            db.Goals.RemoveRange(db.Goals);
            db.AttendanceCourses.RemoveRange(db.AttendanceCourses);
            db.AttendanceRecords.RemoveRange(db.AttendanceRecords);
            await db.SaveChangesAsync();
            return Ok(new { success = true, message = "Tüm veritabanı temizlendi." });
        }
    }
}
