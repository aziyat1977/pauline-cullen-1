import { SlideContent, GeneratedQuizQuestion } from './types';

export const playSound = (type: 'swoosh' | 'click' | 'thrum' | 'correct' | 'wrong', vibe: 'introvert' | 'ambivert' | 'extrovert') => {
  // Sound simulation
  // console.log(`Playing sound: ${type} with vibe: ${vibe}`);
};

export const calculateProgress = (current: number, total: number) => {
  return (current / total) * 100;
};

// --- QUIZ ENGINE LOGIC ---

const STOP_WORDS = new Set(['the', 'and', 'is', 'in', 'at', 'of', 'to', 'a', 'an', 'for', 'on', 'with', 'by', 'this', 'that', 'it', 'you', 'are', 'will', 'be', 'or', 'as', 'but', 'not', 'have', 'from']);

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
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w.toLowerCase()));
};

export const generateQuizzesForSlide = (slide: SlideContent): GeneratedQuizQuestion[] => {
  const questions: GeneratedQuizQuestion[] = [];
  const fullText = slide.lines.join(" ");
  const keywords = extractKeywords(fullText);
  const uniqueId = Math.random().toString(36).substr(2, 9);

  // 1. Fill in the Blank (Cloze)
  if (slide.lines.length > 0) {
    const randomLineIndex = Math.floor(Math.random() * slide.lines.length);
    const line = slide.lines[randomLineIndex];
    const lineWords = line.split(" ");
    
    // Find a suitable candidate for blanking
    const candidates = lineWords.filter(w => w.length > 4 && !STOP_WORDS.has(w.toLowerCase()));
    
    if (candidates.length > 0) {
      const targetWord = candidates[Math.floor(Math.random() * candidates.length)].replace(/[^\w]/g, '');
      const questionText = line.replace(targetWord, "_______");
      
      // Generate distractors
      const distractors = shuffleArray(keywords).filter(k => k !== targetWord).slice(0, 3);
      while(distractors.length < 3) distractors.push("Something"); // Fallback

      const options = shuffleArray([targetWord, ...distractors]);

      questions.push({
        id: `${uniqueId}-1`,
        type: 'cloze',
        question: `Complete the sentence: "${questionText}"`,
        options: options,
        correctAnswer: targetWord
      });
    }
  }

  // 2. True / False (Concept Check)
  // We generate a True statement (from text) or a slightly modified False one.
  // For simplicity in this robust generator, we will mostly stick to verifying the text exists.
  const isTrue = Math.random() > 0.3; // 70% chance of being true to reinforce learning
  let tfQuestion = "";
  let tfAnswer = "";

  if (isTrue) {
    tfQuestion = `True or False: The lesson states that "${slide.lines[0]}"?`;
    tfAnswer = "True";
  } else {
    // Fabricate a false statement by pulling from a dummy list or negating (complex), 
    // or just checking if a random keyword applies.
    // Simpler False generation:
    tfQuestion = `True or False: This slide discusses "Space Exploration"?`;
    tfAnswer = "False";
  }

  questions.push({
    id: `${uniqueId}-2`,
    type: 'true-false',
    question: tfQuestion,
    options: ["True", "False"],
    correctAnswer: tfAnswer
  });

  // 3. Translation / Comprehension Check
  // Use the RU or UZ text to check understanding.
  const useRu = Math.random() > 0.5;
  const langLabel = useRu ? "Russian" : "Uzbek";
  const sourceText = useRu ? slide.ru : slide.uz;
  
  // Clean translation text to get a snippet
  const cleanTrans = sourceText.split('/')[0].trim(); // Take first part if split

  questions.push({
    id: `${uniqueId}-3`,
    type: 'translation',
    question: `The ${langLabel} translation for this section starts with:`,
    options: [cleanTrans, "Something completely different", "An unrelated topic", "Mathematics formulas"], // Simplified distractors for the engine
    correctAnswer: cleanTrans
  });

  // If we couldn't generate 3 (due to empty text etc), fill with generics
  while (questions.length < 3) {
    questions.push({
      id: `${uniqueId}-generic-${questions.length}`,
      type: 'true-false',
      question: "True or False: This is a critical IELTS concept.",
      options: ["True", "False"],
      correctAnswer: "True"
    });
  }

  return questions;
};