export interface DayTask {
  id: string;
  time: string;
  activity: string;
  activityId: string;
  module: string;
  moduleLabel: string;
  type: 'learn' | 'practice' | 'review' | 'mock';
  aiTrigger?: boolean;
  aiTriggerLabel?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface DayPlan {
  day: number;
  title: string;
  titleId: string;
  theme: string;
  icon: string;
  color: string;
  estimatedTime: string;
  tasks: DayTask[];
}

export const STUDY_PLAN: DayPlan[] = [
  {
    day: 1,
    title: 'Foundation Building',
    titleId: 'Membangun Fondasi',
    theme: 'Vocabulary & Task 2 Structure',
    icon: '🏗️',
    color: '#3b82f6',
    estimatedTime: '3-4 hours',
    tasks: [
      {
        id: 'd1_t1',
        time: '45 min',
        activity: 'Learn 20 High-Frequency Academic Words',
        activityId: 'Pelajari 20 Kata Akademik',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'learn',
        aiTrigger: true,
        aiTriggerLabel: 'Generate Daily Vocab'
      },
      {
        id: 'd1_t2',
        time: '45 min',
        activity: 'Master 8 Core Linking Words (Addition, Contrast)',
        activityId: 'Kuasai 8 Kata Penghubung Inti',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      },
      {
        id: 'd1_t3',
        time: '30 min',
        activity: 'Study Writing Task 2 Structure Formula (Opinion Essay)',
        activityId: 'Pelajari Formula Struktur Task 2',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      },
      {
        id: 'd1_t4',
        time: '60 min',
        activity: 'Write 1 Opinion Essay using learned structures',
        activityId: 'Tulis 1 Esai Opini menggunakan struktur',
        module: '/practice/general/task2',
        moduleLabel: 'Task 2 Practice',
        type: 'practice'
      },
      {
        id: 'd1_t5',
        time: '30 min',
        activity: 'AI Evaluation + Review feedback',
        activityId: 'Evaluasi AI + Tinjau umpan balik',
        module: '/evaluate',
        moduleLabel: 'Evaluator',
        type: 'review'
      }
    ]
  },
  {
    day: 2,
    title: 'Reading Strategy',
    titleId: 'Strategi Membaca',
    theme: 'TFNG & Skimming Skills',
    icon: '📖',
    color: '#10b981',
    estimatedTime: '2.5-3 hours',
    tasks: [
      {
        id: 'd2_t1',
        time: '30 min',
        activity: 'Review yesterday\'s vocab + flashcards',
        activityId: 'Tinjau kosakata kemarin + flashcards',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'review'
      },
      {
        id: 'd2_t2',
        time: '60 min',
        activity: 'Reading: True/False/Not Given strategy + 1 Easy passage',
        activityId: 'Strategi TFNG + 1 Teks Mudah',
        module: '/reading',
        moduleLabel: 'Reading Practice',
        type: 'practice'
      },
      {
        id: 'd2_t3',
        time: '30 min',
        activity: 'Review reading answers + identify paraphrasing patterns',
        activityId: 'Tinjau jawaban reading + kenali pola parafrasa',
        module: '/reading',
        moduleLabel: 'Reading Practice',
        type: 'review'
      },
      {
        id: 'd2_t4',
        time: '30 min',
        activity: 'Learn 5 new Sentence Formulas',
        activityId: 'Pelajari 5 Formula Kalimat baru',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      }
    ]
  },
  {
    day: 3,
    title: 'Writing Task 1',
    titleId: 'Tugas Menulis 1',
    theme: 'Formal Letters & Connectors',
    icon: '✉️',
    color: '#f59e0b',
    estimatedTime: '3-4 hours',
    tasks: [
      {
        id: 'd3_t1',
        time: '30 min',
        activity: 'Vocab drill: Topic "Education & Technology"',
        activityId: 'Latihan kosakata: Topik Pendidikan & Teknologi',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'practice'
      },
      {
        id: 'd3_t2',
        time: '30 min',
        activity: 'Learn 6 Advanced Connectors (Concession, Emphasis)',
        activityId: 'Pelajari 6 Penghubung Lanjutan',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      },
      {
        id: 'd3_t3',
        time: '45 min',
        activity: 'Study Task 1 Formal Letter structure + phrases',
        activityId: 'Pelajari struktur + frasa Surat Formal',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      },
      {
        id: 'd3_t4',
        time: '60 min',
        activity: 'Write 1 Formal Letter',
        activityId: 'Tulis 1 Surat Formal',
        module: '/practice/general/task1',
        moduleLabel: 'Task 1 Practice',
        type: 'practice'
      },
      {
        id: 'd3_t5',
        time: '30 min',
        activity: 'AI Evaluation + apply corrections',
        activityId: 'Evaluasi AI + terapkan koreksi',
        module: '/evaluate',
        moduleLabel: 'Evaluator',
        type: 'review'
      }
    ]
  },
  {
    day: 4,
    title: 'Deep Reading',
    titleId: 'Membaca Mendalam',
    theme: 'Matching Headings & Medium Passages',
    icon: '🔍',
    color: '#8b5cf6',
    estimatedTime: '2.5-3 hours',
    tasks: [
      {
        id: 'd4_t1',
        time: '30 min',
        activity: 'Flashcard review: All vocab from Day 1-3',
        activityId: 'Tinjau Flashcard: Semua kosakata Hari 1-3',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'review'
      },
      {
        id: 'd4_t2',
        time: '60 min',
        activity: 'Reading: Matching Headings strategy + 1 Medium passage',
        activityId: 'Strategi Mencocokkan Judul + 1 Teks Sedang',
        module: '/reading',
        moduleLabel: 'Reading Practice',
        type: 'practice',
        aiTrigger: true,
        aiTriggerLabel: 'Generate Medium Passage'
      },
      {
        id: 'd4_t3',
        time: '45 min',
        activity: 'Analyze errors + compile keyword lists',
        activityId: 'Analisis kesalahan + buat daftar kata kunci',
        module: '/reading',
        moduleLabel: 'Reading Practice',
        type: 'review'
      }
    ]
  },
  {
    day: 5,
    title: 'Writing Task 2 Deep Dive',
    titleId: 'Pendalaman Task 2',
    theme: 'Causes/Solutions & Paraphrasing',
    icon: '📝',
    color: '#ef4444',
    estimatedTime: '3.5 hours',
    tasks: [
      {
        id: 'd5_t1',
        time: '30 min',
        activity: 'Vocab: Topic "Health & Environment"',
        activityId: 'Kosakata: Topik Kesehatan & Lingkungan',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'learn'
      },
      {
        id: 'd5_t2',
        time: '30 min',
        activity: 'Paraphrasing drill: Review synonyms in Phrase Bank',
        activityId: 'Latihan parafrasa: Tinjau sinonim di Phrase Bank',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'practice'
      },
      {
        id: 'd5_t3',
        time: '30 min',
        activity: 'Study Causes/Solutions Essay structure',
        activityId: 'Pelajari struktur Esai Penyebab/Solusi',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'learn'
      },
      {
        id: 'd5_t4',
        time: '60 min',
        activity: 'Write 1 Causes/Solutions Essay',
        activityId: 'Tulis 1 Esai Penyebab/Solusi',
        module: '/practice/general/task2',
        moduleLabel: 'Task 2 Practice',
        type: 'practice'
      },
      {
        id: 'd5_t5',
        time: '30 min',
        activity: 'AI Evaluation + focus on Coherence scores',
        activityId: 'Evaluasi AI + fokus pada skor Koherensi',
        module: '/evaluate',
        moduleLabel: 'Evaluator',
        type: 'review'
      }
    ]
  },
  {
    day: 6,
    title: 'Reading Speed',
    titleId: 'Kecepatan Membaca',
    theme: 'Hard Passages & Mixed Questions',
    icon: '⚡',
    color: '#06b6d4',
    estimatedTime: '2.5 hours',
    tasks: [
      {
        id: 'd6_t1',
        time: '30 min',
        activity: 'Vocab review: All week\'s words + 10 new (Society/Crime)',
        activityId: 'Tinjau kosakata minggu ini + 10 baru',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'review'
      },
      {
        id: 'd6_t2',
        time: '60 min',
        activity: 'Reading: Multiple Choice + Short Answer (1 hard passage)',
        activityId: 'Pilihan Ganda + Jawaban Singkat (1 Teks Sulit)',
        module: '/reading',
        moduleLabel: 'Reading Practice',
        type: 'practice'
      },
      {
        id: 'd6_t3',
        time: '30 min',
        activity: 'Compile personal "error journal" from evaluations',
        activityId: 'Susun jurnal kesalahan pribadi dari evaluasi',
        module: '/evaluate',
        moduleLabel: 'Evaluator',
        type: 'review'
      }
    ]
  },
  {
    day: 7,
    title: 'Mid-Plan Mock',
    titleId: 'Simulasi Tengah Program',
    theme: 'Full Writing Mock & Review',
    icon: '🏁',
    color: '#6366f1',
    estimatedTime: '3.5-4 hours',
    tasks: [
      {
        id: 'd7_t1',
        time: '45 min',
        activity: 'Vocabulary consolidation: Test all learned words',
        activityId: 'Konsolidasi kosakata: Uji semua kata',
        module: '/vocabulary',
        moduleLabel: 'Vocabulary Builder',
        type: 'mock'
      },
      {
        id: 'd7_t2',
        time: '30 min',
        activity: 'Re-read all linking words & formulas',
        activityId: 'Baca ulang semua kata penghubung & formula',
        module: '/toolkit',
        moduleLabel: 'Language Toolkit',
        type: 'review'
      },
      {
        id: 'd7_t3',
        time: '60 min',
        activity: 'Full Writing Mock: Task 1 (20m) + Task 2 (40m)',
        activityId: 'Simulasi Menulis Penuh: Task 1 + Task 2',
        module: '/practice',
        moduleLabel: 'Practice Hub',
        type: 'mock'
      },
      {
        id: 'd7_t4',
        time: '45 min',
        activity: 'AI Evaluation both tasks + compare with Day 1',
        activityId: 'Evaluasi AI dua tugas + bandingkan dengan Hari 1',
        module: '/evaluate',
        moduleLabel: 'Evaluator',
        type: 'review'
      },
      {
        id: 'd7_t5',
        time: '30 min',
        activity: 'Identify top 3 weaknesses for Week 2 focus',
        activityId: 'Kenali 3 kelemahan utama untuk fokus Minggu 2',
        module: '/study-plan',
        moduleLabel: 'Study Plan',
        type: 'review'
      }
    ]
  },
  // Extending briefly to cover the 14 days structure. The rest can follow a similar pattern.
  {
    day: 8,
    title: 'Advanced Writing',
    titleId: 'Menulis Tingkat Lanjut',
    theme: 'Discussion Essays',
    icon: '💬',
    color: '#3b82f6',
    estimatedTime: '3 hours',
    tasks: [
      { id: 'd8_t1', time: '30 min', activity: 'Collocation drill', activityId: 'Latihan Kolokasi', module: '/vocabulary', moduleLabel: 'Vocab Builder', type: 'practice' },
      { id: 'd8_t2', time: '30 min', activity: 'Learn Discussion Essay structure', activityId: 'Pelajari struktur Esai Diskusi', module: '/toolkit', moduleLabel: 'Toolkit', type: 'learn' },
      { id: 'd8_t3', time: '60 min', activity: 'Write 1 Discussion Essay', activityId: 'Tulis 1 Esai Diskusi', module: '/practice/general/task2', moduleLabel: 'Practice', type: 'practice' }
    ]
  },
  {
    day: 9,
    title: 'Reading Sprint',
    titleId: 'Sprint Membaca',
    theme: 'Informal Letters & Speed Reading',
    icon: '🏃',
    color: '#10b981',
    estimatedTime: '3 hours',
    tasks: [
      { id: 'd9_t1', time: '30 min', activity: 'Study informal letter phrases', activityId: 'Pelajari frasa surat informal', module: '/toolkit', moduleLabel: 'Toolkit', type: 'learn' },
      { id: 'd9_t2', time: '45 min', activity: 'Write 1 Informal letter', activityId: 'Tulis 1 Surat Informal', module: '/practice/general/task1', moduleLabel: 'Practice', type: 'practice' },
      { id: 'd9_t3', time: '45 min', activity: 'Reading sprint: 2 passages (40 mins)', activityId: 'Sprint membaca: 2 teks (40 menit)', module: '/reading', moduleLabel: 'Reading', type: 'mock' }
    ]
  },
  {
    day: 10,
    title: 'Grammar Polish',
    titleId: 'Perbaikan Tata Bahasa',
    theme: 'Error Correction & Advanced Formulas',
    icon: '✨',
    color: '#f59e0b',
    estimatedTime: '2.5 hours',
    tasks: [
      { id: 'd10_t1', time: '45 min', activity: 'Targeted grammar drill on top errors', activityId: 'Latihan tata bahasa pada kesalahan utama', module: '/evaluate', moduleLabel: 'Evaluator', type: 'review' },
      { id: 'd10_t2', time: '45 min', activity: 'Advantages/Disadvantages Essay structure', activityId: 'Struktur Esai Kelebihan/Kekurangan', module: '/toolkit', moduleLabel: 'Toolkit', type: 'learn' },
      { id: 'd10_t3', time: '30 min', activity: 'Write Task 2 intro + 2 body paragraphs', activityId: 'Tulis intro Task 2 + 2 paragraf isi', module: '/practice/general/task2', moduleLabel: 'Practice', type: 'practice' }
    ]
  },
  {
    day: 11,
    title: 'Reading Full Mock',
    titleId: 'Simulasi Membaca Penuh',
    theme: '60 Minutes Exam Conditions',
    icon: '⏱️',
    color: '#8b5cf6',
    estimatedTime: '3 hours',
    tasks: [
      { id: 'd11_t1', time: '30 min', activity: 'Review AI evaluations for recurring patterns', activityId: 'Tinjau pola kesalahan pada evaluasi AI', module: '/evaluate', moduleLabel: 'Evaluator', type: 'review' },
      { id: 'd11_t2', time: '75 min', activity: 'Reading Full Mock: 3 passages (60m strict)', activityId: 'Simulasi Penuh: 3 teks (60 menit ketat)', module: '/reading', moduleLabel: 'Reading', type: 'mock' },
      { id: 'd11_t3', time: '30 min', activity: 'Review Reading Mock Answers', activityId: 'Tinjau Jawaban Simulasi', module: '/reading', moduleLabel: 'Reading', type: 'review' }
    ]
  },
  {
    day: 12,
    title: 'Speed Writing',
    titleId: 'Menulis Cepat',
    theme: 'Time Management',
    icon: '⚡',
    color: '#ef4444',
    estimatedTime: '3 hours',
    tasks: [
      { id: 'd12_t1', time: '30 min', activity: 'Speed drill: Write Task 2 intro in 3 mins (5 attempts)', activityId: 'Tulis intro Task 2 dalam 3 mnt (5 percobaan)', module: '/practice/general/task2', moduleLabel: 'Practice', type: 'practice' },
      { id: 'd12_t2', time: '30 min', activity: 'Speed drill: Write Task 1 in 18 minutes', activityId: 'Tulis Task 1 dalam 18 menit', module: '/practice/general/task1', moduleLabel: 'Practice', type: 'practice' },
      { id: 'd12_t3', time: '45 min', activity: 'Master all phrase bank entries', activityId: 'Kuasai semua frasa', module: '/toolkit', moduleLabel: 'Toolkit', type: 'learn' }
    ]
  },
  {
    day: 13,
    title: 'Full Exam Day',
    titleId: 'Hari Ujian Penuh',
    theme: 'Reading & Writing Simulation',
    icon: '🎓',
    color: '#06b6d4',
    estimatedTime: '3.5 hours',
    tasks: [
      { id: 'd13_t1', time: '75 min', activity: 'Reading Mock: 3 passages, 60m strict', activityId: 'Simulasi Membaca: 3 teks, 60m', module: '/reading', moduleLabel: 'Reading', type: 'mock' },
      { id: 'd13_t2', time: '75 min', activity: 'Writing Mock: Task 1 (20m) + Task 2 (40m)', activityId: 'Simulasi Menulis: Task 1 + Task 2', module: '/practice', moduleLabel: 'Practice', type: 'mock' },
      { id: 'd13_t3', time: '45 min', activity: 'AI Evaluation & Review', activityId: 'Evaluasi AI & Tinjauan', module: '/evaluate', moduleLabel: 'Evaluator', type: 'review' }
    ]
  },
  {
    day: 14,
    title: 'Final Polish',
    titleId: 'Penyempurnaan Akhir',
    theme: 'Confidence Building',
    icon: '🌟',
    color: '#6366f1',
    estimatedTime: '2 hours',
    tasks: [
      { id: 'd14_t1', time: '30 min', activity: 'Final vocab review: Top 50 most useful words', activityId: 'Tinjauan akhir kosakata', module: '/vocabulary', moduleLabel: 'Vocab Builder', type: 'review' },
      { id: 'd14_t2', time: '30 min', activity: 'Quick-reference: All formulas + connectors', activityId: 'Referensi Cepat: Semua formula & penghubung', module: '/toolkit', moduleLabel: 'Toolkit', type: 'review' },
      { id: 'd14_t3', time: '45 min', activity: 'Re-write your BEST essay from scratch', activityId: 'Tulis ulang esai TERBAIK Anda dari awal', module: '/practice/general/task2', moduleLabel: 'Practice', type: 'practice' }
    ]
  }
];
