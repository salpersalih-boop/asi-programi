/* ═══════════════════════════════════════════════════════
   ASİ ✨ — Kişisel Ajanda ve Üretkenlik Uygulaması
   Ana JavaScript Dosyası
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Global Sayfa Yenilenmesini Engelleme ───
  // Hiçbir buton, link (#) veya form tarayıcının sayfayı yenilemesine neden olamaz
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#"], a:not([href])');
    if (a) {
      e.preventDefault();
    }
  }, false);

  document.addEventListener('submit', (e) => {
    e.preventDefault();
  }, false);

  // ─── Yerleşik Veri Setleri (İlk Açılış İçin) ───
  const DEFAULT_EXERCISES = [
    // Göğüs
    { id: 'ex-ch-1', name: 'Bench Press', category: 'gogus', sets: 4, reps: 10, weight: '50 kg', sortOrder: 1 },
    { id: 'ex-ch-2', name: 'Incline Dumbbell Press', category: 'gogus', sets: 3, reps: 12, weight: '18 kg', sortOrder: 2 },
    { id: 'ex-ch-3', name: 'Chest Fly', category: 'gogus', sets: 3, reps: 12, weight: '14 kg', sortOrder: 3 },
    { id: 'ex-ch-4', name: 'Push-up', category: 'gogus', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 4 },

    // Sırt
    { id: 'ex-ba-1', name: 'Lat Pulldown', category: 'sirt', sets: 4, reps: 10, weight: '45 kg', sortOrder: 5 },
    { id: 'ex-ba-2', name: 'Seated Row', category: 'sirt', sets: 3, reps: 12, weight: '40 kg', sortOrder: 6 },
    { id: 'ex-ba-3', name: 'Dumbbell Row', category: 'sirt', sets: 3, reps: 10, weight: '20 kg', sortOrder: 7 },

    // Omuz
    { id: 'ex-sh-1', name: 'Shoulder Press', category: 'omuz', sets: 4, reps: 10, weight: '16 kg', sortOrder: 8 },
    { id: 'ex-sh-2', name: 'Lateral Raise', category: 'omuz', sets: 4, reps: 12, weight: '8 kg', sortOrder: 9 },
    { id: 'ex-sh-3', name: 'Rear Delt Fly', category: 'omuz', sets: 3, reps: 15, weight: '7 kg', sortOrder: 10 },

    // Bacak
    { id: 'ex-le-1', name: 'Squat', category: 'bacak', sets: 4, reps: 10, weight: '60 kg', sortOrder: 11 },
    { id: 'ex-le-2', name: 'Leg Press', category: 'bacak', sets: 4, reps: 12, weight: '100 kg', sortOrder: 12 },
    { id: 'ex-le-3', name: 'Leg Extension', category: 'bacak', sets: 3, reps: 12, weight: '35 kg', sortOrder: 13 },
    { id: 'ex-le-4', name: 'Leg Curl', category: 'bacak', sets: 3, reps: 12, weight: '30 kg', sortOrder: 14 },
    { id: 'ex-le-5', name: 'Calf Raise', category: 'bacak', sets: 4, reps: 15, weight: '40 kg', sortOrder: 15 },

    // Kol
    { id: 'ex-ar-1', name: 'Biceps Curl', category: 'kol', sets: 3, reps: 12, weight: '12 kg', sortOrder: 16 },
    { id: 'ex-ar-2', name: 'Hammer Curl', category: 'kol', sets: 3, reps: 12, weight: '12 kg', sortOrder: 17 },
    { id: 'ex-ar-3', name: 'Triceps Pushdown', category: 'kol', sets: 3, reps: 12, weight: '25 kg', sortOrder: 18 },

    // Karın
    { id: 'ex-ab-1', name: 'Crunch', category: 'karin', sets: 3, reps: 20, weight: 'Vücut Ağırlığı', sortOrder: 19 },
    { id: 'ex-ab-2', name: 'Plank', category: 'karin', sets: 3, reps: 60, weight: '60 sn', sortOrder: 20 },
    { id: 'ex-ab-3', name: 'Leg Raise', category: 'karin', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 21 },
  ];

  const DEFAULT_ATT_COURSES = [
    { id: 'att-1', code: 'YZL 312', name: 'Veri Madenciliği', day: 'Pazartesi', time: '10:00 - 12:00', hours: 2, maxWeeks: 4 },
    { id: 'att-2', code: 'YZL 455', name: 'Makine Öğrenmesi', day: 'Salı', time: '15:00 - 17:00', hours: 2, maxWeeks: 4 },
    { id: 'att-3', code: 'YZL 225[BİL 205]', name: 'Veri Yapıları ve Algoritmalar (Lab)', day: 'Çarşamba', time: '09:00 - 11:00', hours: 2, maxWeeks: 3 },
    { id: 'att-4', code: 'MHK 301', name: 'Mühendisler İçin Hukuk Kavramları', day: 'Çarşamba', time: '12:00 - 13:00', hours: 1, maxWeeks: 4 },
    { id: 'att-5', code: 'YZL 315[BİL 303]', name: 'İşletim Sistemleri Tasarımı ve İnşası', day: 'Çarşamba', time: '13:00 - 16:00', hours: 3, maxWeeks: 4 },
    { id: 'att-6', code: 'YZL 330[YZL 320]', name: 'Yazılım Proje Yönetimi', day: 'Perşembe', time: '09:00 - 12:00', hours: 3, maxWeeks: 4 },
    { id: 'att-7', code: 'YZL 356', name: 'Algoritmaların Analizi', day: 'Perşembe', time: '15:00 - 18:00', hours: 3, maxWeeks: 4 },
  ];

  const DEFAULT_TASKS = [
    { id: 't-1', title: 'Veri Madenciliği vize konularını tekrar et', desc: '1-4. haftalar arasındaki slaytları incele', color: '#06B6D4', status: 'todo', created: Date.now() - 3600000 },
    { id: 't-2', title: 'Spor Programı - İlk gün antrenmanı', desc: 'Göğüs ve Kol hareketlerini tamamla', color: '#10B981', status: 'doing', created: Date.now() - 7200000 },
    { id: 't-3', title: 'Haftalık ders programı ve hedefleri belirle', desc: 'Devamsızlık durumunu incele', color: '#F97316', status: 'done', created: Date.now() - 10800000 },
  ];

  const DEFAULT_NOTES = [
    { id: 'n-1', title: 'Veri Madenciliği — Sınavda Çıkacak Konular', content: 'K-Means kümeleme, Karar Ağaçları formülleri ve Entropy hesaplama sınavda kesin çıkacak!', courseId: 'att-1', courseName: 'Veri Madenciliği', tag: 'exam', isExamTopic: true, color: '#FEF2F2', created: Date.now() - 3600000, updated: Date.now() - 3600000 }
  ];

  const DEFAULT_QUICK_NOTES = [
    { id: 'qn-1', text: 'Kütüphaneden Algoritmalar kitabını almayı unutma! 📚', created: Date.now() }
  ];

  // Kullanıcının kendi kitaplarını ve oturumlarını sıfırdan ekleyebilmesi için boş liste
  const DEFAULT_BOOKS = [];
  const DEFAULT_READING_SESSIONS = [];

  const DEFAULT_READING_GOALS = {
    dailyPages: 20,
    weeklyPages: 150,
    dailyMinutes: 30
  };

  const DEFAULT_WORKOUT_SETTINGS = {
    normalRestSec: 120, // 2 dk
    lastRestSec: 300   // 5 dk
  };

  // ─── Güvenli LocalStorage Yardımcısı ───
  const Storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : fallback;
      } catch (e) {
        console.warn('Storage okuma hatası:', key, e);
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.error('Storage yazma hatası:', key, e);
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    }
  };

  // ─── Yerel Depolama (localStorage) Tabanlı Mock API Motoru ───
  // Hiçbir harici backend veya sunucu (localhost:5000) bağlantısına ihtiyaç duymaz.
  // Tüm işlemler tamamen tarayıcı hafızasında kalıcı, çevrimdışı ve anlık yürütülür.
  async function apiFetch(path, method = 'GET', body = null) {
    await Promise.resolve(); // Asenkron API uyumluluğu

    try {
      const cleanPath = path.split('?')[0].replace(/\/+$/, '');
      const queryString = path.includes('?') ? path.split('?')[1] : '';
      const params = new URLSearchParams(queryString);

      // ─── /tasks ───
      if (cleanPath === '/tasks') {
        let tasks = Storage.get('asi_tasks', null);
        if (tasks === null) {
          tasks = [...DEFAULT_TASKS];
          Storage.set('asi_tasks', tasks);
        }

        if (method === 'GET') {
          return [...tasks].sort((a, b) => (b.created || 0) - (a.created || 0));
        }

        if (method === 'POST') {
          const newTask = {
            id: body?.id || 't-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            title: body?.title || '',
            desc: body?.desc || '',
            color: body?.color || '#7c5cfc',
            status: body?.status || 'todo',
            created: body?.created || Date.now()
          };
          tasks.unshift(newTask);
          Storage.set('asi_tasks', tasks);
          return newTask;
        }
      }

      if (cleanPath.startsWith('/tasks/')) {
        const id = cleanPath.replace('/tasks/', '');
        let tasks = Storage.get('asi_tasks', DEFAULT_TASKS);

        if (method === 'PUT') {
          const idx = tasks.findIndex(t => t.id === id);
          if (idx !== -1) {
            tasks[idx] = { ...tasks[idx], ...body, id };
          } else {
            tasks.unshift({ ...body, id });
          }
          Storage.set('asi_tasks', tasks);
          return tasks.find(t => t.id === id);
        }

        if (method === 'DELETE') {
          tasks = tasks.filter(t => t.id !== id);
          Storage.set('asi_tasks', tasks);
          return true;
        }
      }

      // ─── /exercises ───
      if (cleanPath === '/exercises') {
        let exercises = Storage.get('asi_exercises', null);
        if (!exercises || exercises.length === 0) {
          exercises = JSON.parse(JSON.stringify(DEFAULT_EXERCISES));
          Storage.set('asi_exercises', exercises);
        }

        if (method === 'GET') {
          return [...exercises].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        }

        if (method === 'POST') {
          const newEx = {
            id: body?.id || 'ex-custom-' + Date.now().toString(36),
            name: body?.name || '',
            category: body?.category || 'gogus',
            sets: body?.sets || 3,
            reps: body?.reps || 10,
            weight: body?.weight || 'Vücut Ağırlığı',
            notes: body?.notes || '',
            sortOrder: body?.sortOrder || exercises.length + 1,
            created: Date.now()
          };
          exercises.push(newEx);
          Storage.set('asi_exercises', exercises);
          return newEx;
        }
      }

      if (cleanPath === '/exercises/reset') {
        const resetExercises = JSON.parse(JSON.stringify(DEFAULT_EXERCISES));
        Storage.set('asi_exercises', resetExercises);
        return resetExercises;
      }

      if (cleanPath.startsWith('/exercises/')) {
        const id = cleanPath.replace('/exercises/', '');
        let exercises = Storage.get('asi_exercises', DEFAULT_EXERCISES);

        if (method === 'PUT') {
          const idx = exercises.findIndex(e => e.id === id);
          if (idx !== -1) {
            exercises[idx] = { ...exercises[idx], ...body, id };
          }
          Storage.set('asi_exercises', exercises);
          return exercises.find(e => e.id === id);
        }

        if (method === 'DELETE') {
          exercises = exercises.filter(e => e.id !== id);
          Storage.set('asi_exercises', exercises);
          return true;
        }
      }

      // ─── /workouts ───
      if (cleanPath === '/workouts') {
        let logs = Storage.get('asi_workouts', []);
        const targetDate = params.get('date') || formatDateShort(new Date());

        if (method === 'GET') {
          return logs.filter(l => l.date === targetDate);
        }
      }

      if (cleanPath === '/workouts/toggle') {
        let logs = Storage.get('asi_workouts', []);
        const targetDate = body?.date || formatDateShort(new Date());
        const exId = body?.exerciseId;

        const existing = logs.find(l => l.date === targetDate && l.exerciseId === exId);

        if (existing) {
          if (typeof body?.completed === 'boolean') {
            existing.completed = body.completed;
            if (!body.completed) existing.completedSets = [];
            else if (!existing.completedSets || existing.completedSets.length === 0) {
              const sCount = existing.sets || 3;
              existing.completedSets = Array.from({ length: sCount }, (_, i) => i + 1);
            }
          } else if (Array.isArray(body?.completedSets)) {
            existing.completedSets = body.completedSets;
            const targetSets = body?.sets || existing.sets || 3;
            existing.completed = existing.completedSets.length >= targetSets;
          } else {
            existing.completed = !existing.completed;
          }

          if (body?.sets) existing.sets = body.sets;
          if (body?.reps) existing.reps = body.reps;
          if (body?.weight) existing.weight = body.weight;
          existing.completedAt = Date.now();
          Storage.set('asi_workouts', logs);

          // Antrenman geçmişine kaydet
          if (existing.completedSets && existing.completedSets.length > 0) {
            let history = Storage.get('asi_workout_history', []);
            const histIdx = history.findIndex(h => h.date === targetDate && h.exerciseId === exId);
            const histItem = {
              id: 'wh-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 3),
              date: targetDate,
              exerciseId: exId,
              exerciseName: existing.exerciseName,
              completedSets: existing.completedSets,
              sets: existing.sets,
              reps: existing.reps,
              weight: existing.weight,
              completed: existing.completed,
              timestamp: Date.now()
            };
            if (histIdx >= 0) history[histIdx] = histItem;
            else history.unshift(histItem);
            Storage.set('asi_workout_history', history);
          }

          return existing;
        } else {
          const exercises = Storage.get('asi_exercises', DEFAULT_EXERCISES);
          const ex = exercises.find(e => e.id === exId);
          const targetSets = body?.sets ?? (ex ? ex.sets : 3);
          const completedSets = Array.isArray(body?.completedSets)
            ? body.completedSets
            : (body?.completed ? Array.from({ length: targetSets }, (_, i) => i + 1) : []);
          const isComp = typeof body?.completed === 'boolean'
            ? body.completed
            : (completedSets.length >= targetSets);

          const newLog = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            date: targetDate,
            exerciseId: exId,
            exerciseName: ex ? ex.name : 'Egzersiz',
            category: ex ? ex.category : 'gogus',
            completed: isComp,
            completedSets: completedSets,
            sets: targetSets,
            reps: body?.reps ?? (ex ? ex.reps : 10),
            weight: body?.weight ?? (ex ? ex.weight : 'Vücut Ağırlığı'),
            completedAt: Date.now()
          };
          logs.push(newLog);
          Storage.set('asi_workouts', logs);

          if (completedSets.length > 0) {
            let history = Storage.get('asi_workout_history', []);
            history.unshift({
              id: 'wh-' + Date.now().toString(36),
              date: targetDate,
              exerciseId: exId,
              exerciseName: newLog.exerciseName,
              completedSets: completedSets,
              sets: newLog.sets,
              reps: newLog.reps,
              weight: newLog.weight,
              completed: newLog.completed,
              timestamp: Date.now()
            });
            Storage.set('asi_workout_history', history);
          }

          return newLog;
        }
      }

      if (cleanPath === '/workouts/history') {
        let history = Storage.get('asi_workout_history', []);
        return history.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      }

      if (cleanPath.startsWith('/workouts/log/')) {
        const id = parseInt(cleanPath.replace('/workouts/log/', ''), 10);
        let logs = Storage.get('asi_workouts', []);
        const idx = logs.findIndex(l => l.id === id);
        if (idx !== -1) {
          logs[idx] = { ...logs[idx], ...body, id };
          Storage.set('asi_workouts', logs);
          return logs[idx];
        }
        return body;
      }

      // ─── /attendance/courses ───
      if (cleanPath === '/attendance/courses') {
        let courses = Storage.get('asi_attendance_courses', null);
        if (!courses || courses.length === 0) {
          courses = JSON.parse(JSON.stringify(DEFAULT_ATT_COURSES));
          Storage.set('asi_attendance_courses', courses);
        }

        if (method === 'GET') {
          return courses;
        }

        if (method === 'POST') {
          const list = Array.isArray(body) ? body : [body];
          list.forEach(c => {
            if (!c.id) c.id = 'att-' + Math.random().toString(36).substr(2, 6);
          });
          Storage.set('asi_attendance_courses', list);
          return list;
        }
      }

      // ─── /attendance/records ───
      if (cleanPath === '/attendance/records') {
        let records = Storage.get('asi_attendance_records', []);

        if (method === 'GET') {
          return records;
        }

        if (method === 'POST') {
          const { courseId, week, status } = body || {};
          if (!status || status === 'none') {
            records = records.filter(r => !(r.courseId === courseId && r.week === week));
          } else {
            const existing = records.find(r => r.courseId === courseId && r.week === week);
            if (existing) {
              existing.status = status;
            } else {
              records.push({
                id: 'ar-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
                courseId,
                week,
                status
              });
            }
          }
          Storage.set('asi_attendance_records', records);
          return true;
        }
      }

      // ─── /goals ───
      if (cleanPath === '/goals') {
        let goals = Storage.get('asi_goals', []);

        if (method === 'GET') {
          return goals;
        }

        if (method === 'POST') {
          const { title, period, periodKey, dayKey, done } = body || {};
          let target = goals.find(g => g.periodKey === periodKey && g.dayKey === dayKey);
          if (target) {
            if (typeof done === 'boolean') target.done = done;
            if (title !== undefined) target.title = title;
          } else {
            target = {
              id: 'g-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
              title: title || '',
              period: period || 'Haftalık',
              periodKey: periodKey || '',
              dayKey: dayKey || '',
              done: !!done,
              created: Date.now()
            };
            goals.push(target);
          }
          Storage.set('asi_goals', goals);
          return target;
        }
      }

      if (cleanPath.startsWith('/goals/')) {
        const id = cleanPath.replace('/goals/', '');
        let goals = Storage.get('asi_goals', []);

        if (method === 'PUT') {
          const idx = goals.findIndex(g => g.id === id);
          if (idx !== -1) {
            goals[idx] = { ...goals[idx], ...body, id };
            Storage.set('asi_goals', goals);
            return goals[idx];
          }
          return body;
        }

        if (method === 'DELETE') {
          goals = goals.filter(g => g.id !== id);
          Storage.set('asi_goals', goals);
          return true;
        }
      }

      // ─── /notes ───
      if (cleanPath === '/notes') {
        let notes = Storage.get('asi_notes', null);
        if (notes === null) {
          notes = JSON.parse(JSON.stringify(DEFAULT_NOTES));
          Storage.set('asi_notes', notes);
        }

        if (method === 'GET') {
          return [...notes].sort((a, b) => (b.updated || b.created || 0) - (a.updated || a.created || 0));
        }

        if (method === 'POST') {
          const newNote = {
            id: body?.id || 'n-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            title: body?.title || 'Başlıksız Not',
            content: body?.content || '',
            courseId: body?.courseId || '',
            courseName: body?.courseName || 'Genel',
            tag: body?.tag || 'general',
            isExamTopic: !!body?.isExamTopic,
            color: body?.color || '#FFFFFF',
            created: body?.created || Date.now(),
            updated: Date.now()
          };
          notes.unshift(newNote);
          Storage.set('asi_notes', notes);
          return newNote;
        }
      }

      if (cleanPath.startsWith('/notes/')) {
        const id = cleanPath.replace('/notes/', '');
        let notes = Storage.get('asi_notes', DEFAULT_NOTES);

        if (method === 'PUT') {
          const idx = notes.findIndex(n => n.id === id);
          if (idx !== -1) {
            notes[idx] = { ...notes[idx], ...body, id, updated: Date.now() };
            Storage.set('asi_notes', notes);
            return notes[idx];
          }
          return body;
        }

        if (method === 'DELETE') {
          notes = notes.filter(n => n.id !== id);
          Storage.set('asi_notes', notes);
          return true;
        }
      }

      // ─── /quicknotes ───
      if (cleanPath === '/quicknotes') {
        let qn = Storage.get('asi_quicknotes', null);
        if (qn === null) {
          qn = JSON.parse(JSON.stringify(DEFAULT_QUICK_NOTES));
          Storage.set('asi_quicknotes', qn);
        }

        if (method === 'GET') {
          return [...qn].sort((a, b) => (b.created || 0) - (a.created || 0));
        }

        if (method === 'POST') {
          const item = {
            id: body?.id || 'qn-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            text: body?.text || '',
            created: Date.now()
          };
          qn.unshift(item);
          Storage.set('asi_quicknotes', qn);
          return item;
        }
      }

      if (cleanPath.startsWith('/quicknotes/')) {
        const id = cleanPath.replace('/quicknotes/', '');
        let qn = Storage.get('asi_quicknotes', DEFAULT_QUICK_NOTES);

        if (method === 'DELETE') {
          qn = qn.filter(q => q.id !== id);
          Storage.set('asi_quicknotes', qn);
          return true;
        }
      }

      // ─── /books ───
      if (cleanPath === '/books') {
        let books = Storage.get('asi_books', null);
        if (books === null) {
          books = JSON.parse(JSON.stringify(DEFAULT_BOOKS));
          Storage.set('asi_books', books);
        }

        if (method === 'GET') {
          return [...books].sort((a, b) => (b.updated || b.created || 0) - (a.updated || a.created || 0));
        }

        if (method === 'POST') {
          const newBook = {
            id: body?.id || 'book-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            title: body?.title || 'İsimsiz Kitap',
            author: body?.author || 'Bilinmeyen Yazar',
            totalPages: parseInt(body?.totalPages, 10) || 100,
            currentPage: parseInt(body?.currentPage, 10) || 0,
            status: body?.status || 'to_read',
            category: body?.category || 'Polisiye / Dedektif',
            rating: parseInt(body?.rating, 10) || 0,
            startDate: body?.startDate || '',
            finishDate: body?.finishDate || '',
            notes: body?.notes || '',
            coverImage: body?.coverImage || '',
            coverColor: body?.coverColor || '#0284C7',
            created: Date.now(),
            updated: Date.now()
          };
          books.unshift(newBook);
          Storage.set('asi_books', books);
          return newBook;
        }
      }

      if (cleanPath.startsWith('/books/')) {
        const id = cleanPath.replace('/books/', '');
        let books = Storage.get('asi_books', DEFAULT_BOOKS);

        if (method === 'PUT') {
          const idx = books.findIndex(b => b.id === id);
          if (idx !== -1) {
            books[idx] = { ...books[idx], ...body, id, updated: Date.now() };
            Storage.set('asi_books', books);
            return books[idx];
          }
          return body;
        }

        if (method === 'DELETE') {
          books = books.filter(b => b.id !== id);
          Storage.set('asi_books', books);
          // İlgili okuma oturumlarını da temizle
          let sessions = Storage.get('asi_reading_sessions', DEFAULT_READING_SESSIONS);
          sessions = sessions.filter(s => s.bookId !== id);
          Storage.set('asi_reading_sessions', sessions);
          return true;
        }
      }

      // ─── /reading/sessions ───
      if (cleanPath === '/reading/sessions') {
        let sessions = Storage.get('asi_reading_sessions', null);
        if (sessions === null) {
          sessions = JSON.parse(JSON.stringify(DEFAULT_READING_SESSIONS));
          Storage.set('asi_reading_sessions', sessions);
        }

        if (method === 'GET') {
          return [...sessions].sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.timestamp || 0) - (a.timestamp || 0));
        }

        if (method === 'POST') {
          const newSession = {
            id: body?.id || 'sess-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            bookId: body?.bookId,
            bookTitle: body?.bookTitle || '',
            date: body?.date || formatDateShort(new Date()),
            startPage: parseInt(body?.startPage, 10) || 0,
            endPage: parseInt(body?.endPage, 10) || 0,
            pagesRead: parseInt(body?.pagesRead, 10) || Math.max(0, (parseInt(body?.endPage, 10) || 0) - (parseInt(body?.startPage, 10) || 0)),
            duration: parseInt(body?.duration, 10) || 20,
            notes: body?.notes || '',
            timestamp: Date.now()
          };
          sessions.unshift(newSession);
          Storage.set('asi_reading_sessions', sessions);

          // İlgili kitabın mevcut sayfasını ve durumunu güncelle
          if (newSession.bookId) {
            let books = Storage.get('asi_books', DEFAULT_BOOKS);
            const bIdx = books.findIndex(b => b.id === newSession.bookId);
            if (bIdx !== -1) {
              const book = books[bIdx];
              if (newSession.endPage > (book.currentPage || 0)) {
                book.currentPage = Math.min(book.totalPages, newSession.endPage);
              }
              if (book.currentPage >= book.totalPages) {
                book.status = 'completed';
                if (!book.finishDate) book.finishDate = newSession.date;
              } else if (book.status === 'to_read') {
                book.status = 'reading';
                if (!book.startDate) book.startDate = newSession.date;
              }
              book.updated = Date.now();
              Storage.set('asi_books', books);
            }
          }

          return newSession;
        }
      }

      if (cleanPath.startsWith('/reading/sessions/')) {
        const id = cleanPath.replace('/reading/sessions/', '');
        let sessions = Storage.get('asi_reading_sessions', DEFAULT_READING_SESSIONS);

        if (method === 'DELETE') {
          sessions = sessions.filter(s => s.id !== id);
          Storage.set('asi_reading_sessions', sessions);
          return true;
        }
      }

      // ─── /reading/goals ───
      if (cleanPath === '/reading/goals') {
        let goals = Storage.get('asi_reading_goals', DEFAULT_READING_GOALS);
        if (method === 'GET') {
          return goals;
        }
        if (method === 'POST') {
          goals = { ...goals, ...body };
          Storage.set('asi_reading_goals', goals);
          return goals;
        }
      }

      // ─── /reset ───
      if (cleanPath === '/reset') {
        Storage.remove('asi_tasks');
        Storage.remove('asi_exercises');
        Storage.remove('asi_workouts');
        Storage.remove('asi_notes');
        Storage.remove('asi_quicknotes');
        Storage.remove('asi_goals');
        Storage.remove('asi_attendance_courses');
        Storage.remove('asi_attendance_records');
        Storage.remove('asi_books');
        Storage.remove('asi_reading_sessions');
        Storage.remove('asi_reading_goals');
        Storage.remove('asi_workout_history');
        Storage.remove('asi_workout_timer');
        return { success: true, message: 'Tüm veriler sıfırlandı.' };
      }

      console.warn('Tanımlanmamış endpoint:', cleanPath);
      return null;
    } catch (err) {
      console.error('ASİ Yerel Depolama Hatası:', err);
      return null;
    }
  }

  // ─── Veri Yönetimi (localStorage sadece settings için) ───
  const DB = {
    // Settings hâlâ localStorage'da
    loadSettings() {
      try {
        const raw = localStorage.getItem('asi_settings');
        return raw ? JSON.parse(raw) : { firstVisit: true };
      } catch { return { firstVisit: true }; }
    },
    saveSettings(data) {
      localStorage.setItem('asi_settings', JSON.stringify(data));
    },

    // Eski kod uyumluluğu (settings key'i için)
    load(key) {
      if (key === 'settings') return this.loadSettings();
      return null;
    },
    save(key, data) {
      if (key === 'settings') this.saveSettings(data);
    },

    clearAll() {
      localStorage.removeItem('asi_settings');
    },

    async resetAll() {
      await apiFetch('/reset', 'POST');
      this.clearAll();
    },

    // Dışa aktarma (API'den çeker)
    async exportAll() {
      const [tasks, notes, quickNotes, goals, courses, records, exercises, books, readingSessions, readingGoals, workoutHistory] = await Promise.all([
        apiFetch('/tasks'),
        apiFetch('/notes'),
        apiFetch('/quicknotes'),
        apiFetch('/goals'),
        apiFetch('/attendance/courses'),
        apiFetch('/attendance/records'),
        apiFetch('/exercises'),
        apiFetch('/books'),
        apiFetch('/reading/sessions'),
        apiFetch('/reading/goals'),
        apiFetch('/workouts/history'),
      ]);
      return {
        tasks, notes, quickNotes, goals,
        attendanceCourses: courses,
        attendanceRecords: records,
        exercises,
        books,
        readingSessions,
        readingGoals,
        workoutHistory,
        settings: this.loadSettings(),
        _exportDate: new Date().toISOString(),
        _app: 'ASİ ✨'
      };
    },

    // İçe aktarma (API'ye yazar)
    async importAll(data) {
      if (!data) return false;
      try {
        if (data.settings) this.saveSettings(data.settings);
        if (Array.isArray(data.tasks)) {
          for (const t of data.tasks) await apiFetch('/tasks', 'POST', t);
        }
        if (Array.isArray(data.notes)) {
          for (const n of data.notes) await apiFetch('/notes', 'POST', n);
        }
        if (Array.isArray(data.quickNotes)) {
          for (const q of data.quickNotes) await apiFetch('/quicknotes', 'POST', q);
        }
        if (Array.isArray(data.goals)) {
          for (const g of data.goals) await apiFetch('/goals', 'POST', g);
        }
        if (Array.isArray(data.attendanceCourses)) {
          await apiFetch('/attendance/courses', 'POST', data.attendanceCourses);
        }
        if (Array.isArray(data.attendanceRecords)) {
          for (const r of data.attendanceRecords) await apiFetch('/attendance/records', 'POST', r);
        }
        if (Array.isArray(data.exercises)) {
          for (const ex of data.exercises) await apiFetch('/exercises', 'POST', ex);
        }
        if (Array.isArray(data.books)) {
          for (const b of data.books) await apiFetch('/books', 'POST', b);
        }
        if (Array.isArray(data.readingSessions)) {
          for (const s of data.readingSessions) await apiFetch('/reading/sessions', 'POST', s);
        }
        if (data.readingGoals && typeof data.readingGoals === 'object') {
          await apiFetch('/reading/goals', 'POST', data.readingGoals);
        }
        if (Array.isArray(data.workoutHistory)) {
          Storage.set('asi_workout_history', data.workoutHistory);
        }
        return true;
      } catch (e) {
        console.error('Import error:', e);
        return false;
      }
    }
  };


  // ─── Yardımcılar ───
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function formatDate(d) {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${days[d.getDay()]}`;
  }

  function formatDateShort(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getMonday(d) {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const QUOTES = [
    '"Başarı, her gün tekrarlanan küçük çabaların toplamıdır." — Robert Collier',
    '"Gelecek, bugün ne yaptığına bağlıdır." — Mahatma Gandhi',
    '"Hayal et, inan, başar."',
    '"Bir adım at. Yol seni bulacaktır."',
    '"Disiplin, motivasyonun bittiği yerde başlar."',
    '"Bugün başla. Yarın çok geç olabilir."',
    '"Küçük ilerlemeler, büyük sonuçlar doğurur."',
    '"Kendine inan, yarısını başardın."',
    '"Her usta bir zamanlar çıraktı."',
    '"Vazgeçme. Her yeni gün yeni bir fırsat."',
    '"Zamanını yönet, hayatını yönet."',
    '"Hedeflerin olmadan planın olmaz."',
    '"Bugün ekersen yarın biçersin."',
    '"Başarısızlık, başarıya giden yolun bir parçasıdır."',
    '"Güçlü ol, sabırlı ol, kararlı ol."',
    '"Tek bir adım, bin kilometrelik yolculuğu başlatır." — Lao Tzu',
    '"Yapabileceğine inanırsan, yarı yoldasın demektir." — Theodore Roosevelt',
    '"Mükemmel zaman diye bir şey yoktur. Başla ve yolda mükemmelleş."',
    '"Bugün zorlanıyorsan, yarın güçleniyorsun demektir."',
    '"Kendini geliştirmek, yapabileceğin en iyi yatırımdır."',
  ];

  // ─── Toast Bildirimi ───
  function showToast(msg, type = 'info') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ─── Modal Yönetimi ───
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('hidden');
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('hidden');
  }

  // Modal kapatma delegasyonu
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal]');
    if (closeBtn) {
      e.preventDefault();
      closeModal(closeBtn.dataset.modal);
      return;
    }
    if (e.target.classList.contains('modal-overlay')) {
      e.preventDefault();
      e.target.classList.add('hidden');
    }
  });

  // ═══════════════════════════════════════════════════════
  // AÇILIŞ EKRANI
  // ═══════════════════════════════════════════════════════

  const Splash = {
    init() {
      const splash = $('#splash-screen');
      const canvas = $('#splash-canvas');
      const btn = $('#splash-btn');
      const settings = DB.load('settings');

      if (!settings.firstVisit) {
        // Kısa karşılama
        setTimeout(() => this.dismiss(), 1500);
      }

      btn.addEventListener('click', () => {
        settings.firstVisit = false;
        DB.save('settings', settings);
        this.dismiss();
      });

      // Yıldız efekti
      this.initStars(canvas);
    },

    dismiss() {
      const splash = $('#splash-screen');
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
        $('#app').classList.remove('hidden');
        Dashboard.refresh();
      }, 800);
    },

    initStars(canvas) {
      const ctx = canvas.getContext('2d');
      let w, h, stars = [];

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }

      function createStars() {
        stars = [];
        for (let i = 0; i < 120; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2.2 + 0.5,
            a: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            dir: Math.random() > 0.5 ? 1 : -1,
            color: Math.random() > 0.4 ? '6, 182, 212' : '249, 115, 22'
          });
        }
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          s.a += s.speed * s.dir;
          if (s.a >= 1) s.dir = -1;
          if (s.a <= 0.1) s.dir = 1;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color}, ${s.a * 0.8})`;
          ctx.fill();
        }
        if (canvas.parentElement && canvas.parentElement.style.display !== 'none') {
          requestAnimationFrame(draw);
        }
      }

      resize();
      createStars();
      draw();
      window.addEventListener('resize', () => { resize(); createStars(); });
    }
  };

  // ═══════════════════════════════════════════════════════
  // SAATLİ GÖSTERGELER & TARİH
  // ═══════════════════════════════════════════════════════

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = formatDate(now);

    const clockEl = $('#top-clock');
    if (clockEl) clockEl.textContent = time;

    const dateEl = $('#top-date');
    if (dateEl) dateEl.textContent = date;
  }

  // ═══════════════════════════════════════════════════════
  // NAVİGASYON
  // ═══════════════════════════════════════════════════════

  const Nav = {
    current: 'dashboard',

    init() {
      $$('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.goTo(link.dataset.page);
          // Mobilde menü kapat
          $('#sidebar').classList.remove('open');
          $('#sidebar-overlay').classList.remove('active');
        });
      });

      // Mobil menü
      $('#menu-toggle').addEventListener('click', () => {
        $('#sidebar').classList.toggle('open');
        $('#sidebar-overlay').classList.toggle('active');
      });

      $('#sidebar-overlay').addEventListener('click', () => {
        $('#sidebar').classList.remove('open');
        $('#sidebar-overlay').classList.remove('active');
      });
    },

    goTo(page) {
      this.current = page;
      $$('.page').forEach(p => p.classList.remove('active'));
      $$('.nav-link').forEach(l => l.classList.remove('active'));

      const pageEl = document.getElementById('page-' + page);
      const linkEl = $(`.nav-link[data-page="${page}"]`);

      if (pageEl) pageEl.classList.add('active');
      if (linkEl) linkEl.classList.add('active');

      // Sayfa özel yenileme
      switch (page) {
        case 'dashboard': Dashboard.refresh(); break;
        case 'kanban': Kanban.render(); break;
        case 'schedule':
        case 'workout': Workout.render(); break;
        case 'attendance': Attendance.render(); break;
        case 'goals': Goals.render(); break;
        case 'notebook': Notebook.render(); break;
        case 'books': Books.render(); break;
        case 'pomodoro': Pomodoro.updateDisplay(); break;
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════

  const Dashboard = {
    async refresh() {
      const now = new Date();
      $('#dashboard-date').textContent = formatDate(now);
      this.showQuote();
      $('#dash-pomo-display').textContent = Pomodoro.getDisplayTime();

      // İstatistikler (API'den paralel çek)
      const [tasks, notes] = await Promise.all([
        apiFetch('/tasks'),
        apiFetch('/notes'),
      ]);
      const safeT = tasks || [];
      const safeN = notes || [];
      const done = safeT.filter(t => t.status === 'done').length;
      $('#stat-done').textContent = done;
      $('#stat-total').textContent = safeT.length;
      $('#stat-notes').textContent = safeN.length;

      // Haftalık hedef
      const weekPct = await Goals.getWeeklyProgress();
      $('#stat-weekly').textContent = `%${weekPct}`;

      // Bugünkü görevler
      this.renderTodayTasks(safeT);
    },

    showQuote() {
      const idx = Math.floor(Math.random() * QUOTES.length);
      $('#motivation-text').textContent = QUOTES[idx];
    },

    renderTodayTasks(tasks) {
      const todoAndDoing = tasks.filter(t => t.status !== 'done');
      const list = $('#dash-today-tasks');
      if (todoAndDoing.length === 0) {
        list.innerHTML = '<li class="empty-state">Henüz görev eklenmemiş</li>';
        return;
      }
      list.innerHTML = todoAndDoing.slice(0, 8).map(t => `
        <li>
          <span class="dash-task-dot" style="background:${t.color || '#7c5cfc'}"></span>
          <span>${this.escapeHtml(t.title)}</span>
        </li>
      `).join('');
    },

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  };


  // ═══════════════════════════════════════════════════════
  // KANBAN
  // ═══════════════════════════════════════════════════════

  const Kanban = {
    init() {
      $('#add-task-btn').addEventListener('click', () => this.openForm());
      $('#task-form').addEventListener('submit', (e) => { e.preventDefault(); this.saveTask(); });
      this.initDragDrop();
    },

    _tasks: [],   // bellekteki önbellek

    async loadTasks() {
      const data = await apiFetch('/tasks');
      this._tasks = data || [];
    },

    async render() {
      await this.loadTasks();
      const cols = { todo: [], doing: [], done: [] };
      this._tasks.forEach(t => { if (cols[t.status]) cols[t.status].push(t); });

      for (const [status, items] of Object.entries(cols)) {
        const list = $(`#kanban-${status}`);
        const count = $(`#count-${status}`);
        if (count) count.textContent = items.length;
        if (items.length === 0) {
          list.innerHTML = '<div class="empty-state" style="padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">Görev yok</div>';
          continue;
        }
        list.innerHTML = items.map(t => this.cardHTML(t)).join('');
      }
      this.bindCardEvents();
    },

    cardHTML(t) {
      const esc = Dashboard.escapeHtml;
      const statuses = ['todo', 'doing', 'done'];
      const statusLabels = { todo: '📝', doing: '🔄', done: '✅' };
      const moveButtons = statuses
        .filter(s => s !== t.status)
        .map(s => `<button type="button" class="move-btn" data-id="${t.id}" data-to="${s}" title="${s}">${statusLabels[s]}</button>`)
        .join('');

      const noteRefMatch = t.desc ? t.desc.match(/\[NotRef:([a-zA-Z0-9_-]+)\]/) : null;
      const noteId = noteRefMatch ? noteRefMatch[1] : null;
      const cleanDesc = t.desc ? t.desc.replace(/\[NotRef:[^\]]+\]/g, '').trim() : '';

      return `
        <div class="task-card" draggable="true" data-id="${t.id}" style="border-left-color:${t.color || '#7c5cfc'}">
          ${noteId ? `
            <div class="task-exam-badge">
              <span>🎯 Sınav Çalışması</span>
              <button type="button" class="task-open-note-btn" data-note-id="${noteId}">📖 Notu Aç</button>
            </div>
          ` : ''}
          <div class="task-card-title">${esc(t.title)}</div>
          ${cleanDesc ? `<div class="task-card-desc">${esc(cleanDesc)}</div>` : ''}
          <div class="task-card-actions">
            <div class="move-btns">${moveButtons}</div>
            <button type="button" class="edit-task-btn" data-id="${t.id}">✏️</button>
            <button type="button" class="del-task-btn" data-id="${t.id}">🗑️</button>
          </div>
        </div>`;
    },

    bindCardEvents() {
      $$('.task-open-note-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const noteId = btn.dataset.noteId;
          if (noteId) {
            Nav.goTo('notebook');
            await Notebook.openNote(noteId);
          }
        });
      });
      $$('.edit-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openForm(btn.dataset.id);
        });
      });
      $$('.del-task-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          confirmAction('Bu görevi silmek istediğinize emin misiniz?', async () => {
            await apiFetch(`/tasks/${btn.dataset.id}`, 'DELETE');
            await this.render();
            Dashboard.refresh();
            showToast('Görev silindi', 'success');
          });
        });
      });
      $$('.move-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const task = this._tasks.find(t => t.id === btn.dataset.id);
          if (task) {
            await apiFetch(`/tasks/${task.id}`, 'PUT', { ...task, status: btn.dataset.to });
            await this.render();
            Dashboard.refresh();
            showToast('Görev taşındı', 'success');
          }
        });
      });
    },

    openForm(editId) {
      const form = $('#task-form');
      form.reset();
      const defaultColor = $('input[name="task-color"][value="#7c5cfc"]');
      if (defaultColor) defaultColor.checked = true;

      if (editId) {
        const task = this._tasks.find(t => t.id === editId);
        if (!task) return;
        $('#task-modal-title').textContent = 'Görevi Düzenle';
        $('#task-id').value = task.id;
        $('#task-title').value = task.title;
        $('#task-desc').value = task.desc || '';
        const colorInput = $(`input[name="task-color"][value="${task.color}"]`);
        if (colorInput) colorInput.checked = true;
      } else {
        $('#task-modal-title').textContent = 'Yeni Görev';
        $('#task-id').value = '';
      }
      openModal('task-modal');
    },

    async saveTask() {
      const id = $('#task-id').value;
      const title = $('#task-title').value.trim();
      if (!title) return;
      const color = $('input[name="task-color"]:checked')?.value || '#7c5cfc';
      const desc = $('#task-desc').value.trim();

      if (id) {
        const task = this._tasks.find(t => t.id === id);
        if (task) await apiFetch(`/tasks/${id}`, 'PUT', { ...task, title, desc, color });
      } else {
        await apiFetch('/tasks', 'POST', { title, desc, color, status: 'todo' });
      }
      closeModal('task-modal');
      await this.render();
      Dashboard.refresh();
      showToast(id ? 'Görev güncellendi' : 'Görev eklendi', 'success');
    },

    _draggedTaskId: null,

    // Sürükle bırak (Tarayıcının sayfayı yenilemesini kesin olarak engeller)
    initDragDrop() {
      const board = $('.kanban-board');
      if (!board) return;

      // Tarayıcının metin veya öğe bırakılınca sayfayı yenilemesini/dosya açmasını global olarak engelle
      window.addEventListener('dragover', (e) => e.preventDefault(), false);
      window.addEventListener('drop', (e) => e.preventDefault(), false);

      board.addEventListener('dragstart', (e) => {
        const card = e.target.closest('.task-card');
        if (!card) return;
        this._draggedTaskId = card.dataset.id;
        card.classList.add('dragging');
        try {
          e.dataTransfer.setData('text/plain', card.dataset.id);
          e.dataTransfer.effectAllowed = 'move';
        } catch (_) {}
      });

      board.addEventListener('dragend', (e) => {
        const card = e.target.closest('.task-card') || $('.task-card.dragging');
        if (card) card.classList.remove('dragging');
        this._draggedTaskId = null;
        $$('.kanban-list, .kanban-column').forEach(l => l.classList.remove('drag-over'));
      });

      board.addEventListener('dragenter', (e) => {
        e.preventDefault();
      });

      board.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        const col = e.target.closest('.kanban-column');
        if (col) {
          const list = col.querySelector('.kanban-list');
          if (list) list.classList.add('drag-over');
        }
      });

      board.addEventListener('dragleave', (e) => {
        const list = e.target.closest('.kanban-list');
        if (list && !list.contains(e.relatedTarget)) {
          list.classList.remove('drag-over');
        }
      });

      board.addEventListener('drop', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        $$('.kanban-list, .kanban-column').forEach(l => l.classList.remove('drag-over'));

        const col = e.target.closest('.kanban-column');
        if (!col) return;
        const newStatus = col.dataset.status;
        if (!newStatus) return;

        let taskId = this._draggedTaskId;
        if (!taskId && e.dataTransfer) {
          try { taskId = e.dataTransfer.getData('text/plain'); } catch (_) {}
        }
        this._draggedTaskId = null;

        if (!taskId) return;
        const task = this._tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
          await apiFetch(`/tasks/${task.id}`, 'PUT', { ...task, status: newStatus });
          await this.render();
          Dashboard.refresh();
          showToast('Görev taşındı', 'success');
        }
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // SPOR & EGZERSİZ PROGRAMI
  // ═══════════════════════════════════════════════════════

  const Workout = {
    selectedDate: formatDateShort(new Date()),
    selectedCategory: 'all',
    _exercises: [],
    _logs: [],
    _history: [],

    // ─── Otomatik Dinlenme Sayacı Durumu ───
    timerState: {
      active: false,
      exerciseId: null,
      exerciseName: '',
      setNum: 0,
      totalSets: 0,
      isLastSet: false,
      endTime: 0,
      durationSec: 120,
      paused: false,
      remainingSec: 0,
      intervalId: null
    },

    init() {
      // Yeni Hareket Ekle butonu
      const addBtn = $('#add-workout-exercise-btn');
      if (addBtn) addBtn.addEventListener('click', () => this.openExerciseModal());

      // Geçmiş Antrenmanlar butonu
      const histBtn = $('#workout-history-btn');
      if (histBtn) histBtn.addEventListener('click', () => this.openHistoryModal());

      // Varsayılanları Yükle butonu
      const resetBtn = $('#reset-workout-exercises-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          confirmAction('Varsayılan 21 temel spor hareketi yeniden yüklensin mi?', async () => {
            const res = await apiFetch('/exercises/reset', 'POST');
            if (res) {
              await this.loadExercises();
              await this.render();
              showToast('Temel egzersiz hareketleri başarıyla yüklendi ✓', 'success');
            }
          });
        });
      }

      // Modal Form Submit
      const form = $('#workout-exercise-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveExercise();
        });
      }

      // Tarih Gezinti Butonları
      const prevBtn = $('#workout-prev-day-btn');
      if (prevBtn) prevBtn.addEventListener('click', () => this.changeDay(-1));

      const nextBtn = $('#workout-next-day-btn');
      if (nextBtn) nextBtn.addEventListener('click', () => this.changeDay(1));

      const todayBtn = $('#workout-today-btn');
      if (todayBtn) todayBtn.addEventListener('click', () => this.setToday());

      const dateInput = $('#workout-date-input');
      if (dateInput) {
        dateInput.value = this.selectedDate;
        dateInput.addEventListener('change', (e) => {
          if (e.target.value) {
            this.selectedDate = e.target.value;
            this.render();
          }
        });
      }

      // Kas Grubu Filtre Butonları
      $$('.workout-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          $$('.workout-cat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedCategory = btn.dataset.cat || 'all';
          this.renderListOnly();
        });
      });

      // Dinlenme Sayacı Kontrolleri
      const pauseBtn = $('#workout-rest-pause-btn');
      if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseRestTimer());

      const resumeBtn = $('#workout-rest-resume-btn');
      if (resumeBtn) resumeBtn.addEventListener('click', () => this.resumeRestTimer());

      const skipBtn = $('#workout-rest-skip-btn');
      if (skipBtn) skipBtn.addEventListener('click', () => this.skipRestTimer());

      const resetTimerBtn = $('#workout-rest-reset-btn');
      if (resetTimerBtn) resetTimerBtn.addEventListener('click', () => this.cancelRestTimer());

      // Sayfa yenilendiğinde devam eden sayacı geri yükle
      this.restoreRestTimer();
    },

    // ─── Dinlenme Sayacı Motoru (Gerçek Zaman Farkı ile) ───
    restoreRestTimer() {
      const saved = Storage.get('asi_workout_timer', null);
      if (saved && saved.active) {
        const now = Date.now();
        if (saved.paused) {
          this.timerState = { ...saved, intervalId: null };
          this.showRestTimerUI();
          this.updateRestTimerDisplay(saved.remainingSec || 0);
          $('#workout-rest-pause-btn')?.classList.add('hidden');
          $('#workout-rest-resume-btn')?.classList.remove('hidden');
        } else if (saved.endTime > now) {
          const diff = Math.max(0, Math.round((saved.endTime - now) / 1000));
          this.timerState = { ...saved, remainingSec: diff, intervalId: null };
          this.showRestTimerUI();
          this.startTimerInterval();
        } else {
          // Süre arka plandayken dolmuş
          Storage.remove('asi_workout_timer');
        }
      }
    },

    startRestTimer(ex, setNum, totalSets) {
      if (this.timerState.intervalId) {
        clearInterval(this.timerState.intervalId);
      }

      const isLast = (setNum >= totalSets);
      const settings = Storage.get('asi_workout_settings', DEFAULT_WORKOUT_SETTINGS);
      const duration = isLast ? (settings.lastRestSec || 300) : (settings.normalRestSec || 120);
      const endTime = Date.now() + duration * 1000;

      this.timerState = {
        active: true,
        exerciseId: ex.id,
        exerciseName: ex.name,
        setNum,
        totalSets,
        isLastSet: isLast,
        endTime,
        durationSec: duration,
        paused: false,
        remainingSec: duration,
        intervalId: null
      };

      Storage.set('asi_workout_timer', {
        ...this.timerState,
        intervalId: null
      });

      this.showRestTimerUI();
      this.updateRestTimerDisplay(duration);
      this.startTimerInterval();

      const timeText = isLast ? '5 Dakika' : '2 Dakika';
      showToast(`⏱️ ${ex.name} (${setNum}/${totalSets}. Set): ${timeText} dinlenme sayacı başladı!`, 'info');
    },

    startTimerInterval() {
      if (this.timerState.intervalId) clearInterval(this.timerState.intervalId);

      this.timerState.intervalId = setInterval(() => {
        if (!this.timerState.active || this.timerState.paused) return;

        const now = Date.now();
        const diff = Math.max(0, Math.round((this.timerState.endTime - now) / 1000));
        this.timerState.remainingSec = diff;

        this.updateRestTimerDisplay(diff);

        if (diff <= 0) {
          this.completeRestTimer();
        }
      }, 250);
    },

    updateRestTimerDisplay(totalSeconds) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      const timeEl = $('#workout-rest-time');
      if (timeEl) timeEl.textContent = formatted;
    },

    showRestTimerUI() {
      const card = $('#workout-rest-card');
      if (!card) return;

      const titleEl = $('#workout-rest-title');
      const tagEl = $('#workout-rest-tag');
      const subEl = $('#workout-rest-subtitle');

      const isLast = this.timerState.isLastSet;
      const s = this.timerState.setNum;
      const total = this.timerState.totalSets;

      if (titleEl) titleEl.textContent = isLast ? '🔥 Son Set Dinlenmesi' : '⏱️ Dinlenme Süresi';
      if (tagEl) {
        tagEl.textContent = isLast ? '5 dk' : '2 dk';
        tagEl.className = `badge ${isLast ? 'badge-warning' : 'badge-info'}`;
      }
      if (subEl) {
        subEl.textContent = isLast
          ? `${this.timerState.exerciseName} • Tüm setler tamamlandı!`
          : `${this.timerState.exerciseName} • Set ${s} tamamlandı (${s}/${total})`;
      }

      $('#workout-rest-pause-btn')?.classList.remove('hidden');
      $('#workout-rest-resume-btn')?.classList.add('hidden');
      card.classList.remove('hidden');

      this.renderListOnly();
    },

    pauseRestTimer() {
      if (!this.timerState.active || this.timerState.paused) return;

      this.timerState.paused = true;
      const diff = Math.max(0, Math.round((this.timerState.endTime - Date.now()) / 1000));
      this.timerState.remainingSec = diff;

      Storage.set('asi_workout_timer', {
        ...this.timerState,
        intervalId: null
      });

      $('#workout-rest-pause-btn')?.classList.add('hidden');
      $('#workout-rest-resume-btn')?.classList.remove('hidden');
      showToast('Dinlenme sayacı duraklatıldı', 'info');
    },

    resumeRestTimer() {
      if (!this.timerState.active || !this.timerState.paused) return;

      this.timerState.paused = false;
      this.timerState.endTime = Date.now() + (this.timerState.remainingSec || 0) * 1000;

      Storage.set('asi_workout_timer', {
        ...this.timerState,
        intervalId: null
      });

      $('#workout-rest-pause-btn')?.classList.remove('hidden');
      $('#workout-rest-resume-btn')?.classList.add('hidden');
      this.startTimerInterval();
      showToast('Dinlenme sayacı devam ediyor', 'info');
    },

    skipRestTimer() {
      if (!this.timerState.active) return;
      this.cancelRestTimer(false);
      showToast('Dinlenme atlandı, sonraki sete geçildi 🚀', 'success');
    },

    cancelRestTimer(notify = true) {
      if (this.timerState.intervalId) {
        clearInterval(this.timerState.intervalId);
      }
      this.timerState.active = false;
      this.timerState.intervalId = null;
      Storage.remove('asi_workout_timer');

      const card = $('#workout-rest-card');
      if (card) card.classList.add('hidden');

      this.renderListOnly();
      if (notify) showToast('Dinlenme sayacı kapatıldı', 'info');
    },

    completeRestTimer() {
      if (this.timerState.intervalId) {
        clearInterval(this.timerState.intervalId);
      }
      const isLast = this.timerState.isLastSet;
      const exName = this.timerState.exerciseName;

      this.timerState.active = false;
      this.timerState.intervalId = null;
      Storage.remove('asi_workout_timer');

      const card = $('#workout-rest-card');
      if (card) card.classList.add('hidden');

      this.playChime();

      if (isLast) {
        showToast(`🏆 Tebrikler! ${exName} hareketinin son dinlenmesi bitti, egzersiz başarıyla tamamlandı!`, 'success');
      } else {
        showToast(`🔔 ${exName}: Dinlenme süresi doldu! Sonraki sete hazırsınız.`, 'success');
      }

      this.renderListOnly();
    },

    // Web Audio API ile kısa uyarı sesi
    playChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5 akoru
        freqs.forEach((freq, idx) => {
          setTimeout(() => {
            try {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, ctx.currentTime);
              gain.gain.setValueAtTime(0.25, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.35);
            } catch (_) {}
          }, idx * 130);
        });
      } catch (_) {
        // Tarayıcı ses politikası engellerse sessizce devam eder
      }
    },

    changeDay(offsetDays) {
      const parts = this.selectedDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      d.setDate(d.getDate() + offsetDays);
      this.selectedDate = formatDateShort(d);
      const dateInput = $('#workout-date-input');
      if (dateInput) dateInput.value = this.selectedDate;
      this.render();
    },

    setToday() {
      this.selectedDate = formatDateShort(new Date());
      const dateInput = $('#workout-date-input');
      if (dateInput) dateInput.value = this.selectedDate;
      this.render();
    },

    async loadExercises() {
      const data = await apiFetch('/exercises');
      this._exercises = data || [];
    },

    async loadLogs() {
      const data = await apiFetch(`/workouts?date=${this.selectedDate}`);
      this._logs = data || [];
    },

    async loadHistory() {
      const data = await apiFetch('/workouts/history');
      this._history = data || [];
    },

    async render() {
      await Promise.all([this.loadExercises(), this.loadLogs(), this.loadHistory()]);
      this.updateDateUI();
      this.updateProgressUI();
      this.updateCategoryCounts();
      this.renderListOnly();
    },

    updateDateUI() {
      const parts = this.selectedDate.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const todayStr = formatDateShort(new Date());
      const isToday = this.selectedDate === todayStr;

      const dateLabel = $('#workout-date-label');
      if (dateLabel) {
        dateLabel.textContent = formatDate(d);
      }

      const todayBadge = $('#workout-today-badge');
      if (todayBadge) {
        if (isToday) todayBadge.classList.remove('hidden');
        else todayBadge.classList.add('hidden');
      }

      const dateInput = $('#workout-date-input');
      if (dateInput) dateInput.value = this.selectedDate;
    },

    updateProgressUI() {
      const total = this._exercises.length;
      const completedIds = new Set(
        this._logs.filter(l => l.completed).map(l => l.exerciseId)
      );
      const done = this._exercises.filter(e => completedIds.has(e.id)).length;
      const remaining = Math.max(0, total - done);
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

      const pctBadge = $('#workout-pct-badge');
      if (pctBadge) pctBadge.textContent = `%${pct}`;

      const barFill = $('#workout-progress-bar-fill');
      if (barFill) barFill.style.width = `${pct}%`;

      const doneEl = $('#workout-done-count');
      if (doneEl) doneEl.textContent = done;

      const totalEl = $('#workout-total-count');
      if (totalEl) totalEl.textContent = total;

      const remainEl = $('#workout-remaining-count');
      if (remainEl) remainEl.textContent = remaining;

      const descEl = $('#workout-progress-status-desc');
      if (descEl) {
        if (pct === 100 && total > 0) {
          descEl.textContent = '🔥 Harika! Bugünkü antrenmanı eksiksiz tamamladın!';
        } else if (done > 0) {
          descEl.textContent = `💪 Harika gidiyorsun! ${done} hareket tamamlandı, ${remaining} kaldı.`;
        } else {
          descEl.textContent = 'Antrenmana başlamak için setleri veya hareketleri tamamlandıkça tikleyin.';
        }
      }
    },

    updateCategoryCounts() {
      const cats = ['all', 'gogus', 'sirt', 'omuz', 'bacak', 'kol', 'karin'];
      cats.forEach(c => {
        const countEl = $(`#cat-count-${c}`);
        if (countEl) {
          if (c === 'all') countEl.textContent = this._exercises.length;
          else countEl.textContent = this._exercises.filter(e => e.category === c).length;
        }
      });
    },

    renderListOnly() {
      const container = $('#workout-exercise-list');
      if (!container) return;

      const list = this.selectedCategory === 'all'
        ? this._exercises
        : this._exercises.filter(e => e.category === this.selectedCategory);

      if (list.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">🏋️</div>
            <p>Bu kas grubuna ait hareket bulunamadı.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="Workout.openExerciseModal()">+ Hareket Ekle</button>
          </div>`;
        return;
      }

      const logMap = new Map();
      this._logs.forEach(l => logMap.set(l.exerciseId, l));

      const catNames = {
        gogus: 'Göğüs',
        sirt: 'Sırt',
        omuz: 'Omuz',
        bacak: 'Bacak',
        kol: 'Kol',
        karin: 'Karın'
      };

      const esc = Dashboard.escapeHtml;

      // Önceki ağırlık haritası (tarih !== selectedDate olan en son kayıt)
      const prevWeightMap = new Map();
      this._history.forEach(h => {
        if (h.date !== this.selectedDate && !prevWeightMap.has(h.exerciseId) && h.weight) {
          prevWeightMap.set(h.exerciseId, h.weight);
        }
      });

      container.innerHTML = list.map(ex => {
        const log = logMap.get(ex.id);
        const totalSets = (log && log.sets) ? log.sets : (ex.sets || 3);
        const reps = (log && log.reps) ? log.reps : (ex.reps || 10);
        const weight = (log && log.weight) ? log.weight : (ex.weight || 'Vücut Ağırlığı');

        const completedSets = (log && Array.isArray(log.completedSets))
          ? log.completedSets
          : (log && log.completed ? Array.from({ length: totalSets }, (_, i) => i + 1) : []);

        const isCompleted = completedSets.length >= totalSets && totalSets > 0;
        const prevWeight = prevWeightMap.get(ex.id);

        // Her set için butonlar
        const setPills = Array.from({ length: totalSets }, (_, i) => {
          const sNum = i + 1;
          const isDone = completedSets.includes(sNum);
          const isLast = (sNum === totalSets);
          const isTimerActive = this.timerState.active &&
            this.timerState.exerciseId === ex.id &&
            this.timerState.setNum === sNum;

          return `
            <button type="button" 
                    class="workout-set-btn ${isDone ? 'is-set-done' : ''} ${isLast ? 'is-last-set' : ''} ${isTimerActive ? 'active-timer' : ''}" 
                    data-ex-id="${ex.id}" 
                    data-set-num="${sNum}" 
                    data-total-sets="${totalSets}"
                    title="${isDone ? `${sNum}. Seti İptal Et` : `${sNum}. Seti Tamamla (${isLast ? '5 dk' : '2 dk'} dinlenme)`}">
              <span class="set-dot">${isDone ? '✓' : sNum}</span>
              <span>Set ${sNum}${isLast ? ' ★' : ''}</span>
            </button>
          `;
        }).join('');

        return `
          <div class="workout-card ${isCompleted ? 'is-completed' : ''}" data-id="${ex.id}" data-cat="${ex.category}">
            <button type="button" class="workout-check-btn" data-id="${ex.id}" title="${isCompleted ? 'Tamamlanmadı yap' : 'Tüm setleri tamamlandı olarak işaretle'}">
              ✓
            </button>
            <div class="workout-card-body">
              <div class="workout-card-top-row">
                <span class="workout-card-title">${esc(ex.name)}</span>
                <span class="workout-muscle-tag cat-${ex.category}">${catNames[ex.category] || ex.category}</span>
              </div>
              <div class="workout-specs-wrap">
                <span class="workout-spec-badge">${totalSets} Set</span>
                <span class="workout-spec-badge">${reps} Tekrar</span>
                <span class="workout-spec-badge weight-badge">⚖️ ${esc(weight)}</span>
                ${prevWeight ? `<span class="prev-weight-tag" title="Önceki antrenmanda kullanılan ağırlık">⏱️ Önceki: ${esc(prevWeight)}</span>` : ''}
              </div>

              <!-- Set Bazlı Tamamlama ve Sayaç Butonları -->
              <div class="workout-card-sets-wrap">
                <div class="workout-sets-header">
                  <span><strong>${completedSets.length}/${totalSets} Set</strong> tamamlandı</span>
                  ${isCompleted ? '<span class="text-success" style="font-weight:700;">✅ Hareket Bitti</span>' : ''}
                </div>
                <div class="workout-sets-pills">
                  ${setPills}
                </div>
              </div>
            </div>
            <div class="workout-card-actions">
              <button type="button" class="workout-action-btn edit-btn" data-id="${ex.id}" title="Düzenle">✏️</button>
              <button type="button" class="workout-action-btn del-btn" data-id="${ex.id}" title="Sil">🗑️</button>
            </div>
          </div>
        `;
      }).join('');

      this.bindListEvents();
    },

    bindListEvents() {
      // Bütün hareketi tek tıkla bitirme / geri alma (Master Checkbox)
      $$('.workout-check-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const exId = btn.dataset.id;
          if (!exId) return;

          const ex = this._exercises.find(x => x.id === exId);
          const currentLog = this._logs.find(l => l.exerciseId === exId);
          const totalSets = ex?.sets || 3;

          const isCurrentlyCompleted = !!(currentLog && currentLog.completed);
          const newCompleted = !isCurrentlyCompleted;
          const newCompletedSets = newCompleted
            ? Array.from({ length: totalSets }, (_, i) => i + 1)
            : [];

          const res = await apiFetch('/workouts/toggle', 'POST', {
            date: this.selectedDate,
            exerciseId: exId,
            completed: newCompleted,
            completedSets: newCompletedSets,
            sets: totalSets,
            reps: ex?.reps,
            weight: ex?.weight
          });

          if (res) {
            const idx = this._logs.findIndex(l => l.exerciseId === exId);
            if (idx >= 0) this._logs[idx] = res;
            else this._logs.push(res);
          }

          if (!newCompleted && this.timerState.active && this.timerState.exerciseId === exId) {
            this.cancelRestTimer(false);
          }

          this.updateProgressUI();
          this.renderListOnly();
        });
      });

      // Tek Tek Set Butonlarına Tıklama (Otomatik 2 dk / 5 dk Dinlenme Sayacı)
      $$('.workout-set-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const exId = btn.dataset.exId;
          const setNum = parseInt(btn.dataset.setNum, 10);
          const totalSets = parseInt(btn.dataset.totalSets, 10) || 3;

          const ex = this._exercises.find(x => x.id === exId);
          if (!ex) return;

          const currentLog = this._logs.find(l => l.exerciseId === exId);
          let completedSets = (currentLog && Array.isArray(currentLog.completedSets))
            ? [...currentLog.completedSets]
            : (currentLog && currentLog.completed ? Array.from({ length: totalSets }, (_, i) => i + 1) : []);

          const isAlreadyDone = completedSets.includes(setNum);

          if (isAlreadyDone) {
            // Set işaretini kaldır
            completedSets = completedSets.filter(s => s !== setNum);

            // Eğer çalışan sayaç bu sete aitse durdur
            if (this.timerState.active && this.timerState.exerciseId === exId && this.timerState.setNum === setNum) {
              this.cancelRestTimer(false);
            }
          } else {
            // Seti tamamla
            completedSets.push(setNum);
            completedSets.sort((a, b) => a - b);

            // Otomatik Dinlenme Sayacını Başlat (Son set ise 5 dk, diğerleri 2 dk)
            this.startRestTimer(ex, setNum, totalSets);
          }

          const isFullyCompleted = completedSets.length >= totalSets;

          const res = await apiFetch('/workouts/toggle', 'POST', {
            date: this.selectedDate,
            exerciseId: exId,
            completed: isFullyCompleted,
            completedSets,
            sets: totalSets,
            reps: ex.reps,
            weight: ex.weight
          });

          if (res) {
            const idx = this._logs.findIndex(l => l.exerciseId === exId);
            if (idx >= 0) this._logs[idx] = res;
            else this._logs.push(res);
          }

          this.updateProgressUI();
          this.renderListOnly();
        });
      });

      // Düzenle
      $$('.workout-action-btn.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openExerciseModal(btn.dataset.id);
        });
      });

      // Sil
      $$('.workout-action-btn.del-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const exId = btn.dataset.id;
          const ex = this._exercises.find(x => x.id === exId);
          confirmAction(`"${ex?.name || 'Bu hareket'}" egzersizini kaldırmak istediğinize emin misiniz?`, async () => {
            const res = await apiFetch(`/exercises/${exId}`, 'DELETE');
            if (res) {
              await this.loadExercises();
              this.updateCategoryCounts();
              this.updateProgressUI();
              this.renderListOnly();
              showToast('Hareket silindi', 'success');
            }
          });
        });
      });
    },

    openExerciseModal(editId = null) {
      const form = $('#workout-exercise-form');
      if (!form) return;
      form.reset();

      if (editId) {
        const ex = this._exercises.find(x => x.id === editId);
        if (!ex) return;
        $('#workout-modal-title').textContent = 'Hareketi Düzenle';
        $('#workout-exercise-id').value = ex.id;
        $('#workout-exercise-name').value = ex.name;
        $('#workout-exercise-cat').value = ex.category;
        $('#workout-exercise-sets').value = ex.sets;
        $('#workout-exercise-reps').value = ex.reps;
        $('#workout-exercise-weight').value = ex.weight || '';
      } else {
        $('#workout-modal-title').textContent = 'Yeni Spor Hareketi';
        $('#workout-exercise-id').value = '';
        $('#workout-exercise-cat').value = this.selectedCategory !== 'all' ? this.selectedCategory : 'gogus';
        $('#workout-exercise-sets').value = 3;
        $('#workout-exercise-reps').value = 10;
        $('#workout-exercise-weight').value = '15 kg';
      }
      openModal('workout-exercise-modal');
    },

    async saveExercise() {
      const id = $('#workout-exercise-id').value;
      const name = $('#workout-exercise-name').value.trim();
      const category = $('#workout-exercise-cat').value;
      const sets = parseInt($('#workout-exercise-sets').value, 10) || 3;
      const reps = parseInt($('#workout-exercise-reps').value, 10) || 10;
      const weight = $('#workout-exercise-weight').value.trim() || 'Vücut Ağırlığı';

      if (!name) return;

      if (id) {
        const ex = this._exercises.find(x => x.id === id);
        const res = await apiFetch(`/exercises/${id}`, 'PUT', {
          ...ex,
          name,
          category,
          sets,
          reps,
          weight
        });
        if (res) {
          showToast('Hareket güncellendi', 'success');
        }
      } else {
        const res = await apiFetch('/exercises', 'POST', {
          name,
          category,
          sets,
          reps,
          weight,
          sortOrder: this._exercises.length + 1
        });
        if (res) {
          showToast('Yeni hareket eklendi ✓', 'success');
        }
      }

      closeModal('workout-exercise-modal');
      await this.loadExercises();
      this.updateCategoryCounts();
      this.updateProgressUI();
      this.renderListOnly();
    },

    // ─── Geçmiş Antrenmanlar Modalı ───
    async openHistoryModal() {
      await this.loadHistory();
      const listEl = $('#workout-history-list');
      if (!listEl) return;

      if (this._history.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state" style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">📜</div>
            <p>Henüz tamamlanmış bir antrenman kaydı bulunmuyor.</p>
            <p style="font-size:0.85rem;">Setlerinizi tamamladıkça kayıtlarınız burada listelenir.</p>
          </div>
        `;
        openModal('workout-history-modal');
        return;
      }

      // Tarihlere göre grupla
      const groups = {};
      this._history.forEach(item => {
        const d = item.date || 'Tarihsiz';
        if (!groups[d]) groups[d] = [];
        groups[d].push(item);
      });

      const dates = Object.keys(groups).sort((a, b) => b.localeCompare(a));
      const esc = Dashboard.escapeHtml;

      listEl.innerHTML = dates.map(dateStr => {
        const items = groups[dateStr];
        let prettyDate = dateStr;
        try {
          const parts = dateStr.split('-');
          prettyDate = formatDate(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
        } catch (_) {}

        const itemChips = items.map(it => {
          const sCount = it.completedSets ? it.completedSets.length : (it.sets || 3);
          return `
            <div class="history-item-chip">
              <strong style="color:var(--text-primary); font-size:0.9rem;">${esc(it.exerciseName || 'Egzersiz')}</strong>
              <div style="color:var(--text-secondary); font-size:0.8rem; display:flex; gap:0.5rem; align-items:center;">
                <span>${sCount}/${it.sets || 3} Set</span>
                <span>•</span>
                <span>${it.reps || 10} Tekrar</span>
              </div>
              <div style="color:#0284C7; font-weight:700; font-size:0.82rem;">
                ⚖️ ${esc(it.weight || 'Vücut Ağırlığı')}
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="history-day-card">
            <div class="history-day-header">
              <span class="history-day-date">📅 ${esc(prettyDate)}</span>
              <span class="badge badge-info">${items.length} Hareket Yapıldı</span>
            </div>
            <div class="history-items-grid">
              ${itemChips}
            </div>
          </div>
        `;
      }).join('');

      openModal('workout-history-modal');
    }
  };

  const Schedule = Workout;

  // ═══════════════════════════════════════════════════════
  // ÜNİVERSİTE DEVAMSIZLIK TAKİBİ
  // ═══════════════════════════════════════════════════════


  const Attendance = {
    currentWeek: 1,
    totalWeeks: 14,
    _courses: [],
    _records: {},

    init() {
      // Önceki / Sonraki Hafta Butonları
      const prevBtn = $('#att-prev-week');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (this.currentWeek > 1) {
            this.currentWeek--;
            this.render();
          }
        });
      }

      const nextBtn = $('#att-next-week');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (this.currentWeek < this.totalWeeks) {
            this.currentWeek++;
            this.render();
          }
        });
      }

      // Ders Ekle Butonu
      const addBtn = $('#add-att-course-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => this.openCourseForm());
      }

      // Ders Formu Submit
      const form = $('#att-course-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveCourse();
        });
      }

      // Sıfırla / Varsayılanları Yükle
      const resetBtn = $('#reset-attendance-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          confirmAction('Tüm devamsızlık kayıtları ve dersler varsayılan 7 üniversite dersine sıfırlansın mı?', async () => {
            const courses = await apiFetch('/attendance/courses', 'POST', DEFAULT_ATT_COURSES);
            this._courses = courses || DEFAULT_ATT_COURSES;
            const allRecs = (await apiFetch('/attendance/records')) || [];
            for (const r of allRecs) {
              await apiFetch('/attendance/records', 'POST', { courseId: r.courseId, week: r.week, status: 'none' });
            }
            this._records = {};
            this.currentWeek = 1;
            await this.render();
            showToast('Varsayılan 7 ders yüklendi ✓', 'success');
          });
        });
      }
    },

    async loadData() {
      let courses = await apiFetch('/attendance/courses');
      if (!courses || courses.length === 0) {
        courses = await apiFetch('/attendance/courses', 'POST', DEFAULT_ATT_COURSES);
      }
      this._courses = courses || DEFAULT_ATT_COURSES;

      const recordsList = (await apiFetch('/attendance/records')) || [];
      const recordsDict = {};
      for (const r of recordsList) {
        if (!recordsDict[r.courseId]) recordsDict[r.courseId] = {};
        recordsDict[r.courseId][r.week] = r.status;
      }
      this._records = recordsDict;
    },

    getCourses() {
      return this._courses;
    },

    getRecords() {
      return this._records;
    },

    async setRecord(courseId, week, status) {
      if (!this._records[courseId]) this._records[courseId] = {};
      let nextStatus = status;
      if (this._records[courseId][week] === status) {
        delete this._records[courseId][week];
        nextStatus = 'none';
      } else {
        this._records[courseId][week] = status;
      }

      await apiFetch('/attendance/records', 'POST', { courseId, week, status: nextStatus });
      await this.render();

      const course = this.getCourses().find(c => c.id === courseId);
      const courseName = course ? course.code : 'Ders';
      const statusText = nextStatus === 'attended' ? 'Girdim ✅' : nextStatus === 'absent' ? 'Girmedim ❌' : nextStatus === 'cancelled' ? 'İptal/Tatil ⏸' : 'İşaret temizlendi';
      showToast(`${courseName} (${week}. Hafta): ${statusText}`, 'success');
    },

    async render() {
      await this.loadData();
      const courses = this.getCourses();
      const records = this.getRecords();

      // İstatistik Hesaplama
      let totalAttended = 0;
      let totalAbsent = 0;
      let riskCount = 0;

      courses.forEach(c => {
        const cRecs = records[c.id] || {};
        let cAbsent = 0;
        for (let w = 1; w <= this.totalWeeks; w++) {
          if (cRecs[w] === 'attended') totalAttended++;
          if (cRecs[w] === 'absent') {
            totalAbsent++;
            cAbsent++;
          }
        }
        const max = c.maxWeeks || 4;
        if (cAbsent >= max - 1 && cAbsent > 0) {
          riskCount++;
        }
      });

      const statCoursesEl = $('#stat-att-courses');
      if (statCoursesEl) statCoursesEl.textContent = courses.length;

      const statAttendedEl = $('#stat-att-attended');
      if (statAttendedEl) statAttendedEl.textContent = totalAttended;

      const statAbsentEl = $('#stat-att-absent');
      if (statAbsentEl) statAbsentEl.textContent = totalAbsent;

      const statRiskEl = $('#stat-att-risk');
      if (statRiskEl) statRiskEl.textContent = riskCount;

      // 14 Haftalık Matris Tablosu
      this.renderMatrixTable(courses, records);
    },

    renderCourseCards(courses, records, week) {
      const container = $('#att-courses-container');
      if (!container) return;

      const esc = Dashboard.escapeHtml;
      const dayOrder = { 'Pazartesi': 1, 'Salı': 2, 'Çarşamba': 3, 'Perşembe': 4, 'Cuma': 5, 'Cumartesi': 6, 'Pazar': 7 };
      const sorted = [...courses].sort((a, b) => (dayOrder[a.day] || 9) - (dayOrder[b.day] || 9));

      container.innerHTML = sorted.map(c => {
        const cRecs = records[c.id] || {};
        const currentStatus = cRecs[week] || null;

        let absentWeeks = 0;
        for (let w = 1; w <= this.totalWeeks; w++) {
          if (cRecs[w] === 'absent') absentWeeks++;
        }

        const maxWeeks = c.maxWeeks || 4;
        const remainingWeeks = Math.max(0, maxWeeks - absentWeeks);
        const absentHours = absentWeeks * (c.hours || 2);

        let statusBadge = '';
        let borderClass = 'att-status-safe';
        if (absentWeeks === 0) {
          statusBadge = `<span class="badge badge-success">🟢 Tertemiz (0/${maxWeeks} Hafta)</span>`;
        } else if (remainingWeeks > 1) {
          statusBadge = `<span class="badge badge-info">🟢 Kalan Hak: ${remainingWeeks} Hafta (${absentWeeks}/${maxWeeks})</span>`;
        } else if (remainingWeeks === 1) {
          borderClass = 'att-status-warning';
          statusBadge = `<span class="badge badge-warning">🟡 Dikkat: Son 1 Hafta Kaldı!</span>`;
        } else {
          borderClass = 'att-status-danger';
          statusBadge = `<span class="badge badge-danger">🔴 Kritik: Devamsızlık Sınırı Doldu!</span>`;
        }

        return `
          <div class="att-course-card glass-card ${borderClass}" data-id="${c.id}">
            <div class="att-card-header">
              <div class="att-code-tag">${esc(c.code)}</div>
              <div class="att-day-time-tag">
                <span class="att-day-badge">${esc(c.day)}</span>
                <span class="att-time-text">🕒 ${esc(c.time)} (${c.hours} Saat)</span>
              </div>
            </div>

            <h4 class="att-course-title">${esc(c.name)}</h4>

            <div class="att-summary-row">
              <div class="att-stat-item">
                <span class="att-stat-label">Toplam Devamsızlık</span>
                <span class="att-stat-val ${absentWeeks > 0 ? 'text-orange' : ''}"><strong>${absentWeeks}</strong> Hafta (${absentHours} Saat)</span>
              </div>
              <div class="att-stat-item">
                <span class="att-stat-label">Kalan Hak</span>
                <span class="att-stat-val"><strong>${remainingWeeks}</strong> Hafta (Maks: ${maxWeeks})</span>
              </div>
            </div>

            <div class="att-badge-row">
              ${statusBadge}
            </div>

            <div class="att-check-actions">
              <button class="att-btn att-btn-attended ${currentStatus === 'attended' ? 'selected' : ''}" 
                      data-id="${c.id}" data-status="attended">
                <span class="att-btn-icon">✅</span>
                <span>Derse Girdim</span>
              </button>
              <button class="att-btn att-btn-absent ${currentStatus === 'absent' ? 'selected' : ''}" 
                      data-id="${c.id}" data-status="absent">
                <span class="att-btn-icon">❌</span>
                <span>Girmedim</span>
              </button>
              <button class="att-btn att-btn-cancel ${currentStatus === 'cancelled' ? 'selected' : ''}" 
                      data-id="${c.id}" data-status="cancelled">
                <span class="att-btn-icon">⏸️</span>
                <span>Tatil / İptal</span>
              </button>
            </div>

            <div class="att-card-footer">
              <button class="btn btn-ghost btn-sm att-edit-btn" data-id="${c.id}">✏️ Düzenle</button>
              <button class="btn btn-ghost btn-sm att-del-btn" data-id="${c.id}">🗑️ Sil</button>
            </div>
          </div>
        `;
      }).join('');

      $$('.att-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const status = btn.dataset.status;
          this.setRecord(id, this.currentWeek, status);
        });
      });

      $$('.att-edit-btn').forEach(btn => {
        btn.addEventListener('click', () => this.openCourseForm(btn.dataset.id));
      });

      $$('.att-del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          confirmAction('Bu dersi ve tüm devamsızlık kayıtlarını silmek istiyor musunuz?', async () => {
            const list = this.getCourses().filter(c => c.id !== btn.dataset.id);
            await apiFetch('/attendance/courses', 'POST', list);
            this._courses = list;
            await this.render();
            showToast('Ders silindi', 'success');
          });
        });
      });
    },

    renderMatrixTable(courses, records) {
      const tbody = $('#att-matrix-tbody');
      if (!tbody) return;

      const esc = Dashboard.escapeHtml;

      tbody.innerHTML = courses.map(c => {
        const cRecs = records[c.id] || {};
        let absentCount = 0;

        let weekCells = '';
        for (let w = 1; w <= this.totalWeeks; w++) {
          const st = cRecs[w] || 'none';
          if (st === 'absent') absentCount++;

          let dotClass = 'none';
          let symbol = '·';
          let title = `${w}. Hafta: Henüz işlenmedi`;

          if (st === 'attended') {
            dotClass = 'attended';
            symbol = '✓';
            title = `${w}. Hafta: Derse Girdi`;
          } else if (st === 'absent') {
            dotClass = 'absent';
            symbol = '✗';
            title = `${w}. Hafta: GİRMEDİ (Devamsızlık)`;
          } else if (st === 'cancelled') {
            dotClass = 'cancelled';
            symbol = '⏸';
            title = `${w}. Hafta: İptal / Tatil`;
          }

          weekCells += `
            <td class="td-week" title="${title}">
              <button class="matrix-dot-btn ${dotClass}" data-course="${c.id}" data-week="${w}">
                ${symbol}
              </button>
            </td>
          `;
        }

        const max = c.maxWeeks || 4;
        const remaining = Math.max(0, max - absentCount);
        let badgeHtml = '';

        if (absentCount === 0) {
          badgeHtml = '<span class="status-pill safe">Güvende</span>';
        } else if (remaining > 1) {
          badgeHtml = `<span class="status-pill safe">${remaining} Hak Var</span>`;
        } else if (remaining === 1) {
          badgeHtml = '<span class="status-pill warn">Son 1 Hak!</span>';
        } else {
          badgeHtml = '<span class="status-pill danger">Kaldı / Sınır</span>';
        }

        return `
          <tr>
            <td class="td-course-name">
              <strong>${esc(c.code)}</strong>
              <small class="course-subname">${esc(c.name)}</small>
            </td>
            <td class="td-course-day">${esc(c.day)}<br><small>${esc(c.time)}</small></td>
            ${weekCells}
            <td class="td-stat-num text-orange"><strong>${absentCount}</strong> hf</td>
            <td class="td-stat-num"><strong>${max}</strong> hf</td>
            <td class="td-status-cell">${badgeHtml}</td>
            <td class="td-actions-cell">
              <button type="button" class="att-tbl-btn att-tbl-edit" data-id="${c.id}" title="Dersi Düzenle">✏️</button>
              <button type="button" class="att-tbl-btn att-tbl-del" data-id="${c.id}" title="Dersi Sil">🗑️</button>
            </td>
          </tr>
        `;
      }).join('');

      // Tablodaki yuvarlaklara doğrudan tıklayınca anında durum değiştir
      $$('.matrix-dot-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          const courseId = btn.dataset.course;
          const w = parseInt(btn.dataset.week, 10);

          const records = this.getRecords();
          const currentStatus = (records[courseId] && records[courseId][w]) || 'none';

          let nextStatus = 'none';
          if (currentStatus === 'none') {
            nextStatus = 'attended';
          } else if (currentStatus === 'attended') {
            nextStatus = 'absent';
          } else if (currentStatus === 'absent') {
            nextStatus = 'cancelled';
          } else {
            nextStatus = 'none';
          }

          if (nextStatus === 'none') {
            delete records[courseId][w];
          } else {
            if (!records[courseId]) records[courseId] = {};
            records[courseId][w] = nextStatus;
          }

          await apiFetch('/attendance/records', 'POST', { courseId, week: w, status: nextStatus });

          this.currentWeek = w;
          await this.render();

          const course = this.getCourses().find(c => c.id === courseId);
          const cCode = course ? course.code : 'Ders';
          if (nextStatus === 'attended') {
            showToast(`${cCode} • ${w}. Hafta: Derse Girdim ✅`, 'success');
          } else if (nextStatus === 'absent') {
            showToast(`${cCode} • ${w}. Hafta: Gitmedim ❌ (Devamsızlık yazıldı)`, 'error');
          } else if (nextStatus === 'cancelled') {
            showToast(`${cCode} • ${w}. Hafta: Tatil / İptal ⏸️`, 'info');
          } else {
            showToast(`${cCode} • ${w}. Hafta: İşaret temizlendi`, 'info');
          }
        });
      });

      // Ders Düzenle & Sil Butonları
      $$('.att-tbl-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCourseForm(btn.dataset.id);
        });
      });

      $$('.att-tbl-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          confirmAction('Bu dersi ve tüm devamsızlık kayıtlarını silmek istiyor musunuz?', async () => {
            const list = this.getCourses().filter(c => c.id !== btn.dataset.id);
            await apiFetch('/attendance/courses', 'POST', list);
            this._courses = list;
            await this.render();
            showToast('Ders silindi', 'success');
          });
        });
      });
    },

    openCourseForm(editId) {
      const form = $('#att-course-form');
      if (!form) return;
      form.reset();

      if (editId) {
        const c = this.getCourses().find(x => x.id === editId);
        if (!c) return;
        $('#att-course-modal-title').textContent = 'Dersi Düzenle';
        $('#att-course-id').value = c.id;
        $('#att-code').value = c.code;
        $('#att-name').value = c.name;
        $('#att-day').value = c.day;
        $('#att-time').value = c.time;
        $('#att-hours').value = c.hours || 2;
        $('#att-max-weeks').value = c.maxWeeks || 4;
      } else {
        $('#att-course-modal-title').textContent = 'Yeni Üniversite Dersi';
        $('#att-course-id').value = '';
        $('#att-day').value = 'Pazartesi';
        $('#att-hours').value = 2;
        $('#att-max-weeks').value = 4;
      }

      openModal('att-course-modal');
    },

    async saveCourse() {
      const id = $('#att-course-id').value;
      const code = $('#att-code').value.trim();
      const name = $('#att-name').value.trim();
      const day = $('#att-day').value;
      const time = $('#att-time').value.trim();
      const hours = parseInt($('#att-hours').value, 10) || 2;
      const maxWeeks = parseInt($('#att-max-weeks').value, 10) || 4;

      if (!code || !name) return;

      const courses = [...this.getCourses()];

      if (id) {
        const c = courses.find(x => x.id === id);
        if (c) {
          c.code = code;
          c.name = name;
          c.day = day;
          c.time = time;
          c.hours = hours;
          c.maxWeeks = maxWeeks;
        }
      } else {
        courses.push({
          id: 'att-' + uid(),
          code,
          name,
          day,
          time,
          hours,
          maxWeeks
        });
      }

      await apiFetch('/attendance/courses', 'POST', courses);
      this._courses = courses;
      closeModal('att-course-modal');
      await this.render();
      showToast(id ? 'Ders güncellendi' : 'Yeni ders eklendi', 'success');
    }
  };

  // ═══════════════════════════════════════════════════════
  // KİTAPLIĞIM & OKUMA TAKİBİ SİSTEMİ
  // ═══════════════════════════════════════════════════════

  const Books = {
    currentTab: 'library',
    statusFilter: 'all',
    categoryFilter: 'all',
    searchQuery: '',
    analyticsRange: 'daily',
    _books: [],
    _sessions: [],
    _goals: { dailyPages: 20, weeklyPages: 150, dailyMinutes: 30 },

    init() {
      // Kullanıcının kendi kitaplarını ekleyebilmesi için önceki demo kitapları temizle
      if (!Storage.get('asi_user_own_books_clean', false)) {
        Storage.set('asi_books', []);
        Storage.set('asi_reading_sessions', []);
        Storage.set('asi_user_own_books_clean', true);
      }

      // Sekme geçişleri
      $$('.book-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tab;
          if (!tab) return;
          this.currentTab = tab;

          $$('.book-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
          $$('.book-tab-content').forEach(c => {
            const isTarget = c.id === `book-tab-content-${tab}`;
            c.classList.toggle('active', isTarget);
            c.classList.toggle('hidden', !isTarget);
          });

          if (tab === 'library') this.renderBookGrid();
          else if (tab === 'analytics') this.renderAnalytics();
          else if (tab === 'sessions') this.renderSessions();
        });
      });

      // Arama
      const searchInput = $('#book-search-input');
      const searchClear = $('#book-search-clear');
      if (searchInput) {
        searchInput.addEventListener('input', () => {
          this.searchQuery = searchInput.value.toLowerCase().trim();
          if (searchClear) searchClear.classList.toggle('hidden', !this.searchQuery);
          this.renderBookGrid();
        });
      }
      if (searchClear) {
        searchClear.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchClear.classList.add('hidden');
          this.searchQuery = '';
          this.renderBookGrid();
        });
      }

      // Durum filtre hapları
      $$('.book-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.statusFilter = btn.dataset.status || 'all';
          $$('.book-pill-btn').forEach(b => b.classList.toggle('active', b === btn));
          this.renderBookGrid();
        });
      });

      // Tür / Kategori filtresi
      const catFilter = $('#book-category-filter');
      if (catFilter) {
        catFilter.addEventListener('change', () => {
          this.categoryFilter = catFilter.value;
          this.renderBookGrid();
        });
      }

      // Analiz Zaman Aralığı Hapları
      $$('.analytics-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.analyticsRange = btn.dataset.range || 'daily';
          $$('.analytics-pill-btn').forEach(b => b.classList.toggle('active', b === btn));
          this.renderAnalytics();
        });
      });

      // Modal açma butonları
      $('#add-book-btn')?.addEventListener('click', () => this.openBookModal());
      $('#add-book-session-btn')?.addEventListener('click', () => this.openSessionModal());
      $('#sessions-add-btn')?.addEventListener('click', () => this.openSessionModal());
      $('#set-book-goals-btn')?.addEventListener('click', () => this.openGoalsModal());
      $('#quick-edit-goals-btn')?.addEventListener('click', () => this.openGoalsModal());

      // Kitap Formu
      $('#book-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveBook();
      });

      // Kapak resmi okuyucu (Base64)
      $('#book-cover-input')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataInput = $('#book-cover-data');
            if (dataInput) dataInput.value = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      // Oturum Formu
      $('#book-session-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveSession();
      });

      // Oturum sayfa hesaplayıcı
      const startInput = $('#session-start-page');
      const endInput = $('#session-end-page');
      const pagesReadInput = $('#session-pages-read');
      const bookSelect = $('#session-book-select');

      const updatePagesCalc = () => {
        const start = parseInt(startInput?.value, 10) || 0;
        const end = parseInt(endInput?.value, 10) || 0;
        if (end >= start && pagesReadInput) {
          pagesReadInput.value = end - start;
        }
      };

      startInput?.addEventListener('input', updatePagesCalc);
      endInput?.addEventListener('input', updatePagesCalc);

      bookSelect?.addEventListener('change', () => {
        const selectedId = bookSelect.value;
        const book = this._books.find(b => b.id === selectedId);
        if (book && startInput && endInput) {
          const cur = book.currentPage || 0;
          startInput.value = cur;
          endInput.value = Math.min(book.totalPages || cur + 20, cur + 20);
          updatePagesCalc();
        }
      });

      // Hedefler Formu
      $('#book-goals-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveGoals();
      });
    },

    async loadData() {
      const [books, sessions, goals] = await Promise.all([
        apiFetch('/books'),
        apiFetch('/reading/sessions'),
        apiFetch('/reading/goals')
      ]);
      this._books = books || [];
      this._sessions = sessions || [];
      this._goals = goals || DEFAULT_READING_GOALS;
    },

    async render() {
      await this.loadData();
      this.renderStats();
      this.renderGoalsCard();
      this.renderPillCounts();

      if (this.currentTab === 'library') {
        this.renderBookGrid();
      } else if (this.currentTab === 'analytics') {
        this.renderAnalytics();
      } else if (this.currentTab === 'sessions') {
        this.renderSessions();
      }
    },

    renderStats() {
      const totalPages = this._sessions.reduce((acc, s) => acc + (s.pagesRead || 0), 0);
      const totalMins = this._sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
      const readingCount = this._books.filter(b => b.status === 'reading').length;
      const completedCount = this._books.filter(b => b.status === 'completed').length;
      const activeDays = new Set(this._sessions.map(s => s.date)).size;

      const hours = (totalMins / 60).toFixed(1);
      const timeStr = totalMins >= 60 ? `${hours} sa` : `${totalMins} dk`;

      const tpEl = $('#stat-book-total-pages');
      if (tpEl) tpEl.textContent = totalPages.toLocaleString('tr-TR');

      const ttEl = $('#stat-book-total-time');
      if (ttEl) ttEl.textContent = timeStr;

      const rcEl = $('#stat-book-reading-count');
      if (rcEl) rcEl.textContent = readingCount;

      const ccEl = $('#stat-book-completed-count');
      if (ccEl) ccEl.textContent = completedCount;

      const adEl = $('#stat-book-active-days');
      if (adEl) adEl.textContent = `${activeDays} gün`;

      const sBadge = $('#sessions-count-badge');
      if (sBadge) sBadge.textContent = this._sessions.length;
    },

    renderGoalsCard() {
      const todayStr = formatDateShort(new Date());
      const mondayStr = formatDateShort(getMonday(new Date()));

      // Bugün okunan
      const todaySessions = this._sessions.filter(s => s.date === todayStr);
      const todayPages = todaySessions.reduce((acc, s) => acc + (s.pagesRead || 0), 0);
      const todayMins = todaySessions.reduce((acc, s) => acc + (s.duration || 0), 0);

      // Bu hafta okunan (Pazartesiden itibaren)
      const weekSessions = this._sessions.filter(s => (s.date || '') >= mondayStr);
      const weekPages = weekSessions.reduce((acc, s) => acc + (s.pagesRead || 0), 0);

      const g = this._goals || DEFAULT_READING_GOALS;
      const dailyPagesGoal = g.dailyPages || 20;
      const weeklyPagesGoal = g.weeklyPages || 150;
      const dailyMinsGoal = g.dailyMinutes || 30;

      const dailyPagesPct = Math.min(100, Math.round((todayPages / dailyPagesGoal) * 100));
      const weeklyPagesPct = Math.min(100, Math.round((weekPages / weeklyPagesGoal) * 100));
      const dailyMinsPct = Math.min(100, Math.round((todayMins / dailyMinsGoal) * 100));

      const dpText = $('#goal-daily-pages-text');
      if (dpText) dpText.textContent = `${todayPages} / ${dailyPagesGoal} sayfa (%${dailyPagesPct})`;
      const dpBar = $('#goal-daily-pages-bar');
      if (dpBar) dpBar.style.width = `${dailyPagesPct}%`;

      const wpText = $('#goal-weekly-pages-text');
      if (wpText) wpText.textContent = `${weekPages} / ${weeklyPagesGoal} sayfa (%${weeklyPagesPct})`;
      const wpBar = $('#goal-weekly-pages-bar');
      if (wpBar) wpBar.style.width = `${weeklyPagesPct}%`;

      const dtText = $('#goal-daily-time-text');
      if (dtText) dtText.textContent = `${todayMins} / ${dailyMinsGoal} dk (%${dailyMinsPct})`;
      const dtBar = $('#goal-daily-time-bar');
      if (dtBar) dtBar.style.width = `${dailyMinsPct}%`;

      const descEl = $('#book-goals-status-desc');
      if (descEl) {
        if (dailyPagesPct >= 100 && weeklyPagesPct >= 100) {
          descEl.textContent = '🎉 Mükemmel! Bugün ve bu haftaki tüm okuma hedeflerine ulaştın!';
        } else if (dailyPagesPct >= 100) {
          descEl.textContent = `🔥 Harika! Bugünkü sayfa hedefine (%100) ulaştın. Haftalık hedefe ${Math.max(0, weeklyPagesGoal - weekPages)} sayfa kaldı.`;
        } else if (todayPages > 0) {
          descEl.textContent = `💪 Bugün ${todayPages} sayfa okudun. Günlük hedefine ulaşmak için ${Math.max(0, dailyPagesGoal - todayPages)} sayfa daha oku.`;
        } else {
          descEl.textContent = `Bugün henüz okuma yapmadın. Hedefine başlamak için oturum kaydet!`;
        }
      }
    },

    renderPillCounts() {
      const allCount = this._books.length;
      const readingCount = this._books.filter(b => b.status === 'reading').length;
      const toReadCount = this._books.filter(b => b.status === 'to_read').length;
      const completedCount = this._books.filter(b => b.status === 'completed').length;
      const onHoldCount = this._books.filter(b => b.status === 'on_hold').length;

      const setVal = (id, val) => {
        const el = $(id);
        if (el) el.textContent = val;
      };

      setVal('#pill-count-all', allCount);
      setVal('#pill-count-reading', readingCount);
      setVal('#pill-count-to-read', toReadCount);
      setVal('#pill-count-completed', completedCount);
      setVal('#pill-count-on-hold', onHoldCount);
    },

    renderBookGrid() {
      const grid = $('#book-grid');
      if (!grid) return;

      let list = [...this._books];

      // Filtreleme
      if (this.statusFilter !== 'all') {
        list = list.filter(b => b.status === this.statusFilter);
      }
      if (this.categoryFilter !== 'all') {
        list = list.filter(b => b.category === this.categoryFilter);
      }
      if (this.searchQuery) {
        const q = this.searchQuery;
        list = list.filter(b =>
          (b.title && b.title.toLowerCase().includes(q)) ||
          (b.author && b.author.toLowerCase().includes(q)) ||
          (b.category && b.category.toLowerCase().includes(q))
        );
      }

      if (this._books.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:3.5rem; margin-bottom:0.75rem;">📚</div>
            <p style="font-size:1.25rem; font-weight:700; color:var(--text-primary); margin-bottom:0.35rem;">Kitaplığınız Henüz Boş</p>
            <p style="font-size:0.95rem; color:var(--text-secondary); max-width:440px; margin:0 auto 1.25rem;">Okuduğunuz veya okumak istediğiniz kitapları ekleyerek kişisel kütüphanenizi oluşturmaya hemen başlayabilirsiniz.</p>
            <button class="btn btn-primary btn-md" onclick="Books.openBookModal()">+ İlk Kitabını Ekle</button>
          </div>
        `;
        return;
      }

      if (list.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1; padding: 4rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:3rem; margin-bottom:0.75rem;">🔍</div>
            <p style="font-size:1.1rem; font-weight:600; color:var(--text-primary);">Aramanıza uygun kitap bulunamadı</p>
            <p style="font-size:0.9rem;">Filtreleri değiştirebilir veya yeni bir kitap ekleyebilirsiniz.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="Books.openBookModal()">+ Yeni Kitap Ekle</button>
          </div>
        `;
        return;
      }

      const esc = Dashboard.escapeHtml;
      const statusLabels = {
        reading: { text: '📖 Okunuyor', cls: 'badge-info' },
        to_read: { text: '⏳ Okunacak', cls: 'badge-warning' },
        completed: { text: '✅ Tamamlandı', cls: 'badge-success' },
        on_hold: { text: '⏸️ Ara Verildi', cls: 'badge-secondary' }
      };

      grid.innerHTML = list.map(b => {
        const cur = b.currentPage || 0;
        const total = b.totalPages || 100;
        const pct = total > 0 ? Math.min(100, Math.round((cur / total) * 100)) : 0;
        const st = statusLabels[b.status] || { text: b.status, cls: 'badge-info' };

        // Kapak görseli veya renkli şık kart
        let coverHtml = '';
        if (b.coverImage) {
          coverHtml = `<div class="book-cover-img" style="background-image: url('${b.coverImage}');"></div>`;
        } else {
          coverHtml = `
            <div class="book-cover-placeholder" style="background: linear-gradient(135deg, ${b.coverColor || '#0284C7'}, #0f172a);">
              <span class="cover-icon">📖</span>
              <span class="cover-mini-title">${esc(b.title)}</span>
            </div>
          `;
        }

        // Yıldızlar
        const stars = b.rating > 0 ? '⭐'.repeat(b.rating) : '';

        return `
          <div class="book-card glass-card" data-id="${b.id}">
            <div class="book-card-top">
              ${coverHtml}
              <div class="book-card-main-info">
                <div class="book-status-row">
                  <span class="badge ${st.cls}">${st.text}</span>
                  <span class="book-cat-tag">${esc(b.category || 'Genel')}</span>
                </div>
                <h4 class="book-card-title" title="${esc(b.title)}">${esc(b.title)}</h4>
                <p class="book-card-author">✍️ ${esc(b.author || 'Bilinmeyen Yazar')}</p>
                ${stars ? `<div class="book-card-rating">${stars}</div>` : ''}
              </div>
            </div>

            <!-- İlerleme Çubuğu -->
            <div class="book-card-progress-wrap">
              <div class="book-progress-labels">
                <span><strong>${cur}</strong> / ${total} sayfa</span>
                <span class="book-pct-tag">%${pct}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill ${pct === 100 ? 'progress-fill-success' : ''}" style="width: ${pct}%;"></div>
              </div>
            </div>

            <!-- Kart Altı Aksiyonları -->
            <div class="book-card-footer">
              <button type="button" class="btn btn-sm btn-ghost btn-session-quick" data-id="${b.id}" title="Okuma Oturumu Ekle">
                ⏱️ Oku
              </button>
              <button type="button" class="btn btn-sm btn-ghost btn-detail-quick" data-id="${b.id}" title="Detay & İstatistik">
                ℹ️ Detay
              </button>
              <div class="book-card-icons">
                <button type="button" class="book-action-icon edit-book-btn" data-id="${b.id}" title="Düzenle">✏️</button>
                <button type="button" class="book-action-icon del-book-btn" data-id="${b.id}" title="Sil">🗑️</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      this.bindGridEvents();
    },

    bindGridEvents() {
      // Hızlı Okuma Oturumu Ekle
      $$('.btn-session-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openSessionModal(btn.dataset.id);
        });
      });

      // Detay Modalı
      $$('.btn-detail-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDetailModal(btn.dataset.id);
        });
      });

      // Düzenle
      $$('.edit-book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openBookModal(btn.dataset.id);
        });
      });

      // Sil
      $$('.del-book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const bookId = btn.dataset.id;
          const book = this._books.find(b => b.id === bookId);
          confirmAction(`"${book?.title || 'Bu kitap'}" ve ilgili tüm okuma oturumlarını silmek istediğinize emin misiniz?`, async () => {
            const res = await apiFetch(`/books/${bookId}`, 'DELETE');
            if (res) {
              await this.render();
              showToast('Kitap silindi', 'success');
            }
          });
        });
      });
    },

    // ─── Grafikler ve Raporlar (Pure Vanilla Canvas & Heatmap) ───
    renderAnalytics() {
      const sessions = [...this._sessions];
      const range = this.analyticsRange;

      // Döneme göre filtre ve grupla
      let chartData = [];
      let totalPages = 0;
      let totalMins = 0;
      let daysCount = 14;

      const now = new Date();

      if (range === 'daily') {
        // Son 14 Gün
        daysCount = 14;
        const days = [];
        for (let i = 13; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateStr = formatDateShort(d);
          const label = `${d.getDate()} ${['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][d.getMonth()]}`;
          days.push({ dateStr, label, pages: 0, mins: 0 });
        }

        sessions.forEach(s => {
          const target = days.find(d => d.dateStr === s.date);
          if (target) {
            target.pages += (s.pagesRead || 0);
            target.mins += (s.duration || 0);
          }
        });

        chartData = days;
        totalPages = chartData.reduce((acc, d) => acc + d.pages, 0);
        totalMins = chartData.reduce((acc, d) => acc + d.mins, 0);

        $('#chart-main-title').textContent = '📊 Günlük Okuma Grafiği (Son 14 Gün)';
        $('#chart-main-subtitle').textContent = 'Her gün okunan sayfa sayıları';
      } else if (range === 'weekly') {
        // Son 8 Hafta
        daysCount = 56;
        const weeks = [];
        for (let i = 7; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i * 7);
          const mon = getMonday(d);
          const monStr = formatDateShort(mon);
          const endD = new Date(mon);
          endD.setDate(endD.getDate() + 6);
          const endStr = formatDateShort(endD);
          const label = `${mon.getDate()}/${mon.getMonth()+1}`;
          weeks.push({ monStr, endStr, label, pages: 0, mins: 0 });
        }

        sessions.forEach(s => {
          const target = weeks.find(w => s.date >= w.monStr && s.date <= w.endStr);
          if (target) {
            target.pages += (s.pagesRead || 0);
            target.mins += (s.duration || 0);
          }
        });

        chartData = weeks;
        totalPages = chartData.reduce((acc, w) => acc + w.pages, 0);
        totalMins = chartData.reduce((acc, w) => acc + w.mins, 0);

        $('#chart-main-title').textContent = '📊 Haftalık Okuma Grafiği (Son 8 Hafta)';
        $('#chart-main-subtitle').textContent = 'Hafta bazında okunan toplam sayfa sayıları';
      } else if (range === 'monthly') {
        // Son 6 Ay
        daysCount = 180;
        const months = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          const label = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'][d.getMonth()];
          months.push({ monthKey, label, pages: 0, mins: 0 });
        }

        sessions.forEach(s => {
          if (s.date) {
            const mKey = s.date.substring(0, 7);
            const target = months.find(m => m.monthKey === mKey);
            if (target) {
              target.pages += (s.pagesRead || 0);
              target.mins += (s.duration || 0);
            }
          }
        });

        chartData = months;
        totalPages = chartData.reduce((acc, m) => acc + m.pages, 0);
        totalMins = chartData.reduce((acc, m) => acc + m.mins, 0);

        $('#chart-main-title').textContent = '📊 Aylık Okuma Grafiği (Son 6 Ay)';
        $('#chart-main-subtitle').textContent = 'Aylara göre okunan sayfa sayıları';
      } else {
        // Tüm Zamanlar / Yıllık
        daysCount = Math.max(1, new Set(sessions.map(s => s.date)).size);
        const map = new Map();
        sessions.forEach(s => {
          const yr = (s.date || '').substring(0, 4) || '2026';
          if (!map.has(yr)) map.set(yr, { label: yr, pages: 0, mins: 0 });
          const cur = map.get(yr);
          cur.pages += (s.pagesRead || 0);
          cur.mins += (s.duration || 0);
        });

        chartData = Array.from(map.values());
        if (chartData.length === 0) {
          chartData = [{ label: '2026', pages: 0, mins: 0 }];
        }
        totalPages = chartData.reduce((acc, y) => acc + y.pages, 0);
        totalMins = chartData.reduce((acc, y) => acc + y.mins, 0);

        $('#chart-main-title').textContent = '📊 Genel Okuma Grafiği';
        $('#chart-main-subtitle').textContent = 'Yıllara göre okuma dağılımı';
      }

      // Seçili dönem metriklerini güncelle
      const avgPages = daysCount > 0 ? (totalPages / daysCount).toFixed(1) : 0;
      const expectedPages = daysCount * (this._goals?.dailyPages || 20);
      const goalPct = expectedPages > 0 ? Math.min(100, Math.round((totalPages / expectedPages) * 100)) : 0;

      const ppEl = $('#analytics-period-pages');
      if (ppEl) ppEl.textContent = `${totalPages.toLocaleString('tr-TR')} Sayfa`;

      const ptEl = $('#analytics-period-time');
      if (ptEl) ptEl.textContent = totalMins >= 60 ? `${(totalMins / 60).toFixed(1)} sa (${totalMins} dk)` : `${totalMins} dk`;

      const paEl = $('#analytics-period-avg-pages');
      if (paEl) paEl.textContent = `${avgPages} sayfa/gün`;

      const pgEl = $('#analytics-period-goal-pct');
      if (pgEl) pgEl.textContent = `%${goalPct}`;

      // Çizimler
      this.drawPagesChart(chartData);
      this.drawStatusDonut();
      this.renderHeatmap();
    },

    drawPagesChart(data) {
      const canvas = $('#chart-pages-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (!data || data.length === 0) return;

      const maxVal = Math.max(...data.map(d => d.pages), 10);
      const paddingLeft = 45;
      const paddingBottom = 40;
      const paddingTop = 25;
      const paddingRight = 20;

      const chartW = w - paddingLeft - paddingRight;
      const chartH = h - paddingTop - paddingBottom;

      // Yatay kılavuz çizgileri
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.font = '11px sans-serif';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.textAlign = 'right';

      const gridSteps = 4;
      for (let i = 0; i <= gridSteps; i++) {
        const yVal = Math.round((maxVal / gridSteps) * i);
        const yPos = h - paddingBottom - (chartH / gridSteps) * i;

        ctx.beginPath();
        ctx.moveTo(paddingLeft, yPos);
        ctx.lineTo(w - paddingRight, yPos);
        ctx.stroke();

        ctx.fillText(yVal.toString(), paddingLeft - 8, yPos + 4);
      }

      // Çubuklar
      const barCount = data.length;
      const gap = Math.max(6, Math.min(18, chartW / (barCount * 3)));
      const barWidth = Math.max(12, (chartW - (barCount - 1) * gap) / barCount);

      data.forEach((item, idx) => {
        const xPos = paddingLeft + idx * (barWidth + gap);
        const barHeight = maxVal > 0 ? (item.pages / maxVal) * chartH : 0;
        const yPos = h - paddingBottom - barHeight;

        // Degrade dolgu
        const grad = ctx.createLinearGradient(0, yPos, 0, h - paddingBottom);
        grad.addColorStop(0, '#06B6D4');
        grad.addColorStop(1, '#6366F1');

        ctx.fillStyle = grad;

        // Yuvarlatılmış sütun başı
        if (barHeight > 4) {
          ctx.beginPath();
          const r = Math.min(4, barWidth / 2);
          ctx.moveTo(xPos + r, yPos);
          ctx.lineTo(xPos + barWidth - r, yPos);
          ctx.quadraticCurveTo(xPos + barWidth, yPos, xPos + barWidth, yPos + r);
          ctx.lineTo(xPos + barWidth, h - paddingBottom);
          ctx.lineTo(xPos, h - paddingBottom);
          ctx.lineTo(xPos, yPos + r);
          ctx.quadraticCurveTo(xPos, yPos, xPos + r, yPos);
          ctx.closePath();
          ctx.fill();
        } else if (barHeight > 0) {
          ctx.fillRect(xPos, yPos, barWidth, barHeight);
        }

        // Çubuk üstü değer etiketi
        if (item.pages > 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.pages.toString(), xPos + barWidth / 2, yPos - 5);
        }

        // X ekseni etiketi
        ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, xPos + barWidth / 2, h - 15);
      });
    },

    drawStatusDonut() {
      const canvas = $('#chart-status-canvas');
      const legend = $('#chart-status-legend');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const statusMap = {
        reading: { label: 'Okunuyor', color: '#06B6D4', count: 0 },
        to_read: { label: 'Okunacak', color: '#F59E0B', count: 0 },
        completed: { label: 'Tamamlandı', color: '#10B981', count: 0 },
        on_hold: { label: 'Ara Verildi', color: '#64748B', count: 0 }
      };

      this._books.forEach(b => {
        if (statusMap[b.status]) statusMap[b.status].count++;
      });

      const total = this._books.length;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 25;
      const innerRadius = radius * 0.58;

      if (total === 0) {
        // Boş halka
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 24;
        ctx.beginPath();
        ctx.arc(cx, cy, radius - 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Kitap Yok', cx, cy + 4);

        if (legend) legend.innerHTML = '<span class="text-muted">Henüz kitap eklenmedi</span>';
        return;
      }

      let startAngle = -Math.PI / 2;
      const entries = Object.entries(statusMap);

      entries.forEach(([_, item]) => {
        if (item.count === 0) return;
        const sliceAngle = (item.count / total) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        startAngle = endAngle;
      });

      // Ortadaki Metin
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(total.toString(), cx, cy);

      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.font = '11px sans-serif';
      ctx.fillText('Toplam Kitap', cx, cy + 18);

      // Lejant HTML
      if (legend) {
        legend.innerHTML = entries.map(([_, item]) => {
          const pct = Math.round((item.count / total) * 100);
          return `
            <div class="donut-legend-item">
              <span class="legend-color-dot" style="background-color: ${item.color};"></span>
              <span class="legend-label">${item.label}:</span>
              <strong>${item.count} (%${pct})</strong>
            </div>
          `;
        }).join('');
      }
    },

    renderHeatmap() {
      const container = $('#reading-heatmap-container');
      if (!container) return;

      const dateMap = new Map();
      this._sessions.forEach(s => {
        if (!s.date) return;
        if (!dateMap.has(s.date)) dateMap.set(s.date, { pages: 0, mins: 0, count: 0 });
        const cur = dateMap.get(s.date);
        cur.pages += (s.pagesRead || 0);
        cur.mins += (s.duration || 0);
        cur.count++;
      });

      // Son 90 gün (bugün dahil geriye doğru)
      const days = [];
      const now = new Date();
      for (let i = 89; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = formatDateShort(d);
        const data = dateMap.get(dateStr) || { pages: 0, mins: 0, count: 0 };
        days.push({
          date: d,
          dateStr,
          pages: data.pages,
          mins: data.mins,
          count: data.count
        });
      }

      container.innerHTML = days.map(d => {
        let level = 0;
        if (d.pages > 50) level = 4;
        else if (d.pages > 25) level = 3;
        else if (d.pages > 10) level = 2;
        else if (d.pages > 0) level = 1;

        const prettyDate = formatDate(d.date);
        const tooltip = d.pages > 0
          ? `${prettyDate}: ${d.pages} sayfa (${d.mins} dk, ${d.count} oturum)`
          : `${prettyDate}: Okuma yapılmadı`;

        return `
          <div class="heatmap-cell level-${level}" title="${tooltip}" data-date="${d.dateStr}"></div>
        `;
      }).join('');
    },

    // ─── Okuma Oturumları Geçmişi Listesi ───
    renderSessions() {
      const listEl = $('#book-sessions-list');
      if (!listEl) return;

      const sessions = [...this._sessions].sort((a, b) =>
        (b.date || '').localeCompare(a.date || '') || (b.timestamp || 0) - (a.timestamp || 0)
      );

      if (sessions.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state" style="padding: 3.5rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:3rem; margin-bottom:0.75rem;">⏱️</div>
            <p style="font-size:1.1rem; font-weight:600; color:var(--text-primary);">Henüz kayıtlı okuma oturumu yok</p>
            <p style="font-size:0.9rem;">Kitap okudukça sayfa ve süre oturumlarını kaydedebilirsiniz.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="Books.openSessionModal()">+ İlk Oturumu Ekle</button>
          </div>
        `;
        return;
      }

      const esc = Dashboard.escapeHtml;

      listEl.innerHTML = sessions.map(s => {
        let datePretty = s.date;
        try {
          const parts = s.date.split('-');
          datePretty = formatDate(new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
        } catch (_) {}

        return `
          <div class="book-session-card glass-card" data-id="${s.id}">
            <div class="session-card-left">
              <span class="session-icon">📖</span>
              <div class="session-main-info">
                <h4 class="session-book-title">${esc(s.bookTitle || 'Kitap')}</h4>
                <div class="session-meta-row">
                  <span class="session-date-tag">📅 ${esc(datePretty)}</span>
                  <span>•</span>
                  <span class="session-pages-tag">📄 <strong>${s.pagesRead || 0}</strong> Sayfa (${s.startPage || 0} - ${s.endPage || 0})</span>
                  <span>•</span>
                  <span class="session-time-tag">⏱️ <strong>${s.duration || 0}</strong> Dk</span>
                </div>
                ${s.notes ? `<p class="session-notes-text">💬 ${esc(s.notes)}</p>` : ''}
              </div>
            </div>
            <div class="session-card-actions">
              <button type="button" class="btn btn-ghost btn-sm del-session-btn" data-id="${s.id}" title="Oturumu Sil">🗑️</button>
            </div>
          </div>
        `;
      }).join('');

      $$('.del-session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          confirmAction('Bu okuma oturumunu silmek istediğinize emin misiniz?', async () => {
            const res = await apiFetch(`/reading/sessions/${id}`, 'DELETE');
            if (res) {
              await this.render();
              showToast('Okuma oturumu silindi', 'success');
            }
          });
        });
      });
    },

    // ─── Modallar & CRUD ───
    openBookModal(editId = null) {
      const form = $('#book-form');
      if (!form) return;
      form.reset();

      const titleEl = $('#book-modal-title');
      const idInput = $('#book-id');
      const coverData = $('#book-cover-data');
      if (coverData) coverData.value = '';

      if (editId) {
        const book = this._books.find(b => b.id === editId);
        if (!book) return;
        if (titleEl) titleEl.textContent = 'Kitabı Düzenle';
        if (idInput) idInput.value = book.id;
        $('#book-title').value = book.title || '';
        $('#book-author').value = book.author || '';
        $('#book-category').value = book.category || 'Roman / Edebiyat';
        $('#book-total-pages').value = book.totalPages || 300;
        $('#book-current-page').value = book.currentPage || 0;
        $('#book-status').value = book.status || 'reading';
        $('#book-rating').value = book.rating || 0;
        $('#book-start-date').value = book.startDate || '';
        $('#book-finish-date').value = book.finishDate || '';
        $('#book-notes').value = book.notes || '';
        if (coverData) coverData.value = book.coverImage || '';
      } else {
        if (titleEl) titleEl.textContent = 'Yeni Kitap Ekle';
        if (idInput) idInput.value = '';
        $('#book-title').value = '';
        $('#book-author').value = '';
        $('#book-category').value = 'Polisiye / Dedektif';
        $('#book-total-pages').value = 300;
        $('#book-current-page').value = 0;
        $('#book-status').value = 'reading';
        $('#book-rating').value = 0;
        $('#book-start-date').value = formatDateShort(new Date());
        $('#book-finish-date').value = '';
        $('#book-notes').value = '';
      }

      openModal('book-modal');
    },

    async saveBook() {
      const id = $('#book-id').value;
      const title = $('#book-title').value.trim();
      const author = $('#book-author').value.trim();
      const category = $('#book-category').value;
      const totalPages = parseInt($('#book-total-pages').value, 10) || 100;
      const currentPage = parseInt($('#book-current-page').value, 10) || 0;
      const status = $('#book-status').value;
      const rating = parseInt($('#book-rating').value, 10) || 0;
      const startDate = $('#book-start-date').value;
      const finishDate = $('#book-finish-date').value;
      const notes = $('#book-notes').value.trim();
      const coverImage = $('#book-cover-data')?.value || '';

      if (!title) {
        showToast('Lütfen kitap adını girin', 'error');
        return;
      }

      const bookData = {
        title,
        author: author || 'Bilinmeyen Yazar',
        category,
        totalPages,
        currentPage,
        status,
        rating,
        startDate,
        finishDate,
        notes,
        coverImage,
        coverColor: ['#0284C7', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 5)]
      };

      if (id) {
        await apiFetch(`/books/${id}`, 'PUT', bookData);
        showToast('Kitap güncellendi ✓', 'success');
      } else {
        await apiFetch('/books', 'POST', bookData);
        showToast('Yeni kitap eklendi 📚', 'success');
      }

      closeModal('book-modal');
      await this.render();
    },

    openSessionModal(preselectedBookId = null) {
      const form = $('#book-session-form');
      if (!form) return;
      form.reset();

      const select = $('#session-book-select');
      if (select) {
        if (this._books.length === 0) {
          select.innerHTML = '<option value="">Önce bir kitap eklemelisiniz</option>';
        } else {
          select.innerHTML = this._books.map(b => `
            <option value="${b.id}" ${b.id === preselectedBookId ? 'selected' : ''}>
              ${Dashboard.escapeHtml(b.title)} (${b.currentPage || 0}/${b.totalPages || 0} sayfa)
            </option>
          `).join('');
        }
      }

      $('#session-date').value = formatDateShort(new Date());
      $('#session-duration').value = 30;

      // Başlangıç ve bitiş sayfalarını seçili kitaptan al
      const activeBookId = preselectedBookId || (select ? select.value : null);
      const activeBook = this._books.find(b => b.id === activeBookId);
      if (activeBook) {
        const cur = activeBook.currentPage || 0;
        $('#session-start-page').value = cur;
        $('#session-end-page').value = Math.min(activeBook.totalPages || cur + 20, cur + 20);
        $('#session-pages-read').value = Math.max(1, Math.min(activeBook.totalPages || cur + 20, cur + 20) - cur);
      } else {
        $('#session-start-page').value = 0;
        $('#session-end-page').value = 20;
        $('#session-pages-read').value = 20;
      }

      openModal('book-session-modal');
    },

    async saveSession() {
      const bookId = $('#session-book-select').value;
      const date = $('#session-date').value || formatDateShort(new Date());
      const duration = parseInt($('#session-duration').value, 10) || 20;
      const startPage = parseInt($('#session-start-page').value, 10) || 0;
      const endPage = parseInt($('#session-end-page').value, 10) || 0;
      const pagesRead = parseInt($('#session-pages-read').value, 10) || Math.max(1, endPage - startPage);
      const notes = $('#session-notes').value.trim();

      if (!bookId) {
        showToast('Lütfen bir kitap seçin', 'error');
        return;
      }

      const book = this._books.find(b => b.id === bookId);
      const bookTitle = book ? book.title : 'Kitap';

      const sessionData = {
        bookId,
        bookTitle,
        date,
        duration,
        startPage,
        endPage,
        pagesRead,
        notes
      };

      await apiFetch('/reading/sessions', 'POST', sessionData);
      closeModal('book-session-modal');
      await this.render();
      showToast(`⏱️ ${pagesRead} sayfa okuma oturumu kaydedildi!`, 'success');
    },

    openGoalsModal() {
      const g = this._goals || DEFAULT_READING_GOALS;
      $('#goal-daily-pages-input').value = g.dailyPages || 20;
      $('#goal-weekly-pages-input').value = g.weeklyPages || 150;
      $('#goal-daily-minutes-input').value = g.dailyMinutes || 30;
      openModal('book-goals-modal');
    },

    async saveGoals() {
      const dailyPages = parseInt($('#goal-daily-pages-input').value, 10) || 20;
      const weeklyPages = parseInt($('#goal-weekly-pages-input').value, 10) || 150;
      const dailyMinutes = parseInt($('#goal-daily-minutes-input').value, 10) || 30;

      await apiFetch('/reading/goals', 'POST', { dailyPages, weeklyPages, dailyMinutes });
      closeModal('book-goals-modal');
      await this.render();
      showToast('Okuma hedefleri güncellendi 🎯', 'success');
    },

    openDetailModal(bookId) {
      const book = this._books.find(b => b.id === bookId);
      if (!book) return;

      const bodyEl = $('#book-detail-modal-body');
      if (!bodyEl) return;

      const bookSessions = this._sessions.filter(s => s.bookId === bookId);
      const totalPagesRead = bookSessions.reduce((acc, s) => acc + (s.pagesRead || 0), 0);
      const totalTimeMins = bookSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
      const activeDays = new Set(bookSessions.map(s => s.date)).size;

      // Takvim günleri (başlama ve bitiş veya bugün arası)
      let calendarDays = '—';
      if (book.startDate) {
        const start = new Date(book.startDate);
        const end = book.finishDate ? new Date(book.finishDate) : new Date();
        const diffTime = Math.max(0, end - start);
        calendarDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      }

      const avgSpeed = activeDays > 0 ? (totalPagesRead / activeDays).toFixed(1) : 0;
      const cur = book.currentPage || 0;
      const total = book.totalPages || 100;
      const pct = total > 0 ? Math.min(100, Math.round((cur / total) * 100)) : 0;

      const esc = Dashboard.escapeHtml;

      bodyEl.innerHTML = `
        <div class="book-detail-header">
          <div class="book-detail-cover">
            ${book.coverImage
              ? `<div class="detail-cover-img" style="background-image: url('${book.coverImage}');"></div>`
              : `<div class="detail-cover-ph" style="background: linear-gradient(135deg, ${book.coverColor || '#0284C7'}, #0f172a);">📖</div>`
            }
          </div>
          <div class="book-detail-info">
            <h3>${esc(book.title)}</h3>
            <p class="text-muted">✍️ ${esc(book.author)} • 🏷️ ${esc(book.category)}</p>
            <div style="margin: 0.5rem 0;">
              ${book.rating > 0 ? `<span style="font-size:1.1rem;">${'⭐'.repeat(book.rating)}</span>` : '<span class="text-muted">Puanlanmadı</span>'}
            </div>
            <div class="book-detail-dates">
              <span>📅 <strong>Başlama:</strong> ${esc(book.startDate || 'Belirtilmedi')}</span>
              <span>🏁 <strong>Bitiş:</strong> ${esc(book.finishDate || (book.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'))}</span>
            </div>
          </div>
        </div>

        <!-- İlerleme Özeti -->
        <div class="detail-metrics-grid">
          <div class="detail-metric-card">
            <span class="dm-val text-primary">%${pct}</span>
            <span class="dm-lbl">Tamamlanma Oranı</span>
          </div>
          <div class="detail-metric-card">
            <span class="dm-val">${cur} / ${total}</span>
            <span class="dm-lbl">Okunan / Toplam Sayfa</span>
          </div>
          <div class="detail-metric-card">
            <span class="dm-val text-success">${activeDays} Gün</span>
            <span class="dm-lbl">Aktif Okuma Günü</span>
          </div>
          <div class="detail-metric-card">
            <span class="dm-val text-warning">${calendarDays} Gün</span>
            <span class="dm-lbl">Takvim Süresi</span>
          </div>
          <div class="detail-metric-card">
            <span class="dm-val">${(totalTimeMins / 60).toFixed(1)} sa</span>
            <span class="dm-lbl">Toplam Okuma Süresi</span>
          </div>
          <div class="detail-metric-card">
            <span class="dm-val">${avgSpeed}</span>
            <span class="dm-lbl">Sayfa / Aktif Gün Hızı</span>
          </div>
        </div>

        ${book.notes ? `
          <div class="book-detail-notes-box glass-card">
            <strong>📝 Notlar ve Değerlendirme:</strong>
            <p style="margin-top:0.35rem; color:var(--text-secondary);">${esc(book.notes)}</p>
          </div>
        ` : ''}

        <!-- Bu Kitaba Ait Oturumlar -->
        <div class="book-detail-sessions-wrap">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <strong>⏱️ Okuma Oturumları (${bookSessions.length})</strong>
            <button class="btn btn-sm btn-primary" onclick="closeModal('book-detail-modal'); Books.openSessionModal('${book.id}')">+ Yeni Oturum</button>
          </div>
          ${bookSessions.length === 0
            ? '<p class="text-muted" style="font-size:0.85rem;">Bu kitap için henüz oturum kaydedilmemiş.</p>'
            : `<div class="detail-sessions-mini-list">
                ${bookSessions.map(s => `
                  <div class="mini-session-row">
                    <span>📅 ${esc(s.date)}</span>
                    <span>📄 +${s.pagesRead} sayfa (${s.startPage} - ${s.endPage})</span>
                    <span>⏱️ ${s.duration} dk</span>
                    ${s.notes ? `<small class="text-muted">"${esc(s.notes)}"</small>` : ''}
                  </div>
                `).join('')}
              </div>`
          }
        </div>
      `;

      openModal('book-detail-modal');
    }
  };

  // ═══════════════════════════════════════════════════════
  // HAFTALIK HEDEFLER
  // ═══════════════════════════════════════════════════════

  const Goals = {
    weekOffset: 0,
    _goals: [],

    init() {
      $('#prev-week-btn').addEventListener('click', async () => { this.weekOffset--; await this.render(); });
      $('#next-week-btn').addEventListener('click', async () => { this.weekOffset++; await this.render(); });
    },

    async loadGoals() {
      this._goals = (await apiFetch('/goals')) || [];
    },

    getCurrentMonday() {
      const d = new Date();
      d.setDate(d.getDate() + this.weekOffset * 7);
      return getMonday(d);
    },

    getWeekKey(monday) {
      return formatDateShort(monday);
    },

    async render() {
      await this.loadGoals();
      const monday = this.getCurrentMonday();
      const weekKey = this.getWeekKey(monday);
      const today = formatDateShort(new Date());

      // Hafta etiketi
      const sunday = new Date(monday);
      sunday.setDate(sunday.getDate() + 6);
      $('#goals-week-label').textContent = `${monday.getDate()}/${monday.getMonth() + 1} - ${sunday.getDate()}/${sunday.getMonth() + 1}`;

      // Genel ilerleme
      const weekGoals = this._goals.filter(g => g.periodKey === weekKey);
      const totalGoals = weekGoals.length;
      const completedGoals = weekGoals.filter(g => g.done).length;
      const pct = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
      $('#goals-progress-text').textContent = `${pct}%`;
      $('#goals-progress-bar').style.width = `${pct}%`;

      // Günler
      const container = $('#goals-days');
      container.innerHTML = '';

      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(d.getDate() + i);
        const dayKey = formatDateShort(d);
        const dayGoals = this._goals.filter(g => g.periodKey === weekKey && g.dayKey === dayKey);
        const isToday = dayKey === today;

        const dayDone = dayGoals.filter(g => g.done).length;
        const dayPct = dayGoals.length > 0 ? Math.round((dayDone / dayGoals.length) * 100) : 0;

        const card = document.createElement('div');
        card.className = 'goal-day-card';
        card.innerHTML = `
          <div class="goal-day-header">
            <span class="goal-day-name ${isToday ? 'today' : ''}">${DAY_NAMES[i]} ${isToday ? '(Bugün)' : ''}</span>
            <span class="goal-day-progress">${dayGoals.length > 0 ? `%${dayPct} (${dayDone}/${dayGoals.length})` : ''}</span>
          </div>
          <div class="goal-add-area">
            <input type="text" placeholder="Yeni hedef ekle..." data-daykey="${dayKey}" data-weekkey="${weekKey}">
            <button class="btn btn-sm btn-primary goal-add-btn" data-daykey="${dayKey}" data-weekkey="${weekKey}">+</button>
          </div>
          <ul class="goal-list" data-daykey="${dayKey}">
            ${dayGoals.map(g => `
              <li class="goal-item ${g.done ? 'completed' : ''}" data-id="${g.id}">
                <button class="goal-item-check" data-id="${g.id}">${g.done ? '✓' : ''}</button>
                <span class="goal-item-text">${Dashboard.escapeHtml(g.title || '')}</span>
                <div class="goal-item-actions">
                  <button class="goal-del-btn" data-id="${g.id}">✕</button>
                </div>
              </li>
            `).join('')}
          </ul>
        `;
        container.appendChild(card);
      }

      this.bindEvents();
    },

    bindEvents() {
      // Hedef ekle
      $$('.goal-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const input = btn.parentElement.querySelector('input');
          this.addGoal(btn.dataset.weekkey, btn.dataset.daykey, input);
        });
      });

      // Enter ile ekle
      $$('.goal-add-area input').forEach(input => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.addGoal(input.dataset.weekkey, input.dataset.daykey, input);
          }
        });
      });

      // Tamamla
      $$('.goal-item-check').forEach(btn => {
        btn.addEventListener('click', async () => {
          const goal = this._goals.find(g => g.id === btn.dataset.id);
          if (goal) {
            await apiFetch(`/goals/${goal.id}`, 'PUT', { ...goal, done: !goal.done });
            await this.render();
            Dashboard.refresh();
          }
        });
      });

      // Sil
      $$('.goal-del-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await apiFetch(`/goals/${btn.dataset.id}`, 'DELETE');
          await this.render();
          Dashboard.refresh();
        });
      });
    },

    async addGoal(weekKey, dayKey, input) {
      const text = input.value.trim();
      if (!text) return;

      await apiFetch('/goals', 'POST', {
        title: text,
        period: 'weekly',
        done: false,
        periodKey: weekKey,
        dayKey: dayKey
      });
      input.value = '';
      await this.render();
      Dashboard.refresh();
      showToast('Hedef eklendi', 'success');
    },

    async getWeeklyProgress() {
      const savedOffset = this.weekOffset;
      this.weekOffset = 0;
      const monday = this.getCurrentMonday();
      const weekKey = this.getWeekKey(monday);
      this.weekOffset = savedOffset;

      await this.loadGoals();
      const weekGoals = this._goals.filter(g => g.periodKey === weekKey);
      const total = weekGoals.length;
      const done = weekGoals.filter(g => g.done).length;
      return total > 0 ? Math.round((done / total) * 100) : 0;
    }
  };

  // ═══════════════════════════════════════════════════════
  // NOT DEFTERİ
  // ═══════════════════════════════════════════════════════

  const NOTE_TAGS = {
    exam:      { label: 'Sınavda Çıkabilir', emoji: '🎯' },
    important: { label: 'Önemli',            emoji: '⭐' },
    review:    { label: 'Tekrar Çalış',      emoji: '🔄' },
    general:   { label: 'Genel',             emoji: '💡' },
  };

  const Notebook = {
    activeNoteId: null,
    autoSaveTimer: null,
    _notes: [],
    selectedCourse: 'all',   // 'all' | courseId
    quickTag: 'exam',
    tagFilter: 'all',
    searchText: '',

    init() {
      $('#add-note-btn').addEventListener('click', () => this.createNote());

      // Hızlı not etiket seçici
      $$('#qln-tag-picker .qln-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.quickTag = btn.dataset.tag;
          $$('#qln-tag-picker .qln-tag-btn').forEach(b => b.classList.toggle('active', b === btn));
        });
      });

      // Hızlı not formu
      $('#quick-lecture-note-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.addQuickLectureNote();
      });

      // Ders seçimi (select) -> hap seçimini senkronla
      $('#qln-course-select').addEventListener('change', (e) => {
        this.selectCourse(e.target.value, false);
      });

      // Arama
      const search = $('#notebook-search-input');
      const clearBtn = $('#notebook-search-clear');
      search.addEventListener('input', () => {
        this.searchText = search.value.trim().toLocaleLowerCase('tr-TR');
        clearBtn.classList.toggle('hidden', !search.value);
        this.renderList();
      });
      clearBtn.addEventListener('click', () => {
        search.value = '';
        this.searchText = '';
        clearBtn.classList.add('hidden');
        this.renderList();
        search.focus();
      });

      // Etiket filtreleri
      $$('#notebook-tag-filter-pills .nb-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          this.tagFilter = pill.dataset.filter;
          $$('#notebook-tag-filter-pills .nb-filter-pill').forEach(p => p.classList.toggle('active', p === pill));
          this.renderList();
        });
      });

      // İstatistik rozetleri -> hızlı filtre
      [['#stat-nb-exam', 'exam'], ['#stat-nb-important', 'important'], ['#stat-nb-review', 'review']].forEach(([sel, tag]) => {
        const el = $(sel);
        if (!el) return;
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          const pill = $(`#notebook-tag-filter-pills .nb-filter-pill[data-filter="${tag}"]`);
          if (pill) pill.click();
        });
      });

      // Ctrl + S
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          if (this.activeNoteId && Nav.current === 'notebook') {
            this.saveActiveNote();
            showToast('Not kaydedildi ✓', 'success');
          }
        }
      });
    },

    async loadNotes() { this._notes = (await apiFetch('/notes')) || []; },

    // ─── Ders listesi (Devamsızlık modülündeki dersler) ───
    async getCourses() {
      if (!Attendance.getCourses() || Attendance.getCourses().length === 0) {
        await Attendance.loadData();
      }
      return Attendance.getCourses() || [];
    },

    shortName(c) {
      if (!c) return 'Genel';
      return (c.code || '').split('[')[0].trim() || c.name;
    },

    async render() {
      await Promise.all([this.loadNotes(), this.getCourses()]);
      this.renderCourseControls();
      this.renderStats();
      this.renderList();

      if (this.activeNoteId) {
        const note = this._notes.find(n => n.id === this.activeNoteId);
        if (note) this.showEditor(note);
        else { this.activeNoteId = null; this.showEmptyEditor(); }
      } else {
        this.showEmptyEditor();
      }
    },

    renderCourseControls() {
      const courses = Attendance.getCourses() || [];
      const notes = this._notes;
      const esc = Dashboard.escapeHtml;

      // Haplar
      const pills = $('#notebook-course-pills');
      const allCount = notes.length;
      let html = `<button class="nb-course-pill ${this.selectedCourse === 'all' ? 'active' : ''}" data-course="all">
          Tümü <span class="pill-count">${allCount}</span></button>`;
      html += courses.map(c => {
        const cNotes = notes.filter(n => n.courseId === c.id);
        const examCount = cNotes.filter(n => n.tag === 'exam').length;
        return `<button class="nb-course-pill ${examCount ? 'pill-exam-focused' : ''} ${this.selectedCourse === c.id ? 'active' : ''}"
            data-course="${esc(c.id)}" title="${esc(c.name)}">
            ${esc(this.shortName(c))} <span class="pill-count">${cNotes.length}${examCount ? ' · 🎯' + examCount : ''}</span>
          </button>`;
      }).join('');
      pills.innerHTML = html;
      $$('.nb-course-pill', pills).forEach(p => {
        p.addEventListener('click', () => this.selectCourse(p.dataset.course, true));
      });

      // Select
      const select = $('#qln-course-select');
      select.innerHTML = `<option value="all">Genel (Ders seçilmedi)</option>` +
        courses.map(c => `<option value="${esc(c.id)}">${esc(this.shortName(c))} — ${esc(c.name)}</option>`).join('');
      select.value = this.selectedCourse;

      this.updateActiveCourseDisplay();
    },

    selectCourse(courseId, syncSelect) {
      this.selectedCourse = courseId || 'all';
      $$('#notebook-course-pills .nb-course-pill').forEach(p =>
        p.classList.toggle('active', p.dataset.course === this.selectedCourse));
      if (syncSelect) $('#qln-course-select').value = this.selectedCourse;
      this.updateActiveCourseDisplay();
      this.renderList();
    },

    updateActiveCourseDisplay() {
      const course = (Attendance.getCourses() || []).find(c => c.id === this.selectedCourse);
      $('#qln-active-course-display').innerHTML =
        `📍 Seçili Ders: <strong>${course ? Dashboard.escapeHtml(this.shortName(course)) : 'Tüm Dersler'}</strong>`;
    },

    renderStats() {
      const count = tag => this._notes.filter(n => n.tag === tag).length;
      $('#nb-count-exam').textContent = count('exam');
      $('#nb-count-important').textContent = count('important');
      $('#nb-count-review').textContent = count('review');
    },

    getFilteredNotes() {
      const q = this.searchText;
      return this._notes
        .filter(n => this.selectedCourse === 'all' || n.courseId === this.selectedCourse)
        .filter(n => this.tagFilter === 'all' || n.tag === this.tagFilter)
        .filter(n => {
          if (!q) return true;
          const hay = `${n.title || ''} ${n.content || ''} ${n.courseName || ''}`.toLocaleLowerCase('tr-TR');
          return hay.includes(q);
        })
        .sort((a, b) => {
          // Sınav konuları en üstte, sonra en yeni
          const ea = a.tag === 'exam' ? 1 : 0, eb = b.tag === 'exam' ? 1 : 0;
          if (ea !== eb) return eb - ea;
          return (b.updated || 0) - (a.updated || 0);
        });
    },

    renderList() {
      const list = $('#notes-list');
      const notes = this.getFilteredNotes();
      const esc = Dashboard.escapeHtml;
      $('#notes-sidebar-counter').textContent = `${notes.length} not`;

      if (notes.length === 0) {
        list.innerHTML = `<div class="qn-empty">${this._notes.length === 0
          ? 'Henüz not oluşturulmamış'
          : 'Bu filtreye uygun not bulunamadı'}</div>`;
        return;
      }

      list.innerHTML = notes.map(n => {
        const tag = NOTE_TAGS[n.tag] ? n.tag : 'general';
        const snippet = (n.content || '').slice(0, 120);
        return `
          <div class="note-item tag-${tag} ${n.id === this.activeNoteId ? 'active' : ''}" data-id="${esc(n.id)}">
            <div class="note-item-meta">
              <span class="note-course-tag">📚 ${esc(n.courseName || 'Genel')}</span>
              <span class="note-importance-tag tag-${tag}">${NOTE_TAGS[tag].emoji} ${NOTE_TAGS[tag].label}</span>
              ${tag === 'exam' ? '<span class="note-task-synced-badge" title="Görev Panosunda Yapılacaklar listesine aktarıldı">🎯 Görevde</span>' : ''}
            </div>
            <div class="note-item-title">${esc(n.title || 'İsimsiz Not')}</div>
            ${snippet ? `<div class="note-item-snippet">${esc(snippet)}</div>` : ''}
            <div class="note-item-date">${n.updated ? new Date(n.updated).toLocaleString('tr-TR') : ''}</div>
          </div>`;
      }).join('');

      $$('.note-item', list).forEach(item => {
        item.addEventListener('click', () => this.openNote(item.dataset.id));
      });
    },

    showEmptyEditor() {
      const editor = $('#note-editor');
      editor.innerHTML = '<div class="note-editor-empty"><p>📝 Soldan bir not seçin veya yukarıdan hızlıca derste not alın</p></div>';
    },

    showEditor(note) {
      const editor = $('#note-editor');
      const esc = Dashboard.escapeHtml;
      const courses = Attendance.getCourses() || [];
      const tag = NOTE_TAGS[note.tag] ? note.tag : 'general';

      editor.innerHTML = `
        <div class="note-editor-active">
          <div class="note-editor-top-bar">
            <div class="note-editor-course-select">
              <label for="note-edit-course">Ders:</label>
              <select id="note-edit-course" class="qln-select">
                <option value="">Genel</option>
                ${courses.map(c => `<option value="${esc(c.id)}" ${c.id === note.courseId ? 'selected' : ''}>${esc(this.shortName(c))} — ${esc(c.name)}</option>`).join('')}
              </select>
            </div>
            <div class="note-editor-tag-group" id="note-edit-tags">
              ${Object.entries(NOTE_TAGS).map(([key, t]) =>
                `<button type="button" class="note-editor-tag-btn ${key === tag ? 'active' : ''}" data-tag="${key}">${t.emoji} ${t.label}</button>`
              ).join('')}
            </div>
          </div>
          <input type="text" class="note-title-input" id="note-edit-title" value="${esc(note.title || '')}" placeholder="Not başlığı...">
          <textarea class="note-content-input" id="note-edit-content" placeholder="Notunuzu yazın...">${esc(note.content || '')}</textarea>
          <div class="note-editor-footer">
            <span class="note-date" id="note-edit-date">${note.updated ? 'Son düzenleme: ' + new Date(note.updated).toLocaleString('tr-TR') : ''}</span>
            <div class="note-actions">
              <button class="btn btn-sm btn-ghost" id="note-delete-btn">🗑️ Sil</button>
              <button type="button" class="btn btn-sm ${tag === 'exam' ? 'btn-exam-active' : 'btn-ghost'}" id="note-to-task-btn" title="Görev Panosuna (Yapılacaklar) aktar">${tag === 'exam' ? '🎯 Görev Panosunda' : '🎯 Göreve Dönüştür'}</button>
              <button class="btn btn-sm btn-primary" id="note-save-btn">💾 Kaydet</button>
            </div>
          </div>
        </div>
      `;

      const autoSave = (delay = 2000) => {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => this.saveActiveNote(), delay);
      };

      $('#note-save-btn').addEventListener('click', async () => {
        clearTimeout(this.autoSaveTimer);
        await this.saveActiveNote();
        showToast('Not kaydedildi ✓', 'success');
      });

      const toTaskBtn = $('#note-to-task-btn');
      if (toTaskBtn) {
        toTaskBtn.addEventListener('click', async () => {
          clearTimeout(this.autoSaveTimer);
          await this.saveActiveNote();
          const currentNote = this._notes.find(n => n.id === this.activeNoteId);
          if (currentNote) {
            await this.syncExamNoteToTask(currentNote, true);
          }
        });
      }

      $('#note-delete-btn').addEventListener('click', () => {
        confirmAction('Bu notu silmek istediğinize emin misiniz?', async () => {
          clearTimeout(this.autoSaveTimer);
          const noteId = this.activeNoteId;
          await apiFetch(`/notes/${noteId}`, 'DELETE');

          // Bağlı sınav görevi varsa onu da sil
          try {
            const tasks = (await apiFetch('/tasks')) || [];
            const linked = tasks.find(t => t.desc && t.desc.includes(`[NotRef:${noteId}]`));
            if (linked) {
              await apiFetch(`/tasks/${linked.id}`, 'DELETE');
              if (typeof Kanban !== 'undefined' && Kanban.render) await Kanban.render();
            }
          } catch (e) {}

          this.activeNoteId = null;
          await this.render();
          Dashboard.refresh();
          showToast('Not silindi', 'success');
        });
      });

      $$('#note-edit-tags .note-editor-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('#note-edit-tags .note-editor-tag-btn').forEach(b => b.classList.toggle('active', b === btn));
          const toBtn = $('#note-to-task-btn');
          if (toBtn) {
            const isExam = btn.dataset.tag === 'exam';
            toBtn.classList.toggle('btn-exam-active', isExam);
            toBtn.classList.toggle('btn-ghost', !isExam);
            toBtn.textContent = isExam ? '🎯 Görev Panosunda' : '🎯 Göreve Dönüştür';
          }
          autoSave(100);
        });
      });

      $('#note-edit-course').addEventListener('change', () => autoSave(100));
      $('#note-edit-title').addEventListener('input', () => autoSave());
      $('#note-edit-content').addEventListener('input', () => autoSave());
    },

    courseFields(courseId) {
      const course = (Attendance.getCourses() || []).find(c => c.id === courseId);
      return course
        ? { courseId: course.id, courseName: this.shortName(course) }
        : { courseId: '', courseName: 'Genel' };
    },

    async createNote() {
      const tag = this.tagFilter !== 'all' ? this.tagFilter : 'general';
      const newNote = await apiFetch('/notes', 'POST', {
        title: 'Yeni Not',
        content: '',
        tag,
        ...this.courseFields(this.selectedCourse),
      });
      if (!newNote) return;
      this.activeNoteId = newNote.id;
      await this.render();
      Dashboard.refresh();
      setTimeout(() => { const el = $('#note-edit-title'); if (el) el.select(); }, 100);
    },

    async addQuickLectureNote() {
      const titleEl = $('#qln-title-input');
      const contentEl = $('#qln-content-input');
      const title = titleEl.value.trim();
      if (!title) { titleEl.focus(); return; }

      const courseId = $('#qln-course-select').value;
      const created = await apiFetch('/notes', 'POST', {
        title,
        content: contentEl.value.trim(),
        tag: this.quickTag,
        ...this.courseFields(courseId),
      });
      if (!created) return;

      // Sınavda Çıkabilir seçilmişse doğrudan Görev Panosu > Yapılacaklar'a ekle
      if (this.quickTag === 'exam') {
        await this.syncExamNoteToTask(created, false);
      }

      titleEl.value = '';
      contentEl.value = '';
      this.activeNoteId = created.id;
      await this.render();
      Dashboard.refresh();
      titleEl.focus();
      showToast(`${NOTE_TAGS[this.quickTag].emoji} Not alındı: ${created.courseName}`, 'success');
    },

    async openNote(id) {
      if (this.activeNoteId && this.activeNoteId !== id) {
        clearTimeout(this.autoSaveTimer);
        await this.saveActiveNote();
      }
      this.activeNoteId = id;
      const note = this._notes.find(n => n.id === id);
      if (note) {
        this.showEditor(note);
        $$('.note-item').forEach(item => item.classList.toggle('active', item.dataset.id === id));
      }
    },

    async syncExamNoteToTask(note, forceNotify = false) {
      if (!note) return;
      try {
        const tasks = (await apiFetch('/tasks')) || [];
        const coursePrefix = (note.courseName && note.courseName !== 'Genel') ? `[${note.courseName}] ` : '';
        const taskTitle = `🎯 Sınav: ${coursePrefix}${note.title || 'Konu Tekrarı'}`;
        const refTag = `[NotRef:${note.id}]`;

        const existing = tasks.find(t =>
          (t.desc && t.desc.includes(refTag)) ||
          t.title === taskTitle
        );

        const noteSnippet = (note.content || '').slice(0, 160);
        const descContent = `${noteSnippet ? noteSnippet + '\n\n' : ''}📚 ${note.courseName || 'Genel'} dersi sınav hazırlığı için Not Defteri'nden aktarıldı. ${refTag}`;

        if (existing) {
          if (existing.status === 'todo') {
            await apiFetch(`/tasks/${existing.id}`, 'PUT', {
              ...existing,
              title: taskTitle,
              desc: descContent,
              color: '#ef4444'
            });
          }
          if (forceNotify) {
            showToast(`🎯 Sınav görevi zaten Görev Panosu'nda kayıtlı`, 'info');
          }
        } else {
          const createdTask = await apiFetch('/tasks', 'POST', {
            title: taskTitle,
            desc: descContent,
            color: '#ef4444',
            status: 'todo'
          });
          if (createdTask) {
            showToast(`🎯 Sınav görevi Yapılacaklar panosuna eklendi: "${taskTitle}"`, 'success');
            if (typeof Kanban !== 'undefined' && Kanban.render) {
              await Kanban.render();
            }
            Dashboard.refresh();
          }
        }
      } catch (err) {
        console.error('syncExamNoteToTask error:', err);
      }
    },

    async saveActiveNote() {
      if (!this.activeNoteId) return;
      const titleEl = $('#note-edit-title');
      const contentEl = $('#note-edit-content');
      if (!titleEl || !contentEl) return;
      const note = this._notes.find(n => n.id === this.activeNoteId);
      if (!note) return;

      const activeTagBtn = $('#note-edit-tags .note-editor-tag-btn.active');
      const tag = activeTagBtn ? activeTagBtn.dataset.tag : (note.tag || 'general');
      const courseSel = $('#note-edit-course');

      const updated = await apiFetch(`/notes/${this.activeNoteId}`, 'PUT', {
        ...note,
        title: titleEl.value.trim() || 'İsimsiz Not',
        content: contentEl.value,
        tag,
        isExamTopic: tag === 'exam',
        ...this.courseFields(courseSel ? courseSel.value : note.courseId),
      });
      if (!updated) return;

      // Eğer Sınavda Çıkabilir ise otomatik Görev Panosuna aktar
      if (tag === 'exam' || updated.isExamTopic) {
        await this.syncExamNoteToTask(updated, false);
      }

      // Önbelleği güncelle ve listeyi (editörü bozmadan) yenile
      const idx = this._notes.findIndex(n => n.id === updated.id);
      if (idx !== -1) this._notes[idx] = updated;
      const dateEl = $('#note-edit-date');
      if (dateEl) dateEl.textContent = 'Son düzenleme: ' + new Date(updated.updated).toLocaleString('tr-TR');
      this.renderStats();
      this.renderCourseControls();
      this.renderList();
    }
  };

  // ═══════════════════════════════════════════════════════
  // POMODORO
  // ═══════════════════════════════════════════════════════

  const Pomodoro = {
    duration: 5 * 60, // saniye
    remaining: 5 * 60,
    running: false,
    paused: false,
    intervalId: null,
    startTime: null,
    pausedRemaining: null,

    init() {
      $$('.pomo-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.running) return;
          $$('.pomo-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mins = parseInt(btn.dataset.minutes);
          this.setDuration(mins);
        });
      });

      $('#pomo-start').addEventListener('click', () => this.start());
      $('#pomo-pause').addEventListener('click', () => this.pause());
      $('#pomo-resume').addEventListener('click', () => this.resume());
      $('#pomo-reset').addEventListener('click', () => this.reset());
    },

    setDuration(mins) {
      this.duration = mins * 60;
      this.remaining = this.duration;
      this.updateDisplay();
    },

    start() {
      this.running = true;
      this.paused = false;
      this.startTime = Date.now();
      this.pausedRemaining = this.remaining;

      $('#pomo-start').classList.add('hidden');
      $('#pomo-pause').classList.remove('hidden');
      $('#pomo-resume').classList.add('hidden');
      $('#pomo-complete-msg').classList.add('hidden');

      this.tick();
      this.intervalId = setInterval(() => this.tick(), 250);
    },

    pause() {
      this.paused = true;
      this.running = false;
      clearInterval(this.intervalId);
      this.pausedRemaining = this.remaining;

      $('#pomo-pause').classList.add('hidden');
      $('#pomo-resume').classList.remove('hidden');
    },

    resume() {
      this.running = true;
      this.paused = false;
      this.startTime = Date.now();
      this.pausedRemaining = this.remaining;

      $('#pomo-resume').classList.add('hidden');
      $('#pomo-pause').classList.remove('hidden');

      this.intervalId = setInterval(() => this.tick(), 250);
    },

    reset() {
      this.running = false;
      this.paused = false;
      clearInterval(this.intervalId);
      this.remaining = this.duration;
      this.pausedRemaining = null;

      $('#pomo-start').classList.remove('hidden');
      $('#pomo-pause').classList.add('hidden');
      $('#pomo-resume').classList.add('hidden');
      $('#pomo-complete-msg').classList.add('hidden');

      this.updateDisplay();
    },

    tick() {
      const elapsed = (Date.now() - this.startTime) / 1000;
      this.remaining = Math.max(0, this.pausedRemaining - elapsed);

      this.updateDisplay();

      if (this.remaining <= 0) {
        this.complete();
      }
    },

    complete() {
      this.running = false;
      clearInterval(this.intervalId);

      $('#pomo-pause').classList.add('hidden');
      $('#pomo-resume').classList.add('hidden');
      $('#pomo-start').classList.remove('hidden');
      $('#pomo-complete-msg').classList.remove('hidden');

      // Sesli bildirim (kullanıcı etkileşimi gerekebilir)
      this.playSound();

      showToast('🎉 Odaklanma süresi tamamlandı!', 'success');
    },

    playSound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.3;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.stop(ctx.currentTime + 0.5);

        // İkinci bip
        setTimeout(() => {
          try {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.value = 1000;
            gain2.gain.value = 0.3;
            osc2.start();
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc2.stop(ctx.currentTime + 0.5);
          } catch { /* ses hatası görmezden gel */ }
        }, 300);
      } catch { /* AudioContext desteklenmeyebilir */ }
    },

    updateDisplay() {
      const mins = Math.floor(this.remaining / 60);
      const secs = Math.floor(this.remaining % 60);
      const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      const el = $('#pomo-time');
      if (el) el.textContent = display;

      // Dashboard mini
      const dashEl = $('#dash-pomo-display');
      if (dashEl) dashEl.textContent = display;

      // SVG ilerleme
      const circle = $('#pomo-progress-circle');
      if (circle) {
        const circumference = 2 * Math.PI * 90; // r=90
        const progress = this.duration > 0 ? this.remaining / this.duration : 1;
        circle.style.strokeDashoffset = circumference * (1 - progress);
      }
    },

    getDisplayTime() {
      const mins = Math.floor(this.remaining / 60);
      const secs = Math.floor(this.remaining % 60);
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    quickStart(mins) {
      // Dashboard'dan hızlı başlat
      $$('.pomo-preset').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.minutes) === mins);
      });
      this.setDuration(mins);
      this.start();
      Nav.goTo('pomodoro');
    }
  };

  // ═══════════════════════════════════════════════════════
  // HIZLI NOT PANELİ
  // ═══════════════════════════════════════════════════════

  const QuickNotes = {
    _notes: [],

    init() {
      $('#qn-toggle').addEventListener('click', () => this.toggle());
      $('#qn-close').addEventListener('click', () => this.close());
      $('#qn-add').addEventListener('click', () => this.add());
      $('#qn-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.add();
      });

      this.updateBadge();
    },

    async loadNotes() {
      this._notes = (await apiFetch('/quicknotes')) || [];
    },

    async toggle() {
      const panel = $('#quick-note-panel');
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) {
        await this.render();
        setTimeout(() => $('#qn-input').focus(), 100);
      }
    },

    close() {
      $('#quick-note-panel').classList.remove('open');
    },

    async add() {
      const input = $('#qn-input');
      const text = input.value.trim();
      if (!text) return;

      await apiFetch('/quicknotes', 'POST', { text });
      input.value = '';
      await this.render();
      await this.updateBadge();
    },

    async render() {
      await this.loadNotes();
      const notes = this._notes;
      const list = $('#qn-list');

      if (notes.length === 0) {
        list.innerHTML = '<li class="qn-empty">Henüz hızlı not yok</li>';
        return;
      }

      list.innerHTML = notes.map(n => `
        <li class="qn-item">
          <span class="qn-item-text">${Dashboard.escapeHtml(n.text)}</span>
          <button class="qn-item-del" data-id="${n.id}">✕</button>
        </li>
      `).join('');

      $$('.qn-item-del').forEach(btn => {
        btn.addEventListener('click', async () => {
          await apiFetch(`/quicknotes/${btn.dataset.id}`, 'DELETE');
          await this.render();
          await this.updateBadge();
        });
      });
    },

    async updateBadge() {
      await this.loadNotes();
      const notes = this._notes;
      const badge = $('#qn-badge');
      if (notes.length > 0) {
        badge.classList.remove('hidden');
        badge.textContent = notes.length;
      } else {
        badge.classList.add('hidden');
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // AYARLAR - Yedekleme & Geri Yükleme
  // ═══════════════════════════════════════════════════════

  const Settings = {
    init() {
      // Dışa aktar
      $('#export-btn').addEventListener('click', () => this.exportData());

      // İçe aktar
      $('#import-btn').addEventListener('click', () => $('#import-file').click());
      $('#import-file').addEventListener('change', (e) => this.importData(e));

      // Tümünü sil
      $('#reset-all-btn').addEventListener('click', () => {
        confirmAction('Tüm verileriniz silinecek. Bu işlem geri alınamaz! Devam etmek istiyor musunuz?', async () => {
          await DB.resetAll();
          showToast('Tüm veriler silindi', 'success');
          setTimeout(() => location.reload(), 500);
        });
      });

    },

    async exportData() {
      try {
        const data = await DB.exportAll();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `asi-yedek-${formatDateShort(new Date())}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Veriler dışa aktarıldı ✓', 'success');
      } catch (e) {
        showToast('Dışa aktarma hatası: ' + e.message, 'error');
      }
    },

    importData(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const data = JSON.parse(ev.target.result);

          if (!data || typeof data !== 'object') {
            showToast('Geçersiz dosya formatı', 'error');
            return;
          }

          confirmAction('Mevcut verileriniz yedeğin verileriyle değiştirilecek. Devam etmek istiyor musunuz?', async () => {
            if (await DB.importAll(data)) {
              showToast('Veriler başarıyla içe aktarıldı ✓', 'success');
              setTimeout(() => location.reload(), 500);
            } else {
              showToast('İçe aktarma başarısız', 'error');
            }
          });
        } catch (err) {
          showToast('Dosya okunamadı: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);

      // input'u sıfırla (aynı dosyayı tekrar seçebilmek için)
      e.target.value = '';
    }
  };

  // ═══════════════════════════════════════════════════════
  // ONAY MODALI
  // ═══════════════════════════════════════════════════════

  let confirmCallback = null;

  function confirmAction(message, callback) {
    $('#confirm-message').textContent = message;
    confirmCallback = callback;
    openModal('confirm-modal');
  }

  $('#confirm-ok').addEventListener('click', () => {
    closeModal('confirm-modal');
    if (confirmCallback) {
      confirmCallback();
      confirmCallback = null;
    }
  });

  // ═══════════════════════════════════════════════════════
  // BAŞLATMA
  // ═══════════════════════════════════════════════════════

  // Genel API (dashboard butonları için)
  window.ASI = {
    navigateTo(page) { Nav.goTo(page); },
    pomodoro: Pomodoro,
    workout: Workout,
    books: Books,
  };

  // Motivasyon yenile butonu
  $('#new-quote-btn').addEventListener('click', () => Dashboard.showQuote());

  // Başlat
  async function boot() {
    Splash.init();
    Nav.init();
    Kanban.init();
    Workout.init();
    Attendance.init();
    Goals.init();
    Notebook.init();
    Books.init();
    Pomodoro.init();
    QuickNotes.init();
    Settings.init();

    // Saat
    updateClock();
    setInterval(updateClock, 1000);

    // İlk render (API'den veri çek)
    await Promise.all([
      Kanban.render(),
      Goals.render(),
      Attendance.render(),
      Workout.render(),
      Books.render(),
    ]);
    Pomodoro.updateDisplay();
    await Dashboard.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot());
  } else {
    boot();
  }
})();
