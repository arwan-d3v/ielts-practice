export interface EvaluationRequest {
  essay: string;
  taskType: 'task1' | 'task2';
  question?: string;
  language: 'en' | 'id';
}

export interface ParagraphAnalysis {
  original: string;
  mainIdea: string;
  reason: string;
  example: string;
}

export interface GrammarError {
  error: string;
  explanation: string;
  correction: string;
  rule: string;
}

export interface VocabSuggestion {
  original: string;
  suggestion: string;
  context: string;
}

export interface BandGapItem {
  criterion: string;
  currentLevel: string;
  band7Requirement: string;
  actionStep: string;
}

export interface WeakPointBooster {
  criterion: string;
  score: number;
  strategy: string;
  miniLesson: string;
  exampleBefore: string;
  exampleAfter: string;
  practicePrompt: string;
}

export interface CohesiveDevice {
  function: string;
  devices: string[];
  exampleSentence: string;
}

export interface ModelSentence {
  purpose: string;
  sentence: string;
  explanation: string;
}

export interface CorrectedSentence {
  original: string;
  corrected: string;
  errorType: string;
}

export interface EvaluationResponse {
  scores: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    overall: number;
  };
  feedback: {
    taskAchievement: string;
    coherenceCohesion: string;
    lexicalResource: string;
    grammaticalRange: string;
  };
  paragraphBreakdown: ParagraphAnalysis[];
  grammarErrors: GrammarError[];
  vocabularyAlternatives: VocabSuggestion[];
  revisedEssay: string;
  bandGapAnalysis: BandGapItem[];
  weakPointBoosters: WeakPointBooster[];
  cohesiveDevices: CohesiveDevice[];
  modelSentences: ModelSentence[];
  correctedSentences: CorrectedSentence[];
  overallSummary: string;
}
