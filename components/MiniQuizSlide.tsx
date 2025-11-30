
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedQuizQuestion, VibeMode, THEMES } from '../types';
import { Check, X, BrainCircuit, ArrowRight, Trophy, Flame } from 'lucide-react';
import { playSound } from '../utils';

interface MiniQuizSlideProps {
  quiz: GeneratedQuizQuestion;
  vibe: VibeMode;
  onComplete: (correct: boolean) => void;
  stepNumber?: number;
}

interface ScrambleItem {
  id: string;
  text: string;
}

const MiniQuizSlide: React.FC<MiniQuizSlideProps> = ({ quiz, vibe, onComplete }) => {
  const theme = THEMES[vibe];
  const [selected, setSelected] = useState<string | null>(null);
  
  // Scramble State
  const [scrambleItems, setScrambleItems] = useState<ScrambleItem[]>([]);
  const [scrambleAnswer, setScrambleAnswer] = useState<ScrambleItem[]>([]);
  
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showXP, setShowXP] = useState(false);

  // Reset state when quiz changes
  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setShowXP(false);
    
    // Init Scramble Items with Unique IDs
    if (quiz.type === 'scramble' && quiz.scrambleParts) {
      setScrambleItems(quiz.scrambleParts.map((text, i) => ({ id: `${text}-${i}-${Math.random()}`, text })));
      setScrambleAnswer([]);
    } else {
      setScrambleItems([]);
      setScrambleAnswer([]);
    }
  }, [quiz.id, quiz.type, quiz.scrambleParts]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    
    const correct = option === quiz.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      playSound('correct', vibe);
      setShowXP(true);
      setTimeout(() => onComplete(true), 2000);
    } else {
      playSound('wrong', vibe);
      setTimeout(() => onComplete(false), 2000); // Allow time to see error
    }
  };

  const handleScrambleAdd = (item: ScrambleItem) => {
    setScrambleAnswer([...scrambleAnswer, item]);
    // Auto check
    const currentAttempt = [...scrambleAnswer, item].map(i => i.text).join(" ");
    const expectedLength = quiz.scrambleParts?.length || 0;
    
    if ([...scrambleAnswer, item].length === expectedLength) {
       if (currentAttempt === quiz.correctAnswer) {
         setIsCorrect(true);
         playSound('correct', vibe);
         setShowXP(true);
         setTimeout(() => onComplete(true), 2000);
       } else {
         setIsCorrect(false);
         playSound('wrong', vibe);
       }
    }
  };

  const handleScrambleRemove = (item: ScrambleItem) => {
    if (isCorrect) return; // Locked if correct
    setScrambleAnswer(scrambleAnswer.filter(i => i.id !== item.id));
    setIsCorrect(null); // Reset correctness state on change
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 md:p-8 ${theme.quizBg || theme.bg} ${theme.text} transition-colors duration-500 relative overflow-hidden`}>
      
      {/* XP Floating Animation */}
      <AnimatePresence>
        {showXP && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.5, y: -100 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 text-yellow-400 font-black text-6xl drop-shadow-lg flex items-center gap-2"
          >
            +150 XP <Flame fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-4xl w-full flex flex-col h-full justify-center"
      >
        <div className="flex items-center gap-2 mb-4 md:mb-8 opacity-60 font-mono text-xs md:text-sm uppercase tracking-widest">
          <BrainCircuit size={16} />
          <span>Quick Challenge</span>
        </div>

        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 leading-tight">
          {quiz.question}
        </h3>

        {/* CLOZE / TF / MCQ LAYOUT */}
        {quiz.type !== 'scramble' && (
          <div className="grid grid-cols-1 gap-4">
            {quiz.options.map((option, idx) => {
              let bgClass = vibe === 'extrovert' ? 'bg-black/40 border border-white/20' : 'bg-white/10 border border-white/5';
              
              if (selected === option) {
                bgClass = isCorrect 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-red-500 text-white border-red-500';
              } else if (selected && option === quiz.correctAnswer) {
                bgClass = 'bg-green-500/50 text-white border-green-500';
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelect(option)}
                  className={`p-4 md:p-6 rounded-xl text-lg md:text-xl font-semibold text-left transition-all ${bgClass} hover:scale-[1.01] active:scale-95`}
                  disabled={!!selected}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selected === option && isCorrect && <Check />}
                    {selected === option && !isCorrect && <X />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* SCRAMBLE LAYOUT */}
        {quiz.type === 'scramble' && (
          <div className="flex flex-col gap-8">
            {/* Answer Area */}
            <div className={`min-h-[80px] p-4 rounded-xl border-2 border-dashed ${isCorrect === true ? 'border-green-500 bg-green-500/10' : isCorrect === false ? 'border-red-500 bg-red-500/10' : 'border-gray-500/30'} flex flex-wrap gap-2 items-center`}>
              {scrambleAnswer.map((item) => (
                <motion.button
                  layoutId={item.id}
                  key={item.id}
                  onClick={() => handleScrambleRemove(item)}
                  className={`px-4 py-2 rounded-lg bg-blue-500 text-white font-bold shadow-md hover:bg-red-500 transition-colors`}
                >
                  {item.text}
                </motion.button>
              ))}
              {scrambleAnswer.length === 0 && <span className="opacity-30 italic">Tap words below to build sentence...</span>}
            </div>

            {/* Word Bank */}
            <div className="flex flex-wrap gap-3 justify-center">
              {scrambleItems.map((item) => {
                const isUsed = scrambleAnswer.some(a => a.id === item.id);
                return (
                  <div key={item.id} className={isUsed ? 'opacity-0 pointer-events-none' : ''}>
                     <motion.button
                      layoutId={item.id}
                      onClick={() => handleScrambleAdd(item)}
                      className={`px-4 py-2 md:px-6 md:py-3 rounded-lg ${theme.button} font-bold shadow-lg transform hover:-translate-y-1 transition-all`}
                    >
                      {item.text}
                    </motion.button>
                  </div>
                );
              })}
            </div>
            
            {isCorrect === false && (
              <div className="text-red-400 text-center font-bold">Incorrect order. Tap words to remove.</div>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default MiniQuizSlide;
