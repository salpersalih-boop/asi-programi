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
    { id: 'ex-ch-3', name: 'Dumbbell Chest Fly', category: 'gogus', sets: 3, reps: 12, weight: '14 kg', sortOrder: 3 },
    { id: 'ex-ch-4', name: 'Şınav (Push-up)', category: 'gogus', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 4 },

    // Sırt
    { id: 'ex-ba-1', name: 'Lat Pulldown', category: 'sirt', sets: 4, reps: 10, weight: '45 kg', sortOrder: 5 },
    { id: 'ex-ba-2', name: 'Seated Cable Row', category: 'sirt', sets: 3, reps: 12, weight: '40 kg', sortOrder: 6 },
    { id: 'ex-ba-3', name: 'One-Arm Dumbbell Row', category: 'sirt', sets: 3, reps: 10, weight: '20 kg', sortOrder: 7 },
    { id: 'ex-ba-4', name: 'Barfiks (Pull-up)', category: 'sirt', sets: 3, reps: 8, weight: 'Vücut Ağırlığı', sortOrder: 8 },

    // Omuz
    { id: 'ex-sh-1', name: 'Overhead Dumbbell Press', category: 'omuz', sets: 4, reps: 10, weight: '16 kg', sortOrder: 9 },
    { id: 'ex-sh-2', name: 'Lateral Raise', category: 'omuz', sets: 4, reps: 12, weight: '8 kg', sortOrder: 10 },
    { id: 'ex-sh-3', name: 'Rear Delt Fly (Face Pull)', category: 'omuz', sets: 3, reps: 15, weight: '25 kg', sortOrder: 11 },
    { id: 'ex-sh-4', name: 'Dumbbell Front Raise', category: 'omuz', sets: 3, reps: 12, weight: '8 kg', sortOrder: 12 },

    // Biceps
    { id: 'ex-bi-1', name: 'Barbell Biceps Curl', category: 'biceps', sets: 3, reps: 12, weight: '20 kg', sortOrder: 13 },
    { id: 'ex-bi-2', name: 'Dumbbell Hammer Curl', category: 'biceps', sets: 3, reps: 12, weight: '12 kg', sortOrder: 14 },
    { id: 'ex-bi-3', name: 'Incline Dumbbell Curl', category: 'biceps', sets: 3, reps: 10, weight: '10 kg', sortOrder: 15 },
    { id: 'ex-bi-4', name: 'Preacher Curl', category: 'biceps', sets: 3, reps: 12, weight: '18 kg', sortOrder: 16 },

    // Triceps
    { id: 'ex-tr-1', name: 'Triceps Cable Pushdown', category: 'triceps', sets: 3, reps: 12, weight: '25 kg', sortOrder: 17 },
    { id: 'ex-tr-2', name: 'Skull Crusher', category: 'triceps', sets: 3, reps: 10, weight: '20 kg', sortOrder: 18 },
    { id: 'ex-tr-3', name: 'Bench Dips', category: 'triceps', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 19 },
    { id: 'ex-tr-4', name: 'Overhead Triceps Extension', category: 'triceps', sets: 3, reps: 12, weight: '14 kg', sortOrder: 20 },

    // Karın
    { id: 'ex-ab-1', name: 'Crunch (Mekik)', category: 'karin', sets: 3, reps: 20, weight: 'Vücut Ağırlığı', sortOrder: 21 },
    { id: 'ex-ab-2', name: 'Plank', category: 'karin', sets: 3, reps: 60, weight: '60 sn', sortOrder: 22 },
    { id: 'ex-ab-3', name: 'Hanging Leg Raise', category: 'karin', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 23 },
    { id: 'ex-ab-4', name: 'Russian Twist', category: 'karin', sets: 3, reps: 20, weight: '8 kg', sortOrder: 24 },

    // Bacak
    { id: 'ex-le-1', name: 'Barbell Squat', category: 'bacak', sets: 4, reps: 10, weight: '60 kg', sortOrder: 25 },
    { id: 'ex-le-2', name: 'Leg Press', category: 'bacak', sets: 4, reps: 12, weight: '100 kg', sortOrder: 26 },
    { id: 'ex-le-3', name: 'Leg Extension', category: 'bacak', sets: 3, reps: 12, weight: '35 kg', sortOrder: 27 },
    { id: 'ex-le-4', name: 'Leg Curl', category: 'bacak', sets: 3, reps: 12, weight: '30 kg', sortOrder: 28 },
    { id: 'ex-le-5', name: 'Standing Calf Raise', category: 'bacak', sets: 4, reps: 15, weight: '45 kg', sortOrder: 29 },

    // Ön Kol
    { id: 'ex-fa-1', name: 'Barbell Wrist Curl', category: 'onkol', sets: 3, reps: 15, weight: '15 kg', sortOrder: 30 },
    { id: 'ex-fa-2', name: 'Reverse Wrist Curl', category: 'onkol', sets: 3, reps: 15, weight: '12 kg', sortOrder: 31 },
    { id: 'ex-fa-3', name: "Farmer's Walk", category: 'onkol', sets: 3, reps: 45, weight: '2x20 kg (45 sn)', sortOrder: 32 },

    // Kardiyo
    { id: 'ex-ca-1', name: 'Koşu Bandı (Tempolu)', category: 'kardiyo', sets: 1, reps: 20, weight: '20 dk • Eğim 2', sortOrder: 33 },
    { id: 'ex-ca-2', name: 'Kondisyon Bisikleti', category: 'kardiyo', sets: 1, reps: 15, weight: '15 dk • Seviye 6', sortOrder: 34 },
    { id: 'ex-ca-3', name: 'İp Atlama', category: 'kardiyo', sets: 3, reps: 3, weight: '3x3 dk', sortOrder: 35 },
    { id: 'ex-ca-4', name: 'Burpee', category: 'kardiyo', sets: 3, reps: 15, weight: 'Vücut Ağırlığı', sortOrder: 36 },
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

  // ─── Güvenli Görsel Sıkıştırma ve Yeniden Boyutlandırma (Canvas + JPEG %70) ───
  // Mobil galerilerden gelen yüksek çözünürlüklü fotoğrafları LocalStorage (5MB) kotasını aşmayacak şekilde
  // maksimum 300x400 piksel boyutuna küçültür ve ~20-30 KB boyutunda JPEG formatında sıkıştırır.
  function compressImageFile(fileOrDataUrl, maxWidth = 300, maxHeight = 400, quality = 0.7) {
    return new Promise((resolve) => {
      if (!fileOrDataUrl) return resolve('');

      const processImage = (src) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            let width = img.naturalWidth || img.width || 300;
            let height = img.naturalHeight || img.height || 400;

            if (width <= 0 || height <= 0) {
              return resolve(src);
            }

            // En-boy oranını koruyarak yeniden boyutlandırma
            if (width > maxWidth || height > maxHeight) {
              const ratio = Math.min(maxWidth / width, maxHeight / height);
              width = Math.max(1, Math.round(width * ratio));
              height = Math.max(1, Math.round(height * ratio));
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve(src);

            // Şeffaf PNG'lerin JPEG'e dönüşürken siyah olmaması için beyaz arka plan
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
          } catch (err) {
            console.warn('Canvas görsel sıkıştırma hatası, orijinal kaynak kullanılıyor:', err);
            resolve(src);
          }
        };
        img.onerror = () => {
          console.warn('Görsel okunamadı veya yüklenemedi');
          resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
        };
        img.src = src;
      };

      if (typeof fileOrDataUrl === 'string') {
        processImage(fileOrDataUrl);
      } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => processImage(e.target.result);
        reader.onerror = () => resolve('');
        reader.readAsDataURL(fileOrDataUrl);
      } else {
        resolve('');
      }
    });
  }

  // ─── Güvenli LocalStorage Yardımcısı (Kota Kontrollü & Hata Yakalamalı) ───
  // Değişince rozet kontrolü tetikleyen veri anahtarları
  const BADGE_WATCH = /^asi_(tasks|goals|notes|quicknotes|books|reading_sessions|workouts|workout_history|prayer_checks_|attendance_|user_vki_data|pomodoro_stats|book_quotes|kaza|quran|zikir|exams|workout_plan)/;

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
        if (BADGE_WATCH.test(key) && typeof scheduleBadgeCheck === 'function') scheduleBadgeCheck();
        return true;
      } catch (e) {
        console.error('Storage yazma hatası:', key, e);
        const isQuota = e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014 || (e.number && e.number === -2147024882);
        if (isQuota) {
          if (typeof showToast === 'function') {
            showToast('⚠️ Tarayıcı depolama kotası (5MB) aşıldı! Görsel çok büyük olabilir.', 'error');
          }
        } else {
          if (typeof showToast === 'function') {
            showToast('⚠️ Veri kaydedilemedi: Yerel depolama yazma hatası.', 'error');
          }
        }
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
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
            due: body?.due || '',
            priority: body?.priority || 'normal',
            repeat: body?.repeat || 'none',
            created: body?.created || Date.now()
          };
          if (newTask.status === 'done') newTask.completedAt = Date.now();
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
            const wasDone = tasks[idx].status === 'done';
            tasks[idx] = { ...tasks[idx], ...body, id };
            // Haftalık özet için: göreve "bitti" denildiği an
            if (tasks[idx].status === 'done' && !wasDone) tasks[idx].completedAt = Date.now();
            if (tasks[idx].status !== 'done') delete tasks[idx].completedAt;
            // Tekrarlayan görev bitince bir sonrakini oluştur (bir kez)
            const t = tasks[idx];
            if (t.status === 'done' && !wasDone && t.repeat && t.repeat !== 'none' && !t.repeatSpawned) {
              t.repeatSpawned = true;
              tasks.unshift({
                id: 't-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
                title: t.title, desc: t.desc || '', color: t.color, priority: t.priority || 'normal',
                repeat: t.repeat, status: 'todo', due: nextRepeatDate(t.due, t.repeat), created: Date.now()
              });
            }
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
        } else {
          let modified = false;
          // Eski 'kol' kategorisini Biceps/Triceps olarak güncelle
          exercises.forEach(e => {
            if (e.category === 'kol') {
              modified = true;
              if (/triceps|pushdown|dip|skull/i.test(e.name)) e.category = 'triceps';
              else e.category = 'biceps';
            }
          });

          // Eksik kas grupları (onkol, kardiyo, biceps, triceps) varsa varsayılanlardan otomatik ekle
          const existingIds = new Set(exercises.map(e => e.id));
          DEFAULT_EXERCISES.forEach(defEx => {
            if (!existingIds.has(defEx.id)) {
              const hasCat = exercises.some(e => e.category === defEx.category);
              if (!hasCat || ['biceps', 'triceps', 'onkol', 'kardiyo'].includes(defEx.category)) {
                exercises.push({ ...defEx });
                existingIds.add(defEx.id);
                modified = true;
              }
            }
          });

          if (modified) {
            Storage.set('asi_exercises', exercises);
          }
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
          const { id, title, period, periodKey, dayKey, done } = body || {};
          let target = id ? goals.find(g => g.id === id) : null;
          if (target) {
            if (typeof done === 'boolean') target.done = done;
            if (title !== undefined) target.title = title;
            if (period !== undefined) target.period = period;
            if (periodKey !== undefined) target.periodKey = periodKey;
            if (dayKey !== undefined) target.dayKey = dayKey;
          } else {
            target = {
              id: id || ('g-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4)),
              title: title || '',
              period: period || 'Haftalık',
              periodKey: periodKey || '',
              dayKey: dayKey || '',
              done: !!done,
              created: body?.created || Date.now()
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
          const ok = Storage.set('asi_books', books);
          if (!ok) {
            // Kota aşıldıysa kapak görseli olmadan kaydetmeyi dene (otomatik kurtarma mekanizması)
            if (newBook.coverImage) {
              console.warn('Görsel kotayı aştı, kapaksız kurtarma deneniyor...');
              newBook.coverImage = '';
              const retryOk = Storage.set('asi_books', books);
              if (retryOk) {
                if (typeof showToast === 'function') {
                  showToast('ℹ️ Kitap eklendi ancak görsel boyutu kotayı aştığı için kapaksız kaydedildi.', 'warning');
                }
                return newBook;
              }
            }
            return null;
          }
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
            const ok = Storage.set('asi_books', books);
            if (!ok && books[idx].coverImage) {
              console.warn('Görsel kotayı aştı, kapaksız kurtarma deneniyor...');
              books[idx].coverImage = '';
              const retryOk = Storage.set('asi_books', books);
              if (retryOk) {
                if (typeof showToast === 'function') {
                  showToast('ℹ️ Kitap güncellendi fakat görsel kotayı aştığı için kapaksız kaydedildi.', 'warning');
                }
                return books[idx];
              }
              return null;
            }
            return ok ? books[idx] : null;
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
        theme: Storage.get('asi_theme_config', null),
        _exportDate: new Date().toISOString(),
        _app: 'Planova ✨'
      };
    },

    // İçe aktarma (API'ye yazar)
    async importAll(data) {
      if (!data) return false;
      try {
        if (data.settings) this.saveSettings(data.settings);
        if (data.theme) {
          Storage.set('asi_theme_config', data.theme);
        }
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

  // "2026-10-29" → bugüne göre gün farkı (geçmiş negatif)
  function daysFromToday(ymd) {
    if (!ymd) return null;
    const [y, m, d] = ymd.split('-').map(Number);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return Math.round((new Date(y, m - 1, d) - t) / 86400000);
  }

  function dueLabel(ymd) {
    const n = daysFromToday(ymd);
    if (n === null) return '';
    if (n < 0) return `${-n} gün gecikti`;
    if (n === 0) return 'Bugün';
    if (n === 1) return 'Yarın';
    if (n < 7) return `${n} gün kaldı`;
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }

  function dueBadgeHtml(ymd) {
    const n = daysFromToday(ymd);
    const cls = n < 0 ? 'is-late' : n === 0 ? 'is-today' : n === 1 ? 'is-soon' : '';
    return `<span class="task-due-badge ${cls}">📅 ${dueLabel(ymd)}</span>`;
  }

  const REPEAT_LABELS = { daily: 'Her gün', weekly: 'Her hafta', monthly: 'Her ay' };

  // Tekrarlayan görevin bir sonraki tarihi (geçmişte kaldıysa bugünden ileri taşınır)
  function nextRepeatDate(ymd, repeat) {
    const base = ymd ? new Date(ymd + 'T00:00:00') : new Date();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const step = (d) => {
      if (repeat === 'daily') d.setDate(d.getDate() + 1);
      else if (repeat === 'weekly') d.setDate(d.getDate() + 7);
      else d.setMonth(d.getMonth() + 1);
    };
    const d = new Date(base);
    step(d);
    while (d < today) step(d);
    return formatDateShort(d);
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
    if (!container) return;
    while (container.children.length >= 2) {
      container.removeChild(container.firstChild);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 2800);
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

      // Firebase auth tamamlandıysa (kullanıcı giriş yaptı) splash'ı anında atla
      const authDone = !!(window.PlanovaAuth && window.PlanovaAuth.user);

      if (authDone) {
        if (splash) splash.style.display = 'none';
        const app = $('#app');
        if (app) app.classList.remove('hidden');
        Dashboard.refresh();
        return;
      }

      if (!settings.firstVisit) {
        // Kullanıcı daha önce splash görmüşse 1.5 sn sonra kapat
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
      if (typeof ModuleManager !== 'undefined' && !ModuleManager.isModuleVisible(page) && page !== 'dashboard' && page !== 'settings') {
        this.goTo('dashboard');
        return;
      }

      this.current = page;
      $$('.page').forEach(p => p.classList.remove('active'));
      $$('.nav-link').forEach(l => l.classList.remove('active'));

      const pageEl = document.getElementById('page-' + page);
      const linkEl = $(`.nav-link[data-page="${page}"]`);

      if (pageEl) pageEl.classList.add('active');
      if (linkEl) linkEl.classList.add('active');

      // Sayfa özel yenileme
      switch (page) {
        case 'dashboard': 
          Dashboard.refresh(); 
          break;
        case 'kanban': 
          Kanban.render(); 
          break;
        case 'schedule':
        case 'workout': 
          Workout.render(); 
          if (typeof VkiManager !== 'undefined') VkiManager.calculateAndRender();
          if (typeof StreakManager !== 'undefined') StreakManager.updateStreaksAndBadges();
          break;
        case 'attendance': 
          Attendance.render(); 
          break;
        case 'goals': 
          Goals.render(); 
          break;
        case 'notebook': 
          Notebook.render(); 
          break;
        case 'books': 
          Books.render(); 
          if (typeof StreakManager !== 'undefined') StreakManager.updateStreaksAndBadges();
          break;
        case 'pomodoro': 
          Pomodoro.updateDisplay(); 
          break;
        case 'prayer': 
          if (typeof PrayerManager !== 'undefined') PrayerManager.renderPage(); 
          break;
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
      try { TodayPanel.render(); WeekSummary.render(); } catch (e) { console.warn('Bugün/Hafta paneli:', e); }
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

      // Streak & Rozetler ve Namaz Widget Güncellemesi
      if (typeof StreakManager !== 'undefined') {
        StreakManager.updateStreaksAndBadges();
      }
      if (typeof PrayerManager !== 'undefined') {
        PrayerManager.renderWidget();
      }
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
    _notes: [],   // Not Defteri önbelleği

    async loadTasks() {
      const [tasks, notes] = await Promise.all([
        apiFetch('/tasks'),
        apiFetch('/notes')
      ]);
      this._tasks = tasks || [];
      this._notes = notes || [];
    },

    async render() {
      await this.loadTasks();

      // ─── 1. Not Defteri Kolonu (Tüm notlar bu başlık altında ayrı olarak listelenir) ───
      const notesList = $('#kanban-notes');
      const countNotes = $('#count-notes');
      if (countNotes) countNotes.textContent = this._notes.length;
      if (notesList) {
        if (this._notes.length === 0) {
          notesList.innerHTML = '<div class="empty-state" style="padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">Henüz not bulunmuyor</div>';
        } else {
          notesList.innerHTML = this._notes.map(n => this.noteCardHTML(n)).join('');
        }
      }

      // ─── 2. Görev Panosu Kolonları (Yapılacaklar, Yapılıyor, Yapıldı) ───
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
        const pr = { high: 0, normal: 1, low: 2 };
        items.sort((a, b) => (pr[a.priority] ?? 1) - (pr[b.priority] ?? 1)
          || (a.due || '9999').localeCompare(b.due || '9999')
          || (b.created || 0) - (a.created || 0));
        list.innerHTML = items.map(t => this.cardHTML(t)).join('');
      }
      this.bindCardEvents();
      try { TaskCalendar.render(); } catch (_) {}
    },

    noteCardHTML(n) {
      const esc = Dashboard.escapeHtml;
      const catInfo = NOTEBOOK_CATEGORIES[n.tag] || NOTEBOOK_CATEGORIES.general;
      const dateStr = n.updated ? new Date(n.updated).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) : 'Bugün';
      const courseName = n.courseName || 'Genel';
      const content = (n.content || '').trim();
      const catBorderColors = {
        exam: '#ef4444',
        review: '#3b82f6',
        important: '#f59e0b',
        general: '#06b6d4'
      };
      const borderColor = catBorderColors[n.tag] || '#06b6d4';

      return `
        <div class="task-card kanban-note-card" draggable="true" data-note-id="${esc(n.id)}" style="border-left-color:${borderColor}">
          <div class="kanban-note-badge-bar">
            <span class="zen-card-badge ${catInfo.badgeCls}">${catInfo.icon} ${esc(catInfo.title)}</span>
            <span class="kanban-note-course">📚 ${esc(courseName)}</span>
          </div>
          <div class="task-card-title">${esc(n.title || catInfo.title)}</div>
          ${content ? `<div class="task-card-desc kanban-note-full-text">${esc(content)}</div>` : '<div class="task-card-desc" style="font-style:italic;color:var(--text-muted);">İçerik boş...</div>'}
          <div class="kanban-note-footer">
            <span class="kanban-note-date">🕒 ${dateStr}</span>
            <div class="kanban-note-actions">
              <button type="button" class="btn btn-sm btn-ghost kanban-open-note-btn" data-note-id="${esc(n.id)}" title="Not Defteri'nde aç">📖 Aç</button>
              <button type="button" class="btn btn-sm btn-primary kanban-note-to-task-btn" data-note-id="${esc(n.id)}" title="Bu notu Yapılacaklar listesine görev olarak ekle">➕ Göreve Ekle</button>
            </div>
          </div>
        </div>`;
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
          ${(t.priority === 'high' || t.priority === 'low' || (t.due && t.status !== 'done') || (t.repeat && t.repeat !== 'none')) ? `<div class="task-meta-row">
            ${t.priority === 'high' ? '<span class="task-prio is-high">🔴 Yüksek</span>' : t.priority === 'low' ? '<span class="task-prio is-low">⚪ Düşük</span>' : ''}
            ${t.due && t.status !== 'done' ? dueBadgeHtml(t.due) : ''}
            ${t.repeat && t.repeat !== 'none' ? `<span class="task-repeat">🔁 ${REPEAT_LABELS[t.repeat] || ''}</span>` : ''}
          </div>` : ''}
          <div class="task-card-actions">
            <div class="move-btns">${moveButtons}</div>
            <button type="button" class="edit-task-btn" data-id="${t.id}">✏️</button>
            <button type="button" class="del-task-btn" data-id="${t.id}">🗑️</button>
          </div>
        </div>`;
    },

    bindCardEvents() {
      // Not Defteri kartlarındaki butonlar
      $$('.kanban-open-note-btn').forEach(btn => {
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

      $$('.kanban-note-to-task-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const noteId = btn.dataset.noteId;
          const note = this._notes.find(n => n.id === noteId);
          if (note) {
            const catInfo = NOTEBOOK_CATEGORIES[note.tag] || NOTEBOOK_CATEGORIES.general;
            const coursePrefix = (note.courseName && note.courseName !== 'Genel') ? `[${note.courseName}] ` : '';
            const taskTitle = `${catInfo.icon} ${coursePrefix}${note.title || catInfo.title}`;
            const refTag = `[NotRef:${note.id}]`;

            // Tekrarlı kayıt kontrolü
            const existing = this._tasks.find(t => (t.desc && t.desc.includes(refTag)) || t.title === taskTitle);
            if (existing) {
              showToast('Bu not zaten Görev Panosu\'nda mevcut', 'info');
              return;
            }

            const fullContent = (note.content || '').trim();
            const descContent = `${fullContent}\n\n📚 ${note.courseName || 'Genel'} dersi için Not Defteri'nden aktarıldı. ${refTag}`;
            await apiFetch('/tasks', 'POST', {
              title: taskTitle,
              desc: descContent,
              color: note.tag === 'exam' ? '#ef4444' : '#06b6d4',
              status: 'todo'
            });
            await this.render();
            Dashboard.refresh();
            showToast('Not, Yapılacaklar listesine eklendi ✨', 'success');
          }
        });
      });

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
        if ($('#task-due')) $('#task-due').value = task.due || '';
        if ($('#task-priority')) $('#task-priority').value = task.priority || 'normal';
        if ($('#task-repeat')) $('#task-repeat').value = task.repeat || 'none';
        const colorInput = $(`input[name="task-color"][value="${task.color}"]`);
        if (colorInput) colorInput.checked = true;
      } else {
        $('#task-modal-title').textContent = 'Yeni Görev';
        $('#task-id').value = '';
        if ($('#task-priority')) $('#task-priority').value = 'normal';
        if ($('#task-repeat')) $('#task-repeat').value = 'none';
        if (this._prefillDue && $('#task-due')) { $('#task-due').value = this._prefillDue; }
        this._prefillDue = null;
      }
      openModal('task-modal');
    },

    async saveTask() {
      const id = $('#task-id').value;
      const title = $('#task-title').value.trim();
      if (!title) return;
      const color = $('input[name="task-color"]:checked')?.value || '#7c5cfc';
      const desc = $('#task-desc').value.trim();
      const due = $('#task-due')?.value || '';
      const priority = $('#task-priority')?.value || 'normal';
      const repeat = $('#task-repeat')?.value || 'none';
      if (repeat !== 'none' && !due) {
        showToast('Tekrarlayan görev için bir son tarih seç (ilk tekrar o gün olur).', 'warning');
        return;
      }

      if (id) {
        const task = this._tasks.find(t => t.id === id);
        if (task) await apiFetch(`/tasks/${id}`, 'PUT', { ...task, title, desc, color, due, priority, repeat, repeatSpawned: task.repeat === repeat ? task.repeatSpawned : false });
      } else {
        await apiFetch('/tasks', 'POST', { title, desc, color, due, priority, repeat, status: 'todo' });
      }
      closeModal('task-modal');
      await this.render();
      Dashboard.refresh();
      showToast(id ? 'Görev güncellendi' : 'Görev eklendi', 'success');
    },

    _draggedTaskId: null,
    _draggedNoteId: null,

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
        this._draggedTaskId = card.dataset.id || null;
        this._draggedNoteId = card.dataset.noteId || null;
        card.classList.add('dragging');
        try {
          if (this._draggedTaskId) e.dataTransfer.setData('text/plain', this._draggedTaskId);
          if (this._draggedNoteId) e.dataTransfer.setData('application/x-note-id', this._draggedNoteId);
          e.dataTransfer.effectAllowed = 'move';
        } catch (_) {}
      });

      board.addEventListener('dragend', (e) => {
        const card = e.target.closest('.task-card') || $('.task-card.dragging');
        if (card) card.classList.remove('dragging');
        this._draggedTaskId = null;
        this._draggedNoteId = null;
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
        if (!newStatus || newStatus === 'notes') return;

        let taskId = this._draggedTaskId;
        let noteId = this._draggedNoteId;
        if (!taskId && e.dataTransfer) {
          try { taskId = e.dataTransfer.getData('text/plain'); } catch (_) {}
        }
        if (!noteId && e.dataTransfer) {
          try { noteId = e.dataTransfer.getData('application/x-note-id'); } catch (_) {}
        }
        this._draggedTaskId = null;
        this._draggedNoteId = null;

        // Notu göreve aktararak ilgili kolona bırak
        if (noteId) {
          const note = this._notes.find(n => n.id === noteId);
          if (note) {
            const catInfo = NOTEBOOK_CATEGORIES[note.tag] || NOTEBOOK_CATEGORIES.general;
            const coursePrefix = (note.courseName && note.courseName !== 'Genel') ? `[${note.courseName}] ` : '';
            const taskTitle = `${catInfo.icon} ${coursePrefix}${note.title || catInfo.title}`;
            const refTag = `[NotRef:${note.id}]`;

            const existing = this._tasks.find(t => (t.desc && t.desc.includes(refTag)) || t.title === taskTitle);
            if (existing) {
              await apiFetch(`/tasks/${existing.id}`, 'PUT', { ...existing, status: newStatus });
            } else {
              const fullContent = (note.content || '').trim();
              const descContent = `${fullContent}\n\n📚 ${note.courseName || 'Genel'} dersi için Not Defteri'nden aktarıldı. ${refTag}`;
              await apiFetch('/tasks', 'POST', {
                title: taskTitle,
                desc: descContent,
                color: note.tag === 'exam' ? '#ef4444' : '#06b6d4',
                status: newStatus
              });
            }
            await this.render();
            Dashboard.refresh();
            showToast('Not görev panosuna aktarıldı ✨', 'success');
          }
          return;
        }

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
    selectedCategory: (() => { try { return localStorage.getItem('planova_workout_cat') || 'gogus'; } catch (_) { return 'gogus'; } })(),
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
          confirmAction('Varsayılan 36 temel spor hareketi (tüm kas grupları) yeniden yüklensin mi?', async () => {
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
      const catBtns = $$('.workout-cat-btn');
      if (WorkoutPlan.todayCats().length) this.selectedCategory = 'today';
      else if (this.selectedCategory === 'today') this.selectedCategory = 'gogus';
      if (!catBtns.some(b => b.dataset.cat === this.selectedCategory)) this.selectedCategory = 'gogus';
      catBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === this.selectedCategory));
      catBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          catBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedCategory = btn.dataset.cat || 'all';
          try { localStorage.setItem('planova_workout_cat', this.selectedCategory); } catch (_) {}
          this.renderListOnly();
          this.updateProgressUI();
        });
      });

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
      if (setNum === 1) { try { WorkoutStats.checkPR(ex, this.selectedDate); } catch (_) {} }
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
      const dur = this.timerState.durationSec || 120;
      const pct = Math.max(0, Math.min(100, (totalSeconds / dur) * 100));
      $$('.wc-rest-time').forEach(el => { el.textContent = formatted; });
      $$('.wc-rest-fill').forEach(el => { el.style.width = `${pct}%`; });
    },

    // Sayaç artık ayrı bir kartta değil, set butonuna basılan hareketin içinde açılır
    showRestTimerUI() {
      this.renderListOnly();
      const card = $(`.workout-card[data-id="${this.timerState.exerciseId}"]`);
      if (card && card.scrollIntoView) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

      this.renderListOnly();
    },

    resumeRestTimer() {
      if (!this.timerState.active || !this.timerState.paused) return;

      this.timerState.paused = false;
      this.timerState.endTime = Date.now() + (this.timerState.remainingSec || 0) * 1000;

      Storage.set('asi_workout_timer', {
        ...this.timerState,
        intervalId: null
      });

      this.startTimerInterval();
      this.renderListOnly();
    },

    skipRestTimer() {
      if (!this.timerState.active) return;
      this.cancelRestTimer(false);

    },

    cancelRestTimer(notify = true) {
      if (this.timerState.intervalId) {
        clearInterval(this.timerState.intervalId);
      }
      this.timerState.active = false;
      this.timerState.intervalId = null;
      Storage.remove('asi_workout_timer');

      this.renderListOnly();
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

      this.playChime();
      if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (_) {} }

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
        // Bu yılın tarihlerinde yılı yazma: "29 Ekim, Perşembe" telefona sığsın
        const sameYear = d.getFullYear() === new Date().getFullYear();
        dateLabel.textContent = sameYear
          ? d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })
          : formatDate(d);
      }

      const todayBadge = $('#workout-today-badge');
      if (todayBadge) {
        if (isToday) todayBadge.classList.remove('hidden');
        else todayBadge.classList.add('hidden');
      }
      $('#workout-today-btn')?.classList.toggle('hidden', isToday);

      const dateInput = $('#workout-date-input');
      if (dateInput) dateInput.value = this.selectedDate;
    },

    updateProgressUI() {
      // İlerleme seçili kas grubuna göre (Göğüs günü → 4 göğüs hareketinden kaçı bitti)
      const CAT_NAMES = { all: 'Tümü', gogus: 'Göğüs', sirt: 'Sırt', omuz: 'Omuz', biceps: 'Biceps', triceps: 'Triceps', karin: 'Karın', bacak: 'Bacak', onkol: 'Ön Kol', kardiyo: 'Kardiyo' };
      const cat = this.selectedCategory || 'all';
      if (cat === 'today' && WorkoutPlan.todayCats().length === 0) { this.selectedCategory = 'all'; return this.updateProgressUI(); }
      const scope = this.scopeList(cat);
      const completedIds = new Set(this._logs.filter(l => l.completed).map(l => l.exerciseId));
      const total = scope.length;
      const done = scope.filter(e => completedIds.has(e.id)).length;
      const remaining = Math.max(0, total - done);
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      const setsToday = this._logs.reduce((n, l) => n + (Array.isArray(l.completedSets) ? l.completedSets.length : (l.completed ? (l.sets || 0) : 0)), 0);

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

      const scopeEl = $('#workout-scope-label');
      if (scopeEl) scopeEl.textContent = cat === 'all' ? 'hareket' : cat === 'today' ? 'program hareketi' : `${CAT_NAMES[cat] || ''} hareketi`;

      const setsEl = $('#workout-sets-today');
      if (setsEl) setsEl.textContent = setsToday;

      const descEl = $('#workout-progress-status-desc');
      if (descEl) {
        if (pct === 100 && total > 0) {
          descEl.textContent = cat === 'all' ? '🔥 Harika! Tüm hareketleri bitirdin!' : cat === 'today' ? '🔥 Harika! Bugünkü program tamam.' : `🔥 Harika! ${CAT_NAMES[cat]} antrenmanı tamam.`;
        } else if (done > 0) {
          descEl.textContent = `💪 Harika gidiyorsun, ${remaining} hareket kaldı.`;
        } else {
          descEl.textContent = '';
        }
        descEl.classList.toggle('hidden', !descEl.textContent);
      }
    },

    // Seçili filtreye göre hareketler ("today" = haftalık programdaki bugünün kas grupları)
    scopeList(cat) {
      if (cat === 'all') return this._exercises;
      if (cat === 'today') {
        const cats = WorkoutPlan.todayCats();
        return this._exercises.filter(e => cats.includes(e.category));
      }
      return this._exercises.filter(e => e.category === cat);
    },

    updateCategoryCounts() {
      const todayCats = WorkoutPlan.todayCats();
      const todayBtn = $('.workout-cat-btn[data-cat="today"]');
      if (todayBtn) {
        todayBtn.classList.toggle('hidden', todayCats.length === 0);
        todayBtn.title = todayCats.length ? 'Bugün: ' + todayCats.map(c => WorkoutPlan.CATS[c]?.name || c).join(' + ') : '';
      }
      const tc = $('#cat-count-today');
      if (tc) tc.textContent = this.scopeList('today').length;
      const cats = ['all', 'gogus', 'sirt', 'omuz', 'biceps', 'triceps', 'karin', 'bacak', 'onkol', 'kardiyo'];
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

      const list = this.scopeList(this.selectedCategory);

      if (list.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">🏋️</div>
            <p>Bu kas grubuna ait hareket bulunamadı.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="ASI.workout.openExerciseModal()">+ Hareket Ekle</button>
          </div>`;
        return;
      }

      const logMap = new Map();
      this._logs.forEach(l => logMap.set(l.exerciseId, l));

      const catNames = {
        gogus: 'Göğüs',
        sirt: 'Sırt',
        omuz: 'Omuz',
        biceps: 'Biceps',
        triceps: 'Triceps',
        karin: 'Karın',
        bacak: 'Bacak',
        onkol: 'Ön Kol',
        kardiyo: 'Kardiyo'
      };

      const esc = Dashboard.escapeHtml;

      // Önceki ağırlık haritası (tarih !== selectedDate olan en son kayıt)
      // Seçili günden önceki EN SON antrenmandaki ağırlık (sıralamadan bağımsız)
      const prevWeightMap = new Map();
      const prevDateMap = new Map();
      this._history.forEach(h => {
        if (!h.weight || !h.date || h.date >= this.selectedDate) return;
        if (!prevDateMap.has(h.exerciseId) || h.date > prevDateMap.get(h.exerciseId)) {
          prevDateMap.set(h.exerciseId, h.date);
          prevWeightMap.set(h.exerciseId, h.weight);
        }
      });

      const t = this.timerState;
      const timerHidden = t.active && !list.some(e => e.id === t.exerciseId);
      const miniBar = timerHidden ? `
        <div class="wc-rest-mini" style="grid-column: 1/-1;">
          <span>⏱️ ${esc(t.exerciseName)} · Set ${t.setNum}</span>
          <strong class="wc-rest-time">--:--</strong>
          <button type="button" class="wc-rest-btn wc-rest-skip">⏭ Geç</button>
          <button type="button" class="wc-rest-btn wc-rest-close" aria-label="Sayacı kapat">✕</button>
        </div>` : '';

      container.innerHTML = miniBar + list.map(ex => {
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

          return `<button type="button"
                    class="workout-set-btn ${isDone ? 'is-set-done' : ''} ${isLast ? 'is-last-set' : ''} ${isTimerActive ? 'active-timer' : ''}"
                    data-ex-id="${ex.id}" data-set-num="${sNum}" data-total-sets="${totalSets}"
                    title="${isDone ? `${sNum}. seti geri al` : `${sNum}. seti tamamla (${isLast ? '5 dk' : '2 dk'} dinlenme)`}">${isDone ? '✓ ' : ''}Set ${sNum}</button>`;
        }).join('');

        const weightText = weight && weight !== 'Vücut Ağırlığı' ? esc(weight) : 'Vücut ağırlığı';
        const showTag = this.selectedCategory === 'all' || this.selectedCategory === 'today';
        const best = WorkoutStats.best(ex.id);

        return `
          <div class="workout-card ${isCompleted ? 'is-completed' : ''}" data-id="${ex.id}" data-cat="${ex.category}">
            <div class="wc-head">
              <button type="button" class="workout-check-btn" data-id="${ex.id}" title="${isCompleted ? 'Tamamlanmadı yap' : 'Tüm setleri bitti olarak işaretle'}" aria-label="Hareketi tamamla">✓</button>
              <div class="wc-title-box">
                <span class="workout-card-title">${esc(ex.name)}</span>
                <span class="wc-specs">${best ? `<span class="wc-pr" title="Kişisel rekor">🏆 ${best.value} kg</span> ` : ''}${totalSets} set × ${reps} tekrar · ${weightText}${prevWeight && prevWeight !== weight ? ` <span class="wc-prev" title="Önceki antrenmandaki ağırlık">(önceki ${esc(prevWeight)})</span>` : ''}${showTag ? ` · <span class="wc-cat cat-${ex.category}">${catNames[ex.category] || ex.category}</span>` : ''}</span>
              </div>
              <div class="workout-card-actions">
                <button type="button" class="workout-action-btn chart-btn" data-id="${ex.id}" title="Gelişim grafiği" aria-label="Gelişim grafiği">📈</button>
                <button type="button" class="workout-action-btn edit-btn" data-id="${ex.id}" title="Düzenle" aria-label="Düzenle">✏️</button>
                <button type="button" class="workout-action-btn del-btn" data-id="${ex.id}" title="Sil" aria-label="Sil">🗑️</button>
              </div>
            </div>
            <div class="workout-sets-pills">${setPills}<span class="wc-set-count">${completedSets.length}/${totalSets}</span></div>
            ${this.restPanelHtml(ex)}
          </div>
        `;
      }).join('');

      this.bindListEvents();
      if (timerHidden) {
        const rem = t.paused ? (t.remainingSec || 0) : Math.max(0, Math.round((t.endTime - Date.now()) / 1000));
        this.updateRestTimerDisplay(rem);
      }
    },

    restPanelHtml(ex) {
      const t = this.timerState;
      if (!t.active || t.exerciseId !== ex.id) return '';
      const rem = t.paused ? (t.remainingSec || 0) : Math.max(0, Math.round((t.endTime - Date.now()) / 1000));
      const mm = String(Math.floor(rem / 60)).padStart(2, '0');
      const ss = String(rem % 60).padStart(2, '0');
      const pct = Math.max(0, Math.min(100, (rem / (t.durationSec || 120)) * 100));
      const label = t.isLastSet ? `Son set bitti · ${Math.round((t.durationSec || 300) / 60)} dk dinlen` : `Set ${t.setNum} bitti · dinleniyor`;
      return `
        <div class="wc-rest ${t.paused ? 'is-paused' : ''} ${t.isLastSet ? 'is-last' : ''}">
          <div class="wc-rest-top">
            <span class="wc-rest-label">⏱️ ${label}</span>
            <span class="wc-rest-time">${mm}:${ss}</span>
          </div>
          <div class="wc-rest-bar"><div class="wc-rest-fill" style="width:${pct}%"></div></div>
          <div class="wc-rest-actions">
            ${t.paused
              ? '<button type="button" class="wc-rest-btn wc-rest-resume">▶ Devam</button>'
              : '<button type="button" class="wc-rest-btn wc-rest-pause">⏸ Duraklat</button>'}
            <button type="button" class="wc-rest-btn wc-rest-skip">⏭ Geç</button>
            <button type="button" class="wc-rest-btn wc-rest-close" aria-label="Sayacı kapat">✕</button>
          </div>
        </div>`;
    },

    bindListEvents() {
      $$('.workout-action-btn.chart-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); WorkoutStats.openChart(b.dataset.id); }));
      $$('.wc-rest-pause').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); this.pauseRestTimer(); }));
      $$('.wc-rest-resume').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); this.resumeRestTimer(); }));
      $$('.wc-rest-skip').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); this.skipRestTimer(); }));
      $$('.wc-rest-close').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); this.cancelRestTimer(false); }));

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
              <div style="color:var(--accent-turquoise, #0284C7); font-weight:700; font-size:0.82rem;">
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

      // Kapak resmi okuyucu ve otomatik sıkıştırma (Canvas + JPEG %70)
      $('#book-cover-input')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            showToast('Görsel optimize ediliyor...', 'info');
            const compressed = await compressImageFile(file, 300, 400, 0.7);
            const dataInput = $('#book-cover-data');
            if (dataInput) dataInput.value = compressed;

            const previewImg = $('#book-cover-preview');
            const previewContainer = $('#book-cover-preview-container');
            if (previewImg && previewContainer) {
              previewImg.src = compressed;
              previewContainer.classList.remove('hidden');
            }
            showToast('Kapak görseli optimize edildi ✓', 'success');
          } catch (err) {
            console.error('Kapak sıkıştırma hatası:', err);
            showToast('Görsel işlenemedi, lütfen tekrar deneyin.', 'error');
          }
        }
      });

      // Kapak görseli kaldırma butonu
      $('#book-cover-remove-btn')?.addEventListener('click', () => {
        const fileInput = $('#book-cover-input');
        const dataInput = $('#book-cover-data');
        const previewImg = $('#book-cover-preview');
        const previewContainer = $('#book-cover-preview-container');
        if (fileInput) fileInput.value = '';
        if (dataInput) dataInput.value = '';
        if (previewImg) previewImg.src = '';
        if (previewContainer) previewContainer.classList.add('hidden');
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
            <button class="btn btn-primary btn-md" onclick="ASI.books.openBookModal()">+ İlk Kitabını Ekle</button>
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
            <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="ASI.books.openBookModal()">+ Yeni Kitap Ekle</button>
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

            <!-- Son Kaldığım Sayfa & Hızlı İlerleme Kutusu -->
            <div class="book-quick-progress-box">
              <div class="quick-prog-head">
                <span class="quick-prog-label">📍 Son Kaldığım Sayfa</span>
                <span class="quick-prog-indicator"><strong>${cur}</strong> / ${total} sf (%${pct})</span>
              </div>
              <div class="quick-prog-input-wrap">
                <input type="number" 
                       class="quick-page-input" 
                       data-id="${b.id}" 
                       min="0" 
                       max="${total}" 
                       value="${cur}" 
                       placeholder="Sayfa">
                <button type="button" 
                        class="btn btn-secondary btn-sm quick-save-page-btn" 
                        data-id="${b.id}"
                        title="Kaldığın sayfayı kaydet">
                  İlerlemeyi Kaydet
                </button>
              </div>
            </div>

            <!-- Kart Altı Aksiyonları -->
            <div class="book-card-footer">
              <div class="book-card-actions-left">
                <button type="button" 
                        class="btn btn-sm btn-primary btn-focus-reading" 
                        data-id="${b.id}"
                        title="30 dk Odaklanma Sayacı ile okumaya başla">
                  ⏱️ Odaklanarak Oku
                </button>
                <button type="button" 
                        class="btn btn-sm btn-ghost btn-start-reading ${b.status === 'reading' ? 'is-reading' : ''}" 
                        data-id="${b.id}"
                        title="${b.status === 'reading' ? 'Okumaya devam et' : 'Bu kitabı okumaya başla'}">
                  ${b.status === 'reading' ? '📖 Okunuyor' : (b.status === 'completed' ? '🔄 Tekrar Oku' : '📖 Başla')}
                </button>
                <button type="button" class="btn btn-sm btn-ghost btn-detail-quick" data-id="${b.id}" title="Detay & İstatistik">
                  ℹ️ Detay
                </button>
              </div>
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
      // Odaklanarak Oku (Pomodoro Zen Modu)
      $$('.btn-focus-reading').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof BookFocusManager !== 'undefined') {
            BookFocusManager.startFocusFlow(btn.dataset.id);
          }
        });
      });

      // Okumaya Başla / Devam Et
      $$('.btn-start-reading').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.startReading(btn.dataset.id);
        });
      });

      // Hızlı Sayfa Kaydet (İlerlemeyi Kaydet)
      $$('.quick-save-page-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const bookId = btn.dataset.id;
          const input = $(`.quick-page-input[data-id="${bookId}"]`);
          if (input) {
            this.updateQuickPage(bookId, input.value);
          }
        });
      });

      // Enter tuşuna basıldığında sayfayı kaydet
      $$('.quick-page-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.updateQuickPage(input.dataset.id, input.value);
          }
        });
      });

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
            <button class="btn btn-primary btn-sm" style="margin-top:1rem;" onclick="ASI.books.openSessionModal()">+ İlk Oturumu Ekle</button>
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
      const coverFile = $('#book-cover-input');
      const previewImg = $('#book-cover-preview');
      const previewContainer = $('#book-cover-preview-container');

      if (coverData) coverData.value = '';
      if (coverFile) coverFile.value = '';
      if (previewImg) previewImg.src = '';
      if (previewContainer) previewContainer.classList.add('hidden');

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
        if (book.coverImage && previewImg && previewContainer) {
          previewImg.src = book.coverImage;
          previewContainer.classList.remove('hidden');
        }
      } else {
        if (titleEl) titleEl.textContent = 'Yeni Kitap Ekle';
        if (idInput) idInput.value = '';
        $('#book-title').value = '';
        $('#book-author').value = '';
        $('#book-category').value = 'Polisiye / Dedektif';
        $('#book-total-pages').value = 300;
        $('#book-current-page').value = 0;
        const defaultStatus = ['reading', 'to_read', 'on_hold'].includes(this.statusFilter) ? this.statusFilter : 'reading';
        $('#book-status').value = defaultStatus;
        $('#book-rating').value = 0;
        $('#book-start-date').value = defaultStatus === 'reading' ? formatDateShort(new Date()) : '';
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
      let currentPage = parseInt($('#book-current-page').value, 10) || 0;
      let status = $('#book-status').value;
      const rating = parseInt($('#book-rating').value, 10) || 0;
      let startDate = $('#book-start-date').value;
      let finishDate = $('#book-finish-date').value;
      const notes = $('#book-notes').value.trim();
      let coverImage = $('#book-cover-data')?.value || '';

      if (!title) {
        showToast('Lütfen kitap adını girin', 'error');
        return;
      }

      // Dosya inputu seçiliyse ve async sıkıştırma henüz bitmemişse güvenli sıkıştır
      const coverFileInput = $('#book-cover-input');
      if (coverFileInput && coverFileInput.files && coverFileInput.files[0] && !coverImage) {
        try {
          coverImage = await compressImageFile(coverFileInput.files[0], 300, 400, 0.7);
        } catch (e) {
          console.warn('Kapak sıkıştırma hatası:', e);
        }
      }

      // Mevcut coverImage çok büyükse (örn. eski kayıttan kalan) anında optimize et
      if (coverImage && coverImage.length > 80000) {
        try {
          coverImage = await compressImageFile(coverImage, 300, 400, 0.7);
        } catch (e) {
          console.warn('Kapak optimizasyon hatası:', e);
        }
      }

      if (currentPage < 0) currentPage = 0;
      if (currentPage > totalPages) currentPage = totalPages;

      // Son sayfaya ulaşıldıysa otomatik tamamla (Requirement 4)
      if (currentPage >= totalPages) {
        status = 'completed';
        if (!finishDate) finishDate = formatDateShort(new Date());
      } else if (status === 'completed' && currentPage < totalPages) {
        status = 'reading';
        finishDate = '';
      }

      if (status === 'reading' && !startDate) {
        startDate = formatDateShort(new Date());
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
        coverColor: (id && this._books.find(b => b.id === id)?.coverColor) || ['#0284C7', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 5)]
      };

      let result = null;
      if (id) {
        result = await apiFetch(`/books/${id}`, 'PUT', bookData);
        if (!result) {
          showToast('⚠️ Kitap güncellenemedi (Depolama hatası)', 'error');
          return;
        }
        showToast('Kitap güncellendi ✓', 'success');
      } else {
        result = await apiFetch('/books', 'POST', bookData);
        if (!result) {
          showToast('⚠️ Yeni kitap kaydedilemedi (Depolama hatası)', 'error');
          return;
        }
        showToast('Yeni kitap eklendi 📚', 'success');
      }

      // Başarılı kayıttan sonra form alanlarını temizle
      if ($('#book-title')) $('#book-title').value = '';
      if ($('#book-cover-input')) $('#book-cover-input').value = '';
      if ($('#book-cover-data')) $('#book-cover-data').value = '';
      const previewContainer = $('#book-cover-preview-container');
      if (previewContainer) previewContainer.classList.add('hidden');

      // ─── 1. SENKRONİZASYON VE FİLTRE SIFIRLAMA ───
      // Kullanıcının yeni eklenen kitabı hemen görebilmesi için sekme ve filtreleri sıfırla
      this.currentTab = 'library';
      $$('.book-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'library'));
      $$('.book-tab-content').forEach(c => {
        const isTarget = c.id === 'book-tab-content-library';
        c.classList.toggle('active', isTarget);
        c.classList.toggle('hidden', !isTarget);
      });

      // Durum sekmesini "Tümü" yap
      this.statusFilter = 'all';
      $$('.book-pill-btn').forEach(b => b.classList.toggle('active', (b.dataset.status || 'all') === 'all'));

      // Kategori filtresini sıfırla ("all")
      this.categoryFilter = 'all';
      const cf = $('#book-category-filter');
      if (cf) cf.value = 'all';

      // Arama sorgusunu sıfırla
      this.searchQuery = '';
      const si = $('#book-search-input');
      if (si) si.value = '';
      $('#book-search-clear')?.classList.add('hidden');

      closeModal('book-modal');

      // Tüm listeyi, filtre sayaçlarını ve istatistikleri senkronize olarak yeniden çiz
      await this.render();
    },

    // ─── Okumaya Başla / Devam Et ───
    async startReading(bookId) {
      const book = this._books.find(b => b.id === bookId);
      if (!book) return;

      const cur = book.currentPage || 0;
      const total = book.totalPages || 100;
      const isCompleted = book.status === 'completed';

      if (isCompleted) {
        confirmAction(`"${book.title}" kitabını zaten bitirdiniz. Baştan tekrar okumaya başlamak istiyor musunuz?`, async () => {
          book.status = 'reading';
          book.currentPage = 0;
          book.startDate = formatDateShort(new Date());
          book.finishDate = '';
          await apiFetch(`/books/${book.id}`, 'PUT', book);
          await this.render();
          showToast(`📖 "${book.title}" yeniden okumaya başlandı! (0/${total} sayfa)`, 'info');
        });
        return;
      }

      book.status = 'reading';
      if (!book.startDate) {
        book.startDate = formatDateShort(new Date());
      }

      await apiFetch(`/books/${book.id}`, 'PUT', book);
      await this.render();

      if (cur > 0) {
        showToast(`📖 "${book.title}" okumasına devam ediliyor! Son kaldığınız sayfa: ${cur} / ${total}`, 'info');
      } else {
        showToast(`📖 "${book.title}" için okumaya başlandı! (0/${total} sayfa)`, 'success');
      }
    },

    // ─── Son Kaldığım Sayfayı Kaydet & Otomatik Tamamlama ───
    async updateQuickPage(bookId, newPage) {
      const book = this._books.find(b => b.id === bookId);
      if (!book) return;

      const total = book.totalPages || 100;
      const cur = book.currentPage || 0;

      newPage = parseInt(newPage, 10);
      if (isNaN(newPage)) {
        showToast('Lütfen geçerli bir sayfa numarası girin!', 'error');
        return;
      }

      if (newPage < 0) {
        showToast('Sayfa numarası 0\'dan küçük olamaz!', 'error');
        return;
      }

      if (newPage > total) {
        showToast(`Sayfa numarası toplam sayfa sayısından (${total}) büyük olamaz!`, 'error');
        return;
      }

      if (newPage === cur) {
        showToast(`Zaten ${cur}. sayfadasınız, değişiklik yapılmadı.`, 'info');
        return;
      }

      const delta = newPage - cur;

      // İleri gidildiyse otomatik oturum kaydet (istatistik ve grafikler için)
      if (delta > 0) {
        const today = formatDateShort(new Date());
        const approxDuration = Math.max(10, Math.round(delta * 1.5));
        await apiFetch('/reading/sessions', 'POST', {
          bookId: book.id,
          bookTitle: book.title,
          date: today,
          startPage: cur,
          endPage: newPage,
          pagesRead: delta,
          duration: approxDuration,
          notes: `${newPage}. sayfaya ulaşıldı`
        });
      }

      book.currentPage = newPage;

      // Son sayfaya ulaşıldığında otomatik tamamlama (Requirement 4)
      if (newPage >= total) {
        book.status = 'completed';
        book.finishDate = formatDateShort(new Date());
        this.playVictoryChime();
        showToast(`🏆 Tebrikler! "${book.title}" kitabının son sayfasına ulaştınız ve kitap tamamlandı! 🎉`, 'success');
      } else if (book.status === 'completed' && newPage < total) {
        // Kullanıcı yanlışlıkla son sayfayı girdiyse ve geri aldıysa
        book.status = 'reading';
        book.finishDate = '';
        showToast(`"${book.title}" sayfa sayısı güncellendi, kitap tekrar Okunuyor durumuna alındı.`, 'info');
      } else if (book.status === 'to_read') {
        book.status = 'reading';
        if (!book.startDate) book.startDate = formatDateShort(new Date());
        showToast(`✓ "${book.title}" okumaya başlandı: ${newPage}/${total} sayfa (%${Math.round((newPage / total) * 100)}).`, 'success');
      } else {
        const pct = Math.round((newPage / total) * 100);
        showToast(`✓ "${book.title}" kaydedildi: ${newPage}/${total} sayfa (%${pct}).`, 'success');
      }

      await apiFetch(`/books/${book.id}`, 'PUT', book);
      await this.render();
    },

    // ─── Manuel Durum Değiştirme ───
    async toggleBookStatus(bookId, newStatus) {
      const book = this._books.find(b => b.id === bookId);
      if (!book) return;

      book.status = newStatus;
      if (newStatus === 'completed') {
        book.currentPage = book.totalPages;
        if (!book.finishDate) book.finishDate = formatDateShort(new Date());
        this.playVictoryChime();
        showToast(`🏆 "${book.title}" tamamlandı olarak işaretlendi! 🎉`, 'success');
      } else if (newStatus === 'reading') {
        if (!book.startDate) book.startDate = formatDateShort(new Date());
        book.finishDate = '';
        showToast(`📖 "${book.title}" okunuyor olarak işaretlendi.`, 'info');
      } else {
        showToast(`Durum güncellendi: ${newStatus}`, 'info');
      }

      await apiFetch(`/books/${book.id}`, 'PUT', book);
      await this.render();
    },

    // Başarı Sesi (Web Audio API)
    playVictoryChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 Arpej
        freqs.forEach((freq, idx) => {
          setTimeout(() => {
            try {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, ctx.currentTime);
              gain.gain.setValueAtTime(0.25, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.4);
            } catch (_) {}
          }, idx * 110);
        });
      } catch (_) {}
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
      const isReading = book.status === 'reading';
      const isCompleted = book.status === 'completed';

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
            <div style="margin: 0.5rem 0; display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
              ${book.rating > 0 ? `<span style="font-size:1.1rem;">${'⭐'.repeat(book.rating)}</span>` : '<span class="text-muted">Puanlanmadı</span>'}
              <span class="badge ${isCompleted ? 'badge-success' : (isReading ? 'badge-info' : 'badge-warning')}">
                ${isCompleted ? '✅ Tamamlandı' : (isReading ? '📖 Okunuyor' : '⏳ Okunacak')}
              </span>
            </div>
            <div class="book-detail-dates">
              <span>📅 <strong>Başlama:</strong> ${esc(book.startDate || 'Belirtilmedi')}</span>
              <span>🏁 <strong>Bitiş:</strong> ${esc(book.finishDate || (isCompleted ? 'Tamamlandı' : 'Devam Ediyor'))}</span>
            </div>
            <div style="margin-top:0.6rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button type="button" class="btn btn-sm btn-primary detail-start-reading-btn">
                ${isReading ? '📖 Okumaya Devam Et' : (isCompleted ? '🔄 Baştan Oku' : '📖 Okumaya Başla')}
              </button>
              ${!isCompleted ? `<button type="button" class="btn btn-sm btn-ghost detail-mark-done-btn">✅ Tamamlandı Yap</button>` : `<button type="button" class="btn btn-sm btn-ghost detail-reopen-btn">🔄 Okunuyor Yap</button>`}
            </div>
          </div>
        </div>

        <!-- Hızlı Sayfa İlerleme Alanı -->
        <div class="book-quick-progress-box" style="margin: 1.1rem 0;">
          <div class="quick-prog-head">
            <span style="font-weight:700; color:var(--text-primary); font-size:0.88rem;">📍 Son Kaldığım Sayfayı Güncelle:</span>
            <span class="quick-prog-indicator"><strong>${cur}</strong> / ${total} sayfa (%${pct})</span>
          </div>
          <div class="quick-prog-input-wrap" style="margin-top:0.35rem;">
            <input type="number" id="detail-modal-page-input" class="quick-page-input" style="width:110px;" min="0" max="${total}" value="${cur}" placeholder="Sayfa No">
            <button type="button" id="detail-modal-save-page-btn" class="btn btn-primary btn-sm quick-save-page-btn">İlerlemeyi Kaydet</button>
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
            <button class="btn btn-sm btn-primary" onclick="ASI.closeModal('book-detail-modal'); ASI.books.openSessionModal('${book.id}')">+ Yeni Oturum</button>
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

      // Detay modalı içindeki butonların dinleyicileri
      try { BookQuotes.mount(bodyEl, bookId); } catch (e) { console.warn('Alıntılar:', e); }
      bodyEl.querySelector('.detail-start-reading-btn')?.addEventListener('click', async () => {
        await this.startReading(book.id);
        this.openDetailModal(book.id);
      });

      bodyEl.querySelector('.detail-mark-done-btn')?.addEventListener('click', async () => {
        await this.toggleBookStatus(book.id, 'completed');
        this.openDetailModal(book.id);
      });

      bodyEl.querySelector('.detail-reopen-btn')?.addEventListener('click', async () => {
        await this.toggleBookStatus(book.id, 'reading');
        this.openDetailModal(book.id);
      });

      bodyEl.querySelector('#detail-modal-save-page-btn')?.addEventListener('click', async () => {
        const input = bodyEl.querySelector('#detail-modal-page-input');
        if (input) {
          await this.updateQuickPage(book.id, input.value);
          this.openDetailModal(book.id);
        }
      });

      bodyEl.querySelector('#detail-modal-page-input')?.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const input = bodyEl.querySelector('#detail-modal-page-input');
          if (input) {
            await this.updateQuickPage(book.id, input.value);
            this.openDetailModal(book.id);
          }
        }
      });

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
  // SADE & FERAH NOT DEFTERİ (MINIMAL ZEN NOTES)
  // ═══════════════════════════════════════════════════════

  const NOTEBOOK_CATEGORIES = {
    exam: { title: 'Sınavda Çıkabilir', icon: '🎯', badgeCls: 'badge-tag-exam' },
    review: { title: 'Tekrar Et', icon: '🔄', badgeCls: 'badge-tag-review' },
    important: { title: 'Önemli', icon: '⭐', badgeCls: 'badge-tag-important' },
    general: { title: 'Genel', icon: '📝', badgeCls: 'badge-tag-general' }
  };

  const Notebook = {
    activeNoteId: null,
    autoSaveTimer: null,
    _notes: [],
    activeFilter: 'all', // 'all' | 'exam' | 'review' | 'important' | 'general'
    searchText: '',
    currentTag: 'general',

    init() {
      // 1. Yeni Not Butonları
      $('#zen-new-btn')?.addEventListener('click', () => this.createNewNote());
      $('#zen-empty-new-btn')?.addEventListener('click', () => this.createNewNote());

      // 2. Arama ve Temizle
      const searchIn = $('#zen-search-input');
      const searchClear = $('#zen-search-clear');
      if (searchIn) {
        searchIn.addEventListener('input', () => {
          this.searchText = searchIn.value.trim().toLocaleLowerCase('tr-TR');
          searchClear?.classList.toggle('hidden', !searchIn.value);
          this.renderList();
        });
      }
      if (searchClear) {
        searchClear.addEventListener('click', () => {
          if (searchIn) {
            searchIn.value = '';
            searchIn.focus();
          }
          this.searchText = '';
          searchClear.classList.add('hidden');
          this.renderList();
        });
      }

      // 3. Filtre Hapları
      $('#zen-filter-pills')?.addEventListener('click', (e) => {
        const pill = e.target.closest('.zen-pill');
        if (!pill) return;
        $$('#zen-filter-pills .zen-pill').forEach(p => p.classList.toggle('active', p === pill));
        this.activeFilter = pill.dataset.filter || 'all';
        this.renderList();
      });

      // 4. Mobil Geri Butonu
      $('#zen-back-btn')?.addEventListener('click', () => {
        this.setMobileView('list');
      });

      // 5. Etiket / Kategori Seçici (4 Sabit Buton)
      $('#zen-tag-selector')?.addEventListener('click', async (e) => {
        const btn = e.target.closest('.zen-tag-btn');
        if (!btn) return;
        const tag = btn.dataset.tag;
        if (NOTEBOOK_CATEGORIES[tag]) {
          this.selectTag(tag);
          this.markDirty();
          await this.saveActiveNote();
          showToast(`Kategori: "${NOTEBOOK_CATEGORIES[tag].title}" olarak seçildi ✨`, 'info');
        }
      });

      // 6. Ders Seçici
      $('#zen-edit-course')?.addEventListener('change', () => {
        this.markDirty();
        this.triggerAutoSave(200);
      });

      // 7. Not Gövdesi (Metin Alanı) + Otomatik Kaydetme
      const bodyInput = $('#zen-note-content');
      bodyInput?.addEventListener('input', () => {
        this.markDirty();
        this.updateWordCount();
        this.triggerAutoSave(600);
      });

      // 8. Manuel Kaydet Butonu
      $('#zen-save-btn')?.addEventListener('click', async () => {
        const bodyInput = $('#zen-note-content');
        const contentVal = (bodyInput?.value || '').trim();

        if (!contentVal && !this.activeNoteId) {
          showToast('Not içeriği boş, yazmaya başlayabilirsiniz ✨', 'info');
          bodyInput?.focus();
          return;
        }

        const saved = await this.saveActiveNote();
        if (saved) {
          showToast('Not kaydedildi ✓ Yeni nota geçildi ✨', 'success');
          await this.createNewNote();
        }
      });

      // 9. Silme Butonu
      $('#zen-del-btn')?.addEventListener('click', () => {
        if (!this.activeNoteId) return;
        confirmAction('Bu ders notunu silmek istediğinize emin misiniz?', async () => {
          await this.deleteNote(this.activeNoteId);
        });
      });

      // 10. Göreve Aktar
      $('#zen-to-task-btn')?.addEventListener('click', async () => {
        await this.saveActiveNote();
        const note = this._notes.find(n => n.id === this.activeNoteId);
        if (note) await this.syncNoteToTask(note, true);
      });

      // 11. Ctrl + S Kısayolu (Kaydet ve Yeni Nota Geç)
      document.addEventListener('keydown', async (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
          if (Nav.current === 'notebook' && this.activeNoteId) {
            e.preventDefault();
            const saved = await this.saveActiveNote();
            if (saved) {
              showToast('Not kaydedildi ✓ Yeni nota geçildi ✨', 'success');
              await this.createNewNote();
            }
          }
        }
      });
    },

    setMobileView(view) {
      const container = $('#zen-container');
      if (container) container.dataset.mobileView = view;
    },

    markDirty() {
      const tag = $('#zen-save-tag');
      if (tag) {
        tag.textContent = 'Yazılıyor...';
        tag.classList.add('dirty');
      }
    },

    markSaved() {
      const tag = $('#zen-save-tag');
      if (tag) {
        tag.textContent = 'Kaydedildi ✓';
        tag.classList.remove('dirty');
      }
    },

    triggerAutoSave(delay = 800) {
      clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = setTimeout(() => {
        this.saveActiveNote();
      }, delay);
    },

    updateWordCount() {
      const content = $('#zen-note-content')?.value || '';
      const words = content.trim() ? content.trim().split(/\s+/).length : 0;
      const countEl = $('#zen-word-count');
      if (countEl) countEl.textContent = `${words} kelime`;
    },

    selectTag(tag) {
      this.currentTag = NOTEBOOK_CATEGORIES[tag] ? tag : 'general';
      $$('#zen-tag-selector .zen-tag-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tag === this.currentTag);
      });
    },

    async loadNotes() {
      const raw = (await apiFetch('/notes')) || [];
      // Geriye dönük uyumluluk: eski notların kategorisini doğrula
      this._notes = raw.map(n => {
        let tag = n.tag;
        if (!NOTEBOOK_CATEGORIES[tag]) {
          tag = n.isExamTopic ? 'exam' : 'general';
        }
        const title = NOTEBOOK_CATEGORIES[tag].title;
        return { ...n, tag, title: n.title || title };
      });
    },

    async getCourses() {
      if (!Attendance.getCourses() || Attendance.getCourses().length === 0) {
        await Attendance.loadData();
      }
      return Attendance.getCourses() || [];
    },

    shortCourseName(c) {
      if (!c) return 'Genel';
      return (c.code || '').split('[')[0].trim() || c.name || 'Genel';
    },

    async render() {
      await Promise.all([this.loadNotes(), this.getCourses()]);
      this.renderCourseSelect();
      this.renderList();

      if (this.activeNoteId && this._notes.some(n => n.id === this.activeNoteId)) {
        const cur = this._notes.find(n => n.id === this.activeNoteId);
        this.openEditor(cur, false);
      } else if (this._notes.length > 0 && window.innerWidth > 800) {
        this.openEditor(this._notes[0], false);
      } else {
        this.closeEditor();
      }
    },

    renderCourseSelect() {
      const select = $('#zen-edit-course');
      if (!select) return;
      const courses = Attendance.getCourses() || [];
      const esc = Dashboard.escapeHtml;

      select.innerHTML = '<option value="">Genel Ders</option>' +
        courses.map(c => `<option value="${esc(c.id)}">${esc(this.shortCourseName(c))} — ${esc(c.name)}</option>`).join('');
    },

    getFilteredNotes() {
      const q = this.searchText;
      return this._notes
        .filter(n => {
          if (this.activeFilter === 'all') return true;
          return (n.tag || 'general') === this.activeFilter;
        })
        .filter(n => {
          if (!q) return true;
          const hay = `${n.title || ''} ${n.content || ''} ${n.courseName || ''}`.toLocaleLowerCase('tr-TR');
          return hay.includes(q);
        })
        .sort((a, b) => {
          const ea = a.tag === 'exam' ? 1 : 0;
          const eb = b.tag === 'exam' ? 1 : 0;
          if (ea !== eb) return eb - ea;
          return (b.updated || b.created || 0) - (a.updated || a.created || 0);
        });
    },

    renderList() {
      const listEl = $('#zen-notes-list');
      const countEl = $('#zen-notes-count');
      if (!listEl) return;

      const filtered = this.getFilteredNotes();
      if (countEl) countEl.textContent = `${this._notes.length} not`;

      if (filtered.length === 0) {
        listEl.innerHTML = `
          <div class="zen-list-empty">
            <p>Eşleşen not bulunamadı.</p>
          </div>
        `;
        return;
      }

      const esc = Dashboard.escapeHtml;

      listEl.innerHTML = filtered.map(n => {
        const catInfo = NOTEBOOK_CATEGORIES[n.tag] || NOTEBOOK_CATEGORIES.general;
        const isActive = n.id === this.activeNoteId;
        const dateStr = n.updated ? new Date(n.updated).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) : 'Bugün';
        const courseName = n.courseName || 'Genel';
        const snippet = (n.content || '').trim() || 'İçerik yok...';

        return `
          <div class="zen-card ${isActive ? 'active' : ''}" data-id="${esc(n.id)}">
            <div class="zen-card-head">
              <h4 class="zen-card-title">${catInfo.icon} ${esc(catInfo.title)}</h4>
              <span class="zen-card-badge ${catInfo.badgeCls}">${catInfo.icon} ${catInfo.title}</span>
            </div>
            <p class="zen-card-preview">${esc(snippet)}</p>
            <div class="zen-card-foot">
              <span class="zen-card-course">📚 ${esc(courseName)}</span>
              <span class="zen-card-date">${dateStr}</span>
            </div>
          </div>
        `;
      }).join('');

      $$('.zen-card', listEl).forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const note = this._notes.find(n => n.id === id);
          if (note) this.openEditor(note, true);
        });
      });
    },

    openEditor(note, switchMobile = true) {
      this.activeNoteId = note.id;
      this.currentTag = NOTEBOOK_CATEGORIES[note.tag] ? note.tag : 'general';

      $('#zen-empty')?.classList.add('hidden');
      $('#zen-active-editor')?.classList.remove('hidden');

      const bodyInput = $('#zen-note-content');
      const courseSelect = $('#zen-edit-course');
      const dateEl = $('#zen-note-date');

      if (bodyInput) bodyInput.value = note.content || '';
      if (courseSelect) courseSelect.value = note.courseId || '';

      const updatedDate = note.updated || note.created;
      if (dateEl) {
        dateEl.textContent = updatedDate 
          ? new Date(updatedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) 
          : 'Bugün';
      }

      this.selectTag(this.currentTag);
      this.updateWordCount();
      this.markSaved();

      $$('.zen-card').forEach(c => c.classList.toggle('active', c.dataset.id === note.id));

      if (switchMobile) {
        this.setMobileView('editor');
      }
    },

    closeEditor() {
      this.activeNoteId = null;
      $('#zen-empty')?.classList.remove('hidden');
      $('#zen-active-editor')?.classList.add('hidden');
      this.setMobileView('list');
      $$('.zen-card').forEach(c => c.classList.remove('active'));
    },

    async openNote(id) {
      if (!this._notes || this._notes.length === 0) {
        await this.loadNotes();
      }
      const note = this._notes.find(n => n.id === id);
      if (note) {
        this.openEditor(note, true);
      }
    },

    async createNewNote() {
      clearTimeout(this.autoSaveTimer);

      if (this.activeNoteId) {
        const curNote = this._notes.find(n => n.id === this.activeNoteId);
        if (curNote && !(curNote.content || '').trim()) {
          this.openEditor(curNote, true);
          setTimeout(() => $('#zen-note-content')?.focus(), 80);
          return curNote;
        }
      }

      const courses = Attendance.getCourses() || [];
      const defaultCourse = courses.length > 0 ? courses[0] : null;

      const newNote = {
        title: NOTEBOOK_CATEGORIES.general.title,
        content: '',
        tag: 'general',
        courseId: defaultCourse ? defaultCourse.id : '',
        courseName: defaultCourse ? this.shortCourseName(defaultCourse) : 'Genel',
        created: Date.now(),
        updated: Date.now(),
      };

      const saved = await apiFetch('/notes', 'POST', newNote);
      if (saved) {
        this._notes.unshift(saved);
        this.renderList();
        this.openEditor(saved, true);
        setTimeout(() => $('#zen-note-content')?.focus(), 80);
        return saved;
      }
      return null;
    },

    async saveActiveNote() {
      if (!this.activeNoteId) return null;

      const bodyInput = $('#zen-note-content');
      const courseSelect = $('#zen-edit-course');
      if (!bodyInput) return null;

      const note = this._notes.find(n => n.id === this.activeNoteId);
      if (!note) return null;

      const currentCat = NOTEBOOK_CATEGORIES[this.currentTag] ? this.currentTag : 'general';
      const catTitle = NOTEBOOK_CATEGORIES[currentCat].title;

      const courseId = courseSelect ? courseSelect.value : '';
      const courses = Attendance.getCourses() || [];
      const courseObj = courses.find(c => c.id === courseId);
      const courseName = courseObj ? this.shortCourseName(courseObj) : 'Genel';

      const updated = await apiFetch(`/notes/${this.activeNoteId}`, 'PUT', {
        ...note,
        title: catTitle,
        content: bodyInput.value,
        tag: currentCat,
        courseId,
        courseName,
        updated: Date.now()
      });

      if (updated) {
        const idx = this._notes.findIndex(n => n.id === updated.id);
        if (idx !== -1) this._notes[idx] = updated;

        this.markSaved();
        this.renderList();
        if (typeof Kanban !== 'undefined' && Kanban.render) Kanban.render();

        if (this.currentTag === 'exam') {
          await this.syncNoteToTask(updated, false);
        }
        return updated;
      }
      return null;
    },

    async deleteNote(id) {
      if (!id) return;
      clearTimeout(this.autoSaveTimer);
      await apiFetch(`/notes/${id}`, 'DELETE');
      this._notes = this._notes.filter(n => n.id !== id);

      if (this.activeNoteId === id) {
        if (this._notes.length > 0 && window.innerWidth > 800) {
          this.openEditor(this._notes[0], false);
        } else {
          this.closeEditor();
        }
      }

      this.renderList();
      showToast('Not silindi', 'success');
      Dashboard.refresh();
      if (typeof Kanban !== 'undefined' && Kanban.render) Kanban.render();
    },

    async syncNoteToTask(note, forceNotify = false) {
      if (!note) return;
      try {
        const tasks = (await apiFetch('/tasks')) || [];
        const catInfo = NOTEBOOK_CATEGORIES[note.tag] || NOTEBOOK_CATEGORIES.general;
        const coursePrefix = (note.courseName && note.courseName !== 'Genel') ? `[${note.courseName}] ` : '';
        const taskTitle = `${catInfo.icon} ${coursePrefix}${note.title || catInfo.title}`;
        const refTag = `[NotRef:${note.id}]`;

        const existing = tasks.find(t => (t.desc && t.desc.includes(refTag)) || t.title === taskTitle);
        const fullContent = (note.content || '').trim();
        const descContent = `${fullContent}\n\n📚 ${note.courseName || 'Genel'} dersi için Not Defteri'nden aktarıldı. ${refTag}`;

        if (existing) {
          await apiFetch(`/tasks/${existing.id}`, 'PUT', {
            ...existing,
            title: taskTitle,
            desc: descContent,
            color: note.tag === 'exam' ? '#ef4444' : '#06b6d4'
          });
          if (forceNotify) showToast('Not Görev Panosu\'nda güncellendi ✨', 'info');
        } else {
          await apiFetch('/tasks', 'POST', {
            title: taskTitle,
            desc: descContent,
            color: note.tag === 'exam' ? '#ef4444' : '#06b6d4',
            status: 'todo',
          });
          if (forceNotify) showToast(`🎯 Not Görev Panosu'na aktarıldı: "${taskTitle}"`, 'success');
        }
        if (typeof Kanban !== 'undefined' && Kanban.render) await Kanban.render();
        Dashboard.refresh();
      } catch (e) {
        console.error('syncNoteToTask error:', e);
      }
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

      // Odak rozetleri için tamamlanan seansları say
      const stats = Storage.get('asi_pomodoro_stats', { count: 0, minutes: 0 }) || {};
      Storage.set('asi_pomodoro_stats', {
        count: (Number(stats.count) || 0) + 1,
        minutes: (Number(stats.minutes) || 0) + Math.round(this.duration / 60)
      });

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
  // TEMA & RENK YÖNETİCİSİ (DARK/LIGHT MODE & ÖZEL RENKLER)
  // ═══════════════════════════════════════════════════════

  const PALETTES = {
    default: { name: 'Planova Klasik', primary: '#F97316', secondary: '#06B6D4' },
    purple:  { name: 'Siber Gece', primary: '#8B5CF6', secondary: '#EC4899' },
    emerald: { name: 'Zümrüt Doğa', primary: '#10B981', secondary: '#06B6D4' },
    blue:    { name: 'Derin Okyanus', primary: '#3B82F6', secondary: '#6366F1' },
    rose:    { name: 'Gül & Şafak', primary: '#F43F5E', secondary: '#F97316' },
    amber:   { name: 'Altın Kehribar', primary: '#EAB308', secondary: '#EA580C' },
    custom:  { name: 'Özel Tasarımım ✨', primary: '#F97316', secondary: '#06B6D4' },
  };

  function normalizeHex(hex) {
    if (!hex) return null;
    let clean = hex.trim().replace(/^#/, '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
      return '#' + clean.toUpperCase();
    }
    return null;
  }

  const DEFAULT_THEME = {
    mode: 'light', // 'light' | 'dark' | 'system'
    palette: 'default', // 'default' | 'purple' | 'emerald' | 'blue' | 'rose' | 'amber' | 'custom'
    primaryColor: '#F97316',
    secondaryColor: '#06B6D4'
  };

  const Theme = {
    config: { ...DEFAULT_THEME },
    userColors: [],

    init() {
      this.load();
      this.loadUserColors();
      this.apply();
      this.renderUserColors();
      this.bindEvents();

      // Sistem teması değişikliklerini dinle
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (this.config.mode === 'system') {
            this.applyMode();
          }
        });
      }
    },

    loadUserColors() {
      try {
        const raw = JSON.parse(localStorage.getItem('asi_user_colors') || '[]');
        this.userColors = Array.isArray(raw) ? raw : [];
      } catch (_) {
        this.userColors = [];
      }
    },

    saveUserColors() {
      try {
        localStorage.setItem('asi_user_colors', JSON.stringify(this.userColors));
      } catch (e) {
        console.error('Kişisel renkler kaydedilemedi:', e);
      }
    },

    load() {
      try {
        const saved = JSON.parse(localStorage.getItem('asi_theme_config') || '{}');
        this.config = { ...DEFAULT_THEME, ...saved };
        if (this.config.primaryColor && PALETTES.custom) {
          PALETTES.custom.primary = this.config.primaryColor;
        }
        if (this.config.secondaryColor && PALETTES.custom) {
          PALETTES.custom.secondary = this.config.secondaryColor;
        }
      } catch (e) {
        this.config = { ...DEFAULT_THEME };
      }
    },

    save() {
      try {
        localStorage.setItem('asi_theme_config', JSON.stringify(this.config));
      } catch (e) {
        console.error('Tema kaydedilemedi:', e);
      }
    },

    getResolvedMode() {
      if (this.config.mode === 'system') {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
      }
      return this.config.mode;
    },

    apply() {
      this.applyMode();
      this.applyColors();
      this.updateUI();
    },

    applyMode() {
      const resolved = this.getResolvedMode();
      document.documentElement.setAttribute('data-theme', resolved);

      const toggleIcon = $('#theme-toggle-icon');
      if (toggleIcon) {
        toggleIcon.textContent = resolved === 'dark' ? '☀️' : '🌙';
      }
      const toggleBtn = $('#theme-toggle-btn');
      if (toggleBtn) {
        toggleBtn.title = resolved === 'dark' ? 'Açık Mod' : 'Koyu Mod';
      }
    },

    applyColors() {
      const root = document.documentElement;
      const p = this.config.primaryColor;
      const s = this.config.secondaryColor;

      const hexToRgba = (hex, alpha) => {
        let c = (hex || '').replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        if (c.length !== 6) return `rgba(249, 115, 22, ${alpha})`;
        const num = parseInt(c, 16);
        return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
      };

      root.style.setProperty('--accent-orange', p);
      root.style.setProperty('--accent', p);
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${p} 0%, ${s} 100%)`);
      root.style.setProperty('--accent-orange-glow', hexToRgba(p, 0.25));
      root.style.setProperty('--border-orange', hexToRgba(p, 0.35));

      root.style.setProperty('--accent-turquoise', s);
      root.style.setProperty('--accent-turquoise-dark', s);
      root.style.setProperty('--turquoise-gradient', `linear-gradient(135deg, ${s} 0%, ${p} 100%)`);
      root.style.setProperty('--accent-turquoise-glow', hexToRgba(s, 0.25));
      root.style.setProperty('--border-turquoise', hexToRgba(s, 0.35));
    },

    updateUI() {
      // 1. Mod hapları
      $$('#theme-mode-pills .theme-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === this.config.mode);
      });

      // 2. Palet kartları
      $$('#theme-palettes-grid .theme-palette-card').forEach(card => {
        card.classList.toggle('active', card.dataset.palette === this.config.palette);
      });

      // 3. Özel renk seçiciler ve HEX inputları
      const pPicker = $('#custom-primary-picker');
      const sPicker = $('#custom-secondary-picker');
      const pHex = $('#custom-primary-hex');
      const sHex = $('#custom-secondary-hex');

      if (pPicker) pPicker.value = this.config.primaryColor;
      if (sPicker) sPicker.value = this.config.secondaryColor;
      if (pHex) pHex.value = (this.config.primaryColor || '').toUpperCase();
      if (sHex) sHex.value = (this.config.secondaryColor || '').toUpperCase();

      // 4. Özel palet kartı önizleme rozetleri
      const cSwatch1 = $('#custom-palette-swatch-1');
      const cSwatch2 = $('#custom-palette-swatch-2');
      if (cSwatch1) cSwatch1.style.background = this.config.primaryColor;
      if (cSwatch2) cSwatch2.style.background = this.config.secondaryColor;
    },

    setMode(mode) {
      this.config.mode = mode;
      this.save();
      this.apply();
      showToast(mode === 'dark' ? 'Koyu Mod Aktif 🌙' : (mode === 'light' ? 'Açık Mod Aktif ☀️' : 'Sistem Modu Aktif 💻'), 'info');
    },

    toggleMode() {
      const currentResolved = this.getResolvedMode();
      const newMode = currentResolved === 'dark' ? 'light' : 'dark';
      this.setMode(newMode);
    },

    setPalette(key) {
      if (key === 'custom') {
        this.config.palette = 'custom';
        this.save();
        this.apply();
        this.updateUI();
        showToast('Özel Tasarımım paleti uygulandı ✨', 'success');
        return;
      }
      if (!PALETTES[key]) return;
      this.config.palette = key;
      this.config.primaryColor = PALETTES[key].primary;
      this.config.secondaryColor = PALETTES[key].secondary;
      if (PALETTES.custom) {
        PALETTES.custom.primary = PALETTES[key].primary;
        PALETTES.custom.secondary = PALETTES[key].secondary;
      }
      this.save();
      this.apply();
      this.updateUI();
      showToast(`${PALETTES[key].name} paleti uygulandı ✨`, 'success');
    },

    setCustomColors(primary, secondary) {
      if (primary) {
        const normP = normalizeHex(primary) || primary;
        this.config.primaryColor = normP;
        if (PALETTES.custom) PALETTES.custom.primary = normP;
      }
      if (secondary) {
        const normS = normalizeHex(secondary) || secondary;
        this.config.secondaryColor = normS;
        if (PALETTES.custom) PALETTES.custom.secondary = normS;
      }
      this.config.palette = 'custom';
      this.save();
      this.apply();
      this.updateUI();
    },

    resetDefaults() {
      this.config = { ...DEFAULT_THEME };
      if (PALETTES.custom) {
        PALETTES.custom.primary = DEFAULT_THEME.primaryColor;
        PALETTES.custom.secondary = DEFAULT_THEME.secondaryColor;
      }
      this.save();
      this.apply();
      this.updateUI();
      showToast('Tema varsayılan ayarlara döndürüldü ✓', 'success');
    },

    addUserColor(name, primary, secondary) {
      const normP = normalizeHex(primary) || '#F97316';
      const normS = normalizeHex(secondary) || '#06B6D4';
      const count = this.userColors.length + 1;
      const cleanName = (name || '').trim() || `Özel Renk #${count}`;

      const newColor = {
        id: 'user_color_' + Date.now(),
        name: cleanName,
        primary: normP,
        secondary: normS
      };

      this.userColors.push(newColor);
      this.saveUserColors();
      this.renderUserColors();
      this.applyUserColor(newColor.id);
      showToast(`🎨 "${newColor.name}" rengi başarıyla eklendi ve uygulandı ✨`, 'success');
      return newColor;
    },

    applyUserColor(id) {
      const color = this.userColors.find(c => c.id === id);
      if (!color) return;

      this.config.palette = id;
      this.config.primaryColor = color.primary;
      this.config.secondaryColor = color.secondary;
      if (PALETTES.custom) {
        PALETTES.custom.primary = color.primary;
        PALETTES.custom.secondary = color.secondary;
      }

      this.save();
      this.apply();
      this.updateUI();
      this.renderUserColors();
      showToast(`🎨 "${color.name}" rengi uygulandı ✨`, 'success');
    },

    deleteUserColor(id, e) {
      if (e) e.stopPropagation();
      const color = this.userColors.find(c => c.id === id);
      if (!color) return;

      confirmAction(`"${color.name}" özel rengini silmek istediğinize emin misiniz?`, () => {
        this.userColors = this.userColors.filter(c => c.id !== id);
        this.saveUserColors();

        if (this.config.palette === id) {
          this.setPalette('default');
        } else {
          this.renderUserColors();
        }
        showToast(`"${color.name}" rengi silindi.`, 'info');
      });
    },

    renderUserColors() {
      // 1. Palet ızgarasındaki kullanıcı renk kartlarını güncelle
      const grid = $('#theme-palettes-grid');
      const addBtn = $('#theme-add-custom-color-btn');

      if (grid && addBtn) {
        // Önceden eklenmiş olan kullanıcı kartlarını temizle
        $$('.theme-palette-card.user-palette-card', grid).forEach(el => el.remove());

        const esc = Dashboard.escapeHtml;

        // Kullanıcının eklediği renk kartlarını ekle (Artı butonunun hemen önüne)
        this.userColors.forEach(c => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = `theme-palette-card user-palette-card ${this.config.palette === c.id ? 'active' : ''}`;
          card.dataset.palette = c.id;
          card.title = `${c.name} (Özel Renk)`;

          card.innerHTML = `
            <div class="palette-swatch">
              <span style="background:${esc(c.primary)}"></span>
              <span style="background:${esc(c.secondary)}"></span>
            </div>
            <span class="palette-name">${esc(c.name)}</span>
            <button type="button" class="user-color-card-del-btn" title="Bu Rengi Sil" aria-label="Rengi Sil">✕</button>
          `;

          card.addEventListener('click', (e) => {
            if (e.target.closest('.user-color-card-del-btn')) {
              e.stopPropagation();
              this.deleteUserColor(c.id, e);
              return;
            }
            this.applyUserColor(c.id);
          });

          const delBtn = card.querySelector('.user-color-card-del-btn');
          if (delBtn) {
            delBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.deleteUserColor(c.id, e);
            });
          }

          grid.insertBefore(card, addBtn);
        });
      }

      // 2. Varsa Kişisel Renk Koleksiyonu listesini de doldur
      const userGrid = $('#user-colors-grid');
      if (userGrid) {
        const esc = Dashboard.escapeHtml;
        if (this.userColors.length === 0) {
          userGrid.innerHTML = `
            <div class="user-colors-empty">
              <span>🎨 Henüz özel renk eklemediniz. "+ Renk Ekle" butonuna basarak dilediğiniz rengi kaydedebilirsiniz.</span>
            </div>
          `;
        } else {
          userGrid.innerHTML = this.userColors.map(c => `
            <div class="user-color-item-card ${this.config.palette === c.id ? 'active' : ''}">
              <div class="user-color-swatches" onclick="ASI.theme.applyUserColor('${esc(c.id)}')">
                <span class="user-swatch" style="background:${esc(c.primary)}"></span>
                <span class="user-swatch" style="background:${esc(c.secondary)}"></span>
              </div>
              <div class="user-color-info" onclick="ASI.theme.applyUserColor('${esc(c.id)}')">
                <strong>${esc(c.name)}</strong>
                <span class="text-xs text-muted">${esc(c.primary)} • ${esc(c.secondary)}</span>
              </div>
              <div class="user-color-actions">
                <button type="button" class="btn btn-ghost btn-xs" onclick="ASI.theme.applyUserColor('${esc(c.id)}')">Uygula</button>
                <button type="button" class="btn btn-ghost btn-xs text-danger" onclick="ASI.theme.deleteUserColor('${esc(c.id)}')">🗑️</button>
              </div>
            </div>
          `).join('');
        }
      }
    },

    bindEvents() {
      // Üst bardaki hızlı mod butonu
      const toggleBtn = $('#theme-toggle-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleMode());
      }

      // Mod hapları (Ayarlar sayfası)
      $$('#theme-mode-pills .theme-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setMode(btn.dataset.mode);
        });
      });

      // Palet kartları (Hazır olanlar)
      $('#theme-palettes-grid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.theme-palette-card:not(.add-palette-card):not(.user-palette-card)');
        if (card && card.dataset.palette) {
          this.setPalette(card.dataset.palette);
        }
      });

      // + Yeni Renk Ekle Butonları
      $('#theme-add-custom-color-btn')?.addEventListener('click', () => {
        openModal('custom-color-modal');
        setTimeout(() => $('#new-color-name')?.focus(), 80);
      });

      $('#add-user-color-btn')?.addEventListener('click', () => {
        openModal('custom-color-modal');
        setTimeout(() => $('#new-color-name')?.focus(), 80);
      });

      // Yeni Renk Modal Formu
      const newColorForm = $('#custom-color-form');
      if (newColorForm) {
        newColorForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = ($('#new-color-name')?.value || '').trim();
          const primary = $('#new-color-primary')?.value || '#F97316';
          const secondary = $('#new-color-secondary')?.value || '#06B6D4';

          this.addUserColor(name, primary, secondary);
          closeModal('custom-color-modal');
          newColorForm.reset();
        });
      }

      // Modal içindeki Renk Seçici senkronizasyonu
      const nPrimary = $('#new-color-primary');
      const nPrimaryHex = $('#new-color-primary-hex');
      if (nPrimary && nPrimaryHex) {
        nPrimary.addEventListener('input', (e) => { nPrimaryHex.value = e.target.value.toUpperCase(); });
        nPrimaryHex.addEventListener('input', (e) => {
          let val = e.target.value.trim();
          if (val && !val.startsWith('#')) val = '#' + val;
          const valid = normalizeHex(val);
          if (valid) nPrimary.value = valid;
        });
      }

      const nSecondary = $('#new-color-secondary');
      const nSecondaryHex = $('#new-color-secondary-hex');
      if (nSecondary && nSecondaryHex) {
        nSecondary.addEventListener('input', (e) => { nSecondaryHex.value = e.target.value.toUpperCase(); });
        nSecondaryHex.addEventListener('input', (e) => {
          let val = e.target.value.trim();
          if (val && !val.startsWith('#')) val = '#' + val;
          const valid = normalizeHex(val);
          if (valid) nSecondary.value = valid;
        });
      }

      // Renk seçici inputları (Picker & HEX text inputları)
      const pPicker = $('#custom-primary-picker');
      const sPicker = $('#custom-secondary-picker');
      const pHex = $('#custom-primary-hex');
      const sHex = $('#custom-secondary-hex');

      // 1. Ana Renk Picker
      if (pPicker) {
        pPicker.addEventListener('input', (e) => {
          const val = e.target.value.toUpperCase();
          if (pHex) pHex.value = val;
          this.setCustomColors(val, null);
        });
      }

      // 2. Ana Renk HEX Text Input
      if (pHex) {
        pHex.addEventListener('input', (e) => {
          let val = e.target.value.trim();
          if (val && !val.startsWith('#')) {
            val = '#' + val;
            e.target.value = val;
          }
          const valid = normalizeHex(val);
          if (valid) {
            if (pPicker) pPicker.value = valid;
            this.setCustomColors(valid, null);
          }
        });

        pHex.addEventListener('blur', (e) => {
          const valid = normalizeHex(e.target.value);
          if (valid) {
            e.target.value = valid;
            this.setCustomColors(valid, null);
          } else {
            e.target.value = this.config.primaryColor.toUpperCase();
          }
        });
      }

      // 3. İkincil Renk Picker
      if (sPicker) {
        sPicker.addEventListener('input', (e) => {
          const val = e.target.value.toUpperCase();
          if (sHex) sHex.value = val;
          this.setCustomColors(null, val);
        });
      }

      // 4. İkincil Renk HEX Text Input
      if (sHex) {
        sHex.addEventListener('input', (e) => {
          let val = e.target.value.trim();
          if (val && !val.startsWith('#')) {
            val = '#' + val;
            e.target.value = val;
          }
          const valid = normalizeHex(val);
          if (valid) {
            if (sPicker) sPicker.value = valid;
            this.setCustomColors(null, valid);
          }
        });

        sHex.addEventListener('blur', (e) => {
          const valid = normalizeHex(e.target.value);
          if (valid) {
            e.target.value = valid;
            this.setCustomColors(null, valid);
          } else {
            e.target.value = this.config.secondaryColor.toUpperCase();
          }
        });
      }

      // Varsayılana dön butonu
      const resetBtn = $('#theme-reset-defaults-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetDefaults());
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
        a.download = `planova-yedek-${formatDateShort(new Date())}.json`;
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
  // MODÜLER PANO YÖNETİCİSİ (GÖRÜNÜRLÜK AYARLARI)
  // ═══════════════════════════════════════════════════════

  const ModuleManager = {
    MODULES: [
      { id: 'kanban', name: 'Görev Panosu', icon: '📋', desc: 'Yapılacaklar, yapılanlar ve görev akışı' },
      { id: 'schedule', name: 'Spor Programı', icon: '🏋️', desc: 'Antrenman takibi, dinlenme sayacı ve VKİ hesaplayıcı' },
      { id: 'attendance', name: 'Devamsızlık Takibi', icon: '🎓', desc: 'Dönemlik dersler ve 14 haftalık devamsızlık matrisi' },
      { id: 'goals', name: 'Haftalık Hedefler', icon: '🎯', desc: 'Haftalık hedefler ve gelişim göstergeleri' },
      { id: 'notebook', name: 'Not Defterim', icon: '📝', desc: 'Ders notları, zengin metin düzenleyici ve arama' },
      { id: 'books', name: 'Kitaplığım & Okuma', icon: '📚', desc: 'Kitap okuma takibi, odak sayacı ve okuma grafikleri' },
      { id: 'pomodoro', name: 'Pomodoro Sayacı', icon: '⏱️', desc: 'Tam ekran odaklanma sayacı ve mola süreleri' },
      { id: 'prayer', name: 'Namaz & İbadet', icon: '🕌', desc: 'Diyanet namaz vakitleri ve günlük ibadet takibi' }
    ],

    _visibility: {},

    init() {
      this.load();
      this.applyVisibility();

      // Pano ayarları modal butonları
      $('#module-settings-btn')?.addEventListener('click', () => this.openModal());
      $('#btn-show-all-modules')?.addEventListener('click', () => this.setAll(true));
      $('#modal-modules-show-all')?.addEventListener('click', () => this.setAll(true));
      $('#btn-reset-module-visibility')?.addEventListener('click', () => this.resetDefaults());

      this.renderSettingsList();
    },

    load() {
      const saved = Storage.get('asi_modules_visibility', null);
      const defaults = {
        kanban: true,
        schedule: true,
        attendance: true,
        goals: true,
        notebook: true,
        books: true,
        pomodoro: true,
        prayer: true
      };
      this._visibility = { ...defaults, ...(saved || {}) };
    },

    save() {
      Storage.set('asi_modules_visibility', this._visibility);
      this.applyVisibility();
      this.renderSettingsList();
    },

    isModuleVisible(id) {
      if (id === 'dashboard' || id === 'settings') return true;
      return this._visibility[id] !== false;
    },

    toggle(id, visible) {
      this._visibility[id] = !!visible;
      this.save();

      // Eğer şu an aktif sayfa gizlenen modül ise dashboard'a yönlendir
      if (!visible && Nav.current === id) {
        Nav.goTo('dashboard');
        showToast(`"${this.getModuleName(id)}" modülü gizlendi. Ana sayfaya yönlendirildiniz.`, 'info');
      } else {
        showToast(visible ? `"${this.getModuleName(id)}" modülü aktif edildi ✓` : `"${this.getModuleName(id)}" modülü gizlendi`, 'info');
      }
    },

    getModuleName(id) {
      const m = this.MODULES.find(x => x.id === id);
      return m ? m.name : id;
    },

    setAll(visible) {
      this.MODULES.forEach(m => { this._visibility[m.id] = visible; });
      this.save();
      showToast(visible ? 'Tüm modüller aktif edildi ✓' : 'Tüm modüller gizlendi', 'success');
    },

    resetDefaults() {
      this.setAll(true);
    },

    applyVisibility() {
      this.MODULES.forEach(m => {
        const isVis = this.isModuleVisible(m.id);

        // Sidebar linki
        const navLi = $(`#sidebar .nav-list li[data-module="${m.id}"]`);
        if (navLi) {
          navLi.style.display = isVis ? '' : 'none';
        }

        // Hızlı erişim kartı
        const quickBtn = $(`.quick-card[data-module="${m.id}"]`);
        if (quickBtn) {
          quickBtn.style.display = isVis ? '' : 'none';
        }

        // Dashboard modül kartları (örn: Namaz widget)
        const dashWidget = $(`#dash-prayer-widget[data-module="${m.id}"]`);
        if (dashWidget) {
          dashWidget.style.display = isVis ? '' : 'none';
        }

        // Üst çubuk Namaz göstergesi (top-prayer-badge)
        if (m.id === 'prayer') {
          const topPrayerBadge = document.getElementById('top-prayer-badge');
          if (topPrayerBadge) {
            topPrayerBadge.style.display = isVis ? '' : 'none';
          }
        }

        // Sayfa elementini işaretle
        const pageEl = document.getElementById('page-' + m.id);
        if (pageEl) {
          if (!isVis) {
            pageEl.setAttribute('data-module-hidden', 'true');
          } else {
            pageEl.removeAttribute('data-module-hidden');
          }
        }
      });
    },

    openModal() {
      this.renderSettingsList();
      openModal('module-settings-modal');
    },

    renderSettingsList() {
      const renderItems = (containerId) => {
        const container = $(containerId);
        if (!container) return;

        container.innerHTML = this.MODULES.map(m => {
          const isChecked = this.isModuleVisible(m.id);
          return `
            <div class="module-switch-item ${!isChecked ? 'is-disabled' : ''}">
              <div class="module-switch-info">
                <span class="module-switch-icon">${m.icon}</span>
                <div class="module-switch-titles">
                  <strong>${m.name}</strong>
                  <span>${m.desc}</span>
                </div>
              </div>
              <div class="module-switch-actions">
                <span class="module-status-badge ${isChecked ? 'active' : ''}">${isChecked ? 'Aktif' : 'Gizli'}</span>
                <label class="switch" title="${isChecked ? 'Modülü Gizle' : 'Modülü Göster'}">
                  <input type="checkbox" data-module-id="${m.id}" ${isChecked ? 'checked' : ''}>
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          `;
        }).join('');

        container.querySelectorAll('input[type="checkbox"]').forEach(input => {
          input.addEventListener('change', (e) => {
            const modId = e.target.dataset.moduleId;
            this.toggle(modId, e.target.checked);
          });
        });
      };

      renderItems('#settings-module-switches');
      renderItems('#modal-module-switches');
    }
  };

  // ═══════════════════════════════════════════════════════
  // NAMAZ VAKİTLERİ VE İBADET TAKİBİ
  // ═══════════════════════════════════════════════════════

  const PrayerManager = {
    city: 'Istanbul',
    timings: null,
    dateData: null,
    cachedDate: '',

    cityNames: {
      Istanbul: 'İstanbul',
      Ankara: 'Ankara',
      Izmir: 'İzmir',
      Bursa: 'Bursa',
      Antalya: 'Antalya',
      Konya: 'Konya',
      Adana: 'Adana',
      Gaziantep: 'Gaziantep',
      Trabzon: 'Trabzon',
      Samsun: 'Samsun',
      Diyarbakir: 'Diyarbakır',
      Eskisehir: 'Eskişehir',
      Kayseri: 'Kayseri',
      Mersin: 'Mersin',
      Kocaeli: 'Kocaeli',
      Hatay: 'Hatay',
      Manisa: 'Manisa',
      Sakarya: 'Sakarya',
      Denizli: 'Denizli',
      Kahramanmaras: 'Kahramanmaraş',
      Malatya: 'Malatya',
      Erzurum: 'Erzurum',
      Van: 'Van',
      Batman: 'Batman',
      Elazig: 'Elazığ',
      Erzincan: 'Erzincan',
      Tekirdag: 'Tekirdağ',
      Balikesir: 'Balıkesir',
      Mugla: 'Muğla',
      Aydin: 'Aydın',
      Usak: 'Uşak',
      Afyonkarahisar: 'Afyonkarahisar',
      Kutahya: 'Kütahya',
      Canakkale: 'Çanakkale',
      Edirne: 'Edirne',
      Kirklareli: 'Kırklareli',
      Kirikkale: 'Kırıkkale',
      Bolu: 'Bolu',
      Zonguldak: 'Zonguldak',
      Karabuk: 'Karabük',
      Bartin: 'Bartın',
      Kastamonu: 'Kastamonu',
      Sinop: 'Sinop',
      Amasya: 'Amasya',
      Tokat: 'Tokat',
      Corum: 'Çorum',
      Ordu: 'Ordu',
      Giresun: 'Giresun',
      Rize: 'Rize',
      Artvin: 'Artvin',
      Agri: 'Ağrı',
      Kars: 'Kars',
      Igdir: 'Iğdır',
      Ardahan: 'Ardahan',
      Tunceli: 'Tunceli',
      Bingol: 'Bingöl',
      Bitlis: 'Bitlis',
      Mus: 'Muş',
      Hakkari: 'Hakkari',
      Sirnak: 'Şırnak',
      Siirt: 'Siirt',
      Mardin: 'Mardin',
      Adiyaman: 'Adıyaman',
      Sanliurfa: 'Şanlıurfa',
      Kilis: 'Kilis',
      Osmaniye: 'Osmaniye',
      Cankiri: 'Çankırı',
      Yozgat: 'Yozgat',
      Sivas: 'Sivas',
      Nevsehir: 'Nevşehir',
      Aksaray: 'Aksaray',
      Nigde: 'Niğde',
      Karaman: 'Karaman',
      Isparta: 'Isparta',
      Burdur: 'Burdur',
      Bilecik: 'Bilecik',
      Kirsehir: 'Kırşehir',
      Bayburt: 'Bayburt',
      Duzce: 'Düzce',
      Gumushane: 'Gümüşhane',
      Yalova: 'Yalova',
    },

    // Eski sürümlerde kaydedilmiş farklı yazımlar
    CITY_ALIASES: { Urfa: 'Sanliurfa' },

    // Şehir seçim kutularını tek listeden (cityNames) doldurur — HTML'de 2 kez elle yazılmış liste gerekmez
    populateCitySelect(select) {
      if (!select) return;
      const sorted = Object.entries(this.cityNames).sort((a, b) => a[1].localeCompare(b[1], 'tr'));
      select.innerHTML = sorted.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    },

    PRAYER_KEYS: [
      { id: 'fajr', name: 'İmsak', prayer: 'Sabah', icon: '🌅', aladhanKey: 'Fajr', isWorship: true },
      { id: 'sunrise', name: 'Güneş', icon: '☀️', aladhanKey: 'Sunrise', isWorship: false },
      { id: 'dhuhr', name: 'Öğle', icon: '☀️', aladhanKey: 'Dhuhr', isWorship: true },
      { id: 'asr', name: 'İkindi', icon: '🌤️', aladhanKey: 'Asr', isWorship: true },
      { id: 'maghrib', name: 'Akşam', icon: '🌇', aladhanKey: 'Maghrib', isWorship: true },
      { id: 'isha', name: 'Yatsı', icon: '🌙', aladhanKey: 'Isha', isWorship: true }
    ],

    // Hicri ay adları (API yalnızca İngilizce/Arapça döndürür)
    HIJRI_MONTHS_TR: ['Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir', 'Cemaziyelevvel', 'Cemaziyelahir',
      'Recep', 'Şaban', 'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'],

    // Yedek (internet yokken) vakitler — gerçek vakit değildir, ekranda "tahmini" uyarısı gösterilir
    FALLBACK_TIMINGS: { Fajr: '05:45', Sunrise: '07:10', Dhuhr: '12:55', Asr: '16:00', Maghrib: '18:30', Isha: '19:50' },

    isApprox: false,

    hijriText(suffix) {
      const h = this.dateData?.hijri;
      if (!h) return '';
      const month = this.HIJRI_MONTHS_TR[(Number(h.month?.number) || 0) - 1] || h.month?.en || '';
      return `${h.day} ${month} ${h.year} ${suffix}`;
    },

    // Eski günlerin önbelleklerini temizler (localStorage ve bulut şişmesin)
    cleanupOldCaches(todayKeySuffix) {
      try {
        const stale = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('asi_prayer_cache_') && !k.endsWith(todayKeySuffix)) stale.push(k);
        }
        stale.forEach(k => localStorage.removeItem(k));
      } catch (e) { /* depolama erişilemiyor — önemli değil */ }
    },

    init() {
      const saved = Storage.get('asi_prayer_city', 'Istanbul');
      this.city = this.CITY_ALIASES[saved] || (this.cityNames[saved] ? saved : 'Istanbul');

      // Şehir seçiciler
      const citySelect = $('#prayer-city-select');
      const pageCitySelectEl = $('#prayer-page-city-select');
      this.populateCitySelect(citySelect);
      this.populateCitySelect(pageCitySelectEl);
      if (citySelect) {
        citySelect.value = this.city;
        citySelect.addEventListener('change', (e) => this.setCity(e.target.value));
      }

      const pageCitySelect = $('#prayer-page-city-select');
      if (pageCitySelect) {
        pageCitySelect.value = this.city;
        pageCitySelect.addEventListener('change', (e) => this.setCity(e.target.value));
      }

      // Yenileme butonları
      $('#prayer-refresh-btn')?.addEventListener('click', () => this.fetchTimings(true));
      $('#prayer-page-refresh-btn')?.addEventListener('click', () => this.fetchTimings(true));

      // Top bar namaz göstergesi tıklama olayı
      $('#top-prayer-badge')?.addEventListener('click', () => {
        Nav.goTo('prayer');
      });

      // İlk veri çekme
      this.fetchTimings();

      // Sıradaki vakit geri sayımını güncelle (10 saniyede bir).
      // Gün değiştiyse (uygulama gece açık kaldıysa) yeni günün vakitlerini çek.
      setInterval(() => {
        if (document.hidden) return;
        if (this.cachedDate && this.cachedDate !== formatDateShort(new Date())) {
          this.fetchTimings();
        } else {
          this.updateNextPrayerDisplay();
        }
      }, 10000);
    },

    async setCity(newCity) {
      this.city = newCity;
      Storage.set('asi_prayer_city', newCity);
      const s1 = $('#prayer-city-select');
      if (s1) s1.value = newCity;
      const s2 = $('#prayer-page-city-select');
      if (s2) s2.value = newCity;
      await this.fetchTimings(true);
      showToast(`Namaz vakitleri ${this.cityNames[newCity] || newCity} için güncellendi ✓`, 'success');
    },

    applyTimings(timings, dateData, today, isApprox) {
      this.timings = timings;
      this.dateData = dateData || null;
      this.cachedDate = today;
      this.isApprox = !!isApprox;
      document.querySelectorAll('.prayer-approx-note').forEach(el => el.classList.toggle('hidden', !this.isApprox));
      this.renderWidget();
      this.renderPage();
      if (typeof TodayPanel !== 'undefined') TodayPanel.render();
    },

    async fetchTimings(force = false) {
      const today = formatDateShort(new Date());
      const cacheKey = `asi_prayer_cache_${this.city}_${today}`;
      const lastKey = `asi_prayer_last_${this.city}`;

      if (!force) {
        const cached = Storage.get(cacheKey, null);
        if (cached && cached.timings) {
          this.applyTimings(cached.timings, cached.date, today, false);
          return;
        }
      }

      try {
        // Diyanet İşleri Başkanlığı Metodu (method=13)
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(this.city)}&country=Turkey&method=13`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.code === 200 && json.data) {
            const payload = { timings: json.data.timings, date: json.data.date };
            this.cleanupOldCaches(`_${today}`);
            Storage.set(cacheKey, payload);
            Storage.set(lastKey, payload.timings);
            this.applyTimings(payload.timings, payload.date, today, false);
            return;
          }
        }
      } catch (err) {
        console.warn('Aladhan API bağlantı hatası, yerel hesaplama/yedek kullanılıyor:', err);
      }

      // API'ye ulaşılamadı: bu şehir için en son bilinen vakitleri (birkaç dakika sapabilir),
      // o da yoksa sabit yedek değerleri kullan. Her iki durumda da "tahmini" uyarısı gösterilir.
      const last = Storage.get(lastKey, null);
      this.applyTimings(last || this.FALLBACK_TIMINGS, null, today, true);
      if (force) showToast('İnternet bağlantısı yok — tahmini vakitler gösteriliyor.', 'error');
    },

    getTodayChecks() {
      const today = formatDateShort(new Date());
      return Storage.get(`asi_prayer_checks_${today}`, {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false
      });
    },

    saveCheck(prayerId, isChecked) {
      const today = formatDateShort(new Date());
      const checks = this.getTodayChecks();
      checks[prayerId] = !!isChecked;
      Storage.set(`asi_prayer_checks_${today}`, checks);

      this.renderWidget();
      this.renderPage();

      // Streak güncelle
      StreakManager.updateStreaksAndBadges();

      const pMeta = this.PRAYER_KEYS.find(p => p.id === prayerId);
      if (isChecked) {
        showToast(`✨ ${pMeta ? (pMeta.prayer || pMeta.name) : ''} namazı tamamlandı olarak kaydedildi.`, 'success');
      }
    },

    cleanTime(rawTime) {
      if (!rawTime) return '--:--';
      return rawTime.split(' ')[0].substring(0, 5);
    },

    getNextPrayer() {
      if (!this.timings) return null;
      const now = new Date();
      const currentMins = now.getHours() * 60 + now.getMinutes();

      const order = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
      for (const key of order) {
        const p = this.PRAYER_KEYS.find(x => x.id === key);
        const timeStr = this.cleanTime(this.timings[p.aladhanKey]);
        const [h, m] = timeStr.split(':').map(Number);
        const prayerMins = h * 60 + m;

        if (prayerMins > currentMins) {
          const diff = prayerMins - currentMins;
          const diffH = Math.floor(diff / 60);
          const diffM = diff % 60;
          return {
            ...p,
            time: timeStr,
            remainingText: diffH > 0 ? `${diffH} sa ${diffM} dk` : `${diffM} dk`,
            shortText: diffH > 0 ? `${diffH}s ${diffM}dk` : `${diffM} dk`
          };
        }
      }

      // Yatsıdan sonra ise ertesi gün sabah namazı
      const fajr = this.PRAYER_KEYS.find(x => x.id === 'fajr');
      const [h, m] = this.cleanTime(this.timings.Fajr).split(':').map(Number);
      const fajrTomorrowMins = (24 * 60 - currentMins) + (h * 60 + m);
      const diffH = Math.floor(fajrTomorrowMins / 60);
      const diffM = fajrTomorrowMins % 60;
      return {
        ...fajr,
        time: this.cleanTime(this.timings.Fajr),
        remainingText: `${diffH} sa ${diffM} dk (Yarın)`,
        shortText: `${diffH}s ${diffM}dk`
      };
    },

    updateNextPrayerDisplay() {
      const next = this.getNextPrayer();
      if (!next) return;

      // Dashboard widget
      const nextNameEl = $('#prayer-next-name');
      if (nextNameEl) nextNameEl.textContent = `${next.name} (${next.time})`;

      const nextCountEl = $('#prayer-next-countdown');
      if (nextCountEl) nextCountEl.textContent = `${next.remainingText} kaldı`;

      // Top bar göstergesi — mobilde CSS saati ve "kaldı" ekini gizler, kısa sayaç gösterir
      const topPrayerName = $('#top-prayer-name');
      if (topPrayerName) {
        topPrayerName.innerHTML = `${next.name} <span class="top-prayer-time">${next.time}</span>`;
      }

      const topPrayerCountdown = $('#top-prayer-countdown');
      if (topPrayerCountdown) {
        topPrayerCountdown.innerHTML =
          `<span class="cd-long">${next.remainingText} kaldı</span><span class="cd-short">${next.shortText}</span>`;
      }

      const topBadge = $('#top-prayer-badge');
      if (topBadge) {
        topBadge.setAttribute('title', `Sıradaki Namaz Vakti: ${next.name} (${next.time}) • Kalan süre: ${next.remainingText}\nDetaylar ve ibadet takibi için tıklayın.`);
      }

      // Namaz sayfası göstergesi
      const pageNextName = $('#prayer-page-next-name');
      if (pageNextName) pageNextName.textContent = `${next.name} (${next.time})`;

      const pageNextCountdown = $('#prayer-page-next-countdown');
      if (pageNextCountdown) pageNextCountdown.textContent = `${next.remainingText} kaldı`;
    },

    renderWidget() {
      if (!this.timings) return;
      const checks = this.getTodayChecks();
      const next = this.getNextPrayer();

      // Hicri Tarih
      const hijriEl = $('#prayer-hijri-date');
      if (hijriEl) {
        const cityName = this.cityNames[this.city] || this.city;
        hijriEl.textContent = this.dateData?.hijri ? `${this.hijriText('H.')} • ${cityName}` : cityName;
      }

      // Sıradaki Vakit
      this.updateNextPrayerDisplay();

      // Vakit Saatleri ve Checkbox'lar
      let doneCount = 0;
      this.PRAYER_KEYS.forEach(p => {
        const timeVal = this.cleanTime(this.timings[p.aladhanKey]);
        const timeEl = $(`#time-${p.id}`);
        if (timeEl) timeEl.textContent = timeVal;

        const cardEl = $(`.prayer-card[data-vakit="${p.id}"]`);
        if (cardEl) {
          if (next && next.id === p.id) {
            cardEl.classList.add('is-current-prayer');
          } else {
            cardEl.classList.remove('is-current-prayer');
          }

          if (p.isWorship) {
            const isDone = !!checks[p.id];
            if (isDone) {
              doneCount++;
              cardEl.classList.add('is-checked');
            } else {
              cardEl.classList.remove('is-checked');
            }

            const cb = cardEl.querySelector('.prayer-checkbox');
            if (cb) {
              cb.checked = isDone;
              cb.onchange = (e) => this.saveCheck(p.id, e.target.checked);
            }
          }
        }
      });

      // İlerleme Özeti
      const doneText = $('#prayer-done-count-text');
      if (doneText) doneText.textContent = `${doneCount}/5 Vakit Kılındı (%${doneCount * 20})`;

      const barFill = $('#prayer-progress-fill');
      if (barFill) barFill.style.width = `${doneCount * 20}%`;
    },

    renderPage() {
      const pageGrid = $('#prayer-page-times-grid');
      if (!pageGrid || !this.timings) return;

      const checks = this.getTodayChecks();
      const next = this.getNextPrayer();
      const now = new Date();

      const gregEl = $('#prayer-page-gregorian-date');
      if (gregEl) gregEl.textContent = formatDate(now);

      const hijriEl = $('#prayer-page-hijri-date');
      if (hijriEl) {
        const hasHijri = !!this.dateData?.hijri;
        hijriEl.textContent = hasHijri ? this.hijriText('Hicri') : '';
        hijriEl.hidden = !hasHijri;
        const sep = hijriEl.previousElementSibling;
        if (sep && sep.classList.contains('date-sep')) sep.hidden = !hasHijri;
      }

      let doneCount = 0;
      pageGrid.innerHTML = this.PRAYER_KEYS.map(p => {
        const timeVal = this.cleanTime(this.timings[p.aladhanKey]);
        const isNext = next && next.id === p.id;
        const isChecked = p.isWorship && !!checks[p.id];
        if (isChecked) doneCount++;

        return `
          <div class="prayer-card ${isNext ? 'is-current-prayer' : ''} ${isChecked ? 'is-checked' : ''}" data-vakit="${p.id}">
            <div class="prayer-card-top">
              <span class="prayer-icon">${p.icon}</span>
              <span class="prayer-name">${p.name}</span>
            </div>
            <div class="prayer-card-time">${timeVal}</div>
            ${p.isWorship ? `
              <label class="prayer-check-label">
                <input type="checkbox" class="prayer-checkbox" data-prayer="${p.id}" ${isChecked ? 'checked' : ''}>
                <span class="prayer-custom-check">✓</span>
                <span class="prayer-check-text">${isChecked ? 'Tamamlandı' : 'Kılındı'}</span>
              </label>
            ` : `
              <div class="prayer-ref-badge">Doğuş</div>
            `}
          </div>
        `;
      }).join('');

      pageGrid.querySelectorAll('.prayer-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          this.saveCheck(e.target.dataset.prayer, e.target.checked);
        });
      });

      const progText = $('#prayer-page-progress-text');
      if (progText) progText.textContent = `${doneCount}/5 Vakit (%${doneCount * 20})`;

      const progFill = $('#prayer-page-progress-fill');
      if (progFill) progFill.style.width = `${doneCount * 20}%`;

      const pageDoneSummary = $('#prayer-page-done-count-text');
      if (pageDoneSummary) pageDoneSummary.textContent = `${doneCount}/5 Vakit Kılındı`;

      this.updateNextPrayerDisplay();
    }
  };

  // ═══════════════════════════════════════════════════════
  // OYUNLAŞTIRMA (STREAK) VE EMOJİ SİSTEMİ
  // ═══════════════════════════════════════════════════════

  const StreakManager = {
    EARNED_KEY: 'asi_badges_earned', // { rozetId: kazanılma zamanı (ms) } — bir kez kazanılan rozet kalıcıdır

    GROUPS: {
      reading: { label: 'Okuma', icon: '📚' },
      workout: { label: 'Spor', icon: '🏋️' },
      prayer:  { label: 'İbadet', icon: '🕌' },
      tasks:   { label: 'Görev & Hedef', icon: '✅' },
      notes:   { label: 'Notlar', icon: '📝' },
      focus:   { label: 'Odak', icon: '⏱️' },
      school:  { label: 'Okul', icon: '🎒' },
      general: { label: 'Genel', icon: '⚡' }
    },

    // metric: computeStats() içindeki alan adı · target: hedef değer · unit: ilerleme birimi
    BADGES: [
      // ─── Okuma ───
      { id: 'first-page',    group: 'reading', emoji: '📖', title: 'İlk Sayfa',          metric: 'readingSessions',  target: 1,    unit: 'oturum', desc: 'İlk okuma oturumunu kaydet.' },
      { id: 'reading-3',     group: 'reading', emoji: '📚', title: 'Okuma Alışkanlığı',  metric: 'readingStreak',    target: 3,    unit: 'gün',    desc: '3 gün üst üste kitap oku.' },
      { id: 'book-worm',     group: 'reading', emoji: '🐛', title: 'Kitap Kurdu',        metric: 'readingStreak',    target: 7,    unit: 'gün',    desc: '7 gün üst üste kitap okuyarak düzenli okuma serisini yakala.' },
      { id: 'wise-owl',      group: 'reading', emoji: '🦉', title: 'Bilge Baykuş',       metric: 'readingStreak',    target: 30,   unit: 'gün',    desc: '30 gün boyunca aralıksız kitap oku.' },
      { id: 'reading-100',   group: 'reading', emoji: '🐉', title: 'Okuma Ejderhası',    metric: 'readingStreak',    target: 100,  unit: 'gün',    desc: '100 gün üst üste kitap oku. Efsanevi bir seri!' },
      { id: 'pages-100',     group: 'reading', emoji: '📄', title: '100 Sayfa',          metric: 'pagesRead',        target: 100,  unit: 'sayfa',  desc: 'Toplam 100 sayfa oku.' },
      { id: 'pages-500',     group: 'reading', emoji: '📜', title: '500 Sayfa',          metric: 'pagesRead',        target: 500,  unit: 'sayfa',  desc: 'Toplam 500 sayfa oku.' },
      { id: 'pages-1000',    group: 'reading', emoji: '🏛️', title: 'Bin Sayfa',          metric: 'pagesRead',        target: 1000, unit: 'sayfa',  desc: 'Toplam 1.000 sayfa oku.' },
      { id: 'pages-5000',    group: 'reading', emoji: '🗿', title: 'Sayfa Ustası',       metric: 'pagesRead',        target: 5000, unit: 'sayfa',  desc: 'Toplam 5.000 sayfa oku.' },
      { id: 'books-1',       group: 'reading', emoji: '🎓', title: 'İlk Kitap',          metric: 'booksCompleted',   target: 1,    unit: 'kitap',  desc: 'Bir kitabı baştan sona bitir.' },
      { id: 'books-5',       group: 'reading', emoji: '🏅', title: 'Kitapsever',         metric: 'booksCompleted',   target: 5,    unit: 'kitap',  desc: '5 kitap bitir.' },
      { id: 'books-10',      group: 'reading', emoji: '👑', title: 'Kütüphane Kralı',    metric: 'booksCompleted',   target: 10,   unit: 'kitap',  desc: '10 kitap bitir.' },
      { id: 'books-25',      group: 'reading', emoji: '🧙', title: 'Kitap Bilgesi',      metric: 'booksCompleted',   target: 25,   unit: 'kitap',  desc: '25 kitap bitir.' },
      { id: 'read-10h',      group: 'reading', emoji: '⏳', title: '10 Saat Okuma',      metric: 'readingMinutes',   target: 600,  unit: 'dk',     desc: 'Toplam 10 saat (600 dk) okuma yap.' },

      // ─── Spor ───
      { id: 'first-workout', group: 'workout', emoji: '💪', title: 'İlk Antrenman',      metric: 'workoutDays',      target: 1,    unit: 'gün',    desc: 'İlk antrenmanını tamamla.' },
      { id: 'sport-fire',    group: 'workout', emoji: '🔥', title: 'Ateşli Sporcu',      metric: 'workoutStreak',    target: 3,    unit: 'gün',    desc: '3 gün üst üste spor yaparak antrenman ateşini yak.' },
      { id: 'iron-gorilla',  group: 'workout', emoji: '🦍', title: 'Demir Goril',        metric: 'workoutStreak',    target: 7,    unit: 'gün',    desc: '7 gün boyunca düzenli spor yap.' },
      { id: 'wolf-discipline', group: 'workout', emoji: '🐺', title: 'Kurt Disiplini',   metric: 'workoutStreak',    target: 30,   unit: 'gün',    desc: '30 gün üst üste spor yap.' },
      { id: 'workout-10',    group: 'workout', emoji: '🏋️', title: '10 Antrenman',       metric: 'workoutDays',      target: 10,   unit: 'gün',    desc: 'Toplam 10 farklı günde antrenman yap.' },
      { id: 'workout-50',    group: 'workout', emoji: '🥇', title: '50 Antrenman',       metric: 'workoutDays',      target: 50,   unit: 'gün',    desc: 'Toplam 50 farklı günde antrenman yap.' },
      { id: 'workout-100',   group: 'workout', emoji: '🏆', title: 'Yüz Antrenman',      metric: 'workoutDays',      target: 100,  unit: 'gün',    desc: 'Toplam 100 farklı günde antrenman yap.' },
      { id: 'bmi-set',       group: 'workout', emoji: '⚖️', title: 'Kendini Tanı',       metric: 'vkiSet',           target: 1,    unit: '',       desc: 'Boy ve kilonu girerek VKİ değerini hesapla.' },

      // ─── İbadet ───
      { id: 'first-prayer',  group: 'prayer',  emoji: '🤲', title: 'İlk Adım',           metric: 'prayerChecks',     target: 1,    unit: 'vakit',  desc: 'İlk namazını işaretle.' },
      { id: 'full-day',      group: 'prayer',  emoji: '🌙', title: 'Tam Gün',            metric: 'prayerFullDays',   target: 1,    unit: 'gün',    desc: 'Bir günde 5 vaktin tamamını kıl.' },
      { id: 'early-bird',    group: 'prayer',  emoji: '🌅', title: 'Erken Kalkan',       metric: 'fajrCount',        target: 7,    unit: 'sabah',  desc: '7 kez sabah namazını kıl.' },
      { id: 'peace-pilgrim', group: 'prayer',  emoji: '🕊️', title: 'Huzur Yolcusu',      metric: 'prayerStreak',     target: 7,    unit: 'gün',    desc: '7 gün boyunca namazlarını aksatmadan takip et.' },
      { id: 'prayer-40',     group: 'prayer',  emoji: '🕌', title: 'Kırk Gün',           metric: 'prayerStreak',     target: 40,   unit: 'gün',    desc: '40 gün üst üste namaz takibi yap.' },
      { id: 'full-day-30',   group: 'prayer',  emoji: '💎', title: 'Huzurlu Ay',         metric: 'prayerFullDays',   target: 30,   unit: 'gün',    desc: '30 gün boyunca 5 vaktin tamamını kıl.' },
      { id: 'prayer-100',    group: 'prayer',  emoji: '✨', title: 'Yüz Vakit',          metric: 'prayerChecks',     target: 100,  unit: 'vakit',  desc: 'Toplam 100 vakit namaz kıl.' },
      { id: 'prayer-500',    group: 'prayer',  emoji: '🌟', title: 'Beş Yüz Vakit',      metric: 'prayerChecks',     target: 500,  unit: 'vakit',  desc: 'Toplam 500 vakit namaz kıl.' },

      // ─── Görev & Hedef ───
      { id: 'first-task',    group: 'tasks',   emoji: '✅', title: 'İlk Görev',          metric: 'tasksDone',        target: 1,    unit: 'görev',  desc: 'Bir görevi "Tamamlandı" sütununa taşı.' },
      { id: 'tasks-10',      group: 'tasks',   emoji: '📋', title: 'Görev Avcısı',       metric: 'tasksDone',        target: 10,   unit: 'görev',  desc: '10 görev tamamla.' },
      { id: 'tasks-50',      group: 'tasks',   emoji: '🎯', title: 'Odaklı Savaşçı',     metric: 'tasksDone',        target: 50,   unit: 'görev',  desc: '50 görev tamamla.' },
      { id: 'tasks-100',     group: 'tasks',   emoji: '🦾', title: 'Görev Makinesi',     metric: 'tasksDone',        target: 100,  unit: 'görev',  desc: '100 görev tamamla.' },
      { id: 'goals-1',       group: 'tasks',   emoji: '🚩', title: 'İlk Hedef',          metric: 'goalsDone',        target: 1,    unit: 'hedef',  desc: 'Bir haftalık hedefini tamamla.' },
      { id: 'goals-10',      group: 'tasks',   emoji: '🏹', title: 'Keskin Nişancı',     metric: 'goalsDone',        target: 10,   unit: 'hedef',  desc: '10 hedef tamamla.' },
      { id: 'goals-50',      group: 'tasks',   emoji: '🗻', title: 'Zirve',              metric: 'goalsDone',        target: 50,   unit: 'hedef',  desc: '50 hedef tamamla.' },

      // ─── Notlar ───
      { id: 'first-note',    group: 'notes',   emoji: '📝', title: 'İlk Not',            metric: 'notesCount',       target: 1,    unit: 'not',    desc: 'Not defterine ilk notunu yaz.' },
      { id: 'notes-10',      group: 'notes',   emoji: '🗒️', title: 'Not Tutkunu',        metric: 'notesCount',       target: 10,   unit: 'not',    desc: '10 not oluştur.' },
      { id: 'notes-50',      group: 'notes',   emoji: '🧠', title: 'İkinci Beyin',       metric: 'notesCount',       target: 50,   unit: 'not',    desc: '50 not oluştur.' },
      { id: 'quick-10',      group: 'notes',   emoji: '📌', title: 'Hatırlatıcı',        metric: 'quickNotesCount',  target: 10,   unit: 'not',    desc: 'Aynı anda 10 hızlı not biriktir.' },

      // ─── Odak (Pomodoro) ───
      { id: 'pomo-1',        group: 'focus',   emoji: '🍅', title: 'İlk Domates',        metric: 'pomodoroCount',    target: 1,    unit: 'seans',  desc: 'Bir odaklanma seansını sonuna kadar tamamla.' },
      { id: 'pomo-10',       group: 'focus',   emoji: '⏱️', title: 'Odak Ustası',        metric: 'pomodoroCount',    target: 10,   unit: 'seans',  desc: '10 odaklanma seansı tamamla.' },
      { id: 'pomo-50',       group: 'focus',   emoji: '🧘', title: 'Derin Odak',         metric: 'pomodoroCount',    target: 50,   unit: 'seans',  desc: '50 odaklanma seansı tamamla.' },
      { id: 'focus-10h',     group: 'focus',   emoji: '🔭', title: '10 Saat Odak',       metric: 'pomodoroMinutes',  target: 600,  unit: 'dk',     desc: 'Toplam 10 saat odaklanma süresi biriktir.' },

      // ─── Okul ───
      { id: 'semester-start', group: 'school', emoji: '🎒', title: 'Dönem Başladı',      metric: 'attendanceCourses', target: 1,   unit: 'ders',   desc: 'Devamsızlık takibine bir ders ekle.' },
      { id: 'present-20',    group: 'school',  emoji: '🧑‍🎓', title: 'Derse Devam',        metric: 'attendancePresent', target: 20,  unit: 'ders',   desc: '20 kez derste "Katıldım" işaretle.' },
      { id: 'present-100',   group: 'school',  emoji: '🏫', title: 'Sınıf Birincisi',    metric: 'attendancePresent', target: 100, unit: 'ders',   desc: '100 kez derste "Katıldım" işaretle.' },

      // ─── Genel ───
      { id: 'pr-1',          group: 'workout', emoji: '🏆', title: 'İlk Rekor',          metric: 'prCount',          target: 1,    unit: 'rekor',  desc: 'Bir harekette önceki en yüksek ağırlığını geç.' },
      { id: 'pr-10',         group: 'workout', emoji: '🥇', title: 'Rekor Avcısı',       metric: 'prCount',          target: 10,   unit: 'rekor',  desc: '10 kez kişisel rekor kır.' },
      { id: 'quote-1',       group: 'reading', emoji: '💬', title: 'Altını Çizdim',      metric: 'quotesCount',      target: 1,    unit: 'alıntı', desc: 'Bir kitaptan ilk alıntını kaydet.' },
      { id: 'quote-25',      group: 'reading', emoji: '🖋️', title: 'Alıntı Defteri',     metric: 'quotesCount',      target: 25,   unit: 'alıntı', desc: '25 alıntı ya da not biriktir.' },
      { id: 'kaza-10',       group: 'prayer',  emoji: '🕋', title: 'Borç Kapatıyorum',   metric: 'kazaDone',         target: 10,   unit: 'vakit',  desc: '10 vakit kaza namazı kıl.' },
      { id: 'kaza-100',      group: 'prayer',  emoji: '🤲', title: 'Sabırlı Kul',        metric: 'kazaDone',         target: 100,  unit: 'vakit',  desc: '100 vakit kaza namazı kıl.' },
      { id: 'quran-100',     group: 'prayer',  emoji: '📖', title: 'Kur\'an Dostu',      metric: 'quranPages',       target: 100,  unit: 'sayfa',  desc: '100 sayfa Kur\'an-ı Kerim oku.' },
      { id: 'hatim-1',       group: 'prayer',  emoji: '🌟', title: 'İlk Hatim',          metric: 'hatims',           target: 1,    unit: 'hatim',  desc: 'Kur\'an-ı Kerim\'i baştan sona bir kez hatmet.' },
      { id: 'zikir-1000',    group: 'prayer',  emoji: '📿', title: 'Zikir Ehli',         metric: 'zikirTotal',       target: 1000, unit: 'zikir',  desc: 'Zikirmatik ile toplam 1000 zikir çek.' },
      { id: 'exam-planner',  group: 'school',  emoji: '🗓️', title: 'Planlı Öğrenci',     metric: 'examsAdded',       target: 1,    unit: 'sınav',  desc: 'Sınav takvimine ilk sınavını ekle.' },
      { id: 'profile-done',  group: 'general', emoji: '🪪', title: 'Ben Buradayım',      metric: 'profileComplete',  target: 1,    unit: '',       desc: 'Profiline adını ve bir fotoğraf ya da emoji ekle.' },
      { id: 'active-3',      group: 'general', emoji: '🌱', title: 'Filizlenme',         metric: 'activeStreak',     target: 3,    unit: 'gün',    desc: '3 gün üst üste okuma, spor veya ibadet kaydı yap.' },
      { id: 'productivity-beast', group: 'general', emoji: '🚀', title: 'Üretkenlik Canavarı', metric: 'activeStreak', target: 7,  unit: 'gün',    desc: '7 gün boyunca Planova\'yı aktif kullan.' },
      { id: 'active-30',     group: 'general', emoji: '🌳', title: 'Çınar',              metric: 'activeStreak',     target: 30,   unit: 'gün',    desc: '30 gün üst üste aktif ol.' },
      { id: 'active-100',    group: 'general', emoji: '🌋', title: 'Durdurulamaz',       metric: 'activeStreak',     target: 100,  unit: 'gün',    desc: '100 gün üst üste aktif ol.' },
      { id: 'collector-10',  group: 'general', emoji: '🎖️', title: 'Koleksiyoncu',       metric: 'badgesEarned',     target: 10,   unit: 'rozet',  desc: '10 rozet kazan.' },
      { id: 'collector-25',  group: 'general', emoji: '🏵️', title: 'Rozet Avcısı',       metric: 'badgesEarned',     target: 25,   unit: 'rozet',  desc: '25 rozet kazan.' },
      { id: 'legend',        group: 'general', emoji: '🌈', title: 'Efsane',             metric: 'badgesEarned',     target: 50,   unit: 'rozet',  desc: '50 rozet kazan.' }
    ],

    activeTab: 'all',
    _stats: null,

    init() {
      $('#badges-tabs')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-group]');
        if (!btn) return;
        this.activeTab = btn.dataset.group;
        this.renderShowcase();
      });
      this.updateStreaksAndBadges();
    },

    getBadge(id) { return this.BADGES.find(b => b.id === id) || null; },
    getEarned() { return Storage.get(this.EARNED_KEY, {}) || {}; },
    isEarned(id) { return !!this.getEarned()[id]; },

    // ─── Ardışık gün (seri) hesabı: bugün ya da dün aktifse geriye doğru sayar ───
    calculateStreak(dateSet) {
      if (!dateSet || dateSet.size === 0) return 0;
      const check = new Date();
      if (!dateSet.has(formatDateShort(check))) {
        check.setDate(check.getDate() - 1);
        if (!dateSet.has(formatDateShort(check))) return 0;
      }
      let streak = 0;
      while (dateSet.has(formatDateShort(check))) {
        streak++;
        check.setDate(check.getDate() - 1);
      }
      return streak;
    },

    readingDates() {
      const dates = new Set();
      Storage.get('asi_reading_sessions', []).forEach(s => {
        if (s && s.date && (s.pagesRead > 0 || s.duration > 0)) dates.add(s.date);
      });
      return dates;
    },

    workoutDates() {
      const dates = new Set();
      const add = (l) => {
        if (l && l.date && (l.completed || (Array.isArray(l.completedSets) && l.completedSets.length > 0))) dates.add(l.date);
      };
      Storage.get('asi_workouts', []).forEach(add);
      Storage.get('asi_workout_history', []).forEach(add);
      return dates;
    },

    // Tüm namaz işaretlerini tek geçişte tarar
    prayerData() {
      const dates = new Set();
      let checks = 0, fullDays = 0, fajr = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith('asi_prayer_checks_')) continue;
        const chk = Storage.get(k, null);
        if (!chk || typeof chk !== 'object') continue;
        const n = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter(p => chk[p] === true).length;
        if (n > 0) dates.add(k.slice('asi_prayer_checks_'.length));
        checks += n;
        if (n === 5) fullDays++;
        if (chk.fajr === true) fajr++;
      }
      return { dates, checks, fullDays, fajr };
    },

    getReadingStreak() { return this.calculateStreak(this.readingDates()); },
    getWorkoutStreak() { return this.calculateStreak(this.workoutDates()); },
    getPrayerStreak()  { return this.calculateStreak(this.prayerData().dates); },

    computeStats() {
      const rDates = this.readingDates();
      const wDates = this.workoutDates();
      const prayer = this.prayerData();
      const sessions = Storage.get('asi_reading_sessions', []);
      const books = Storage.get('asi_books', []);
      const tasks = Storage.get('asi_tasks', []);
      const goals = Storage.get('asi_goals', []);
      const pomo = Storage.get('asi_pomodoro_stats', { count: 0, minutes: 0 }) || {};
      const records = Storage.get('asi_attendance_records', []);
      const hasName = !!(localStorage.getItem('asi_profile_name') || '').trim();
      const hasPic = !!localStorage.getItem('asi_profile_photo') || !!localStorage.getItem('asi_profile_avatar');
      const arr = (v) => (Array.isArray(v) ? v : []);

      return {
        readingSessions: arr(sessions).length,
        readingStreak: this.calculateStreak(rDates),
        pagesRead: arr(sessions).reduce((t, s) => t + (Number(s.pagesRead) || 0), 0),
        readingMinutes: arr(sessions).reduce((t, s) => t + (Number(s.duration) || 0), 0),
        booksCompleted: arr(books).filter(b => b.status === 'completed').length,
        workoutDays: wDates.size,
        workoutStreak: this.calculateStreak(wDates),
        vkiSet: Storage.get('asi_user_vki_data', null) ? 1 : 0,
        prayerChecks: prayer.checks,
        prayerFullDays: prayer.fullDays,
        fajrCount: prayer.fajr,
        prayerStreak: this.calculateStreak(prayer.dates),
        tasksDone: arr(tasks).filter(t => t.status === 'done').length,
        goalsDone: arr(goals).filter(g => g.done).length,
        notesCount: arr(Storage.get('asi_notes', [])).length,
        quickNotesCount: arr(Storage.get('asi_quicknotes', [])).length,
        pomodoroCount: Number(pomo.count) || 0,
        pomodoroMinutes: Number(pomo.minutes) || 0,
        attendanceCourses: arr(Storage.get('asi_attendance_courses', [])).length,
        attendancePresent: arr(records).filter(r => r.status === 'present').length,
        profileComplete: hasName && hasPic ? 1 : 0,
        activeStreak: this.calculateStreak(new Set([...rDates, ...wDates, ...prayer.dates])),
        prCount: (() => { try { return WorkoutStats.prCount(); } catch (_) { return 0; } })(),
        quotesCount: Object.values(Storage.get('asi_book_quotes', {}) || {}).reduce((t, l) => t + (Array.isArray(l) ? l.length : 0), 0),
        kazaDone: (() => { const k = Storage.get('asi_kaza', null); return k && k.done ? Object.values(k.done).reduce((a, b) => a + (Number(b) || 0), 0) : 0; })(),
        quranPages: (() => { const q = Storage.get('asi_quran', null); return q && q.log ? Object.values(q.log).reduce((a, b) => a + (Number(b) || 0), 0) : 0; })(),
        hatims: Number((Storage.get('asi_quran', null) || {}).hatims) || 0,
        zikirTotal: Number((Storage.get('asi_zikir', null) || {}).lifetime) || 0,
        examsAdded: (Storage.get('asi_exams', []) || []).length,
        badgesEarned: 0
      };
    },

    /**
     * Ölçümleri hesaplar, yeni kazanılan rozetleri kalıcı kaydeder ve ekranı günceller.
     * Rozet bir kez kazanıldıysa seri bozulsa bile kaybolmaz.
     */
    updateStreaksAndBadges() {
      const stats = this.computeStats();
      const firstRun = Storage.get(this.EARNED_KEY, null) === null;
      const earned = this.getEarned();
      const fresh = [];

      // Koleksiyon rozetleri diğerlerine bağlı olduğu için iki tur
      for (let pass = 0; pass < 2; pass++) {
        stats.badgesEarned = Object.keys(earned).filter(id => this.getBadge(id)).length;
        this.BADGES.forEach(b => {
          if (!earned[b.id] && (stats[b.metric] || 0) >= b.target) {
            earned[b.id] = Date.now();
            fresh.push(b);
          }
        });
      }
      stats.badgesEarned = Object.keys(earned).filter(id => this.getBadge(id)).length;
      this._stats = stats;

      if (fresh.length || firstRun) Storage.set(this.EARNED_KEY, earned);

      // İlk çalıştırmada (eski kullanıcılar) geçmiş başarılar sessizce eklenir
      if (!firstRun && fresh.length) {
        if (fresh.length === 1) showToast(`🏅 Yeni rozet: ${fresh[0].emoji} ${fresh[0].title}`, 'success');
        else showToast(`🏅 ${fresh.length} yeni rozet kazandın: ${fresh.map(b => b.emoji).join(' ')}`, 'success');
      }

      this.renderCounters(stats);
      this.renderShowcase();
      this.renderModuleChips();
      if (typeof ProfileAvatar !== 'undefined') ProfileAvatar.renderBadgeGrid();
    },

    renderCounters(stats) {
      const general = Math.max(stats.activeStreak, 1);
      const set = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };
      set('#top-streak-count', general);
      set('#streak-top-pill', `🔥 ${general} Gün Seri`);
      set('#streak-book-count', `${stats.readingStreak} Gün`);
      set('#streak-workout-count', `${stats.workoutStreak} Gün`);
      set('#streak-prayer-count', `${stats.prayerStreak} Gün`);
      set('#streak-general-count', `${stats.activeStreak} Gün`);
      set('#workout-streak-label', `${stats.workoutStreak} gün seri`);
      set('#books-streak-label', `${stats.readingStreak} Gün Okuma Serisi`);
      set('#prayer-page-streak-badge', `🕊️ ${stats.prayerStreak} Gün İbadet Serisi`);
    },

    progressOf(b) {
      const cur = Math.min(b.target, (this._stats && this._stats[b.metric]) || 0);
      return { cur, pct: Math.min(100, Math.round((cur / b.target) * 100)) };
    },

    // Dashboard rozet vitrini: grup sekmeleri + kartlar (kazanılanlar önce)
    renderShowcase() {
      const container = $('#badges-container');
      if (!container) return;
      const earned = this.getEarned();

      const tabs = $('#badges-tabs');
      if (tabs) {
        const tabList = [['all', '🏅', 'Tümü'], ...Object.entries(this.GROUPS).map(([k, g]) => [k, g.icon, g.label])];
        tabs.innerHTML = tabList.map(([k, icon, label]) => {
          const list = k === 'all' ? this.BADGES : this.BADGES.filter(b => b.group === k);
          const n = list.filter(b => earned[b.id]).length;
          return `<button type="button" class="badges-tab ${this.activeTab === k ? 'active' : ''}" data-group="${k}">${icon} ${label} <small>${n}/${list.length}</small></button>`;
        }).join('');
      }

      const total = $('#badges-total');
      if (total) total.textContent = `${Object.keys(earned).filter(id => this.getBadge(id)).length}/${this.BADGES.length}`;

      const list = (this.activeTab === 'all' ? this.BADGES : this.BADGES.filter(b => b.group === this.activeTab))
        .slice()
        .sort((a, b) => (earned[b.id] ? 1 : 0) - (earned[a.id] ? 1 : 0) || this.progressOf(b).pct - this.progressOf(a).pct);

      container.innerHTML = list.map(b => {
        const ok = !!earned[b.id];
        const { cur, pct } = this.progressOf(b);
        return `
          <button type="button" class="badge-card ${ok ? 'unlocked' : 'locked'}" data-badge-id="${b.id}">
            <div class="badge-emoji-box">${b.emoji}</div>
            <div class="badge-title">${b.title}</div>
            <div class="badge-desc">${b.desc}</div>
            ${ok
              ? '<div class="badge-pill-status">✓ Kazanıldı</div>'
              : `<div class="badge-mini-track"><span style="width:${pct}%"></span></div>
                 <div class="badge-pill-status">${cur}/${b.target}${b.unit ? ' ' + b.unit : ''}</div>`}
          </button>`;
      }).join('');

      container.querySelectorAll('.badge-card').forEach(card => {
        card.addEventListener('click', () => this.openBadgeDetail(card.dataset.badgeId));
      });
    },

    // Spor ve Kitap sayfalarındaki rozet şeritleri: kazanılanlar + sıradaki hedef
    renderModuleChips() {
      const earned = this.getEarned();
      [['#workout-unlocked-badges', 'workout'], ['#books-unlocked-badges', 'reading']].forEach(([sel, group]) => {
        const box = $(sel);
        if (!box) return;
        const list = this.BADGES.filter(b => b.group === group);
        const won = list.filter(b => earned[b.id]);
        const next = list.filter(b => !earned[b.id]).sort((a, b) => this.progressOf(b).pct - this.progressOf(a).pct)[0];
        const chips = won.map(b => `<span class="module-badge-chip unlocked" data-badge-id="${b.id}" title="${b.title}: ${b.desc}">${b.emoji} ${b.title} ✓</span>`);
        if (next) {
          const { cur } = this.progressOf(next);
          chips.push(`<span class="module-badge-chip locked" data-badge-id="${next.id}" title="Sıradaki: ${next.desc}">${next.emoji} ${next.title} (${cur}/${next.target})</span>`);
        }
        box.innerHTML = chips.join('');
        box.querySelectorAll('[data-badge-id]').forEach(el => el.addEventListener('click', () => this.openBadgeDetail(el.dataset.badgeId)));
      });
    },

    openBadgeDetail(badgeId) {
      const b = this.getBadge(badgeId);
      if (!b) return;
      const earnedAt = this.getEarned()[b.id];
      const { cur, pct } = earnedAt ? { cur: b.target, pct: 100 } : this.progressOf(b);
      const unit = b.unit ? ' ' + b.unit : '';

      $('#badge-modal-title').textContent = `${b.emoji} ${b.title}`;
      $('#badge-modal-icon').textContent = b.emoji;
      $('#badge-modal-name').textContent = b.title;
      $('#badge-modal-desc').textContent = `${this.GROUPS[b.group]?.icon || ''} ${this.GROUPS[b.group]?.label || ''} · ${b.desc}`;

      const fill = $('#badge-modal-progress-fill');
      if (fill) fill.style.width = `${pct}%`;
      const progText = $('#badge-modal-progress-text');
      if (progText) progText.textContent = `${cur} / ${b.target}${unit} (%${pct})`;

      const statusTag = $('#badge-modal-status-badge');
      if (statusTag) {
        if (earnedAt) {
          statusTag.textContent = `🎉 Kazanıldı · ${new Date(earnedAt).toLocaleDateString('tr-TR')}`;
          statusTag.className = 'badge-modal-status-tag unlocked';
        } else {
          statusTag.textContent = `🔒 Kilitli · Hedefe ${b.target - cur}${unit} kaldı`;
          statusTag.className = 'badge-modal-status-tag';
        }
      }

      // Kazanılmış rozet profil resmi yapılabilir
      const useBtn = $('#badge-modal-use-avatar');
      if (useBtn) {
        useBtn.classList.toggle('hidden', !earnedAt);
        useBtn.onclick = () => {
          ProfileAvatar.setBadge(b.id);
          closeModal('badge-detail-modal');
        };
      }

      openModal('badge-detail-modal');
    }
  };

  // ═══════════════════════════════════════════════════════
  // PROFİL RESMİ: EMOJİ & ROZET SEÇİCİ (Ayarlar › Profil)
  // Görüntüleme auth.js içindeki PlanovaAuth.refreshProfile() ile yapılır.
  // ═══════════════════════════════════════════════════════

  const ProfileAvatar = {
    KEY: 'asi_profile_avatar', // { type: 'emoji'|'badge', emoji, id?, bg? }

    EMOJIS: [
      '😀', '😎', '🤓', '🥳', '😇', '🤩', '🙂', '😺', '🦊', '🐼', '🐨', '🐯',
      '🦁', '🐸', '🐵', '🐧', '🦄', '🐝', '🐢', '🐬', '🦋', '🌸', '🌻', '🌵',
      '🍀', '🌙', '⭐', '☀️', '🌈', '⚡', '🔥', '💧', '❄️', '🍎', '🍕', '☕',
      '⚽', '🏀', '🎮', '🎧', '🎨', '🎸', '📚', '💻', '🚀', '🧠', '💎', '👑',
      '🧕', '🧔', '👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '🧑‍🚀', '🥷', '🦸', '🧙'
    ],

    BG_COLORS: ['', '#06B6D4', '#F97316', '#8B5CF6', '#10B981', '#EF4444', '#0F172A', '#F59E0B'],

    tab: 'emoji',

    init() {
      const root = $('#avatar-picker');
      if (!root) return;

      root.querySelectorAll('.avatar-tab').forEach(btn => btn.addEventListener('click', () => {
        this.tab = btn.dataset.tab;
        root.querySelectorAll('.avatar-tab').forEach(b => b.classList.toggle('active', b === btn));
        root.querySelectorAll('.avatar-panel').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== this.tab));
      }));

      $('#avatar-emoji-grid').innerHTML = this.EMOJIS
        .map(e => `<button type="button" class="avatar-emoji-btn" data-emoji="${e}" aria-label="${e}">${e}</button>`).join('');
      $('#avatar-emoji-grid').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-emoji]');
        if (btn) this.setEmoji(btn.dataset.emoji);
      });

      $('#avatar-bg-row').innerHTML = this.BG_COLORS.map(c =>
        `<button type="button" class="avatar-bg-btn ${c ? '' : 'is-default'}" data-bg="${c}" style="${c ? `background:${c}` : ''}" aria-label="${c ? 'Arka plan ' + c : 'Varsayılan arka plan'}"></button>`
      ).join('');
      $('#avatar-bg-row').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-bg]');
        if (btn) this.setBg(btn.dataset.bg);
      });

      $('#avatar-custom-apply')?.addEventListener('click', () => this.applyCustom());
      $('#avatar-custom-emoji')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.applyCustom(); } });

      $('#avatar-badge-grid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-badge-id]');
        if (!btn) return;
        if (btn.classList.contains('locked')) StreakManager.openBadgeDetail(btn.dataset.badgeId);
        else this.setBadge(btn.dataset.badgeId);
      });

      this.renderBadgeGrid();
      this.markSelected();
    },

    get() {
      const a = Storage.get(this.KEY, null);
      return a && a.emoji ? a : null;
    },

    save(avatar) {
      Storage.set(this.KEY, avatar);
      localStorage.removeItem('asi_profile_photo'); // emoji/rozet seçilince fotoğraf yerine geçer
      window.PlanovaAuth?.refreshProfile?.();
      this.markSelected();
      StreakManager.updateStreaksAndBadges();
    },

    setEmoji(emoji) {
      const prev = this.get();
      this.save({ type: 'emoji', emoji, bg: prev?.bg || '' });
      showToast(`Profil resmin ${emoji} olarak ayarlandı`, 'success');
    },

    setBadge(id) {
      const b = StreakManager.getBadge(id);
      if (!b || !StreakManager.isEarned(id)) return;
      // Rozetler varsayılan olarak altın çerçeveyle gösterilir; renk sonradan seçilebilir
      this.save({ type: 'badge', id, emoji: b.emoji, bg: '' });
      showToast(`🏅 "${b.title}" rozeti profil resmin oldu`, 'success');
    },

    setBg(bg) {
      const cur = this.get();
      if (!cur) { showToast('Önce bir emoji veya rozet seç', 'info'); return; }
      this.save({ ...cur, bg });
    },

    applyCustom() {
      const input = $('#avatar-custom-emoji');
      const raw = (input?.value || '').trim();
      if (!raw) return;
      // Tek bir emoji (birleşik emojiler dahil) kabul et
      let first = raw;
      if (window.Intl && Intl.Segmenter) {
        first = [...new Intl.Segmenter('tr', { granularity: 'grapheme' }).segment(raw)][0]?.segment || '';
      } else {
        first = Array.from(raw)[0] || '';
      }
      if (!/\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(first)) {
        showToast('Lütfen bir emoji gir (ör. 🦄)', 'error');
        return;
      }
      this.setEmoji(first);
      input.value = '';
    },

    renderBadgeGrid() {
      const grid = $('#avatar-badge-grid');
      if (!grid) return;
      const earned = StreakManager.getEarned();
      const sorted = StreakManager.BADGES.slice().sort((a, b) => (earned[b.id] ? 1 : 0) - (earned[a.id] ? 1 : 0));
      grid.innerHTML = sorted.map(b => {
        const ok = !!earned[b.id];
        return `<button type="button" class="avatar-badge-btn ${ok ? 'unlocked' : 'locked'}" data-badge-id="${b.id}"
                  title="${b.title}${ok ? '' : ' (kilitli): ' + b.desc}">
                  <span class="avatar-badge-emoji">${b.emoji}</span>
                  <span class="avatar-badge-name">${b.title}</span>
                </button>`;
      }).join('');
      const cnt = $('#avatar-badge-count');
      if (cnt) cnt.textContent = `${Object.keys(earned).filter(id => StreakManager.getBadge(id)).length}/${StreakManager.BADGES.length}`;
      this.markSelected();
    },

    markSelected() {
      const a = this.get();
      $$('#avatar-emoji-grid .avatar-emoji-btn').forEach(b => b.classList.toggle('selected', !!a && a.type === 'emoji' && b.dataset.emoji === a.emoji));
      $$('#avatar-badge-grid .avatar-badge-btn').forEach(b => b.classList.toggle('selected', !!a && a.type === 'badge' && b.dataset.badgeId === a.id));
      $$('#avatar-bg-row .avatar-bg-btn').forEach(b => b.classList.toggle('selected', (a?.bg || '') === b.dataset.bg));
    }
  };

  // Veri değiştikçe rozetleri kontrol et (Storage.set içinden çağrılır, art arda yazmalarda tek sefer çalışır)
  let badgeCheckTimer = null;
  function scheduleBadgeCheck() {
    clearTimeout(badgeCheckTimer);
    badgeCheckTimer = setTimeout(() => {
      try { StreakManager.updateStreaksAndBadges(); } catch (e) { console.warn('Rozet kontrolü başarısız:', e); }
      try { TodayPanel.render(); WeekSummary.render(); } catch (_) {}
    }, 700);
  }

  // ═══════════════════════════════════════════════════════
  // VÜCUT KİTLE İNDEKSİ (VKİ) VE GELİŞİM ÇUBUĞU
  // ═══════════════════════════════════════════════════════

  const VkiManager = {
    height: 175,
    weight: 70,

    init() {
      this.load();
      const hInput = $('#vki-height-input');
      const wInput = $('#vki-weight-input');

      if (hInput) {
        hInput.value = this.height;
        hInput.addEventListener('input', () => this.onInputChange());
      }
      if (wInput) {
        wInput.value = this.weight;
        wInput.addEventListener('input', () => this.onInputChange());
      }

      this.calculateAndRender();
    },

    load() {
      const saved = Storage.get('asi_user_vki_data', null);
      if (saved) {
        if (saved.height) this.height = parseFloat(saved.height);
        if (saved.weight) this.weight = parseFloat(saved.weight);
      }
    },

    save() {
      Storage.set('asi_user_vki_data', {
        height: this.height,
        weight: this.weight,
        updatedAt: Date.now()
      });
      clearTimeout(this._histTimer);
      this._histTimer = setTimeout(() => { try { VkiHistory.record(this.height, this.weight); } catch (_) {} }, 1200);
    },

    onInputChange() {
      const h = parseFloat($('#vki-height-input')?.value);
      const w = parseFloat($('#vki-weight-input')?.value);

      if (h && h > 50 && h < 300) this.height = h;
      if (w && w > 10 && w < 500) this.weight = w;

      this.save();
      this.calculateAndRender();
    },

    calculateAndRender() {
      const hM = this.height / 100;
      const bmi = this.weight / (hM * hM);
      const scoreFormatted = bmi.toFixed(1);

      const scoreNumEl = $('#vki-score-num');
      if (scoreNumEl) scoreNumEl.textContent = scoreFormatted;

      // Renk ve Kategori Belirleme
      // Mavi: Zayıf (< 18.5)
      // Yeşil: İdeal Kilo (18.5 - 24.9)
      // Sarı: Fazla Kilolu (25.0 - 29.9)
      // Kırmızı: Obez (>= 30.0)
      let categoryText = '';
      let badgeClass = '';

      if (bmi < 18.5) {
        badgeClass = 'badge-info';
        categoryText = 'Zayıf';
      } else if (bmi <= 24.9) {
        badgeClass = 'badge-success';
        categoryText = 'İdeal';
      } else if (bmi <= 29.9) {
        badgeClass = 'badge-warning';
        categoryText = 'Fazla kilolu';
      } else {
        badgeClass = 'badge-danger';
        categoryText = 'Obez';
      }

      const catBadge = $('#vki-category-badge');
      if (catBadge) {
        catBadge.textContent = categoryText;
        catBadge.className = `badge ${badgeClass}`;
      }
      const summaryEl = $('#vki-summary');
      if (summaryEl) summaryEl.textContent = `VKİ ${scoreFormatted} · ${categoryText}`;

      // Renkli Görsel Bar Üzerindeki İbre (Needle) Konumu
      // Ölçek: BMI 15 = %0, BMI 35 = %100
      const minScale = 15;
      const maxScale = 35;
      const clampedBmi = Math.max(minScale, Math.min(maxScale, bmi));
      const percentage = ((clampedBmi - minScale) / (maxScale - minScale)) * 100;

      const needle = $('#vki-needle');
      if (needle) {
        needle.style.left = `${percentage.toFixed(1)}%`;
      }

      const bubble = $('#vki-needle-bubble');
      if (bubble) {
        bubble.textContent = `${scoreFormatted}`;
      }

      // İdeal Kilo Aralığı
      const minIdealKg = (18.5 * hM * hM).toFixed(1);
      const maxIdealKg = (24.9 * hM * hM).toFixed(1);

      const adviceEl = $('#vki-advice-text');
      if (adviceEl) {
        let diffNote = '';
        if (this.weight < minIdealKg) {
          const diff = (minIdealKg - this.weight).toFixed(1);
          diffNote = ` • İdeal kiloya ulaşmak için ~${diff} kg almanız önerilir.`;
        } else if (this.weight > maxIdealKg) {
          const diff = (this.weight - maxIdealKg).toFixed(1);
          diffNote = ` • İdeal kiloya ulaşmak için ~${diff} kg vermeniz önerilir.`;
        } else {
          diffNote = ' • Harika, sağlıklı ve dengeli bir formdasınız! ✨';
        }
        adviceEl.innerHTML = `${this.height} cm boy için ideal kilo aralığı: <strong>${minIdealKg} – ${maxIdealKg} kg</strong>${diffNote}`;
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // KİTAP OKUMA ODAK SAYACI (POMODORO ENTEGRASYONU)
  // ═══════════════════════════════════════════════════════

  const BookFocusManager = {
    STATE_KEY: 'planova_book_focus', // yalnızca bu cihazda (buluta gitmez)
    active: false,
    bookId: null,
    book: null,
    startPage: 0,
    durationMinutes: 30,
    totalSeconds: 30 * 60,
    remainingSeconds: 30 * 60,
    endAt: 0,          // çalışırken bitiş zamanı (ms) — ekran kilitlense de doğru sayar
    timerId: null,
    paused: false,
    elapsedSeconds: 0,
    wakeLock: null,
    _origTitle: '',

    init() {
      $('#start-book-focus-btn')?.addEventListener('click', () => this.startFocusFlow());
      $('#book-focus-exit-btn')?.addEventListener('click', () => this.requestExit());

      $$('.focus-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('.focus-preset-btn').forEach(b => b.classList.toggle('active', b === btn));
          this.setDuration(parseInt(btn.dataset.minutes, 10) || 30);
        });
      });

      $('#book-focus-start-btn')?.addEventListener('click', () => this.startTimer());
      $('#book-focus-pause-btn')?.addEventListener('click', () => this.pauseTimer());
      $('#book-focus-resume-btn')?.addEventListener('click', () => this.resumeTimer());
      $('#book-focus-reset-btn')?.addEventListener('click', () => this.resetTimer());
      $('#book-focus-add5-btn')?.addEventListener('click', () => this.addMinutes(5));
      $('#book-focus-finish-early-btn')?.addEventListener('click', () => this.triggerFinishModal());

      $('#book-focus-finish-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveFinishedSession();
      });

      $('#focus-step-minus-5')?.addEventListener('click', () => this.stepPage(-5));
      $('#focus-step-minus-1')?.addEventListener('click', () => this.stepPage(-1));
      $('#focus-step-plus-1')?.addEventListener('click', () => this.stepPage(1));
      $('#focus-step-plus-5')?.addEventListener('click', () => this.stepPage(5));
      $('#focus-current-page-input')?.addEventListener('input', () => this.updateLiveCalculation());

      // Bitiş penceresi kapatılırsa (✕) sayaç kaldığı yerden duraklatılmış olarak beklesin
      $('#book-focus-finish-modal [data-modal="book-focus-finish-modal"]')?.addEventListener('click', () => {
        if (this.active) this.setUiState(this.elapsedSeconds > 0 ? 'paused' : 'ready');
      });

      // Sayfa kapanırken / arka plana geçerken son durumu kaydet
      window.addEventListener('pagehide', () => { if (this.active) this.saveState(); });

      // Uygulamaya geri dönünce: süreyi yenile, ekran kilidini tekrar iste
      document.addEventListener('visibilitychange', () => {
        if (!this.active) return;
        if (document.visibilityState === 'hidden') { this.saveState(); return; }
        if (this.timerId) { this.tick(); this.requestWakeLock(); }
      });

      this.restoreState();
    },

    // ─── Kalıcı durum (sayfa yenilense de oturum kaybolmasın) ───
    saveState() {
      try {
        localStorage.setItem(this.STATE_KEY, JSON.stringify({
          bookId: this.bookId, startPage: this.startPage,
          durationMinutes: this.durationMinutes, totalSeconds: this.totalSeconds,
          remainingSeconds: this.remainingSeconds, elapsedSeconds: this.elapsedSeconds,
          endAt: this.timerId ? this.endAt : 0, running: !!this.timerId
        }));
      } catch (_) {}
    },
    clearState() { try { localStorage.removeItem(this.STATE_KEY); } catch (_) {} },

    restoreState() {
      let st = null;
      try { st = JSON.parse(localStorage.getItem(this.STATE_KEY) || 'null'); } catch (_) {}
      if (!st || !st.bookId) return;
      const book = (Storage.get('asi_books', DEFAULT_BOOKS) || []).find(b => b.id === st.bookId);
      if (!book) { this.clearState(); return; }

      this.openFocusMode(book, true);
      this.startPage = st.startPage ?? this.startPage;
      this.durationMinutes = st.durationMinutes || 30;
      this.totalSeconds = st.totalSeconds || this.durationMinutes * 60;
      this.elapsedSeconds = st.elapsedSeconds || 0;
      this.remainingSeconds = st.remainingSeconds ?? this.totalSeconds;
      this.fillBookInfo();

      if (st.running && st.endAt) {
        const left = Math.ceil((st.endAt - Date.now()) / 1000);
        if (left <= 0) {
          // Süre uygulama kapalıyken doldu
          this.elapsedSeconds = this.totalSeconds;
          this.remainingSeconds = 0;
          this.updateDisplay();
          this.setUiState('paused');
          this.triggerFinishModal();
          return;
        }
        this.endAt = st.endAt;
        this.runInterval();
        this.setUiState('running');
      } else {
        this.setUiState(this.elapsedSeconds > 0 ? 'paused' : 'ready');
      }
      this.updateDisplay();
    },

    async startFocusFlow(bookId = null) {
      const books = Storage.get('asi_books', DEFAULT_BOOKS);
      if (!books || books.length === 0) {
        showToast('Kitaplığınızda henüz kitap bulunmuyor. Lütfen önce bir kitap ekleyin.', 'warning');
        Books.openBookModal();
        return;
      }
      let targetBook = bookId ? books.find(b => b.id === bookId) : null;
      if (!targetBook) targetBook = books.find(b => b.status === 'reading') || books[0];
      this.openFocusMode(targetBook);
    },

    openFocusMode(book, silent = false) {
      this.book = book;
      this.bookId = book.id;
      this.startPage = book.currentPage || 0;
      this.durationMinutes = 30;
      this.totalSeconds = 30 * 60;
      this.remainingSeconds = this.totalSeconds;
      this.elapsedSeconds = 0;
      this.endAt = 0;
      this.active = true;
      this.paused = false;
      if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
      this._origTitle = this._origTitle || document.title;

      this.fillBookInfo();
      $$('.focus-preset-btn').forEach(b => b.classList.toggle('active', b.dataset.minutes === '30'));
      this.updateDisplay();
      $('#book-focus-overlay')?.classList.remove('hidden');
      document.body.classList.add('no-scroll-focus');
      this.setUiState('ready');
      if (!silent) this.saveState();
    },

    fillBookInfo() {
      const book = this.book;
      if (!book) return;
      $('#book-focus-title').textContent = book.title;
      $('#book-focus-author').textContent = book.author || 'Belirtilmemiş Yazar';
      const pageTag = $('#book-focus-current-page-tag');
      if (pageTag) pageTag.textContent = `Sayfa ${this.startPage} / ${book.totalPages || '?'}`;
      const cover = $('#book-focus-cover');
      if (cover) {
        if (book.coverImage) {
          cover.textContent = '';
          cover.style.backgroundImage = `url('${book.coverImage}')`;
          cover.classList.add('has-img');
        } else {
          cover.textContent = '📚';
          cover.style.backgroundImage = '';
          cover.classList.remove('has-img');
        }
      }
    },

    // ready | running | paused — düğmeler, süre seçimi ve durum yazısı tek yerden
    setUiState(state) {
      const show = (sel, on) => $(sel)?.classList.toggle('hidden', !on);
      show('#book-focus-start-btn', state === 'ready');
      show('#book-focus-pause-btn', state === 'running');
      show('#book-focus-resume-btn', state === 'paused');
      show('#book-focus-presets', state === 'ready');
      show('#book-focus-reset-btn', state !== 'ready');
      show('#book-focus-add5-btn', state !== 'ready');
      show('#book-focus-finish-early-btn', state !== 'ready');
      $('#book-focus-container')?.setAttribute('data-state', state);
      this.paused = state === 'paused';
      const status = $('#book-focus-status-text');
      if (status) status.textContent = state === 'running' ? 'Okuma devam ediyor' : state === 'paused' ? '⏸ Duraklatıldı' : 'Süreyi seç ve başla';
      this.updateEndTime();
      this.updateTitle();
    },

    setDuration(minutes) {
      this.durationMinutes = minutes;
      this.totalSeconds = minutes * 60;
      this.remainingSeconds = this.totalSeconds;
      this.elapsedSeconds = 0;
      if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
      this.setUiState('ready');
      this.updateDisplay();
      this.saveState();
    },

    startTimer() {
      this.endAt = Date.now() + this.remainingSeconds * 1000;
      this.runInterval();
      this.setUiState('running');
      this.requestWakeLock();
      this.saveState();
    },

    runInterval() {
      if (this.timerId) clearInterval(this.timerId);
      this.timerId = setInterval(() => this.tick(), 500);
    },

    tick() {
      const left = Math.max(0, Math.ceil((this.endAt - Date.now()) / 1000));
      if (left !== this.remainingSeconds) {
        this.elapsedSeconds += this.remainingSeconds - left;
        this.remainingSeconds = left;
        this.updateDisplay();
        this.updateTitle();
        if (left % 15 === 0) this.saveState();
      }
      if (left <= 0) this.completeTimer();
    },

    pauseTimer() {
      if (!this.timerId) return;
      this.tick();
      clearInterval(this.timerId);
      this.timerId = null;
      this.releaseWakeLock();
      this.setUiState('paused');
      this.saveState();
    },

    resumeTimer() {
      this.startTimer();
    },

    resetTimer() {
      if (this.timerId) clearInterval(this.timerId);
      this.timerId = null;
      this.remainingSeconds = this.totalSeconds = this.durationMinutes * 60;
      this.elapsedSeconds = 0;
      this.releaseWakeLock();
      this.setUiState('ready');
      this.updateDisplay();
      this.saveState();
    },

    addMinutes(mins) {
      const add = mins * 60;
      this.totalSeconds += add;
      this.remainingSeconds += add;
      if (this.timerId) this.endAt += add * 1000;
      this.updateDisplay();
      this.updateEndTime();
      this.saveState();
      showToast(`+${mins} dk eklendi`, 'info');
    },

    completeTimer() {
      if (this.timerId) clearInterval(this.timerId);
      this.timerId = null;
      this.releaseWakeLock();
      Workout.playChime();
      if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (_) {} }
      this.setUiState('paused');
      showToast('🎉 Tebrikler! Okuma süren tamamlandı!', 'success');
      this.triggerFinishModal();
    },

    updateDisplay() {
      const m = Math.floor(this.remainingSeconds / 60);
      const s = this.remainingSeconds % 60;
      const disp = $('#book-focus-timer-display');
      if (disp) disp.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const circle = $('#book-focus-circle-progress');
      if (circle) {
        const circumference = 660;
        const progress = this.totalSeconds > 0 ? (this.totalSeconds - this.remainingSeconds) / this.totalSeconds : 0;
        circle.style.strokeDashoffset = circumference * (1 - progress);
      }
    },

    updateEndTime() {
      const el = $('#book-focus-end-time');
      if (!el) return;
      if (this.timerId && this.endAt) {
        const d = new Date(this.endAt);
        el.textContent = `Bitiş ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      } else if (this.elapsedSeconds >= 60) {
        el.textContent = `${Math.floor(this.elapsedSeconds / 60)} dk okundu`;
      } else {
        el.textContent = '';
      }
    },

    // Sekme başlığında kalan süre (başka sekmedeyken de görünsün)
    updateTitle() {
      if (!this._origTitle) this._origTitle = document.title;
      if (this.active && this.timerId) {
        const m = Math.floor(this.remainingSeconds / 60);
        const s = this.remainingSeconds % 60;
        document.title = `📖 ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} · ${this.book?.title || 'Okuma'}`;
      } else {
        document.title = this._origTitle;
      }
    },

    // Okurken telefon ekranı kapanmasın (destekleyen tarayıcılarda)
    async requestWakeLock() {
      try {
        if ('wakeLock' in navigator && !this.wakeLock) {
          this.wakeLock = await navigator.wakeLock.request('screen');
          this.wakeLock.addEventListener?.('release', () => { this.wakeLock = null; });
        }
      } catch (_) { this.wakeLock = null; }
    },
    releaseWakeLock() {
      try { this.wakeLock?.release(); } catch (_) {}
      this.wakeLock = null;
    },

    triggerFinishModal() {
      if (this.timerId) {
        this.tick();
        clearInterval(this.timerId);
        this.timerId = null;
        this.releaseWakeLock();
        this.setUiState('paused');
      }
      this.saveState();

      const elapsedMins = Math.max(1, Math.round(this.elapsedSeconds / 60));
      $('#focus-finish-duration-text').textContent = `${elapsedMins} dakika`;
      $('#focus-finish-start-page-text').textContent = `Sayfa ${this.startPage}`;

      const input = $('#focus-current-page-input');
      if (input) {
        input.min = this.startPage;
        input.max = this.book?.totalPages || 10000;
        input.value = Math.min(this.book?.totalPages || 1000, this.startPage + 10);
      }
      const hint = $('#focus-total-pages-hint');
      if (hint && this.book) hint.textContent = `"${this.book.title}" toplam sayfa sayısı: ${this.book.totalPages}`;

      this.updateLiveCalculation();
      openModal('book-focus-finish-modal');
      setTimeout(() => { try { input?.focus(); input?.select(); } catch (_) {} }, 50);
    },

    // ✕: emek boşa gitmesin — 1 dakikadan uzun okunduysa önce kaydetmeyi öner
    requestExit() {
      if (this.elapsedSeconds >= 60) {
        const mins = Math.round(this.elapsedSeconds / 60);
        if (confirm(`${mins} dakikalık okuman kaydedilmedi.\n\nKaldığın sayfayı kaydetmek için "Tamam"a, kaydetmeden çıkmak için "İptal"e bas.`)) {
          this.triggerFinishModal();
          return;
        }
      }
      this.exitFocusMode();
    },

    stepPage(delta) {
      const input = $('#focus-current-page-input');
      if (!input) return;
      let val = (parseInt(input.value, 10) || this.startPage) + delta;
      val = Math.max(this.startPage, Math.min(this.book?.totalPages || 10000, val));
      input.value = val;
      this.updateLiveCalculation();
    },

    updateLiveCalculation() {
      const input = $('#focus-current-page-input');
      const curr = parseInt(input?.value, 10) || this.startPage;
      const pagesRead = Math.max(0, curr - this.startPage);
      const elapsedMins = Math.max(1, Math.round(this.elapsedSeconds / 60));

      const speedPerMin = (pagesRead / elapsedMins).toFixed(2);
      const speedPerHour = Math.round((pagesRead / elapsedMins) * 60);

      const totalPages = this.book?.totalPages || 300;
      const remainingPages = Math.max(0, totalPages - curr);
      const estDays = pagesRead > 0 ? Math.ceil(remainingPages / Math.max(1, pagesRead)) : Math.ceil(remainingPages / 20);

      const estFinishDate = new Date();
      estFinishDate.setDate(estFinishDate.getDate() + estDays);

      $('#focus-calc-pages-read').textContent = `+${pagesRead} sayfa`;
      $('#focus-calc-speed').textContent = `${speedPerMin} sf/dk (~${speedPerHour} sf/sa)`;
      $('#focus-calc-est-date').textContent = remainingPages === 0 ? '🎉 Kitap Bitti!' : `${formatDate(estFinishDate)} (~${estDays} gün)`;
    },

    async saveFinishedSession() {
      const input = $('#focus-current-page-input');
      const curr = parseInt(input?.value, 10) || this.startPage;
      const pagesRead = Math.max(0, curr - this.startPage);
      const elapsedMins = Math.max(1, Math.round(this.elapsedSeconds / 60));

      await apiFetch('/reading/sessions', 'POST', {
        bookId: this.bookId,
        bookTitle: this.book?.title,
        startPage: this.startPage,
        endPage: curr,
        pagesRead,
        duration: elapsedMins,
        date: formatDateShort(new Date()),
        notes: 'Odak Sayacı (Pomodoro) ile tamamlandı'
      });

      closeModal('book-focus-finish-modal');
      this.exitFocusMode();

      await Books.render();
      await Dashboard.refresh();
      StreakManager.updateStreaksAndBadges();

      showToast(`🏆 Tebrikler! ${pagesRead} sayfa okundu, oturum kaydedildi!`, 'success');
    },

    exitFocusMode() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.releaseWakeLock();
      this.active = false;
      this.clearState();
      $('#book-focus-overlay')?.classList.add('hidden');
      document.body.classList.remove('no-scroll-focus');
      this.updateTitle();
    }
  };


  // ═══════════════════════════════════════════════════════
  // ☀️ BUGÜN PANELİ — namaz, görev, spor, okuma tek bakışta
  // ═══════════════════════════════════════════════════════

  const PRAYER_IDS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  const TodayPanel = {
    render() {
      const grid = $('#today-grid');
      if (!grid) return;
      const today = formatDateShort(new Date());
      const tiles = [];
      const vis = (id) => ModuleManager.isModuleVisible(id);

      // 🕌 Namaz
      if (vis('prayer')) {
        const checks = Storage.get(`asi_prayer_checks_${today}`, {}) || {};
        const done = PRAYER_IDS.filter(p => checks[p] === true).length;
        const next = PrayerManager.timings ? PrayerManager.getNextPrayer() : null;
        const nextName = next ? (next.prayer || next.name) : '';
        tiles.push({
          page: 'prayer', icon: '🕌', title: 'Namaz',
          main: `${done}/5 vakit`,
          sub: (() => {
            const ims = Imsakiye.todayEntry();
            if (ims) return `🌙 İftar ${ims.iftar} · Sahur ${ims.imsak}`;
            return next ? `Sıradaki: ${nextName} ${next.time}${/Yarın/.test(next.remainingText || '') ? ' (yarın)' : ''}` : 'Vakitler yükleniyor…';
          })(),
          pct: done / 5 * 100,
          ok: done === 5
        });
      }

      // 📋 Görevler: geciken + bugün + devam eden
      if (vis('kanban')) {
        const tasks = (Storage.get('asi_tasks', []) || []).filter(t => t && t.status !== 'done');
        const late = tasks.filter(t => t.due && daysFromToday(t.due) < 0);
        const dueToday = tasks.filter(t => t.due && daysFromToday(t.due) === 0);
        const doing = tasks.filter(t => t.status === 'doing' && !late.includes(t) && !dueToday.includes(t));
        const focus = [...late, ...dueToday, ...doing].slice(0, 3);
        const esc = Dashboard.escapeHtml;
        tiles.push({
          page: 'kanban', icon: '📋', title: 'Görevler',
          main: focus.length ? `${late.length + dueToday.length + doing.length} iş` : 'Boş gün',
          sub: late.length ? `${late.length} görev gecikti` : dueToday.length ? `${dueToday.length} görevin son günü bugün` : (doing.length ? 'Devam eden işlerin var' : 'Bugüne tarihli görev yok'),
          warn: late.length > 0,
          list: focus.map(t => `<li class="${t.due && daysFromToday(t.due) < 0 ? 'is-late' : ''}">${esc(t.title)}${t.due ? ` <em>${dueLabel(t.due)}</em>` : ''}</li>`).join('')
        });
      }

      // 🏋️ Spor
      if (vis('schedule')) {
        const logs = [...(Storage.get('asi_workouts', []) || []), ...(Storage.get('asi_workout_history', []) || [])]
          .filter(l => l && l.date === today);
        const byEx = new Map();
        logs.forEach(l => {
          const n = Array.isArray(l.completedSets) ? l.completedSets.length : (l.completed ? (l.sets || 0) : 0);
          byEx.set(l.exerciseId, Math.max(byEx.get(l.exerciseId) || 0, n));
        });
        const sets = [...byEx.values()].reduce((a, b) => a + b, 0);
        const moves = [...byEx.values()].filter(n => n > 0).length;
        const plan = Reminders.get().workout;
        const planCats = WorkoutPlan.todayCats();
        const isDay = planCats.length > 0 || (Array.isArray(plan.days) && plan.days.includes(new Date().getDay()));
        const planText = planCats.map(c => WorkoutPlan.CATS[c]?.name || c).join(' + ');
        tiles.push({
          page: 'schedule', icon: '🏋️', title: 'Spor',
          main: sets ? `${moves} hareket · ${sets} set` : (planText || (isDay ? 'Antrenman günü' : 'Henüz yok')),
          sub: sets ? (planText ? `Program: ${planText}` : 'Bugün antrenman yaptın 💪') : (isDay ? `Antrenman günü · ${plan.time}` : 'Dinlenme günü ya da plan yok'),
          ok: sets > 0
        });
      }

      // 🎓 Okul: bugünün dersleri + yaklaşan sınav
      if (vis('attendance')) {
        const t = School.todayInfo();
        if (t.courses.length || t.nextExam) {
          const esc = Dashboard.escapeHtml;
          const risky = t.courses.filter(c => c.left <= 1);
          tiles.push({
            page: 'attendance', icon: '🎓', title: 'Okul',
            main: t.courses.length ? `${t.courses.length} ders` : (t.nextExam ? `Sınava ${t.nextExam.days} gün` : ''),
            sub: risky.length ? `⚠️ ${esc(risky[0].name)}: ${risky[0].left === 0 ? 'hakkın bitti' : '1 hakkın kaldı'}` : t.nextExam ? `${esc(t.nextExam.title)} · ${t.nextExam.days === 0 ? 'bugün' : t.nextExam.days === 1 ? 'yarın' : t.nextExam.days + ' gün'}` : 'Bugün sınav yok',
            warn: risky.length > 0 || (t.nextExam && t.nextExam.days <= 1),
            list: t.courses.slice(0, 3).map(c => `<li class="${c.left <= 1 ? 'is-late' : ''}">${esc(c.name)} <em>${esc(c.time || '')}</em></li>`).join('')
          });
        }
      }

      // 📚 Okuma
      if (vis('books')) {
        const pages = (Storage.get('asi_reading_sessions', []) || [])
          .filter(x => x && x.date === today)
          .reduce((t, x) => t + (Number(x.pagesRead) || 0), 0);
        const goal = Number((Storage.get('asi_reading_goals', DEFAULT_READING_GOALS) || {}).dailyPages) || 20;
        tiles.push({
          page: 'books', icon: '📚', title: 'Okuma',
          main: `${pages} / ${goal} sayfa`,
          sub: pages >= goal ? 'Günlük hedef tamam ✓' : `${goal - pages} sayfa kaldı`,
          pct: Math.min(100, pages / goal * 100),
          ok: pages >= goal,
          action: '<button type="button" class="today-mini-btn" data-act="read">📖 Okumaya başla</button>'
        });
      }

      $('#today-card')?.classList.toggle('hidden', tiles.length === 0);
      grid.innerHTML = tiles.map(t => `
        <div class="today-tile ${t.ok ? 'is-ok' : ''} ${t.warn ? 'is-warn' : ''}" data-page="${t.page}" role="button" tabindex="0">
          <div class="today-tile-top"><span class="today-ico">${t.icon}</span><span class="today-ttl">${t.title}</span>${t.ok ? '<span class="today-check">✓</span>' : ''}</div>
          <div class="today-main">${t.main}</div>
          <div class="today-tsub">${t.sub}</div>
          ${typeof t.pct === 'number' ? `<div class="today-bar"><div style="width:${Math.round(t.pct)}%"></div></div>` : ''}
          ${t.list ? `<ul class="today-list">${t.list}</ul>` : ''}
          ${t.action || ''}
        </div>`).join('');

      const sub = $('#today-sub');
      if (sub) sub.textContent = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });

      grid.querySelectorAll('.today-tile').forEach(el => {
        const go = (e) => {
          if (e.target.closest('[data-act="read"]')) { BookFocusManager.startFocusFlow(); return; }
          Nav.goTo(el.dataset.page);
        };
        el.addEventListener('click', go);
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(e); });
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // 📊 HAFTALIK ÖZET — bu hafta vs geçen haftanın aynı günleri
  // ═══════════════════════════════════════════════════════

  const WeekSummary = {
    // Pazartesi 00:00'dan başlayan hafta; offset = -1 geçen hafta
    range(offsetWeeks = 0) {
      const now = new Date();
      const monday = getMonday(new Date(now));
      monday.setHours(0, 0, 0, 0);
      monday.setDate(monday.getDate() + offsetWeeks * 7);
      const daysSoFar = ((now.getDay() + 6) % 7) + 1; // Pzt=1 … Paz=7
      const days = [];
      for (let i = 0; i < daysSoFar; i++) {
        const d = new Date(monday); d.setDate(monday.getDate() + i);
        days.push(formatDateShort(d));
      }
      const start = monday.getTime();
      const end = new Date(monday).setDate(monday.getDate() + daysSoFar);
      return { days: new Set(days), start, end, count: daysSoFar };
    },

    metrics(r) {
      const inR = (ymd) => r.days.has(ymd);
      const sessions = (Storage.get('asi_reading_sessions', []) || []).filter(x => x && inR(x.date));
      const workoutDays = [...StreakManager.workoutDates()].filter(inR).length;
      let prayers = 0;
      r.days.forEach(d => {
        const c = Storage.get(`asi_prayer_checks_${d}`, null);
        if (c) prayers += PRAYER_IDS.filter(p => c[p] === true).length;
      });
      const tasksDone = (Storage.get('asi_tasks', []) || [])
        .filter(t => t && t.status === 'done' && t.completedAt >= r.start && t.completedAt < r.end).length;
      return {
        pages: sessions.reduce((t, x) => t + (Number(x.pagesRead) || 0), 0),
        minutes: sessions.reduce((t, x) => t + (Number(x.duration) || 0), 0),
        workoutDays,
        prayers,
        tasksDone
      };
    },

    render() {
      const grid = $('#week-grid');
      if (!grid) return;
      const cur = this.range(0), prev = this.range(-1);
      const a = this.metrics(cur), b = this.metrics(prev);
      const vis = (id) => ModuleManager.isModuleVisible(id);
      const now = new Date();
      const isSundayEvening = now.getDay() === 0 && now.getHours() >= 18;

      const rows = [
        vis('books') && { icon: '📚', label: 'Okunan sayfa', v: a.pages, p: b.pages },
        vis('books') && { icon: '⏱️', label: 'Okuma süresi', v: a.minutes, p: b.minutes, unit: 'dk' },
        vis('schedule') && { icon: '🏋️', label: 'Antrenman günü', v: a.workoutDays, p: b.workoutDays },
        vis('prayer') && { icon: '🕌', label: 'Kılınan vakit', v: a.prayers, p: b.prayers, of: cur.count * 5 },
        vis('kanban') && { icon: '✅', label: 'Biten görev', v: a.tasksDone, p: b.tasksDone }
      ].filter(Boolean);

      $('#week-card')?.classList.toggle('hidden', rows.length === 0);
      const title = $('#week-title');
      if (title) title.textContent = isSundayEvening ? '📊 Haftanın Özeti' : '📊 Bu Hafta';
      const sub = $('#week-sub');
      if (sub) sub.textContent = cur.count === 7 ? 'Geçen haftayla karşılaştırma' : `Pzt–${['', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][cur.count]} · geçen haftanın aynı günleriyle`;

      // Tek cümlelik özet
      const parts = [];
      if (vis('books') && a.pages) parts.push(`${a.pages} sayfa okudun`);
      if (vis('schedule') && a.workoutDays) parts.push(`${a.workoutDays} gün antrenman yaptın`);
      if (vis('prayer') && a.prayers) parts.push(`${a.prayers}/${cur.count * 5} vakit kıldın`);
      if (vis('kanban') && a.tasksDone) parts.push(`${a.tasksDone} görev bitirdin`);
      const head = $('#week-headline');
      if (head) {
        head.textContent = parts.length
          ? `Bu hafta ${parts.length > 1 ? parts.slice(0, -1).join(', ') + ' ve ' + parts[parts.length - 1] : parts[0]}.`
          : 'Bu hafta henüz kayıt yok — bugün küçük bir adımla başla. 🌱';
      }

      grid.innerHTML = rows.map(r => {
        const d = r.v - r.p;
        const cls = d > 0 ? 'up' : d < 0 ? 'down' : 'same';
        const arrow = d > 0 ? `▲ ${d}` : d < 0 ? `▼ ${-d}` : '=';
        return `
          <div class="week-row">
            <span class="week-ico">${r.icon}</span>
            <span class="week-lbl">${r.label}</span>
            <span class="week-val">${r.v}${r.of ? `<small>/${r.of}</small>` : ''}${r.unit ? `<small> ${r.unit}</small>` : ''}</span>
            <span class="week-delta ${cls}" title="Geçen hafta: ${r.p}">${arrow}</span>
          </div>`;
      }).join('');
    },

    headline() {
      return $('#week-headline')?.textContent || '';
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🔔 HATIRLATICILAR — namaz, antrenman, görev, haftalık özet
  // Tarayıcı kısıtı: yalnızca uygulama açık / arka plandayken çalışır.
  // ═══════════════════════════════════════════════════════

  const Reminders = {
    KEY: 'planova_reminders',       // cihaza özel (bildirim izni de cihaza özel)
    FIRED_KEY: 'planova_reminders_fired',
    DEFAULTS: {
      prayer: { on: false, before: 10 },
      workout: { on: false, days: [1, 3, 5], time: '18:00' },
      tasks: { on: false, time: '09:00' },
      week: { on: false }
    },
    _loop: null,

    get() {
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem(this.KEY) || '{}') || {}; } catch (_) {}
      const d = this.DEFAULTS;
      return {
        prayer: { ...d.prayer, ...(saved.prayer || {}) },
        workout: { ...d.workout, ...(saved.workout || {}) },
        tasks: { ...d.tasks, ...(saved.tasks || {}) },
        week: { ...d.week, ...(saved.week || {}) }
      };
    },
    save(cfg) {
      try { localStorage.setItem(this.KEY, JSON.stringify(cfg)); } catch (_) {}
      this.updateUi();
      try { TodayPanel.render(); } catch (_) {}
    },

    supported() { return typeof window !== 'undefined' && 'Notification' in window; },
    permission() { return this.supported() ? Notification.permission : 'unsupported'; },

    init() {
      const cfg = this.get();
      const bind = (id, fn) => $(id)?.addEventListener('change', fn);

      $('#rem-prayer-on') && ($('#rem-prayer-on').checked = cfg.prayer.on);
      $('#rem-prayer-before') && ($('#rem-prayer-before').value = String(cfg.prayer.before));
      $('#rem-workout-on') && ($('#rem-workout-on').checked = cfg.workout.on);
      $('#rem-workout-time') && ($('#rem-workout-time').value = cfg.workout.time);
      $('#rem-tasks-on') && ($('#rem-tasks-on').checked = cfg.tasks.on);
      $('#rem-tasks-time') && ($('#rem-tasks-time').value = cfg.tasks.time);
      $('#rem-week-on') && ($('#rem-week-on').checked = cfg.week.on);

      const onToggle = async (e) => {
        if (e.target.checked && this.permission() !== 'granted') {
          const ok = await this.requestPermission();
          if (!ok) { e.target.checked = false; }
        }
        this.collect();
      };
      ['#rem-prayer-on', '#rem-workout-on', '#rem-tasks-on', '#rem-week-on'].forEach(id => bind(id, onToggle));
      ['#rem-prayer-before', '#rem-workout-time', '#rem-tasks-time'].forEach(id => bind(id, () => this.collect()));

      $$('#rem-workout-days button').forEach(btn => {
        btn.addEventListener('click', () => {
          const c = this.get();
          const day = Number(btn.dataset.day);
          const set = new Set(c.workout.days);
          set.has(day) ? set.delete(day) : set.add(day);
          c.workout.days = [...set].sort();
          this.save(c);
        });
      });

      $('#reminder-enable-btn')?.addEventListener('click', () => this.requestPermission());
      $('#reminder-test-btn')?.addEventListener('click', async () => {
        if (this.permission() !== 'granted' && !(await this.requestPermission())) return;
        this.notify('🔔 Planova', 'Bildirimler çalışıyor! Hatırlatıcıların bu cihaza gelecek.', 'settings', 'test');
      });

      this.updateUi();
      this.check();
      this._loop = setInterval(() => this.check(), 30000);
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') this.check(); });
    },

    collect() {
      const c = this.get();
      c.prayer.on = !!$('#rem-prayer-on')?.checked;
      c.prayer.before = Number($('#rem-prayer-before')?.value || 10);
      c.workout.on = !!$('#rem-workout-on')?.checked;
      c.workout.time = $('#rem-workout-time')?.value || '18:00';
      c.tasks.on = !!$('#rem-tasks-on')?.checked;
      c.tasks.time = $('#rem-tasks-time')?.value || '09:00';
      c.week.on = !!$('#rem-week-on')?.checked;
      this.save(c);
      this.check();
    },

    async requestPermission() {
      if (!this.supported()) {
        showToast('Bu tarayıcı bildirimleri desteklemiyor. iPhone\'da önce Planova\'yı ana ekrana kurman gerekiyor.', 'warning');
        return false;
      }
      if (Notification.permission === 'granted') { this.updateUi(); return true; }
      if (Notification.permission === 'denied') {
        showToast('Bildirimler engellenmiş. Tarayıcının site ayarlarından Planova için bildirimlere izin ver.', 'warning');
        this.updateUi();
        return false;
      }
      let res = 'default';
      try { res = await Notification.requestPermission(); } catch (_) {}
      this.updateUi();
      if (res === 'granted') showToast('🔔 Bildirimler açıldı', 'success');
      return res === 'granted';
    },

    updateUi() {
      const perm = this.permission();
      const badge = $('#reminder-perm-state');
      const cfg = this.get();
      const anyOn = cfg.prayer.on || cfg.workout.on || cfg.tasks.on || cfg.week.on;
      if (badge) {
        badge.textContent = perm === 'unsupported' ? 'Desteklenmiyor' : perm === 'denied' ? 'Engellendi' : perm === 'granted' ? (anyOn ? 'Açık' : 'İzin var') : 'Kapalı';
        badge.classList.toggle('is-on', perm === 'granted' && anyOn);
      }
      $('#reminder-enable-btn')?.classList.toggle('hidden', perm === 'granted' || perm === 'unsupported');
      $$('#rem-workout-days button').forEach(b => b.classList.toggle('active', cfg.workout.days.includes(Number(b.dataset.day))));
    },

    firedMap() {
      try { return JSON.parse(localStorage.getItem(this.FIRED_KEY) || '{}') || {}; } catch (_) { return {}; }
    },
    markFired(id) {
      const map = this.firedMap();
      map[id] = Date.now();
      // 3 günden eski kayıtları temizle
      const cutoff = Date.now() - 3 * 86400000;
      Object.keys(map).forEach(k => { if (map[k] < cutoff) delete map[k]; });
      try { localStorage.setItem(this.FIRED_KEY, JSON.stringify(map)); } catch (_) {}
    },

    // Bugünün tüm hatırlatma anları
    events() {
      const cfg = this.get();
      const now = new Date();
      const today = formatDateShort(now);
      const at = (hhmm) => {
        const [h, m] = String(hhmm || '00:00').split(':').map(Number);
        const d = new Date(now); d.setHours(h || 0, m || 0, 0, 0);
        return d.getTime();
      };
      const list = [];

      if (cfg.prayer.on && ModuleManager.isModuleVisible('prayer') && PrayerManager.timings && PrayerManager.cachedDate === today) {
        const checks = Storage.get(`asi_prayer_checks_${today}`, {}) || {};
        PRAYER_IDS.forEach(id => {
          const meta = PrayerManager.PRAYER_KEYS.find(p => p.id === id);
          if (!meta || checks[id] === true) return;
          const time = PrayerManager.cleanTime(PrayerManager.timings[meta.aladhanKey]);
          const name = meta.prayer || meta.name;
          const before = Number(cfg.prayer.before) || 0;
          list.push({
            id: `prayer-${today}-${id}-${before}`,
            at: at(time) - before * 60000,
            title: before ? `🕌 ${name} vaktine ${before} dk kaldı` : `🕌 ${name} vakti girdi`,
            body: `${name}: ${time}`,
            page: 'prayer'
          });
        });
      }

      if (cfg.workout.on && ModuleManager.isModuleVisible('schedule') && cfg.workout.days.includes(now.getDay())) {
        const doneToday = StreakManager.workoutDates().has(today);
        if (!doneToday) {
          list.push({ id: `workout-${today}`, at: at(cfg.workout.time), title: '🏋️ Bugün antrenman günü!', body: 'Programın seni bekliyor. Hadi başlayalım 💪', page: 'schedule' });
        }
      }

      if (cfg.tasks.on && ModuleManager.isModuleVisible('kanban')) {
        const open = (Storage.get('asi_tasks', []) || []).filter(t => t && t.status !== 'done' && t.due && daysFromToday(t.due) <= 0);
        if (open.length) {
          const late = open.filter(t => daysFromToday(t.due) < 0).length;
          list.push({
            id: `tasks-${today}`,
            at: at(cfg.tasks.time),
            title: late ? `📋 ${late} görevin gecikti` : `📋 Bugün ${open.length} görevin son günü`,
            body: open.slice(0, 3).map(t => '• ' + t.title).join('\n'),
            page: 'kanban'
          });
        }
      }

      if (cfg.tasks.on && ModuleManager.isModuleVisible('attendance')) {
        const t = School.todayInfo();
        const soon = (Storage.get('asi_exams', []) || []).filter(e => { const n = daysFromToday(e.date); return n === 0 || n === 1; });
        if (soon.length) {
          list.push({
            id: `exams-${today}`, at: at(cfg.tasks.time), page: 'attendance',
            title: soon.some(e => daysFromToday(e.date) === 0) ? '📝 Bugün sınavın var!' : '📝 Yarın sınavın var',
            body: soon.map(e => `• ${School.examTitle(e)}${e.time ? ' ' + e.time : ''}`).join('\n')
          });
        }
        const risky = t.courses.filter(c => c.left <= 1);
        if (risky.length) {
          list.push({
            id: `absence-${today}`, at: at(cfg.tasks.time), page: 'attendance',
            title: '🎓 Devamsızlık sınırındasın',
            body: risky.map(c => `• ${c.name}: ${c.left === 0 ? 'hakkın bitti' : '1 hakkın kaldı'}`).join('\n')
          });
        }
      }

      if (cfg.week.on && now.getDay() === 0) {
        list.push({ id: `week-${today}`, at: at('20:00'), title: '📊 Haftalık özetin hazır', body: '', page: 'dashboard', dynamicBody: true });
      }
      return list;
    },

    // Her 30 sn: zamanı gelmiş (son 15 dk içinde) ve henüz gönderilmemiş olanları gönder
    check() {
      if (this.permission() !== 'granted') return;
      const now = Date.now();
      const fired = this.firedMap();
      this.events().forEach(ev => {
        if (fired[ev.id]) return;
        if (ev.at <= now && now - ev.at < 15 * 60000) {
          let body = ev.body;
          if (ev.dynamicBody) { try { WeekSummary.render(); body = WeekSummary.headline(); } catch (_) {} }
          this.notify(ev.title, body, ev.page, ev.id);
          this.markFired(ev.id);
        }
      });
    },

    async notify(title, body, page, tag) {
      const opts = { body, tag, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { page }, renotify: false };
      try {
        const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
        if (reg && reg.showNotification) { await reg.showNotification(title, opts); return; }
      } catch (_) {}
      try {
        const n = new Notification(title, opts);
        n.onclick = () => { window.focus(); if (page) Nav.goTo(page); n.close(); };
      } catch (_) {
        showToast(`${title}${body ? ' — ' + body : ''}`, 'info');
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // 📲 PWA KURULUMU
  // ═══════════════════════════════════════════════════════

  const PwaInstall = {
    deferred: null,
    DISMISS_KEY: 'planova_install_dismissed',

    isStandalone() {
      return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
    },

    init() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferred = e;
        this.updateUi();
      });
      window.addEventListener('appinstalled', () => {
        this.deferred = null;
        showToast('📲 Planova ana ekranına kuruldu!', 'success');
        this.updateUi();
      });
      $$('.pwa-install-btn').forEach(b => b.addEventListener('click', () => this.prompt()));
      $('#pwa-banner-close')?.addEventListener('click', () => {
        try { localStorage.setItem(this.DISMISS_KEY, String(Date.now())); } catch (_) {}
        $('#pwa-install-banner')?.classList.add('hidden');
      });

      // Bildirime dokununca ilgili sayfayı aç
      navigator.serviceWorker?.addEventListener?.('message', (e) => {
        if (e.data && e.data.type === 'open-page' && e.data.page) Nav.goTo(e.data.page);
      });
      this.updateUi();
    },

    async prompt() {
      if (!this.deferred) {
        Nav.goTo('settings');
        $('#settings-install-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      this.deferred.prompt();
      try { await this.deferred.userChoice; } catch (_) {}
      this.deferred = null;
      this.updateUi();
    },

    updateUi() {
      const installed = this.isStandalone();
      const can = !!this.deferred;
      const state = $('#pwa-install-state');
      if (state) {
        state.textContent = installed ? 'Kurulu ✓' : can ? 'Kurulabilir' : 'Web';
        state.classList.toggle('is-on', installed);
      }
      $$('#settings-install-card .pwa-install-btn').forEach(b => b.classList.toggle('hidden', !can || installed));
      $('#pwa-install-help')?.classList.toggle('hidden', installed);

      let dismissed = 0;
      try { dismissed = Number(localStorage.getItem(this.DISMISS_KEY) || 0); } catch (_) {}
      const recentlyDismissed = Date.now() - dismissed < 14 * 86400000;
      $('#pwa-install-banner')?.classList.toggle('hidden', !can || installed || recentlyDismissed);
    }
  };


  // ═══════════════════════════════════════════════════════
  // ORTAK: açılır pencere + basit çizgi grafik
  // ═══════════════════════════════════════════════════════

  function openSheet(title, html, size = 'md') {
    const m = $('#gen-modal');
    if (!m) return null;
    $('#gen-modal-title').textContent = title;
    const box = m.querySelector('.modal');
    box.classList.remove('modal-md', 'modal-lg');
    box.classList.add(size === 'lg' ? 'modal-lg' : 'modal-md');
    const body = $('#gen-modal-body');
    body.innerHTML = html;
    openModal('gen-modal');
    return body;
  }
  function closeSheet() { closeModal('gen-modal'); }

  // points: [{ x: 'etiket', y: sayı }]
  function lineChartSvg(points, { unit = '', color = '#06B6D4', height = 170 } = {}) {
    if (!points.length) return '<div class="chart-empty">Henüz veri yok.</div>';
    const W = 340, H = height, pl = 34, pr = 12, pt = 16, pb = 26;
    const ys = points.map(p => p.y);
    let min = Math.min(...ys), max = Math.max(...ys);
    if (min === max) { min -= 1; max += 1; }
    const pad = (max - min) * 0.12; min -= pad; max += pad;
    const X = (i) => pl + (points.length === 1 ? (W - pl - pr) / 2 : i * (W - pl - pr) / (points.length - 1));
    const Y = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
    const path = points.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ');
    const area = `${path} L${X(points.length - 1).toFixed(1)},${H - pb} L${X(0).toFixed(1)},${H - pb} Z`;
    const fmt = (v) => (Math.round(v * 10) / 10).toString().replace('.', ',');
    const step = Math.max(1, Math.ceil(points.length / 6));
    const gid = 'g' + Math.random().toString(36).slice(2, 7);
    return `
      <svg class="line-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik">
        <defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0.28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
        <line x1="${pl}" x2="${W - pr}" y1="${Y(max - pad)}" y2="${Y(max - pad)}" class="lc-grid"/>
        <line x1="${pl}" x2="${W - pr}" y1="${Y(min + pad)}" y2="${Y(min + pad)}" class="lc-grid"/>
        <text x="${pl - 6}" y="${Y(max - pad) + 4}" class="lc-axis" text-anchor="end">${fmt(max - pad)}</text>
        <text x="${pl - 6}" y="${Y(min + pad) + 4}" class="lc-axis" text-anchor="end">${fmt(min + pad)}</text>
        <path d="${area}" fill="url(#${gid})"/>
        <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        ${points.map((p, i) => `<circle cx="${X(i).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="${i === points.length - 1 ? 4.5 : 3}" fill="${color}"><title>${p.x}: ${fmt(p.y)} ${unit}</title></circle>`).join('')}
        ${points.map((p, i) => (i % step === 0 || i === points.length - 1) ? `<text x="${X(i).toFixed(1)}" y="${H - 8}" class="lc-axis" text-anchor="middle">${p.x}</text>` : '').join('')}
        <text x="${X(points.length - 1).toFixed(1)}" y="${(Y(points[points.length - 1].y) - 9).toFixed(1)}" class="lc-last" text-anchor="end">${fmt(points[points.length - 1].y)} ${unit}</text>
      </svg>`;
  }

  const shortDate = (ymd) => {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  // ═══════════════════════════════════════════════════════
  // 🏋️ SPOR: haftalık program
  // ═══════════════════════════════════════════════════════

  const WorkoutPlan = {
    KEY: 'asi_workout_plan',
    CATS: {
      gogus: { name: 'Göğüs', icon: '🫁' }, sirt: { name: 'Sırt', icon: '🦇' }, omuz: { name: 'Omuz', icon: '🛡️' },
      biceps: { name: 'Biceps', icon: '💪' }, triceps: { name: 'Triceps', icon: '🔱' }, karin: { name: 'Karın', icon: '🍫' },
      bacak: { name: 'Bacak', icon: '🦵' }, onkol: { name: 'Ön Kol', icon: '🤜' }, kardiyo: { name: 'Kardiyo', icon: '🏃' }
    },
    DAYS: [[1, 'Pazartesi'], [2, 'Salı'], [3, 'Çarşamba'], [4, 'Perşembe'], [5, 'Cuma'], [6, 'Cumartesi'], [0, 'Pazar']],

    get() { const p = Storage.get(this.KEY, {}); return p && typeof p === 'object' ? p : {}; },
    catsFor(day) { const c = this.get()[day]; return Array.isArray(c) ? c : []; },
    todayCats() { return this.catsFor(new Date().getDay()); },

    open() {
      const plan = this.get();
      const html = `
        <p class="sheet-hint">Her güne çalışacağın kas gruplarını seç. Spor sayfası o gün <strong>📅 Bugün</strong> filtresiyle açılır; boş bıraktığın günler dinlenme günüdür.</p>
        <div class="plan-days">
          ${this.DAYS.map(([d, name]) => `
            <div class="plan-day" data-day="${d}">
              <div class="plan-day-name">${name}${d === new Date().getDay() ? ' <span class="badge-today">Bugün</span>' : ''}</div>
              <div class="plan-chips">
                ${Object.entries(this.CATS).map(([id, c]) => `<button type="button" class="plan-chip ${(plan[d] || []).includes(id) ? 'active' : ''}" data-cat="${id}">${c.icon} ${c.name}</button>`).join('')}
              </div>
            </div>`).join('')}
        </div>
        <label class="plan-sync"><input type="checkbox" id="plan-sync-rem" checked> Antrenman hatırlatıcısı da bu günlerde gelsin</label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" id="plan-clear">Temizle</button>
          <button type="button" class="btn btn-primary" id="plan-save">Kaydet</button>
        </div>`;
      const body = openSheet('📅 Haftalık Antrenman Programı', html);
      if (!body) return;
      body.querySelectorAll('.plan-chip').forEach(b => b.addEventListener('click', () => b.classList.toggle('active')));
      body.querySelector('#plan-clear').addEventListener('click', () => body.querySelectorAll('.plan-chip.active').forEach(b => b.classList.remove('active')));
      body.querySelector('#plan-save').addEventListener('click', () => {
        const next = {};
        body.querySelectorAll('.plan-day').forEach(row => {
          const cats = [...row.querySelectorAll('.plan-chip.active')].map(b => b.dataset.cat);
          if (cats.length) next[row.dataset.day] = cats;
        });
        Storage.set(this.KEY, next);
        if (body.querySelector('#plan-sync-rem')?.checked) {
          const cfg = Reminders.get();
          cfg.workout.days = Object.keys(next).map(Number).sort();
          Reminders.save(cfg);
        }
        closeSheet();
        Workout.selectedCategory = this.todayCats().length ? 'today' : (Workout.selectedCategory === 'today' ? 'all' : Workout.selectedCategory);
        $$('.workout-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === Workout.selectedCategory));
        Workout.updateCategoryCounts();
        Workout.updateProgressUI();
        Workout.renderListOnly();
        TodayPanel.render();
        showToast('📅 Antrenman programı kaydedildi', 'success');
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🏋️ SPOR: ağırlık grafiği ve kişisel rekorlar
  // ═══════════════════════════════════════════════════════

  const WorkoutStats = {
    parseKg(w) {
      if (w === null || w === undefined) return null;
      const m = String(w).replace(',', '.').match(/(\d+(?:\.\d+)?)/);
      return m ? parseFloat(m[1]) : null;
    },
    // Hareketin tarih sıralı ağırlık geçmişi (gün başına en yüksek)
    series(exId) {
      const byDate = new Map();
      (Storage.get('asi_workout_history', []) || []).forEach(h => {
        if (!h || h.exerciseId !== exId || !h.date) return;
        if (!(Array.isArray(h.completedSets) ? h.completedSets.length : h.completed)) return;
        const kg = this.parseKg(h.weight);
        const prev = byDate.get(h.date);
        if (!prev || (kg || 0) > (prev.kg || 0)) byDate.set(h.date, { date: h.date, kg, sets: Array.isArray(h.completedSets) ? h.completedSets.length : (h.sets || 0), reps: h.reps });
      });
      return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
    },
    best(exId) {
      const s = this.series(exId).filter(x => x.kg);
      if (!s.length) return null;
      const top = s.reduce((a, b) => (b.kg > a.kg ? b : a));
      return { value: top.kg, date: top.date };
    },
    // Tüm hareketlerde, önceki en yükseği geçen antrenman sayısı
    prCount() {
      const ids = new Set((Storage.get('asi_workout_history', []) || []).map(h => h && h.exerciseId).filter(Boolean));
      let n = 0;
      ids.forEach(id => {
        let max = null;
        this.series(id).forEach(x => {
          if (!x.kg) return;
          if (max !== null && x.kg > max) n++;
          if (max === null || x.kg > max) max = x.kg;
        });
      });
      return n;
    },
    checkPR(ex, date) {
      const kg = this.parseKg(ex.weight);
      if (!kg) return;
      const prior = this.series(ex.id).filter(x => x.date < date && x.kg);
      if (!prior.length) return;
      const max = Math.max(...prior.map(x => x.kg));
      if (kg > max) showToast(`🏆 Yeni kişisel rekor! ${ex.name}: ${kg} kg (önceki ${max} kg)`, 'success');
    },
    openChart(exId) {
      const ex = (Workout._exercises || []).find(e => e.id === exId);
      if (!ex) return;
      const esc = Dashboard.escapeHtml;
      const s = this.series(exId);
      const withKg = s.filter(x => x.kg);
      const best = this.best(exId);
      const first = withKg[0], last = withKg[withKg.length - 1];
      const diff = first && last ? Math.round((last.kg - first.kg) * 10) / 10 : 0;
      const html = `
        <div class="chart-stats">
          <div><span>Rekor</span><strong>${best ? best.value + ' kg' : '—'}</strong></div>
          <div><span>Antrenman</span><strong>${s.length}</strong></div>
          <div><span>Gelişim</span><strong class="${diff > 0 ? 'up' : diff < 0 ? 'down' : ''}">${withKg.length > 1 ? (diff > 0 ? '+' : '') + diff + ' kg' : '—'}</strong></div>
        </div>
        ${withKg.length ? lineChartSvg(withKg.slice(-20).map(x => ({ x: shortDate(x.date), y: x.kg })), { unit: 'kg', color: '#F97316' }) :
          '<div class="chart-empty">Bu hareket için henüz ağırlık kaydı yok. Seti tamamladıkça burada gelişimini göreceksin. Ağırlığı değiştirmek için ✏️ ile hareketi düzenle.</div>'}
        ${s.length ? `<div class="chart-list-title">Son antrenmanlar</div>
        <ul class="chart-list">
          ${s.slice(-8).reverse().map(x => `<li><span>${shortDate(x.date)}</span><span>${x.sets} set × ${esc(String(x.reps || '-'))}</span><strong>${x.kg ? x.kg + ' kg' : '—'}${best && x.kg === best.value ? ' 🏆' : ''}</strong></li>`).join('')}
        </ul>` : ''}`;
      openSheet(`📈 ${ex.name}`, html);
    }
  };

  // ═══════════════════════════════════════════════════════
  // ⚖️ VKİ / KİLO GEÇMİŞİ
  // ═══════════════════════════════════════════════════════

  const VkiHistory = {
    KEY: 'asi_vki_history',
    list() { const l = Storage.get(this.KEY, []); return Array.isArray(l) ? l : []; },
    record(height, weight) {
      if (!height || !weight) return;
      const date = formatDateShort(new Date());
      const bmi = Math.round(weight / ((height / 100) ** 2) * 10) / 10;
      const l = this.list().filter(x => x.date !== date);
      l.push({ date, weight: Math.round(weight * 10) / 10, height, bmi });
      l.sort((a, b) => a.date.localeCompare(b.date));
      Storage.set(this.KEY, l.slice(-365));
      this.render();
    },
    render() {
      const box = $('#vki-history');
      if (!box) return;
      const l = this.list();
      if (l.length < 2) {
        box.innerHTML = `<div class="vki-hist-empty">📉 Kilonu farklı günlerde güncelledikçe burada kilo grafiğin oluşur.${l.length ? ` İlk kayıt: ${shortDate(l[0].date)} · ${l[0].weight} kg` : ''}</div>`;
        return;
      }
      const first = l[0], last = l[l.length - 1];
      const d = Math.round((last.weight - first.weight) * 10) / 10;
      box.innerHTML = `
        <div class="vki-hist-head"><strong>Kilo geçmişi</strong><span>${shortDate(first.date)}'den beri <b class="${d < 0 ? 'down' : d > 0 ? 'up' : ''}">${d > 0 ? '+' : ''}${d} kg</b></span></div>
        ${lineChartSvg(l.slice(-30).map(x => ({ x: shortDate(x.date), y: x.weight })), { unit: 'kg', color: '#06B6D4', height: 150 })}`;
    }
  };

  // ═══════════════════════════════════════════════════════
  // 📚 OKUMA: kitap bazlı alıntı & notlar
  // ═══════════════════════════════════════════════════════

  const BookQuotes = {
    KEY: 'asi_book_quotes',
    all() { const a = Storage.get(this.KEY, {}); return a && typeof a === 'object' ? a : {}; },
    of(bookId) { return Array.isArray(this.all()[bookId]) ? this.all()[bookId] : []; },
    setFor(bookId, list) { const a = this.all(); a[bookId] = list; Storage.set(this.KEY, a); },

    mount(container, bookId) {
      const wrap = document.createElement('div');
      wrap.className = 'book-quotes';
      container.appendChild(wrap);
      const draw = () => {
        const esc = Dashboard.escapeHtml;
        const list = this.of(bookId).slice().sort((a, b) => (a.page || 0) - (b.page || 0) || a.created - b.created);
        wrap.innerHTML = `
          <div class="bq-head"><h4>💬 Alıntılar & Notlar <small>${list.length}</small></h4></div>
          <form class="bq-form">
            <textarea class="bq-text" rows="2" placeholder="Altını çizdiğin cümle ya da aklına gelen not…" required></textarea>
            <div class="bq-form-row">
              <label class="bq-kind"><input type="checkbox" class="bq-is-note"> Kendi notum</label>
              <input type="number" class="bq-page" min="0" placeholder="Sayfa" aria-label="Sayfa">
              <button type="submit" class="btn btn-primary btn-sm">Ekle</button>
            </div>
          </form>
          ${list.length ? `<ul class="bq-list">${list.map(q => `
            <li class="bq-item ${q.kind === 'note' ? 'is-note' : ''}">
              <div class="bq-body">${q.kind === 'note' ? '' : '<span class="bq-mark">“</span>'}${esc(q.text)}</div>
              <div class="bq-meta">${q.page ? `s. ${q.page} · ` : ''}${new Date(q.created).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                <button type="button" class="bq-copy" data-id="${q.id}" title="Kopyala">📋</button>
                <button type="button" class="bq-del" data-id="${q.id}" title="Sil">🗑️</button></div>
            </li>`).join('')}</ul>` : '<div class="bq-empty">Henüz alıntı yok. Okurken beğendiğin cümleleri buraya kaydet.</div>'}`;
        wrap.querySelector('.bq-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const text = wrap.querySelector('.bq-text').value.trim();
          if (!text) return;
          const page = parseInt(wrap.querySelector('.bq-page').value, 10) || null;
          const kind = wrap.querySelector('.bq-is-note').checked ? 'note' : 'quote';
          this.setFor(bookId, [...this.of(bookId), { id: 'q-' + Date.now().toString(36), text, page, kind, created: Date.now() }]);
          draw();
          showToast(kind === 'note' ? '📝 Not kaydedildi' : '💬 Alıntı kaydedildi', 'success');
        });
        wrap.querySelectorAll('.bq-del').forEach(b => b.addEventListener('click', () => {
          this.setFor(bookId, this.of(bookId).filter(q => q.id !== b.dataset.id));
          draw();
        }));
        wrap.querySelectorAll('.bq-copy').forEach(b => b.addEventListener('click', async () => {
          const q = this.of(bookId).find(x => x.id === b.dataset.id);
          try { await navigator.clipboard.writeText(q.text); showToast('Kopyalandı', 'info'); } catch (_) {}
        }));
      };
      draw();
    }
  };

  // ═══════════════════════════════════════════════════════
  // 📋 GÖREVLER: takvim görünümü
  // ═══════════════════════════════════════════════════════

  const TaskCalendar = {
    VIEW_KEY: 'planova_kanban_view',
    month: null, // Date (ayın 1'i)
    selected: null,

    init() {
      const today = new Date();
      this.month = new Date(today.getFullYear(), today.getMonth(), 1);
      this.selected = formatDateShort(today);
      $$('.kanban-view-btn').forEach(b => b.addEventListener('click', () => this.setView(b.dataset.view)));
      let v = 'board';
      try { v = localStorage.getItem(this.VIEW_KEY) || 'board'; } catch (_) {}
      this.setView(v, true);
    },

    setView(view, silent) {
      const cal = view === 'calendar';
      $$('.kanban-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
      $('#page-kanban .kanban-board')?.classList.toggle('hidden', cal);
      $('#kanban-calendar')?.classList.toggle('hidden', !cal);
      try { localStorage.setItem(this.VIEW_KEY, view); } catch (_) {}
      if (cal) this.render();
    },

    itemsByDate() {
      const map = {};
      const push = (d, item) => { (map[d] = map[d] || []).push(item); };
      (Storage.get('asi_tasks', []) || []).forEach(t => { if (t && t.due) push(t.due, { kind: 'task', t }); });
      (Storage.get('asi_exams', []) || []).forEach(e => { if (e && e.date) push(e.date, { kind: 'exam', e }); });
      return map;
    },

    render() {
      const box = $('#kanban-calendar');
      if (!box || box.classList.contains('hidden')) return;
      const esc = Dashboard.escapeHtml;
      const map = this.itemsByDate();
      const m = this.month;
      const first = new Date(m.getFullYear(), m.getMonth(), 1);
      const startOffset = (first.getDay() + 6) % 7;
      const daysIn = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      const todayStr = formatDateShort(new Date());
      const cells = [];
      for (let i = 0; i < startOffset; i++) cells.push('<div class="cal-cell is-pad"></div>');
      for (let d = 1; d <= daysIn; d++) {
        const ymd = formatDateShort(new Date(m.getFullYear(), m.getMonth(), d));
        const items = map[ymd] || [];
        const open = items.filter(x => x.kind === 'exam' || x.t.status !== 'done');
        const late = items.some(x => x.kind === 'task' && x.t.status !== 'done' && ymd < todayStr);
        cells.push(`
          <button type="button" class="cal-cell ${ymd === todayStr ? 'is-today' : ''} ${ymd === this.selected ? 'is-selected' : ''} ${late ? 'is-late' : ''}" data-date="${ymd}">
            <span class="cal-num">${d}</span>
            <span class="cal-dots">${open.slice(0, 4).map(x => `<i class="${x.kind === 'exam' ? 'is-exam' : (x.t.priority === 'high' ? 'is-high' : '')}"></i>`).join('')}</span>
            ${open.length ? `<span class="cal-label">${esc(open[0].kind === 'exam' ? '🎓 ' + School.examTitle(open[0].e) : open[0].t.title)}</span>` : ''}
          </button>`);
      }
      const sel = map[this.selected] || [];
      box.innerHTML = `
        <div class="cal-head">
          <button type="button" class="wt-nav-btn" data-nav="-1" aria-label="Önceki ay">‹</button>
          <strong>${m.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</strong>
          <button type="button" class="wt-nav-btn" data-nav="1" aria-label="Sonraki ay">›</button>
        </div>
        <div class="cal-grid">
          ${['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => `<div class="cal-dow">${d}</div>`).join('')}
          ${cells.join('')}
        </div>
        <div class="cal-day-panel">
          <div class="cal-day-head">
            <strong>${new Date(this.selected + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}</strong>
            <button type="button" class="btn btn-primary btn-sm" id="cal-add-task">+ Bu güne görev</button>
          </div>
          ${sel.length ? `<ul class="cal-day-list">${sel.map(x => x.kind === 'exam'
            ? `<li class="is-exam">🎓 <span>${esc(School.examTitle(x.e))}</span><em>${esc(x.e.time || '')}</em></li>`
            : `<li class="${x.t.status === 'done' ? 'is-done' : ''}" data-task="${x.t.id}">${x.t.status === 'done' ? '✅' : x.t.priority === 'high' ? '🔴' : '📝'} <span>${esc(x.t.title)}</span>${x.t.repeat && x.t.repeat !== 'none' ? '<em>🔁</em>' : ''}</li>`).join('')}</ul>`
            : '<div class="cal-empty">Bu gün için görev ya da sınav yok.</div>'}
        </div>`;
      box.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => {
        this.month = new Date(m.getFullYear(), m.getMonth() + Number(b.dataset.nav), 1);
        this.render();
      }));
      box.querySelectorAll('.cal-cell[data-date]').forEach(c => c.addEventListener('click', () => { this.selected = c.dataset.date; this.render(); }));
      box.querySelector('#cal-add-task')?.addEventListener('click', () => { Kanban._prefillDue = this.selected; Kanban.openForm(); });
      box.querySelectorAll('li[data-task]').forEach(li => li.addEventListener('click', () => Kanban.openForm(li.dataset.task)));
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🎓 OKUL: ders programı, sınavlar, devamsızlık uyarısı
  // ═══════════════════════════════════════════════════════

  const School = {
    DAY_NAMES: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    EXAM_TYPES: { vize: 'Vize', final: 'Final', quiz: 'Quiz', proje: 'Proje', but: 'Bütünleme', diger: 'Diğer' },

    courses() { return Storage.get('asi_attendance_courses', DEFAULT_ATT_COURSES) || []; },
    absences(courseId) { return (Storage.get('asi_attendance_records', []) || []).filter(r => r.courseId === courseId && r.status === 'absent').length; },
    left(c) { return Math.max(0, (c.maxWeeks || 4) - this.absences(c.id)); },
    exams() { return (Storage.get('asi_exams', []) || []).slice().sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || ''))); },
    examTitle(e) {
      const c = e.courseId ? this.courses().find(x => x.id === e.courseId) : null;
      return `${c ? c.name : (e.title || 'Sınav')} ${this.EXAM_TYPES[e.type] || ''}`.trim();
    },
    startMins(time) { const m = String(time || '').match(/(\d{1,2})[:.](\d{2})/); return m ? Number(m[1]) * 60 + Number(m[2]) : 9999; },

    todayInfo() {
      const dayName = this.DAY_NAMES[new Date().getDay()];
      const courses = this.courses().filter(c => c.day === dayName)
        .sort((a, b) => this.startMins(a.time) - this.startMins(b.time))
        .map(c => ({ ...c, left: this.left(c) }));
      const upcoming = this.exams().map(e => ({ ...e, days: daysFromToday(e.date), title: this.examTitle(e) })).filter(e => e.days >= 0);
      const nextExam = upcoming.length && upcoming[0].days <= 14 ? upcoming[0] : null;
      return { courses, nextExam };
    },

    init() {
      $$('.att-tab').forEach(b => b.addEventListener('click', () => this.setTab(b.dataset.tab)));
      $('#exam-add-btn')?.addEventListener('click', () => this.openExamForm());
      let t = 'absence';
      try { t = localStorage.getItem('planova_att_tab') || 'absence'; } catch (_) {}
      this.setTab(t);
    },

    setTab(tab) {
      ['absence', 'timetable', 'exams'].forEach(id => $(`#att-tab-${id}`)?.classList.toggle('hidden', id !== tab));
      $$('.att-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      try { localStorage.setItem('planova_att_tab', tab); } catch (_) {}
      if (tab === 'timetable') this.renderTimetable();
      if (tab === 'exams') this.renderExams();
    },

    renderTimetable() {
      const box = $('#att-timetable');
      if (!box) return;
      const esc = Dashboard.escapeHtml;
      const courses = this.courses();
      const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
        .filter((d, i) => i < 5 || courses.some(c => c.day === d));
      const todayName = this.DAY_NAMES[new Date().getDay()];
      if (!courses.length) { box.innerHTML = '<div class="cal-empty">Henüz ders yok. Devamsızlık sekmesinden ders ekleyebilirsin.</div>'; return; }
      box.innerHTML = days.map(d => {
        const list = courses.filter(c => c.day === d).sort((a, b) => this.startMins(a.time) - this.startMins(b.time));
        return `
          <div class="tt-day ${d === todayName ? 'is-today' : ''}">
            <div class="tt-day-name">${d}${d === todayName ? ' <span class="badge-today">Bugün</span>' : ''}</div>
            ${list.length ? list.map(c => {
              const left = this.left(c);
              const cls = left === 0 ? 'is-over' : left === 1 ? 'is-warn' : '';
              return `<div class="tt-course ${cls}">
                <div class="tt-time">${esc(c.time || '')}</div>
                <div class="tt-name">${esc(c.name)}</div>
                <div class="tt-meta">${esc(c.code || '')}<span class="tt-left">${left === 0 ? '⛔ Hak bitti' : left === 1 ? '⚠️ 1 hak kaldı' : `${left} hak`}</span></div>
              </div>`;
            }).join('') : '<div class="tt-free">Ders yok</div>'}
          </div>`;
      }).join('');
    },

    renderExams() {
      const box = $('#att-exams-list');
      if (!box) return;
      const esc = Dashboard.escapeHtml;
      const all = this.exams().map(e => ({ ...e, days: daysFromToday(e.date) }));
      const up = all.filter(e => e.days >= 0), past = all.filter(e => e.days < 0).reverse();
      const row = (e) => `
        <li class="exam-item ${e.days < 0 ? 'is-past' : e.days <= 3 ? 'is-soon' : ''}">
          <div class="exam-count">${e.days < 0 ? '✓' : e.days === 0 ? 'Bugün' : e.days === 1 ? 'Yarın' : `<strong>${e.days}</strong><small>gün</small>`}</div>
          <div class="exam-info">
            <strong>${esc(this.examTitle(e))}</strong>
            <span>${new Date(e.date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'short' })}${e.time ? ' · ' + esc(e.time) : ''}${e.place ? ' · ' + esc(e.place) : ''}</span>
            ${e.note ? `<em>${esc(e.note)}</em>` : ''}
          </div>
          <div class="exam-actions">
            <button type="button" class="workout-action-btn" data-edit="${e.id}" title="Düzenle">✏️</button>
            <button type="button" class="workout-action-btn" data-del="${e.id}" title="Sil">🗑️</button>
          </div>
        </li>`;
      box.innerHTML = `
        ${up.length ? `<ul class="exam-list">${up.map(row).join('')}</ul>` : '<div class="cal-empty">Yaklaşan sınav yok. “+ Sınav Ekle” ile vize ve finallerini gir; geri sayım ve hatırlatıcı gelsin.</div>'}
        ${past.length ? `<details class="exam-past"><summary>Geçmiş sınavlar (${past.length})</summary><ul class="exam-list">${past.map(row).join('')}</ul></details>` : ''}`;
      box.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => this.openExamForm(b.dataset.edit)));
      box.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
        Storage.set('asi_exams', (Storage.get('asi_exams', []) || []).filter(x => x.id !== b.dataset.del));
        this.renderExams();
        TodayPanel.render();
      }));
    },

    openExamForm(id) {
      const e = id ? (Storage.get('asi_exams', []) || []).find(x => x.id === id) : null;
      const esc = Dashboard.escapeHtml;
      const html = `
        <form id="exam-form" class="modal-form">
          <div class="form-group"><label>Ders</label>
            <select id="exam-course">
              <option value="">— Listede yok (başlık yaz) —</option>
              ${this.courses().map(c => `<option value="${c.id}" ${e && e.courseId === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
            </select></div>
          <div class="form-group" id="exam-title-group"><label>Başlık</label><input type="text" id="exam-title" placeholder="Örn: İngilizce Yeterlilik" value="${esc(e?.title || '')}"></div>
          <div class="form-row">
            <div class="form-group"><label>Tür</label><select id="exam-type">${Object.entries(this.EXAM_TYPES).map(([k, v]) => `<option value="${k}" ${e?.type === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
            <div class="form-group"><label>Tarih</label><input type="date" id="exam-date" required value="${e?.date || ''}"></div>
            <div class="form-group"><label>Saat</label><input type="time" id="exam-time" value="${e?.time || ''}"></div>
          </div>
          <div class="form-group"><label>Yer (isteğe bağlı)</label><input type="text" id="exam-place" placeholder="Örn: B-204" value="${esc(e?.place || '')}"></div>
          <div class="form-group"><label>Not (isteğe bağlı)</label><input type="text" id="exam-note" placeholder="Konular, hatırlatma…" value="${esc(e?.note || '')}"></div>
          <div class="modal-actions"><button type="button" class="btn btn-ghost" data-modal="gen-modal">İptal</button><button type="submit" class="btn btn-primary">Kaydet</button></div>
        </form>`;
      const body = openSheet(e ? '📝 Sınavı Düzenle' : '📝 Sınav Ekle', html);
      if (!body) return;
      const sync = () => body.querySelector('#exam-title-group').classList.toggle('hidden', !!body.querySelector('#exam-course').value);
      body.querySelector('#exam-course').addEventListener('change', sync); sync();
      body.querySelector('#exam-form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const courseId = body.querySelector('#exam-course').value;
        const title = body.querySelector('#exam-title').value.trim();
        const date = body.querySelector('#exam-date').value;
        if (!date) return;
        if (!courseId && !title) { showToast('Bir ders seç ya da başlık yaz.', 'warning'); return; }
        const item = {
          id: e?.id || 'ex-' + Date.now().toString(36),
          courseId, title: courseId ? '' : title,
          type: body.querySelector('#exam-type').value,
          date, time: body.querySelector('#exam-time').value,
          place: body.querySelector('#exam-place').value.trim(),
          note: body.querySelector('#exam-note').value.trim()
        };
        const list = (Storage.get('asi_exams', []) || []).filter(x => x.id !== item.id);
        list.push(item);
        Storage.set('asi_exams', list);
        closeSheet();
        this.setTab('exams');
        TodayPanel.render();
        showToast('📝 Sınav kaydedildi', 'success');
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // 🕌 İBADET ARAÇLARI: kaza, Kur'an, zikirmatik, imsakiye
  // ═══════════════════════════════════════════════════════

  const Ibadet = {
    init() {
      $$('.ibadet-tab').forEach(b => b.addEventListener('click', () => this.setTab(b.dataset.tab)));
      let t = 'kaza';
      try { t = localStorage.getItem('planova_ibadet_tab') || 'kaza'; } catch (_) {}
      this.setTab(t);
    },
    setTab(tab) {
      ['kaza', 'quran', 'zikir', 'imsakiye'].forEach(id => $(`#ibadet-${id}`)?.classList.toggle('hidden', id !== tab));
      $$('.ibadet-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      try { localStorage.setItem('planova_ibadet_tab', tab); } catch (_) {}
      ({ kaza: Kaza, quran: Quran, zikir: Zikir, imsakiye: Imsakiye })[tab]?.render();
    }
  };

  const Kaza = {
    KEY: 'asi_kaza',
    ITEMS: [['fajr', 'Sabah'], ['dhuhr', 'Öğle'], ['asr', 'İkindi'], ['maghrib', 'Akşam'], ['isha', 'Yatsı'], ['witr', 'Vitir']],
    get() {
      const k = Storage.get(this.KEY, null) || {};
      return { debt: k.debt || {}, done: k.done || {}, log: k.log || {} };
    },
    set(k) { Storage.set(this.KEY, k); },
    render() {
      const box = $('#ibadet-kaza');
      if (!box) return;
      const k = this.get();
      const today = formatDateShort(new Date());
      const totalDebt = this.ITEMS.reduce((t, [id]) => t + (Number(k.debt[id]) || 0), 0);
      const totalDone = this.ITEMS.reduce((t, [id]) => t + (Number(k.done[id]) || 0), 0);
      box.innerHTML = `
        <div class="ib-summary">
          <div><span>Kalan borç</span><strong>${totalDebt}</strong></div>
          <div><span>Kılınan kaza</span><strong>${totalDone}</strong></div>
          <div><span>Bugün</span><strong>${Number(k.log[today]) || 0}</strong></div>
        </div>
        <ul class="kaza-list">
          ${this.ITEMS.map(([id, name]) => `
            <li class="kaza-row" data-id="${id}">
              <span class="kaza-name">${name}</span>
              <div class="kaza-debt">
                <button type="button" class="kaza-step" data-d="-1" aria-label="Azalt">−</button>
                <input type="number" min="0" class="kaza-input" value="${Number(k.debt[id]) || 0}" aria-label="${name} kaza borcu">
                <button type="button" class="kaza-step" data-d="1" aria-label="Artır">+</button>
              </div>
              <button type="button" class="kaza-done-btn" ${Number(k.debt[id]) > 0 ? '' : 'disabled'}>✓ Kıldım</button>
            </li>`).join('')}
        </ul>
        <div class="kaza-years">
          <span>Borcu yıl olarak ekle:</span>
          <input type="number" min="1" max="60" id="kaza-years-input" placeholder="Yıl" aria-label="Yıl">
          <button type="button" class="btn btn-secondary btn-sm" id="kaza-years-add">Her vakte ekle</button>
        </div>
        <p class="ib-note">Kaza namazı borcu sende tutulur; “✓ Kıldım” borcu 1 azaltır ve bugünün sayısına ekler.</p>`;
      const save = (mut) => { const kk = this.get(); mut(kk); this.set(kk); this.render(); };
      box.querySelectorAll('.kaza-row').forEach(row => {
        const id = row.dataset.id;
        row.querySelectorAll('.kaza-step').forEach(b => b.addEventListener('click', () => save(kk => { kk.debt[id] = Math.max(0, (Number(kk.debt[id]) || 0) + Number(b.dataset.d)); })));
        row.querySelector('.kaza-input').addEventListener('change', (e) => save(kk => { kk.debt[id] = Math.max(0, parseInt(e.target.value, 10) || 0); }));
        row.querySelector('.kaza-done-btn').addEventListener('click', () => {
          save(kk => {
            if ((Number(kk.debt[id]) || 0) <= 0) return;
            kk.debt[id] = Number(kk.debt[id]) - 1;
            kk.done[id] = (Number(kk.done[id]) || 0) + 1;
            kk.log[today] = (Number(kk.log[today]) || 0) + 1;
          });
          if (navigator.vibrate) { try { navigator.vibrate(30); } catch (_) {} }
          showToast('🤲 Allah kabul etsin', 'success');
        });
      });
      box.querySelector('#kaza-years-add').addEventListener('click', () => {
        const y = parseInt(box.querySelector('#kaza-years-input').value, 10);
        if (!y || y < 1) return;
        confirmAction(`${y} yıllık borç (her vakit için ${y * 365}) eklensin mi?`, () => {
          save(kk => this.ITEMS.forEach(([id]) => { kk.debt[id] = (Number(kk.debt[id]) || 0) + y * 365; }));
        });
      });
    }
  };

  const Quran = {
    KEY: 'asi_quran',
    PAGES: 604,
    get() {
      const q = Storage.get(this.KEY, null) || {};
      return { page: Number(q.page) || 0, hatims: Number(q.hatims) || 0, daily: Number(q.daily) || 5, log: q.log || {} };
    },
    juzOf(page) { return page <= 0 ? 1 : page <= 21 ? 1 : Math.min(30, Math.floor((page - 22) / 20) + 2); },
    add(n) {
      const q = this.get();
      const today = formatDateShort(new Date());
      let page = q.page + n;
      let hatim = false;
      if (page >= this.PAGES) { page = 0; q.hatims += 1; hatim = true; }
      page = Math.max(0, page);
      const delta = hatim ? this.PAGES - q.page : page - q.page;
      q.log[today] = Math.max(0, (Number(q.log[today]) || 0) + delta);
      q.page = page;
      Storage.set(this.KEY, q);
      if (hatim) showToast(`🌟 Tebrikler! ${q.hatims}. hatmini tamamladın. Allah kabul etsin!`, 'success');
      this.render();
    },
    render() {
      const box = $('#ibadet-quran');
      if (!box) return;
      const q = this.get();
      const today = formatDateShort(new Date());
      const todayPages = Number(q.log[today]) || 0;
      const pct = Math.round(q.page / this.PAGES * 100);
      // son 14 günün ortalaması (yoksa günlük hedef) ile tahmini bitiş
      let sum = 0, active = 0;
      for (let i = 0; i < 14; i++) { const d = new Date(); d.setDate(d.getDate() - i); const n = Number(q.log[formatDateShort(d)]) || 0; sum += n; if (n > 0) active++; }
      // Yeterli geçmiş yoksa (3 günden az) günlük hedefe göre tahmin et
      const pace = active >= 3 ? Math.max(sum / 14, 0.5) : q.daily;
      const daysLeft = Math.ceil((this.PAGES - q.page) / Math.max(0.5, pace));
      const finish = new Date(); finish.setDate(finish.getDate() + daysLeft);
      box.innerHTML = `
        <div class="quran-top">
          <div class="quran-ring" style="--p:${pct}">
            <div><strong>${pct}%</strong><small>${q.hatims ? q.hatims + '. hatim sonrası' : 'hatim'}</small></div>
          </div>
          <div class="quran-info">
            <div class="quran-page">Sayfa <strong>${q.page}</strong> / ${this.PAGES}</div>
            <div class="quran-juz">${this.juzOf(q.page)}. cüz · ${q.hatims} hatim</div>
            <div class="quran-today ${todayPages >= q.daily ? 'is-ok' : ''}">Bugün ${todayPages} / ${q.daily} sayfa ${todayPages >= q.daily ? '✓' : ''}</div>
            <div class="quran-eta">${q.page === 0 && !Object.keys(q.log).length ? 'Kaldığın sayfayı gir ya da +1 ile başla' : `Bu hızla hatim: <strong>${finish.toLocaleDateString('tr-TR', finish.getFullYear() === new Date().getFullYear() ? { day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' })}</strong> (~${daysLeft} gün)`}</div>
          </div>
        </div>
        <div class="quran-btns">
          <button type="button" class="btn btn-primary" data-add="1">+1 sayfa</button>
          <button type="button" class="btn btn-secondary" data-add="5">+5</button>
          <button type="button" class="btn btn-secondary" data-add="20">+1 cüz</button>
          <button type="button" class="btn btn-ghost" data-add="-1" title="Geri al">−1</button>
        </div>
        <div class="quran-set">
          <label>Kaldığım sayfa <input type="number" min="0" max="${this.PAGES}" id="quran-page-input" value="${q.page}"></label>
          <label>Günlük hedef <select id="quran-daily">${[1, 2, 3, 5, 10, 20].map(n => `<option value="${n}" ${q.daily === n ? 'selected' : ''}>${n} sayfa</option>`).join('')}</select></label>
        </div>`;
      box.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => this.add(Number(b.dataset.add))));
      box.querySelector('#quran-page-input').addEventListener('change', (e) => {
        const v = Math.max(0, Math.min(this.PAGES, parseInt(e.target.value, 10) || 0));
        const qq = this.get(); qq.page = v; Storage.set(this.KEY, qq); this.render();
      });
      box.querySelector('#quran-daily').addEventListener('change', (e) => {
        const qq = this.get(); qq.daily = Number(e.target.value); Storage.set(this.KEY, qq); this.render();
      });
    }
  };

  const Zikir = {
    KEY: 'asi_zikir',
    DEFAULTS: [
      { id: 'subhanallah', name: 'Sübhânallah', target: 33 },
      { id: 'elhamdulillah', name: 'Elhamdülillah', target: 33 },
      { id: 'allahuekber', name: 'Allâhu Ekber', target: 34 },
      { id: 'estagfirullah', name: 'Estağfirullah', target: 100 },
      { id: 'salavat', name: 'Salavât', target: 100 },
      { id: 'kelimetevhid', name: 'Lâ ilâhe illallah', target: 100 }
    ],
    get() {
      const z = Storage.get(this.KEY, null) || {};
      return { items: Array.isArray(z.items) && z.items.length ? z.items : this.DEFAULTS, counts: z.counts || {}, active: z.active || 'subhanallah', lifetime: Number(z.lifetime) || 0, day: z.day || {} };
    },
    save(z) { Storage.set(this.KEY, z); },
    tap() {
      const z = this.get();
      const it = z.items.find(i => i.id === z.active) || z.items[0];
      const today = formatDateShort(new Date());
      z.counts[it.id] = (Number(z.counts[it.id]) || 0) + 1;
      z.lifetime += 1;
      z.day = { [today]: (Number(z.day[today]) || 0) + 1 };
      this.save(z);
      const c = z.counts[it.id];
      if (it.target && c % it.target === 0) {
        if (navigator.vibrate) { try { navigator.vibrate([120, 60, 120]); } catch (_) {} }
        showToast(`📿 ${it.name}: ${c / it.target}. tur tamam`, 'success');
      } else if (navigator.vibrate) { try { navigator.vibrate(15); } catch (_) {} }
      this.paint();
    },
    paint() {
      const z = this.get();
      const it = z.items.find(i => i.id === z.active) || z.items[0];
      const c = Number(z.counts[it.id]) || 0;
      const inRound = it.target ? (c % it.target) : c;
      const rounds = it.target ? Math.floor(c / it.target) : 0;
      const pct = it.target ? (inRound / it.target) * 100 : 0;
      const btn = $('#zikir-btn');
      if (btn) btn.style.setProperty('--p', pct);
      if ($('#zikir-count')) $('#zikir-count').textContent = inRound;
      if ($('#zikir-sub')) $('#zikir-sub').textContent = it.target ? `/ ${it.target} · ${rounds} tur` : `${c}`;
      const today = formatDateShort(new Date());
      if ($('#zikir-today')) $('#zikir-today').textContent = `Bugün ${Number(z.day[today]) || 0} · Toplam ${z.lifetime}`;
    },
    render() {
      const box = $('#ibadet-zikir');
      if (!box) return;
      const z = this.get();
      const esc = Dashboard.escapeHtml;
      box.innerHTML = `
        <div class="zikir-chips">
          ${z.items.map(i => `<button type="button" class="zikir-chip ${i.id === z.active ? 'active' : ''}" data-id="${i.id}">${esc(i.name)}<small>${i.target || '∞'}</small></button>`).join('')}
          <button type="button" class="zikir-chip is-add" id="zikir-add">+ Ekle</button>
        </div>
        <button type="button" id="zikir-btn" class="zikir-btn" aria-label="Zikir çek">
          <span id="zikir-count" class="zikir-count">0</span>
          <span id="zikir-sub" class="zikir-sub"></span>
        </button>
        <div id="zikir-today" class="zikir-today"></div>
        <div class="zikir-actions">
          <button type="button" class="btn btn-ghost btn-sm" id="zikir-reset">↺ Bu zikri sıfırla</button>
          ${z.items.find(i => i.id === z.active)?.custom ? '<button type="button" class="btn btn-ghost btn-sm" id="zikir-del">🗑️ Zikri sil</button>' : ''}
        </div>
        <p class="ib-note">Ekrana dokundukça sayar, hedefte titreşir. Bilgisayarda boşluk tuşuyla da çekebilirsin.</p>`;
      box.querySelectorAll('.zikir-chip[data-id]').forEach(b => b.addEventListener('click', () => { const zz = this.get(); zz.active = b.dataset.id; this.save(zz); this.render(); }));
      box.querySelector('#zikir-btn').addEventListener('click', () => this.tap());
      box.querySelector('#zikir-reset').addEventListener('click', () => { const zz = this.get(); zz.counts[zz.active] = 0; this.save(zz); this.paint(); });
      box.querySelector('#zikir-del')?.addEventListener('click', () => {
        const zz = this.get(); zz.items = zz.items.filter(i => i.id !== zz.active); zz.active = zz.items[0]?.id; this.save(zz); this.render();
      });
      box.querySelector('#zikir-add').addEventListener('click', () => {
        const body = openSheet('📿 Yeni Zikir', `
          <form id="zikir-form" class="modal-form">
            <div class="form-group"><label>Zikir</label><input type="text" id="zk-name" required placeholder="Örn: Hasbünallah"></div>
            <div class="form-group"><label>Hedef (bir tur)</label><input type="number" id="zk-target" min="1" value="33"></div>
            <div class="modal-actions"><button type="button" class="btn btn-ghost" data-modal="gen-modal">İptal</button><button type="submit" class="btn btn-primary">Ekle</button></div>
          </form>`);
        body.querySelector('#zikir-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const name = body.querySelector('#zk-name').value.trim();
          if (!name) return;
          const zz = this.get();
          const id = 'z-' + Date.now().toString(36);
          zz.items = [...zz.items, { id, name, target: parseInt(body.querySelector('#zk-target').value, 10) || 0, custom: true }];
          zz.active = id;
          this.save(zz);
          closeSheet();
          this.render();
        });
      });
      this.paint();
    },
    initKeys() {
      document.addEventListener('keydown', (e) => {
        if (e.code !== 'Space' || e.repeat) return;
        const box = $('#ibadet-zikir');
        if (!box || box.classList.contains('hidden') || !$('#page-prayer')?.classList.contains('active')) return;
        if (/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement?.tagName || '') && document.activeElement.id !== 'zikir-btn') return;
        e.preventDefault();
        this.tap();
      });
    }
  };

  const Imsakiye = {
    cacheKey(city, hy) { return `planova_imsakiye_${city}_${hy}`; },
    hijriYear() {
      const h = PrayerManager.dateData?.hijri;
      let y = Number(h?.year) || 1448;
      const m = Number(h?.month?.number) || 0;
      if (m > 9) y += 1; // Ramazan geçtiyse gelecek yılınki
      return y;
    },
    load(force) {
      const city = PrayerManager.city || 'Istanbul';
      const hy = this.hijriYear();
      const key = this.cacheKey(city, hy);
      if (!force) {
        try { const c = JSON.parse(localStorage.getItem(key) || 'null'); if (c && c.length) return Promise.resolve(c); } catch (_) {}
      }
      const url = `https://api.aladhan.com/v1/hijriCalendarByCity/${hy}/9?city=${encodeURIComponent(city)}&country=Turkey&method=13`;
      return fetch(url).then(r => r.json()).then(j => {
        if (j.code !== 200 || !Array.isArray(j.data)) throw new Error('veri yok');
        const days = j.data.map(d => {
          const [dd, mm, yy] = d.date.gregorian.date.split('-');
          const t = (k) => PrayerManager.cleanTime(d.timings[k]);
          return { ymd: `${yy}-${mm}-${dd}`, day: Number(d.date.hijri.day), imsak: t('Fajr'), gunes: t('Sunrise'), ogle: t('Dhuhr'), ikindi: t('Asr'), iftar: t('Maghrib'), yatsi: t('Isha') };
        });
        try { localStorage.setItem(key, JSON.stringify(days)); } catch (_) {}
        return days;
      });
    },
    todayEntry() {
      try {
        const days = JSON.parse(localStorage.getItem(this.cacheKey(PrayerManager.city || 'Istanbul', this.hijriYear())) || 'null');
        const today = formatDateShort(new Date());
        return days ? days.find(d => d.ymd === today) : null;
      } catch (_) { return null; }
    },
    render() {
      const box = $('#ibadet-imsakiye');
      if (!box) return;
      box.innerHTML = '<div class="cal-empty">İmsakiye yükleniyor…</div>';
      this.load(false).then(days => {
        const today = formatDateShort(new Date());
        const first = days[0], last = days[days.length - 1];
        const until = daysFromToday(first.ymd);
        const inRamadan = today >= first.ymd && today <= last.ymd;
        const cityName = PrayerManager.cityNames?.[PrayerManager.city] || PrayerManager.city;
        box.innerHTML = `
          <div class="ims-head">
            <div>
              <strong>🌙 Ramazan ${this.hijriYear()} İmsakiyesi · ${cityName}</strong>
              <span>${inRamadan ? `Ramazan'ın ${days.find(d => d.ymd === today)?.day}. günü` : until > 0 ? `Ramazan'a <b>${until}</b> gün kaldı (${shortDate(first.ymd)})` : 'Ramazan sona erdi'}</span>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" id="ims-refresh">↺</button>
          </div>
          <div class="ims-table-wrap">
            <table class="ims-table">
              <thead><tr><th>Gün</th><th>Tarih</th><th>İmsak</th><th>Güneş</th><th>Öğle</th><th>İkindi</th><th>İftar</th><th>Yatsı</th></tr></thead>
              <tbody>${days.map(d => `<tr class="${d.ymd === today ? 'is-today' : d.ymd < today ? 'is-past' : ''}"><td>${d.day}</td><td>${shortDate(d.ymd)}</td><td><b>${d.imsak}</b></td><td>${d.gunes}</td><td>${d.ogle}</td><td>${d.ikindi}</td><td><b>${d.iftar}</b></td><td>${d.yatsi}</td></tr>`).join('')}</tbody>
            </table>
          </div>
          <p class="ib-note">Vakitler Diyanet hesaplama yöntemiyle alınır; şehri üstteki seçimden değiştirebilirsin.</p>`;
        box.querySelector('#ims-refresh').addEventListener('click', () => { this.load(true).then(() => this.render()).catch(() => showToast('İmsakiye alınamadı', 'error')); });
        if (inRamadan) box.querySelector('tr.is-today')?.scrollIntoView({ block: 'nearest' });
      }).catch(() => {
        box.innerHTML = '<div class="cal-empty">İmsakiye alınamadı. İnternet bağlantını kontrol edip tekrar dene.<br><button type="button" class="btn btn-secondary btn-sm" id="ims-retry" style="margin-top:.6rem">Tekrar dene</button></div>';
        box.querySelector('#ims-retry')?.addEventListener('click', () => this.render());
      });
    }
  };

  // ═══════════════════════════════════════════════════════
  // BAŞLATMA
  // ═══════════════════════════════════════════════════════

  // Genel API (dashboard butonları ve harici entegrasyon için)
  window.Planova = window.ASI = {
    navigateTo(page) { Nav.goTo(page); },
    pomodoro: Pomodoro,
    workout: Workout,
    books: Books,
    theme: Theme,
    modules: ModuleManager,
    prayer: PrayerManager,
    streak: StreakManager,
    profileAvatar: ProfileAvatar,
    vki: VkiManager,
    bookFocus: BookFocusManager,
    today: TodayPanel,
    week: WeekSummary,
    reminders: Reminders,
    workoutPlan: WorkoutPlan,
    workoutStats: WorkoutStats,
    school: School,
    ibadet: Ibadet,
    calendar: TaskCalendar,
    pwa: PwaInstall,
    openModal,
    closeModal,
  };

  // Motivasyon yenile butonu
  $('#new-quote-btn')?.addEventListener('click', () => Dashboard.showQuote());

  // Başlat
  async function boot() {
    Theme.init();
    Splash.init();
    ModuleManager.init();
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
    PrayerManager.init();
    StreakManager.init();
    ProfileAvatar.init();
    VkiManager.init();
    BookFocusManager.init();
    Reminders.init();
    PwaInstall.init();
    TaskCalendar.init();
    School.init();
    Ibadet.init();
    Zikir.initKeys();
    VkiHistory.render();
    $('#workout-plan-btn')?.addEventListener('click', () => WorkoutPlan.open());

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

    // Ana ekran kısayolu / bildirimden gelen sayfa: ?page=prayer
    try {
      const page = new URLSearchParams(location.search).get('page');
      if (page && ModuleManager.isModuleVisible(page) && document.getElementById(`page-${page}`)) Nav.goTo(page);
    } catch (_) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot());
  } else {
    boot();
  }
})();
