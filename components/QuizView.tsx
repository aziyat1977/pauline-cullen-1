import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../constants';
import { VibeMode, THEMES } from '../types';
import { playSound } from '../utils';
import { Check, X, RefreshCw } from 'lucide-react';

interface QuizViewProps {
  vibe: VibeMode;
}

const QuizView: React.FC<QuizViewProps> = ({ vibe }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const theme = THEMES[vibe];
  const question = QUIZ_QUESTIONS[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    
    if (idx === question.correctIndex) {
      setScore(s => s + 100);
      playSound('correct', vibe);
    } else {
      playSound('wrong', vibe);
    }

    setTimeout(() => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setCompleted(true);
      }
    }, 3000);
  };

  if (completed) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${theme.bg} ${theme.text}`}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-6xl font-bold mb-8">Quiz Complete!</h2>
          <p className="text-4xl mb-12">Score: {score} / {QUIZ_QUESTIONS.length * 100}</p>
          <button 
            onClick={() => window.location.reload()}
            className={`px-8 py-4 rounded-full text-xl font-bold flex items-center gap-2 mx-auto ${theme.button}`}
          >
            <RefreshCw /> Restart
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${theme.bg} ${theme.text}`}>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-12">
           <span className="text-xl font-mono opacity-60">Question {currentQ + 1}/{QUIZ_QUESTIONS.length}</span>
           <span className="text-3xl font-bold">Score: {score}</span>
        </div>

        <motion.h2 
          key={question.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          {question.question}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.options.map((opt, idx) => {
            let bgClass = vibe === 'extrovert' ? 'bg-gray-800' : 'bg-gray-200';
            if (showResult) {
              if (idx === question.correctIndex) bgClass = 'bg-green-500 text-white';
              else if (idx === selected) bgClass = 'bg-red-500 text-white';
              else bgClass = 'opacity-30';
            }

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: selected === null ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(idx)}
                className={`p-8 rounded-xl text-xl md:text-2xl font-semibold text-left transition-all ${bgClass} ${selected === null && vibe === 'introvert' ? 'hover:bg-gray-300' : ''}`}
                disabled={selected !== null}
              >
                <div className="flex justify-between items-center">
                  {opt}
                  {showResult && idx === question.correctIndex && <Check />}
                  {showResult && idx === selected && idx !== question.correctIndex && <X />}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {showResult && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-8 p-6 bg-blue-100 dark:bg-blue-900 rounded-xl text-center"
          >
            <p className="text-lg font-semibold text-blue-800 dark:text-blue-100">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizView;