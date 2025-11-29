export type VibeMode = 'introvert' | 'ambivert' | 'extrovert';

export interface SlideContent {
  id: number;
  title?: string;
  lines: string[];
  ru: string;
  uz: string;
  visual?: 'text' | 'graph' | 'warning' | 'split' | 'quote' | 'table' | 'check' | 'mountain';
  section: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// New type for on-the-fly generated questions
export interface GeneratedQuizQuestion {
  id: string;
  type: 'cloze' | 'true-false' | 'translation';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface VocabItem {
  term: string;
  definition: string;
  example: string;
}

export const THEMES = {
  introvert: {
    bg: 'bg-[#f5f5f4]', // Warm grey
    text: 'text-[#44403c]',
    accent: 'text-[#78716c]',
    font: 'font-serif',
    button: 'bg-[#e7e5e4] hover:bg-[#d6d3d1] text-[#44403c]',
    nav: 'bg-[#e7e5e4]/80 backdrop-blur-md',
    highlight: 'bg-[#d6d3d1]/30',
    quizBg: 'bg-[#e7e5e4]',
  },
  ambivert: {
    bg: 'bg-white',
    text: 'text-slate-900',
    accent: 'text-blue-600',
    font: 'font-sans',
    button: 'bg-slate-100 hover:bg-slate-200 text-slate-900',
    nav: 'bg-white/80 backdrop-blur-md border-b border-slate-100',
    highlight: 'bg-blue-50',
    quizBg: 'bg-slate-50',
  },
  extrovert: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-yellow-400',
    font: 'font-mono uppercase tracking-tighter',
    button: 'bg-yellow-400 hover:bg-yellow-300 text-black font-bold',
    nav: 'bg-black/80 backdrop-blur-md border-b border-yellow-400/20',
    highlight: 'bg-yellow-400/20',
    quizBg: 'bg-zinc-900',
  }
};