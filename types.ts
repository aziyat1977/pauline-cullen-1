

export type VibeMode = 'introvert' | 'ambivert' | 'extrovert';

export type VisualType = 
  | 'text' 
  | 'graph' 
  | 'warning' 
  | 'split' 
  | 'quote' 
  | 'table' 
  | 'check' 
  | 'mountain' 
  | 'millennials' 
  | 'scientific' 
  | 'impact-table' 
  | 'vocab-check' 
  | 'chart-practice' 
  | 'checklist' 
  | 'sources'
  | 'list-dots' 
  | 'list-check' 
  | 'list-x'
  | 'magpie'
  | 'funnel-filter';

export interface SlideContent {
  id: number;
  title?: string;
  lines: string[];
  ru: string;
  uz: string;
  visual?: VisualType;
  section: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Gamification Types

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gender: 'male' | 'female';
}

export type UserRole = 'student' | 'teacher';

export interface UserState {
  avatar: Avatar | null;
  role: UserRole | null;
  xp: number;
  level: number;
  streak: number;
  completedSlides: number[];
  currentSlideIndex: number;
}

// New type for on-the-fly generated questions
export interface GeneratedQuizQuestion {
  id: string;
  type: 'cloze' | 'true-false' | 'scramble' | 'multiple-choice';
  question: string;
  options: string[]; // For cloze/mcq
  correctAnswer: string; // For cloze/mcq/tf
  scrambleParts?: string[]; // For scramble
}

export interface VocabItem {
  term: string;
  definition: string;
  example: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const THEMES = {
  introvert: {
    bg: 'bg-[#1c1917]', // Dark Warm Grey
    text: 'text-[#e7e5e4]',
    accent: 'text-[#a8a29e]',
    font: 'font-serif',
    button: 'bg-[#292524] hover:bg-[#44403c] text-[#e7e5e4]',
    nav: 'bg-[#1c1917]/90 backdrop-blur-md border-b border-[#292524]',
    highlight: 'bg-[#292524]',
    quizBg: 'bg-[#1c1917]',
    card: 'bg-[#292524]',
  },
  ambivert: {
    bg: 'bg-[#0f172a]', // Dark Slate
    text: 'text-white',
    accent: 'text-blue-400',
    font: 'font-sans',
    button: 'bg-white/10 hover:bg-white/20 text-white',
    nav: 'bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10',
    highlight: 'bg-blue-500/20',
    quizBg: 'bg-[#0f172a]',
    card: 'bg-[#1e293b]',
  },
  extrovert: {
    bg: 'bg-black',
    text: 'text-white',
    accent: 'text-yellow-400',
    font: 'font-mono uppercase tracking-tighter',
    button: 'bg-yellow-400 hover:bg-yellow-300 text-black font-bold',
    nav: 'bg-black/90 backdrop-blur-md border-b border-yellow-400/20',
    highlight: 'bg-yellow-400/20',
    quizBg: 'bg-zinc-900',
    card: 'bg-zinc-900 border border-yellow-400/20',
  }
};