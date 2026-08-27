export type HighlightType = 'vocab' | 'grammar' | 'connector';

export interface Annotation {
  id: string; // e.g. "a1"
  textToHighlight: string; // The exact text chunk in the paragraph
  type: HighlightType; // Type of annotation
  meaning: string; // English/Indonesian meaning or function
  formulaOrUsage: string; // Abstract formula or structural usage
  tips: string; // Tips for the exam
}

export interface AnnotatedParagraph {
  text: string; // The full text of the paragraph containing the highlight texts
  annotations: Annotation[];
}

export interface AnnotatedText {
  id: string;
  topic: string;
  title: string;
  difficulty: 'Band 7.0' | 'Band 8.0' | 'Band 9.0';
  paragraphs: AnnotatedParagraph[];
  generatedAt: string;
}

export const SAMPLE_ANNOTATED_TEXT: AnnotatedText = {
  id: 'sample-1',
  topic: 'Environment & Technology',
  title: 'The Role of Technology in Environmental Conservation',
  difficulty: 'Band 8.0',
  generatedAt: new Date().toISOString(),
  paragraphs: [
    {
      text: "It is widely believed that technological advancements have significantly altered our approach to environmental conservation. Not only does cutting-edge technology allow us to monitor climate change more accurately, but it also facilitates the development of sustainable energy sources. For instance, wind and solar power generation have become substantially more efficient, largely due to sophisticated engineering.",
      annotations: [
        {
          id: 'a1',
          textToHighlight: 'It is widely believed that',
          type: 'grammar',
          meaning: 'Dipercaya secara luas bahwa... (Impersonal Passive Voice)',
          formulaOrUsage: 'It + is/was + V3 (believed/argued) + that...',
          tips: 'Gunakan ini di pendahuluan essay (Task 2) untuk menyatakan pandangan umum tanpa menggunakan subjek personal ("People believe").'
        },
        {
          id: 'a2',
          textToHighlight: 'technological advancements',
          type: 'vocab',
          meaning: 'Kemajuan teknologi (Topic-specific vocabulary)',
          formulaOrUsage: 'Adjective + Noun collocation',
          tips: 'Lebih formal dan bernilai tinggi dibandingkan hanya menggunakan kata "new technology".'
        },
        {
          id: 'a3',
          textToHighlight: 'Not only does',
          type: 'grammar',
          meaning: 'Tidak hanya... (Inversion)',
          formulaOrUsage: 'Not only + Auxiliary (does/do/did) + Subject + Verb',
          tips: 'Inversi memberikan penekanan dramatis. Sangat impresif untuk examiner jika digunakan sekali dalam esai.'
        },
        {
          id: 'a4',
          textToHighlight: 'cutting-edge',
          type: 'vocab',
          meaning: 'Sangat modern / mutakhir (Idiomatic adjective)',
          formulaOrUsage: 'Adjective used to describe technology or research',
          tips: 'Gunakan ini alih-alih "very modern" atau "newest" untuk menunjukkan Lexical Resource tingkat tinggi.'
        },
        {
          id: 'a5',
          textToHighlight: 'but it also',
          type: 'connector',
          meaning: 'Tetapi juga... (Correlative Conjunction)',
          formulaOrUsage: 'Pasangan dari "Not only..."',
          tips: 'Pastikan elemen yang mengikuti "not only" dan "but also" memiliki struktur gramatikal yang paralel.'
        },
        {
          id: 'a6',
          textToHighlight: 'For instance,',
          type: 'connector',
          meaning: 'Contohnya, (Exemplification)',
          formulaOrUsage: 'For instance, + Main Clause',
          tips: 'Gunakan sebagai variasi dari "For example" di awal kalimat untuk memperkenalkan argumen pendukung.'
        }
      ]
    },
    {
      text: "Conversely, critics argue that the production of electronic devices places immense strain on natural resources. Despite the clear benefits of green technology, the extraction of rare earth metals for batteries inevitably leads to ecological degradation. Therefore, a balanced approach is imperative to ensure that technological progress does not come at the expense of the environment.",
      annotations: [
        {
          id: 'a7',
          textToHighlight: 'Conversely,',
          type: 'connector',
          meaning: 'Sebaliknya, (Contrast)',
          formulaOrUsage: 'Conversely, + Main Clause',
          tips: 'Sangat baik digunakan di awal Paragraf Body 2 saat Anda berpindah membahas sisi argumen yang berlawanan.'
        },
        {
          id: 'a8',
          textToHighlight: 'immense strain',
          type: 'vocab',
          meaning: 'Tekanan yang sangat besar',
          formulaOrUsage: 'Adjective + Noun collocation',
          tips: 'Menggantikan "a lot of pressure/problems". Cocok untuk membahas isu lingkungan atau ekonomi.'
        },
        {
          id: 'a9',
          textToHighlight: 'Despite the clear benefits of',
          type: 'grammar',
          meaning: 'Meskipun ada manfaat yang jelas dari... (Concession)',
          formulaOrUsage: 'Despite + Noun Phrase (bukan clause!)',
          tips: 'Sering salah digunakan dengan menambahkan klausa (Despite it has clear benefits ❌). Selalu gunakan Noun Phrase atau Gerund (V-ing) setelah Despite.'
        },
        {
          id: 'a10',
          textToHighlight: 'inevitably',
          type: 'vocab',
          meaning: 'Tidak bisa dihindari',
          formulaOrUsage: 'Adverb of certainty',
          tips: 'Gunakan untuk menekankan bahwa suatu akibat pasti terjadi secara logis.'
        },
        {
          id: 'a11',
          textToHighlight: 'at the expense of',
          type: 'vocab',
          meaning: 'Mengorbankan...',
          formulaOrUsage: 'Prepositional phrase',
          tips: 'Frasa tingkat lanjut yang sangat natural digunakan untuk membahas pengorbanan antara dua hal (trade-offs).'
        }
      ]
    }
  ]
};
