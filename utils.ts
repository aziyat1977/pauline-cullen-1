

import { SlideContent, GeneratedQuizQuestion } from './types';

// Simple Audio Synth
let audioCtx: AudioContext | null = null;
let isGlobalMuted = false;

export const setGlobalMute = (muted: boolean) => {
  isGlobalMuted = muted;
};

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth', duration: number, volume: number = 0.1) => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playSound = (type: 'swoosh' | 'click' | 'thrum' | 'correct' | 'wrong' | 'levelup' | 'alert', vibe: 'introvert' | 'ambivert' | 'extrovert') => {
  try {
    if (isGlobalMuted) return;

    switch (type) {
      case 'click':
        playTone(vibe === 'introvert' ? 200 : vibe === 'extrovert' ? 600 : 400, 'triangle', 0.05, 0.05);
        break;
      case 'swoosh':
        playTone(150, 'sine', 0.2, 0.05);
        break;
      case 'correct':
        if (vibe === 'introvert') {
          // Gentle major chord, soft sine
          setTimeout(() => playTone(440, 'sine', 0.2, 0.05), 0);
          setTimeout(() => playTone(554.37, 'sine', 0.2, 0.05), 100); 
        } else if (vibe === 'extrovert') {
          // Energetic 8-bit style arpeggio
          setTimeout(() => playTone(880, 'square', 0.1, 0.05), 0);
          setTimeout(() => playTone(1108.73, 'square', 0.1, 0.05), 50);
          setTimeout(() => playTone(1318.51, 'square', 0.2, 0.05), 100);
        } else {
          // Ambivert: Standard reliable beep-beep
          setTimeout(() => playTone(523.25, 'sine', 0.1, 0.1), 0); // C5
          setTimeout(() => playTone(1046.50, 'sine', 0.2, 0.1), 100); // C6
        }
        break;
      case 'wrong':
        if (vibe === 'introvert') {
          // Soft thud
          playTone(150, 'triangle', 0.3, 0.1);
        } else if (vibe === 'extrovert') {
          // Error buzz descending
          playTone(150, 'sawtooth', 0.2, 0.1);
          setTimeout(() => playTone(100, 'sawtooth', 0.2, 0.1), 100);
        } else {
          // Standard buzz
          playTone(150, 'sawtooth', 0.3, 0.1);
        }
        break;
      case 'levelup':
        // Ascending scale
        [300, 400, 500, 600, 800].forEach((f, i) => setTimeout(() => playTone(f, 'square', 0.1, 0.1), i * 80));
        break;
      case 'alert':
        // Sharp double beep for warnings
        playTone(800, 'square', 0.1, 0.1);
        setTimeout(() => playTone(800, 'square', 0.1, 0.1), 150);
        break;
    }
  } catch (e) {
    // Audio context might be blocked or failed
    console.warn("Audio play failed", e);
  }
};

const STOP_WORDS = new Set(['the', 'and', 'is', 'in', 'at', 'of', 'to', 'a', 'an', 'for', 'on', 'with', 'by', 'this', 'that', 'it', 'you', 'are', 'will', 'be', 'or', 'as', 'but', 'not', 'have', 'from', 'do', 'don\'t', 'can', 'may', 'should', 'we', 'my', 'your']);

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const extractKeywords = (text: string): string[] => {
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"?]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 4 && !STOP_WORDS.has(w.toLowerCase()));
};

export const generateQuizzesForSlide = (slide: SlideContent): GeneratedQuizQuestion[] => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const combinedText = [...(slide.title ? [slide.title] : []), ...slide.lines].join(" ");
  const keywords = extractKeywords(combinedText);
  const cleanLines = slide.lines.filter(l => l.split(" ").length > 3);

  // Randomly choose ONE high-quality question type
  const roll = Math.random();

  // TYPE 1: SCRAMBLE (Assemble a key sentence) - 40% chance if applicable
  if (roll < 0.4 && cleanLines.length > 0) {
    const targetLine = cleanLines[Math.floor(Math.random() * cleanLines.length)];
    // Only scramble lines that aren't too long or too short
    const words = targetLine.split(" ");
    if (words.length >= 4 && words.length <= 12) {
      return [{
        id: `${uniqueId}-scramble`,
        type: 'scramble',
        question: "Reassemble the key idea:",
        options: [],
        scrambleParts: shuffleArray(words),
        correctAnswer: targetLine
      }];
    }
  }

  // TYPE 2: CLOZE (Fill in the blank) - 30% chance
  if (roll < 0.7 && keywords.length > 0) {
    const targetKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const cleanKeyword = targetKeyword.replace(/[^a-zA-Z]/g, '');
    
    // Find context
    const contextLine = slide.lines.find(l => l.includes(targetKeyword)) || slide.title || "";
    
    if (cleanKeyword.length > 3 && contextLine) {
       const questionText = contextLine.replace(targetKeyword, "_______");
       const distractors = shuffleArray(["Summary", "Report", "Trend", "Detail", "Graph", "Chart", "Data", "Feature", "Contrast"])
          .filter(d => d !== cleanKeyword)
          .slice(0, 3);
       
       return [{
         id: `${uniqueId}-cloze`,
         type: 'cloze',
         question: `Complete the concept: "${questionText}"`,
         options: shuffleArray([cleanKeyword, ...distractors]),
         correctAnswer: cleanKeyword
       }];
    }
  }

  // TYPE 3: LOGIC CHECK (True/False) - Fallback
  const isTrue = Math.random() > 0.5;
  let qText = "";
  let ans = "";

  if (isTrue) {
    qText = `True or False: This slide discusses "${keywords[0] || 'Task 1 concepts'}"?`;
    ans = "True";
  } else {
    // Make a fake topic
    qText = `True or False: This slide explains "${['Nuclear Physics', 'Ancient History', 'Cooking Pasta', 'Rocket Science'][Math.floor(Math.random()*4)]}"?`;
    ans = "False";
  }

  return [{
    id: `${uniqueId}-tf`,
    type: 'true-false',
    question: qText,
    options: ["True", "False"],
    correctAnswer: ans
  }];
};