export interface VocabWord {
  id: string;
  word: string;
  definition: string;
  definitionId: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  ieltsLevel: 'B2' | 'C1' | 'C2';
  topic: string;
  exampleFormal: string;
  exampleInformal: string;
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  commonMistake?: string;
  phraseUsage: string;
  dailySentence: string;
}

export interface VocabTopic {
  id: string;
  name: string;
  icon: string;
  color: string;
  words: VocabWord[];
}

export const VOCAB_TOPICS: VocabTopic[] = [
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
    color: '#3b82f6',
    words: [
      {
        id: 'edu_1',
        word: 'curriculum',
        definition: 'The subjects comprising a course of study in a school or college.',
        definitionId: 'Mata pelajaran yang menyusun program studi di sekolah atau perguruan tinggi.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'education',
        exampleFormal: 'The university has recently overhauled its engineering curriculum to include more practical experience.',
        exampleInformal: 'They changed the curriculum so we have to do more projects now.',
        collocations: ['core curriculum', 'curriculum development', 'extracurricular'],
        synonyms: ['syllabus', 'course of study', 'program'],
        antonyms: [],
        phraseUsage: 'integrate into the curriculum',
        dailySentence: 'Is physical education part of the core curriculum here?'
      },
      {
        id: 'edu_2',
        word: 'pedagogy',
        definition: 'The method and practice of teaching, especially as an academic subject or theoretical concept.',
        definitionId: 'Metode dan praktik pengajaran, terutama sebagai subjek akademik atau konsep teoretis.',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'education',
        exampleFormal: 'Modern pedagogy emphasizes interactive and student-centered learning approaches.',
        exampleInformal: 'Her teaching style is really different; she uses a lot of modern pedagogy.',
        collocations: ['modern pedagogy', 'innovative pedagogy', 'pedagogical approach'],
        synonyms: ['teaching method', 'education', 'instruction'],
        antonyms: [],
        commonMistake: 'Do not confuse with "pediatrics" (medical care for children).',
        phraseUsage: 'employ a pedagogical approach',
        dailySentence: 'Teachers often attend workshops to improve their pedagogy.'
      },
      {
        id: 'edu_3',
        word: 'plagiarism',
        definition: 'The practice of taking someone else\'s work or ideas and passing them off as one\'s own.',
        definitionId: 'Praktik mengambil karya atau ide orang lain dan mengakuinya sebagai milik sendiri (plagiat).',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'education',
        exampleFormal: 'The institution maintains a strict zero-tolerance policy regarding academic plagiarism.',
        exampleInformal: 'He got kicked out of class for plagiarism.',
        collocations: ['commit plagiarism', 'accused of plagiarism', 'plagiarism software'],
        synonyms: ['copying', 'infringement', 'piracy'],
        antonyms: ['originality'],
        phraseUsage: 'avoid plagiarism at all costs',
        dailySentence: 'Make sure to cite your sources to avoid plagiarism.'
      },
      {
        id: 'edu_4',
        word: 'literacy',
        definition: 'The ability to read and write; competence or knowledge in a specified area.',
        definitionId: 'Kemampuan membaca dan menulis; kompetensi atau pengetahuan di bidang tertentu.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'education',
        exampleFormal: 'Adult literacy rates have significantly improved over the last decade due to government initiatives.',
        exampleInformal: 'Financial literacy is something they should teach in high school.',
        collocations: ['literacy rate', 'computer literacy', 'financial literacy'],
        synonyms: ['proficiency', 'knowledge', 'competence'],
        antonyms: ['illiteracy', 'ignorance'],
        phraseUsage: 'promote digital literacy',
        dailySentence: 'Computer literacy is essential for most jobs today.'
      },
      {
        id: 'edu_5',
        word: 'comprehensive',
        definition: 'Complete; including all or nearly all elements or aspects of something.',
        definitionId: 'Lengkap; mencakup semua atau hampir semua elemen atau aspek dari sesuatu.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'B2',
        topic: 'education',
        exampleFormal: 'The committee published a comprehensive review of the educational system.',
        exampleInformal: 'The guide they gave us is really comprehensive, it covers everything.',
        collocations: ['comprehensive review', 'comprehensive understanding', 'comprehensive approach'],
        synonyms: ['inclusive', 'thorough', 'complete'],
        antonyms: ['limited', 'partial', 'incomplete'],
        phraseUsage: 'offer a comprehensive overview',
        dailySentence: 'We need a comprehensive plan to tackle this issue.'
      },
      {
        id: 'edu_6',
        word: 'empirical',
        definition: 'Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.',
        definitionId: 'Berdasarkan, berkaitan dengan, atau dapat diverifikasi melalui pengamatan atau pengalaman, bukan sekadar teori.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'education',
        exampleFormal: 'The thesis must be supported by solid empirical evidence rather than mere speculation.',
        exampleInformal: 'We need actual empirical data to back up this claim.',
        collocations: ['empirical evidence', 'empirical research', 'empirical study'],
        synonyms: ['observational', 'practical', 'factual'],
        antonyms: ['theoretical', 'hypothetical'],
        phraseUsage: 'gather empirical data',
        dailySentence: 'There is no empirical evidence to support his theory.'
      },
      {
        id: 'edu_7',
        word: 'cognitive',
        definition: 'Relating to cognition (the mental action or process of acquiring knowledge and understanding).',
        definitionId: 'Berkaitan dengan kognisi (proses mental untuk memperoleh pengetahuan dan pemahaman).',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'education',
        exampleFormal: 'Early childhood education plays a crucial role in cognitive development.',
        exampleInformal: 'Playing puzzles helps with your cognitive skills.',
        collocations: ['cognitive development', 'cognitive abilities', 'cognitive skills'],
        synonyms: ['mental', 'intellectual', 'reasoning'],
        antonyms: ['physical'],
        phraseUsage: 'enhance cognitive function',
        dailySentence: 'As people age, they may experience a decline in cognitive function.'
      },
      {
        id: 'edu_8',
        word: 'autonomy',
        definition: 'The right or condition of self-government; freedom from external control or influence.',
        definitionId: 'Hak atau kondisi pemerintahan sendiri; kebebasan dari kendali atau pengaruh eksternal.',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'education',
        exampleFormal: 'University professors typically enjoy a high degree of academic autonomy.',
        exampleInformal: 'Students perform better when they have some autonomy over their projects.',
        collocations: ['academic autonomy', 'grant autonomy', 'degree of autonomy'],
        synonyms: ['independence', 'self-rule', 'freedom'],
        antonyms: ['dependence', 'coercion'],
        commonMistake: 'Do not confuse with "anatomy" (study of the body).',
        phraseUsage: 'foster learner autonomy',
        dailySentence: 'The branch manager was given full autonomy to run the office.'
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    color: '#8b5cf6',
    words: [
      {
        id: 'tech_1',
        word: 'obsolete',
        definition: 'No longer produced or used; out of date.',
        definitionId: 'Tidak lagi diproduksi atau digunakan; usang.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'B2',
        topic: 'technology',
        exampleFormal: 'The rapid pace of technological advancement quickly renders older devices obsolete.',
        exampleInformal: 'My phone is basically obsolete now, it\'s so slow.',
        collocations: ['become obsolete', 'render obsolete', 'virtually obsolete'],
        synonyms: ['outdated', 'outmoded', 'antiquated'],
        antonyms: ['modern', 'current', 'state-of-the-art'],
        phraseUsage: 'render older technologies obsolete',
        dailySentence: 'CD players have become largely obsolete.'
      },
      {
        id: 'tech_2',
        word: 'innovation',
        definition: 'The action or process of innovating; a new method, idea, product, etc.',
        definitionId: 'Tindakan atau proses berinovasi; metode, ide, produk baru, dll.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'technology',
        exampleFormal: 'Technological innovation is a primary driver of economic growth in the modern era.',
        exampleInformal: 'There is so much innovation happening in AI right now.',
        collocations: ['technological innovation', 'foster innovation', 'stifle innovation'],
        synonyms: ['invention', 'advancement', 'modernization'],
        antonyms: ['stagnation'],
        phraseUsage: 'at the forefront of innovation',
        dailySentence: 'The company is known for its constant innovation.'
      },
      {
        id: 'tech_3',
        word: 'paradigm',
        definition: 'A typical example or pattern of something; a model.',
        definitionId: 'Contoh atau pola khas dari sesuatu; sebuah model.',
        partOfSpeech: 'noun',
        ieltsLevel: 'C2',
        topic: 'technology',
        exampleFormal: 'The introduction of smartphones created a paradigm shift in how we communicate.',
        exampleInformal: 'Working from home has caused a whole paradigm shift in office culture.',
        collocations: ['paradigm shift', 'new paradigm', 'current paradigm'],
        synonyms: ['model', 'pattern', 'standard'],
        antonyms: [],
        phraseUsage: 'represent a paradigm shift',
        dailySentence: 'We need a new paradigm for understanding this problem.'
      },
      {
        id: 'tech_4',
        word: 'automation',
        definition: 'The use of largely automatic equipment in a system of manufacturing or other production process.',
        definitionId: 'Penggunaan peralatan yang sebagian besar otomatis dalam sistem manufaktur atau proses produksi lainnya.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'technology',
        exampleFormal: 'Increased automation in the manufacturing sector has led to concerns regarding job displacement.',
        exampleInformal: 'Automation is going to take over a lot of basic jobs soon.',
        collocations: ['industrial automation', 'degree of automation', 'automation process'],
        synonyms: ['mechanization', 'computerization'],
        antonyms: ['manual labor'],
        phraseUsage: 'implement widespread automation',
        dailySentence: 'Automation has sped up the assembly line significantly.'
      },
      {
        id: 'tech_5',
        word: 'intuitive',
        definition: 'Using or based on what one feels to be true even without conscious reasoning; easy to use and understand.',
        definitionId: 'Menggunakan atau berdasarkan apa yang dirasa benar bahkan tanpa penalaran sadar; mudah digunakan dan dipahami.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'technology',
        exampleFormal: 'The software features an intuitive interface that minimizes the learning curve for new users.',
        exampleInformal: 'The app is super intuitive, you just know where to click.',
        collocations: ['intuitive interface', 'intuitive design', 'highly intuitive'],
        synonyms: ['instinctive', 'user-friendly', 'straightforward'],
        antonyms: ['counter-intuitive', 'complicated'],
        phraseUsage: 'boast an intuitive design',
        dailySentence: 'The new operating system is much more intuitive than the old one.'
      },
      {
        id: 'tech_6',
        word: 'ubiquitous',
        definition: 'Present, appearing, or found everywhere.',
        definitionId: 'Hadir, muncul, atau ditemukan di mana-mana.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C2',
        topic: 'technology',
        exampleFormal: 'Mobile devices have become ubiquitous in contemporary society.',
        exampleInformal: 'Coffee shops are ubiquitous in this city; they are everywhere.',
        collocations: ['ubiquitous presence', 'virtually ubiquitous', 'increasingly ubiquitous'],
        synonyms: ['omnipresent', 'pervasive', 'universal'],
        antonyms: ['rare', 'scarce'],
        phraseUsage: 'become a ubiquitous feature',
        dailySentence: 'Smartphones are now ubiquitous.'
      }
    ]
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🏥',
    color: '#10b981',
    words: [
      {
        id: 'health_1',
        word: 'sedentary',
        definition: 'Tending to spend much time seated; somewhat inactive.',
        definitionId: 'Cenderung menghabiskan banyak waktu duduk; agak tidak aktif.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'health',
        exampleFormal: 'A sedentary lifestyle is a significant contributing factor to cardiovascular disease.',
        exampleInformal: 'I need to exercise more, my job is way too sedentary.',
        collocations: ['sedentary lifestyle', 'sedentary job', 'highly sedentary'],
        synonyms: ['inactive', 'desk-bound', 'stationary'],
        antonyms: ['active', 'mobile', 'energetic'],
        phraseUsage: 'combat a sedentary lifestyle',
        dailySentence: 'Working at a computer all day makes for a very sedentary lifestyle.'
      },
      {
        id: 'health_2',
        word: 'epidemic',
        definition: 'A widespread occurrence of an infectious disease in a community at a particular time.',
        definitionId: 'Terjadinya penyakit menular secara luas di suatu komunitas pada waktu tertentu.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'health',
        exampleFormal: 'The government implemented strict measures to contain the flu epidemic.',
        exampleInformal: 'There is a flu epidemic going around the office right now.',
        collocations: ['global epidemic', 'flu epidemic', 'reach epidemic proportions'],
        synonyms: ['outbreak', 'plague', 'scourge'],
        antonyms: [],
        phraseUsage: 'halt the spread of the epidemic',
        dailySentence: 'Obesity has reached epidemic proportions in many Western countries.'
      },
      {
        id: 'health_3',
        word: 'alleviate',
        definition: 'Make (suffering, deficiency, or a problem) less severe.',
        definitionId: 'Membuat (penderitaan, kekurangan, atau masalah) menjadi tidak terlalu parah.',
        partOfSpeech: 'verb',
        ieltsLevel: 'C1',
        topic: 'health',
        exampleFormal: 'The medication is prescribed to alleviate symptoms of chronic pain.',
        exampleInformal: 'This tea should alleviate your sore throat.',
        collocations: ['alleviate symptoms', 'alleviate pain', 'alleviate poverty'],
        synonyms: ['relieve', 'ease', 'mitigate'],
        antonyms: ['aggravate', 'exacerbate', 'worsen'],
        phraseUsage: 'help alleviate the symptoms',
        dailySentence: 'Taking an aspirin can alleviate a headache.'
      },
      {
        id: 'health_4',
        word: 'detrimental',
        definition: 'Tending to cause harm.',
        definitionId: 'Cenderung menyebabkan bahaya.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'health',
        exampleFormal: 'Prolonged exposure to ultraviolet radiation is detrimental to skin health.',
        exampleInformal: 'Eating too much junk food is detrimental to your health.',
        collocations: ['detrimental effect', 'detrimental impact', 'highly detrimental'],
        synonyms: ['harmful', 'damaging', 'injurious'],
        antonyms: ['beneficial', 'advantageous', 'helpful'],
        phraseUsage: 'have a detrimental effect on',
        dailySentence: 'Lack of sleep can be detrimental to your academic performance.'
      },
      {
        id: 'health_5',
        word: 'susceptible',
        definition: 'Likely or liable to be influenced or harmed by a particular thing.',
        definitionId: 'Mungkin atau rentan dipengaruhi atau dirugikan oleh hal tertentu.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C2',
        topic: 'health',
        exampleFormal: 'Individuals with compromised immune systems are highly susceptible to infections.',
        exampleInformal: 'I\'m really susceptible to catching colds in the winter.',
        collocations: ['highly susceptible', 'susceptible to disease', 'particularly susceptible'],
        synonyms: ['vulnerable', 'prone', 'sensitive'],
        antonyms: ['immune', 'resistant'],
        phraseUsage: 'render someone susceptible to',
        dailySentence: 'Older people are more susceptible to this virus.'
      }
    ]
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: '🌿',
    color: '#059669',
    words: [
      {
        id: 'env_1',
        word: 'sustainability',
        definition: 'The ability to be maintained at a certain rate or level, especially avoiding the depletion of natural resources.',
        definitionId: 'Kemampuan untuk dipertahankan pada tingkat tertentu, terutama menghindari penipisan sumber daya alam.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'environment',
        exampleFormal: 'Corporate strategies must integrate environmental sustainability to ensure long-term viability.',
        exampleInformal: 'We need to focus more on sustainability if we want to save the planet.',
        collocations: ['environmental sustainability', 'promote sustainability', 'long-term sustainability'],
        synonyms: ['eco-friendliness', 'greenness', 'viability'],
        antonyms: ['unsustainability'],
        phraseUsage: 'promote environmental sustainability',
        dailySentence: 'Sustainability is a key consideration in modern architecture.'
      },
      {
        id: 'env_2',
        word: 'mitigate',
        definition: 'Make less severe, serious, or painful.',
        definitionId: 'Membuat menjadi kurang parah, kurang serius, atau kurang menyakitkan.',
        partOfSpeech: 'verb',
        ieltsLevel: 'C1',
        topic: 'environment',
        exampleFormal: 'Urgent action is required to mitigate the devastating impacts of climate change.',
        exampleInformal: 'Planting more trees can help mitigate global warming.',
        collocations: ['mitigate the effects', 'mitigate the impact', 'mitigate climate change'],
        synonyms: ['alleviate', 'reduce', 'diminish'],
        antonyms: ['aggravate', 'intensify', 'exacerbate'],
        phraseUsage: 'take steps to mitigate',
        dailySentence: 'We need to mitigate the risks before starting the project.'
      },
      {
        id: 'env_3',
        word: 'depletion',
        definition: 'Reduction in the number or quantity of something.',
        definitionId: 'Pengurangan jumlah atau kuantitas dari sesuatu.',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'environment',
        exampleFormal: 'The depletion of the ozone layer remains a critical environmental concern.',
        exampleInformal: 'The depletion of our natural resources is scary.',
        collocations: ['resource depletion', 'ozone depletion', 'rapid depletion'],
        synonyms: ['reduction', 'exhaustion', 'consumption'],
        antonyms: ['replenishment', 'augmentation'],
        phraseUsage: 'prevent the depletion of resources',
        dailySentence: 'Overfishing has led to a severe depletion of fish stocks.'
      },
      {
        id: 'env_4',
        word: 'biodiversity',
        definition: 'The variety of plant and animal life in the world or in a particular habitat, a high level of which is usually considered to be important and desirable.',
        definitionId: 'Keanekaragaman kehidupan tumbuhan dan hewan di dunia atau di habitat tertentu.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'environment',
        exampleFormal: 'The destruction of rainforests poses a severe threat to global biodiversity.',
        exampleInformal: 'It\'s important to protect biodiversity in the oceans.',
        collocations: ['loss of biodiversity', 'conserve biodiversity', 'rich biodiversity'],
        synonyms: ['biological diversity', 'ecological diversity'],
        antonyms: [],
        phraseUsage: 'preserve rich biodiversity',
        dailySentence: 'Coral reefs are known for their incredible biodiversity.'
      }
    ]
  },
  {
    id: 'society',
    name: 'Society',
    icon: '👥',
    color: '#f59e0b',
    words: [
      {
        id: 'soc_1',
        word: 'inequality',
        definition: 'Difference in size, degree, circumstances, etc.; lack of equality.',
        definitionId: 'Perbedaan dalam ukuran, derajat, keadaan, dll.; kurangnya kesetaraan.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'society',
        exampleFormal: 'Governments must implement policies aimed at reducing wealth inequality.',
        exampleInformal: 'There\'s a lot of inequality when it comes to getting a good education.',
        collocations: ['wealth inequality', 'gender inequality', 'reduce inequality'],
        synonyms: ['disparity', 'imbalance', 'discrepancy'],
        antonyms: ['equality', 'fairness'],
        phraseUsage: 'address social inequality',
        dailySentence: 'Income inequality has been rising in recent years.'
      },
      {
        id: 'soc_2',
        word: 'marginalize',
        definition: 'Treat (a person, group, or concept) as insignificant or peripheral.',
        definitionId: 'Memperlakukan (seseorang, kelompok, atau konsep) sebagai tidak penting atau pinggiran.',
        partOfSpeech: 'verb',
        ieltsLevel: 'C2',
        topic: 'society',
        exampleFormal: 'Economic policies should ensure that vulnerable populations are not further marginalized.',
        exampleInformal: 'It feels like people in rural areas are being marginalized by the government.',
        collocations: ['marginalized groups', 'marginalized communities', 'feel marginalized'],
        synonyms: ['sideline', 'alienate', 'isolate'],
        antonyms: ['integrate', 'include', 'empower'],
        phraseUsage: 'prevent the marginalization of',
        dailySentence: 'We must not marginalize minority groups.'
      },
      {
        id: 'soc_3',
        word: 'demographic',
        definition: 'Relating to the structure of populations.',
        definitionId: 'Berkaitan dengan struktur populasi.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'C1',
        topic: 'society',
        exampleFormal: 'The aging population represents a significant demographic shift in many developed nations.',
        exampleInformal: 'The app is very popular with the younger demographic.',
        collocations: ['demographic shift', 'demographic changes', 'target demographic'],
        synonyms: ['population', 'societal'],
        antonyms: [],
        phraseUsage: 'undergo a demographic shift',
        dailySentence: 'The marketing team is targeting a new demographic.'
      }
    ]
  },
  {
    id: 'crime',
    name: 'Crime & Law',
    icon: '⚖️',
    color: '#ef4444',
    words: [
      {
        id: 'crime_1',
        word: 'deterrent',
        definition: 'A thing that discourages or is intended to discourage someone from doing something.',
        definitionId: 'Sesuatu yang mencegah atau dimaksudkan untuk mencegah seseorang melakukan sesuatu.',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'crime',
        exampleFormal: 'Proponents of capital punishment argue that it serves as an effective deterrent to violent crime.',
        exampleInformal: 'Having security cameras is a good deterrent against burglars.',
        collocations: ['act as a deterrent', 'effective deterrent', 'strong deterrent'],
        synonyms: ['disincentive', 'discouragement', 'preventive'],
        antonyms: ['incentive', 'encouragement'],
        phraseUsage: 'act as a powerful deterrent',
        dailySentence: 'The hefty fine should be a deterrent to speeding.'
      },
      {
        id: 'crime_2',
        word: 'rehabilitation',
        definition: 'The action of restoring someone to health or normal life through training and therapy after imprisonment, addiction, or illness.',
        definitionId: 'Tindakan memulihkan seseorang ke kesehatan atau kehidupan normal melalui pelatihan dan terapi setelah penjara, kecanduan, atau penyakit.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'crime',
        exampleFormal: 'Prison systems should focus on the rehabilitation of offenders rather than solely on punishment.',
        exampleInformal: 'He went to a rehabilitation center to get help with his addiction.',
        collocations: ['rehabilitation program', 'drug rehabilitation', 'focus on rehabilitation'],
        synonyms: ['recovery', 'reintegration', 'therapy'],
        antonyms: [],
        phraseUsage: 'prioritize the rehabilitation of offenders',
        dailySentence: 'Rehabilitation takes a lot of time and effort.'
      },
      {
        id: 'crime_3',
        word: 'juvenile',
        definition: 'Of, for, or relating to young people.',
        definitionId: 'Dari, untuk, atau berkaitan dengan orang muda.',
        partOfSpeech: 'adjective',
        ieltsLevel: 'B2',
        topic: 'crime',
        exampleFormal: 'The rise in juvenile delinquency has prompted calls for increased community youth programs.',
        exampleInformal: 'Juvenile crime is getting worse in that neighborhood.',
        collocations: ['juvenile delinquency', 'juvenile court', 'juvenile crime'],
        synonyms: ['young', 'teenage', 'adolescent'],
        antonyms: ['adult', 'mature'],
        phraseUsage: 'address juvenile delinquency',
        dailySentence: 'He was sent to a juvenile detention center.'
      }
    ]
  },
  {
    id: 'government',
    name: 'Government',
    icon: '🏛️',
    color: '#64748b',
    words: [
      {
        id: 'gov_1',
        word: 'bureaucracy',
        definition: 'A system of government in which most of the important decisions are made by state officials rather than by elected representatives.',
        definitionId: 'Sistem pemerintahan di mana sebagian besar keputusan penting dibuat oleh pejabat negara daripada oleh perwakilan terpilih (birokrasi).',
        partOfSpeech: 'noun',
        ieltsLevel: 'C1',
        topic: 'government',
        exampleFormal: 'The excessive bureaucracy involved in starting a business stifles entrepreneurial initiative.',
        exampleInformal: 'There is so much bureaucracy involved in just getting a permit.',
        collocations: ['excessive bureaucracy', 'government bureaucracy', 'reduce bureaucracy'],
        synonyms: ['red tape', 'administration', 'officialdom'],
        antonyms: [],
        phraseUsage: 'cut through the red tape of bureaucracy',
        dailySentence: 'Dealing with city bureaucracy can be very frustrating.'
      },
      {
        id: 'gov_2',
        word: 'legislation',
        definition: 'Laws, considered collectively.',
        definitionId: 'Undang-undang, dipertimbangkan secara kolektif.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'government',
        exampleFormal: 'The parliament is expected to pass new legislation aimed at reducing carbon emissions.',
        exampleInformal: 'They are trying to pass new legislation to stop pollution.',
        collocations: ['pass legislation', 'introduce legislation', 'current legislation'],
        synonyms: ['laws', 'regulations', 'statutes'],
        antonyms: [],
        phraseUsage: 'introduce strict legislation',
        dailySentence: 'New legislation will come into effect next year.'
      },
      {
        id: 'gov_3',
        word: 'infrastructure',
        definition: 'The basic physical and organizational structures and facilities (e.g., buildings, roads, and power supplies) needed for the operation of a society or enterprise.',
        definitionId: 'Struktur dan fasilitas fisik dan organisasi dasar (misalnya, bangunan, jalan, dan pasokan listrik) yang diperlukan untuk beroperasinya suatu masyarakat atau perusahaan.',
        partOfSpeech: 'noun',
        ieltsLevel: 'B2',
        topic: 'government',
        exampleFormal: 'Investment in public infrastructure is essential for sustainable economic development.',
        exampleInformal: 'The city\'s infrastructure is crumbling; the roads are terrible.',
        collocations: ['public infrastructure', 'transport infrastructure', 'infrastructure investment'],
        synonyms: ['framework', 'base', 'foundation'],
        antonyms: [],
        phraseUsage: 'invest heavily in public infrastructure',
        dailySentence: 'The country needs to modernize its infrastructure.'
      }
    ]
  }
];
