export interface ConnectorItem {
  word: string;
  level: 'Band 6' | 'Band 7' | 'Band 8';
  usage: string;
  exampleWriting: string;
  exampleSpeaking: string;
  commonMistake?: string;
  isForWriting: boolean;
  isForSpeaking: boolean;
}

export interface ConnectorGroup {
  id: string;
  function: string;
  icon: string;
  color: string;
  description: string;
  connectors: ConnectorItem[];
}

export const CONNECTORS: ConnectorGroup[] = [
  {
    id: 'addition',
    function: 'Addition',
    icon: '➕',
    color: '#3b82f6',
    description: 'Use these to add more information or expand on a point.',
    connectors: [
      {
        word: 'Furthermore',
        level: 'Band 7',
        usage: 'To add a very important piece of information.',
        exampleWriting: 'Furthermore, the implementation of this policy would significantly reduce pollution.',
        exampleSpeaking: 'Furthermore, it\'s just a really beautiful place to visit.',
        commonMistake: 'Do not use at the end of a sentence.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'Moreover',
        level: 'Band 7',
        usage: 'To add information that supports the previous statement.',
        exampleWriting: 'Moreover, studies have shown a direct link between diet and health.',
        exampleSpeaking: 'Moreover, the people there are incredibly friendly.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'Additionally',
        level: 'Band 6',
        usage: 'A standard way to add an extra point.',
        exampleWriting: 'Additionally, candidates must possess excellent communication skills.',
        exampleSpeaking: 'Additionally, I like to read in my free time.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'What\'s more',
        level: 'Band 6',
        usage: 'A more informal way to add a surprising or strong point.',
        exampleWriting: 'Avoid in formal writing.',
        exampleSpeaking: 'What\'s more, the tickets were completely free!',
        isForWriting: false,
        isForSpeaking: true
      },
      {
        word: 'On top of that',
        level: 'Band 6',
        usage: 'Informal addition, often used for emphasis (positive or negative).',
        exampleWriting: 'Avoid in academic writing.',
        exampleSpeaking: 'It rained all day, and on top of that, I lost my wallet.',
        isForWriting: false,
        isForSpeaking: true
      }
    ]
  },
  {
    id: 'contrast',
    function: 'Contrast',
    icon: '⚡',
    color: '#eab308',
    description: 'Use these to introduce an opposing idea or exception.',
    connectors: [
      {
        word: 'However',
        level: 'Band 6',
        usage: 'The most common way to introduce a contrast.',
        exampleWriting: 'The plan has many benefits; however, it is also very expensive.',
        exampleSpeaking: 'I love living in the city. However, it can get too noisy sometimes.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'Nevertheless',
        level: 'Band 7',
        usage: 'More formal than "however", meaning "despite what has just been said".',
        exampleWriting: 'The results were disappointing; nevertheless, the team continued their research.',
        exampleSpeaking: 'It was a tough exam. Nevertheless, I think I passed.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'On the other hand',
        level: 'Band 6',
        usage: 'To present a contrasting viewpoint or alternative.',
        exampleWriting: 'On the other hand, opponents argue that this will harm the economy.',
        exampleSpeaking: 'On the other hand, buying a car gives you more freedom.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'Conversely',
        level: 'Band 8',
        usage: 'To introduce a statement that reverses the previous one.',
        exampleWriting: 'Rich countries consume more resources; conversely, poorer nations suffer the environmental impact.',
        exampleSpeaking: 'You might think it\'s easy. Conversely, it requires a lot of skill.',
        isForWriting: true,
        isForSpeaking: true
      },
      {
        word: 'Whereas',
        level: 'Band 7',
        usage: 'To contrast two facts or ideas in the same sentence.',
        exampleWriting: 'Some people prefer rural life, whereas others thrive in a bustling city.',
        exampleSpeaking: 'I like action movies, whereas my sister prefers comedies.',
        commonMistake: 'Must be used to connect two clauses within one sentence, not start a new independent sentence like "However".',
        isForWriting: true,
        isForSpeaking: true
      }
    ]
  }
];

export interface SentenceFormula {
  id: string;
  category: 'opinion' | 'cause-effect' | 'comparison' | 'example' | 'concession' | 'introduction' | 'conclusion';
  name: string;
  formula: string;
  filledExample: string;
  formalVersion: string;
  informalVersion: string;
  whenToUse: string;
  bandLevel: 'Band 6' | 'Band 7' | 'Band 8';
  skill: 'writing' | 'speaking' | 'both';
}

export const FORMULAS: SentenceFormula[] = [
  {
    id: 'op_1',
    category: 'opinion',
    name: 'Strong Opinion (Academic)',
    formula: 'It is widely acknowledged that [TOPIC], and I firmly believe that [OPINION].',
    filledExample: 'It is widely acknowledged that climate change is a pressing issue, and I firmly believe that immediate global action is required.',
    formalVersion: 'I firmly believe that [OPINION].',
    informalVersion: 'I really think that [OPINION].',
    whenToUse: 'When writing the thesis statement in the introduction of an Opinion Essay.',
    bandLevel: 'Band 7',
    skill: 'writing'
  },
  {
    id: 'ce_1',
    category: 'cause-effect',
    name: 'Cause & Effect Chain',
    formula: 'One of the primary reasons for [PROBLEM] is [CAUSE], which subsequently leads to [EFFECT].',
    filledExample: 'One of the primary reasons for childhood obesity is a sedentary lifestyle, which subsequently leads to long-term health issues.',
    formalVersion: 'One of the primary reasons for [PROBLEM] is [CAUSE], which subsequently leads to [EFFECT].',
    informalVersion: 'The main reason for [PROBLEM] is [CAUSE], and that leads to [EFFECT].',
    whenToUse: 'When starting a body paragraph in a Causes and Solutions essay.',
    bandLevel: 'Band 8',
    skill: 'writing'
  },
  {
    id: 'ex_1',
    category: 'example',
    name: 'Compelling Illustration',
    formula: 'A compelling illustration of this can be found in [CONTEXT], where [DETAIL].',
    filledExample: 'A compelling illustration of this can be found in Scandinavian countries, where strict recycling laws have drastically reduced landfill waste.',
    formalVersion: 'A compelling illustration of this can be found in [CONTEXT], where [DETAIL].',
    informalVersion: 'A good example of this is [CONTEXT], where [DETAIL].',
    whenToUse: 'When introducing a strong, specific example to support your argument in a body paragraph.',
    bandLevel: 'Band 7',
    skill: 'both'
  }
];

export interface PhraseEntry {
  id: string;
  phrase: string;
  meaning: string;
  meaningId: string;
  skill: 'writing' | 'speaking' | 'reading' | 'all';
  section: string;
  register: 'formal' | 'informal' | 'neutral';
  exampleInContext: string;
  alternatives: string[];
  bandLevel: string;
}

export const PHRASE_BANK: PhraseEntry[] = [
  {
    id: 'w1_f1',
    phrase: 'I am writing to express my dissatisfaction with...',
    meaning: 'Starting a formal complaint',
    meaningId: 'Memulai keluhan formal',
    skill: 'writing',
    section: 'Task 1 (Formal)',
    register: 'formal',
    exampleInContext: 'I am writing to express my dissatisfaction with the service I received at your restaurant last night.',
    alternatives: ['I am writing to complain about...', 'I am writing to bring to your attention an issue regarding...'],
    bandLevel: 'Band 7'
  },
  {
    id: 'w2_i1',
    phrase: 'It is a common belief that...',
    meaning: 'Introducing a widely held opinion',
    meaningId: 'Memperkenalkan pendapat umum',
    skill: 'writing',
    section: 'Task 2 (Introduction)',
    register: 'formal',
    exampleInContext: 'It is a common belief that technology has negatively impacted social interactions.',
    alternatives: ['It is widely argued that...', 'Many people hold the view that...'],
    bandLevel: 'Band 7'
  },
  {
    id: 'sp_p1_1',
    phrase: 'To be completely honest, I would have to say...',
    meaning: 'Buying time before giving a true opinion',
    meaningId: 'Mengulur waktu sebelum memberikan pendapat jujur',
    skill: 'speaking',
    section: 'Speaking Part 1',
    register: 'informal',
    exampleInContext: 'To be completely honest, I would have to say I prefer reading over watching TV.',
    alternatives: ['Well, frankly speaking...', 'To tell you the truth...'],
    bandLevel: 'Band 7'
  }
];
