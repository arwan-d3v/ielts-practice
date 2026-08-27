import { VocabWord } from './vocab-data';
import { ConnectorItem } from './toolkit-data';
import { GrammarRule } from './grammar-data';
import { AnnotatedText } from './annotated-data';

export interface AIFormula {
  id: string;
  name: string;
  category: string;
  bandLevel: string;
  skill: string;
  formula: string;
  filledExample: string;
  formalVersion: string;
  informalVersion: string;
  whenToUse: string;
}

export interface AIPhrase {
  id: string;
  section: string;
  skill: string;
  bandLevel: string;
  phrase: string;
  meaning: string;
  meaningId: string;
  exampleInContext: string;
  alternatives: string[];
  register: 'Formal' | 'Informal' | 'Neutral';
}

export interface AIBankStore {
  vocabulary: VocabWord[];
  connectors: Connector[];
  formulas: AIFormula[];
  phrases: AIPhrase[];
  grammar: GrammarRule[];
  annotatedTexts: AnnotatedText[];
  history: {
    words: string[];
    topics: string[];
    connectorWords: string[];
    phraseStrings: string[];
    grammarTopics: string[];
    annotatedTopics: string[];
  };
  generationLog: {
    date: string;
    section: string;
    count: number;
  }[];
}

const STORAGE_KEY = 'ielts_ai_bank_v1';

export const getAIBank = (): AIBankStore => {
  const defaultBank: AIBankStore = {
    vocabulary: [], connectors: [], formulas: [], phrases: [], grammar: [], annotatedTexts: [],
    history: { words: [], topics: [], connectorWords: [], phraseStrings: [], grammarTopics: [], annotatedTopics: [] },
    generationLog: []
  };

  if (typeof window === 'undefined') return defaultBank;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all keys exist to support schema migration
      return {
        vocabulary: parsed.vocabulary || [],
        connectors: parsed.connectors || [],
        formulas: parsed.formulas || [],
        phrases: parsed.phrases || [],
        grammar: parsed.grammar || [],
        annotatedTexts: parsed.annotatedTexts || [],
        history: {
          words: parsed.history?.words || [],
          topics: parsed.history?.topics || [],
          connectorWords: parsed.history?.connectorWords || [],
          phraseStrings: parsed.history?.phraseStrings || [],
          grammarTopics: parsed.history?.grammarTopics || [],
          annotatedTopics: parsed.history?.annotatedTopics || []
        },
        generationLog: parsed.generationLog || []
      };
    } catch (e) {
      console.error('Failed to parse AI Bank', e);
    }
  }

  return defaultBank;
};

export const saveAIBank = (store: AIBankStore) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
};

export const clearAIBankSection = (section: keyof AIBankStore) => {
  const store = getAIBank();
  if (section === 'history' || section === 'generationLog') return store;
  
  store[section] = [] as any;
  saveAIBank(store);
  return store;
};

export const getHistoryStrings = (section: string): string[] => {
  const store = getAIBank();
  switch (section) {
    case 'vocabulary': return store.history.words;
    case 'connectors': return store.history.connectorWords;
    case 'phrases': return store.history.phraseStrings;
    case 'grammar': return store.history.grammarTopics;
    case 'annotated': return store.history.annotatedTopics;
    case 'formulas': return store.formulas.map(f => f.name);
    default: return [];
  }
};
