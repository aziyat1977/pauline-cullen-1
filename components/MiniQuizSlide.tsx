import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GeneratedQuizQuestion, VibeMode, THEMES } from '../types';
import { Check, X, BrainCircuit, ArrowRight } from 'lucide-react';
import { playSound } from '../utils';

interface MiniQuizSlideProps {
  quiz: GeneratedQuizQuestion;
  vibe: VibeMode;
  onComplete: () => void;
  stepNumber: number; // 1, 2, or 3
}

const MiniQuizSlide: React.FC<MiniQuizSlideProps> = ({ quiz, vibe, onComplete, stepNumber }) => {
  const theme = THEMES[vibe];
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reset state when quiz changes
  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
  }, [quiz.id]);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent multi-select
    setSelected(option);
    
    const correct = option === quiz.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      playSound('correct', vibe);
      // Auto advance after short delay if correct
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      playSound('wrong', vibe);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${theme.quizBg || theme.bg} ${theme.text} transition-colors duration-500`}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-3xl w-full"
      >
        <div className="flex items-center gap-2 mb-8 opacity-60 font-mono text-sm uppercase tracking-widest">
          <BrainCircuit size={16} />
          <span>Understanding Check {stepNumber} / 3</span>
        </div>

        <h3 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">
          {quiz.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {quiz.options.map((option, idx) => {
            let bgClass = vibe === 'extrovert' ? 'bg-black/40 border border-white/20' : 'bg-white/50 border border-black/5';
            
            if (selected === option) {
              bgClass = isCorrect 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-red-500 text-white border-red-500';
            } else if (selected && option === quiz.correctAnswer) {
              bgClass = 'bg-green-500/50 text-white border-green-500'; // Show correct answer if wrong
            }

            return (
              <motion.button
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelect(option)}
                className={`p-6 rounded-xl text-xl font-semibold text-left transition-all ${bgClass} hover:scale-[1.01]`}
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

        {/* Feedback / Manual Advance */}
        {selected && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-end"
          >
            <button 
              onClick={onComplete}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${theme.button}`}
            >
              Continue <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MiniQuizSlide;