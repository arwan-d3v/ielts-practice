export interface GrammarRule {
  id: string;
  topic: string;
  difficulty: 'Fundamental' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  formula: string;
  formulaTip: string;
  examples: {
    band7: string;
    commonMistake?: string;
  }[];
}

export const GRAMMAR_RULES: GrammarRule[] = [
  // ─── 7 KEY COMPONENTS (FUNDAMENTALS) ──────────────────────────────────────────────────────────
  {
    id: 'g-comp-1',
    topic: '1. Parts of Speech: Nouns & Pronouns',
    difficulty: 'Fundamental',
    description: 'Kata benda (Nouns) digunakan untuk menamai orang, tempat, benda, atau ide. Kata ganti (Pronouns) menggantikan kata benda agar tidak terjadi pengulangan kata yang membosankan.',
    formula: 'Noun = Subject / Object | Pronoun (He, She, It, They, Which, Who)',
    formulaTip: 'Di IELTS, gunakan "Abstract Nouns" (seperti development, sustainability) untuk meningkatkan skor Lexical Resource. Gunakan Pronouns yang tepat (terutama relative pronouns seperti "which") untuk merangkai kalimat kompleks.',
    examples: [
      {
        band7: 'The rapid development of technology has its drawbacks, which are often overlooked by society.',
        commonMistake: 'The rapid develop of technology has its drawbacks. The drawbacks are often overlooked by society.'
      }
    ]
  },
  {
    id: 'g-comp-2',
    topic: '2. Parts of Speech: Verbs & Adjectives',
    difficulty: 'Fundamental',
    description: 'Kata kerja (Verbs) menunjukkan tindakan atau keadaan. Kata sifat (Adjectives) memberikan deskripsi atau modifikasi pada kata benda.',
    formula: 'Subject + Verb + Object | Adjective + Noun',
    formulaTip: 'Hindari kata sifat dasar seperti "good" atau "bad". Gunakan "Strong Adjectives" (misal: detrimental, beneficial) dan pasangkan dengan "Action Verbs" yang spesifik.',
    examples: [
      {
        band7: 'Implementing this policy will have a detrimental impact on the local economy.',
        commonMistake: 'Implementing this policy will have a very bad impact on the local economy.'
      }
    ]
  },
  {
    id: 'g-comp-3',
    topic: '3. Parts of Speech: Adverbs & Conjunctions',
    difficulty: 'Fundamental',
    description: 'Kata keterangan (Adverbs) memodifikasi kata kerja, kata sifat, atau keterangan lain. Konjungsi (Conjunctions) menghubungkan kata, frasa, atau klausa.',
    formula: 'Verb + Adverb (ly) | Clause + Conjunction (and, but, although) + Clause',
    formulaTip: 'Gunakan Adverbs of Degree (significantly, drastically) untuk mendeskripsikan tren di Writing Task 1. Gunakan Subordinating Conjunctions (Although, Whereas) untuk membuat kalimat majemuk bertingkat.',
    examples: [
      {
        band7: 'Although the initial costs are substantially high, the long-term benefits are undeniable.',
        commonMistake: 'The initial costs are high, but the long-term benefits are undeniable.'
      }
    ]
  },
  {
    id: 'g-comp-4',
    topic: '4. Prepositions, Determiners & Quantifiers',
    difficulty: 'Fundamental',
    description: 'Preposisi menunjukkan hubungan ruang/waktu (in, on, at). Determiners & Quantifiers (a, the, some, many, a great deal of) memberikan konteks kuantitas pada kata benda.',
    formula: 'Preposition + Noun/Gerund | Quantifier + Countable/Uncountable Noun',
    formulaTip: 'Kesalahan preposisi sangat umum. Ingat: selalu gunakan bentuk V-ing (Gerund) setelah preposisi (misal: "Instead of going..."). Gunakan "A great deal of" untuk uncountable nouns alih-alih "a lot of" (terlalu informal).',
    examples: [
      {
        band7: 'The government allocates a significant proportion of its budget to improving healthcare infrastructure.',
        commonMistake: 'The government allocates a lot of its budget for improve healthcare infrastructure.'
      }
    ]
  },
  {
    id: 'g-comp-5',
    topic: '5. Clauses & Phrases',
    difficulty: 'Intermediate',
    description: 'Klausa (Clauses) memiliki subjek dan kata kerja (bisa berdiri sendiri atau terikat). Frasa (Phrases) adalah kumpulan kata tanpa kombinasi subjek-predikat.',
    formula: 'Main Clause + Dependent Clause | Prepositional Phrase, Main Clause',
    formulaTip: 'Variasikan struktur kalimat Anda. Jangan selalu memulai kalimat dengan Subjek. Coba mulai dengan Prepositional Phrase atau Participle Phrase untuk variasi.',
    examples: [
      {
        band7: 'Driven by the desire for better opportunities, many young professionals migrate to urban centers.',
        commonMistake: 'Many young professionals migrate to urban centers because they are driven by the desire for better opportunities.'
      }
    ]
  },

  // ─── TENSES (CURRICULUM) ──────────────────────────────────────────────────────────────────────
  {
    id: 'g-tense-1',
    topic: '6. Tenses: Simple Present & Present Continuous',
    difficulty: 'Fundamental',
    description: 'Simple Present untuk fakta umum atau kebiasaan. Present Continuous untuk aksi yang sedang berlangsung saat ini atau tren sementara.',
    formula: 'S + V1(s/es) | S + is/am/are + V-ing',
    formulaTip: 'Di IELTS Writing Task 2, Simple Present adalah tense utama Anda untuk memaparkan argumen dan fakta umum.',
    examples: [
      {
        band7: 'Currently, the global population is expanding at an unprecedented rate, which puts immense pressure on natural resources.',
        commonMistake: 'Currently, the global population expands at an unprecedented rate, which is putting immense pressure on natural resources.'
      }
    ]
  },
  {
    id: 'g-tense-2',
    topic: '7. Tenses: Present Perfect & Perfect Continuous',
    difficulty: 'Intermediate',
    description: 'Present Perfect untuk aksi masa lalu yang masih relevan/berlanjut ke masa kini. Perfect Continuous menekankan DURASI dari aksi yang telah berlangsung hingga sekarang.',
    formula: 'S + has/have + V3 | S + has/have been + V-ing',
    formulaTip: 'Sangat berguna di Speaking Part 1 & 2 untuk menceritakan pengalaman (misal: "I have been studying English for...").',
    examples: [
      {
        band7: 'Environmentalists have been warning us about climate change for decades, yet little action has been taken.',
        commonMistake: 'Environmentalists are warning us about climate change for decades, yet little action is taken.'
      }
    ]
  },
  {
    id: 'g-tense-3',
    topic: '8. Tenses: Simple Past & Past Continuous',
    difficulty: 'Fundamental',
    description: 'Simple Past untuk aksi yang sudah selesai sepenuhnya di masa lalu. Past Continuous untuk aksi yang sedang berlangsung di masa lalu ketika aksi lain menyela.',
    formula: 'S + V2 | S + was/were + V-ing',
    formulaTip: 'Wajib dikuasai untuk Writing Task 1 (Line/Bar Graph) yang menceritakan data historis masa lalu (misal: "The number of visitors peaked in 2010...").',
    examples: [
      {
        band7: 'Between 2005 and 2010, the consumption of fast food rose steadily while the popularity of home-cooked meals declined.',
        commonMistake: 'Between 2005 and 2010, the consumption of fast food has risen steadily.'
      }
    ]
  },
  {
    id: 'g-tense-4',
    topic: '9. Tenses: Past Perfect & Past Perfect Continuous',
    difficulty: 'Advanced',
    description: 'Past Perfect menunjukkan aksi yang terjadi LEBIH DULU sebelum aksi lain di masa lalu. Past Perfect Continuous sama, namun menekankan durasinya.',
    formula: 'S + had + V3 | S + had been + V-ing',
    formulaTip: 'Gunakan ini di Speaking Part 2 untuk menambah kedalaman cerita Anda (menyambungkan dua event masa lalu). Jarang digunakan di Writing Task 2, tapi bagus untuk narasi kompleks.',
    examples: [
      {
        band7: 'By the time the government introduced the new recycling scheme, pollution levels had already reached alarming heights.',
        commonMistake: 'When the government introduced the new recycling scheme, pollution levels reached alarming heights already.'
      }
    ]
  },
  {
    id: 'g-tense-5',
    topic: '10. Tenses: Simple Future & Future Continuous',
    difficulty: 'Intermediate',
    description: 'Simple Future untuk prediksi atau keputusan masa depan. Future Continuous untuk aksi yang diproyeksikan sedang berlangsung pada titik waktu tertentu di masa depan.',
    formula: 'S + will + V1 | S + will be + V-ing',
    formulaTip: 'Gunakan di kesimpulan (Conclusion) Writing Task 2 untuk memberikan prediksi atau rekomendasi, atau di Writing Task 1 saat mendeskripsikan diagram masa depan.',
    examples: [
      {
        band7: 'If current demographic trends continue, the proportion of elderly citizens will be placing a massive burden on the healthcare sector.',
        commonMistake: 'If current demographic trends continue, the proportion of elderly citizens will place a massive burden on the healthcare sector.'
      }
    ]
  },
  {
    id: 'g-tense-6',
    topic: '11. Tenses: Future Perfect & Future Perfect Continuous',
    difficulty: 'Expert',
    description: 'Future Perfect untuk aksi yang akan SUDAH SELESAI pada titik waktu tertentu di masa depan.',
    formula: 'S + will have + V3 | S + will have been + V-ing',
    formulaTip: 'Struktur yang sangat impresif jika digunakan dengan benar di IELTS. Gunakan dengan preposisi "By [tahun/waktu]".',
    examples: [
      {
        band7: 'By the year 2050, researchers predict that renewable energy sources will have completely replaced fossil fuels in this region.',
        commonMistake: 'In the year 2050, researchers predict that renewable energy sources will completely replace fossil fuels in this region.'
      }
    ]
  },

  // ─── ADVANCED STRUCTURES (ORIGINAL) ───────────────────────────────────────────────────────────
  {
    id: 'g-adv-1',
    topic: '12. Mixed Conditionals',
    difficulty: 'Advanced',
    description: 'Digunakan ketika klausa "If" (kondisi) terjadi di masa lalu, tetapi hasilnya berimbas ke masa sekarang, atau sebaliknya.',
    formula: 'If + Past Perfect, Subject + Would + Base Verb',
    formulaTip: 'Gunakan ini di Speaking Part 3 atau Writing Task 2 untuk mengutarakan skenario pengandaian hipotesis yang kompleks.',
    examples: [
      {
        band7: 'If the government had invested more in public transport a decade ago, our cities would not be so congested today.',
        commonMistake: 'If the government invested... cities will not be congested.'
      }
    ]
  },
  {
    id: 'g-adv-2',
    topic: '13. Passive Voice (Impersonal)',
    difficulty: 'Intermediate',
    description: 'Digunakan untuk memberikan opini yang objektif atau umum tanpa menyebutkan subjek tertentu.',
    formula: 'It + is/was + V3 (Past Participle) + that...',
    formulaTip: 'Sangat krusial untuk Writing Task 2 di bagian pendahuluan untuk memaparkan fenomena umum.',
    examples: [
      {
        band7: 'It is widely believed that technological advancements have significantly altered human communication.',
        commonMistake: 'People believe that technology change communication.'
      }
    ]
  },
  {
    id: 'g-adv-3',
    topic: '14. Inversion (Negative Adverbials)',
    difficulty: 'Expert',
    description: 'Struktur dramatis untuk memberikan penekanan ekstra, di mana posisi subjek dan auxiliary verb dibalik.',
    formula: 'Negative Adverbial (Not only/Rarely/Seldom) + Auxiliary + Subject + Main Verb',
    formulaTip: 'Gunakan HANYA satu atau dua kali dalam essay Writing Task 2 untuk memukau examiner tanpa terlihat mencoba terlalu keras.',
    examples: [
      {
        band7: 'Not only does excessive screen time affect sleep quality, but it also reduces attention spans in young children.',
        commonMistake: 'Excessive screen time not only affects sleep quality, but it also reduces...'
      }
    ]
  }
];
