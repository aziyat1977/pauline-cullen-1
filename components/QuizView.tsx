import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../constants';
import { VibeMode, THEMES, UserRole } from '../types';
import { playSound } from '../utils';
import { Check, X, RefreshCw, Timer, Flame, Star, Zap, Skull, ArrowLeft, Trophy } from 'lucide-react';

interface QuizViewProps {
  vibe: VibeMode;
  role: UserRole;
}

const QuizView: React.FC<QuizViewProps> = ({ vibe, role }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const maxTime = 15;
  
  const theme = THEMES[vibe];

  const questions = React.useMemo(() => {
    if (!difficulty) return [];
    return QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty);
  }, [difficulty]);

  const question = questions[currentQ];

  useEffect(() => {
    if (!difficulty || showResult || completed) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          handleSelect(-1); // Timeout
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [currentQ, showResult, completed, difficulty]);

  // Reset timer for new questions
  useEffect(() => {
      if (difficulty && !completed) {
          setTimeLeft(maxTime);
      }
  }, [currentQ, difficulty, completed]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    
    // Check if correct (idx -1 is timeout)
    const isCorrect = idx !== -1 && idx === question.correctIndex;
    
    if (isCorrect) {
      setScore(s => s + Math.round(100 + timeLeft * 10)); // Speed bonus
      playSound('correct', vibe);
    } else {
      playSound('wrong', vibe);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setShowResult(false);
        // Time reset handled by useEffect
      } else {
        setCompleted(true);
        playSound('levelup', vibe);
      }
    }, 2500);
  };

  const resetQuiz = () => {
      setDifficulty(null);
      setCurrentQ(0);
      setScore(0);
      setSelected(null);
      setShowResult(false);
      setCompleted(false);
      setTimeLeft(maxTime);
  };

  if (!difficulty) {
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${theme.bg} ${theme.text} overflow-hidden`}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl text-center"
            >
                <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tight drop-shadow-2xl">SELECT DIFFICULTY</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Easy */}
                    <motion.button 
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDifficulty('easy')}
                        className={`p-8 rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent hover:from-green-500/20 backdrop-blur-md transition-all flex flex-col items-center gap-6 group shadow-2xl`}
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                           <Star size={40} className="text-green-500 group-hover:text-black group-hover:rotate-12 transition-all" />
                        </div>
                        <div>
                           <span className="text-3xl font-bold text-green-400 block mb-1">Easy</span>
                           <span className="opacity-50 text-xs font-mono tracking-widest uppercase">For Beginners</span>
                        </div>
                    </motion.button>
                     {/* Medium */}
                     <motion.button 
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDifficulty('medium')}
                        className={`p-8 rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent hover:from-yellow-500/20 backdrop-blur-md transition-all flex flex-col items-center gap-6 group shadow-2xl`}
                    >
                        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                          <Zap size={40} className="text-yellow-500 group-hover:text-black group-hover:rotate-12 transition-all" />
                        </div>
                        <div>
                           <span className="text-3xl font-bold text-yellow-400 block mb-1">Medium</span>
                           <span className="opacity-50 text-xs font-mono tracking-widest uppercase">Challenger</span>
                        </div>
                    </motion.button>
                     {/* Hard */}
                     <motion.button 
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDifficulty('hard')}
                        className={`p-8 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent hover:from-red-500/20 backdrop-blur-md transition-all flex flex-col items-center gap-6 group shadow-2xl`}
                    >
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 group-hover:text-black transition-colors">
                           <Skull size={40} className="text-red-500 group-hover:text-black group-hover:rotate-12 transition-all" />
                        </div>
                        <div>
                          <span className="text-3xl font-bold text-red-400 block mb-1">Hard</span>
                          <span className="opacity-50 text-xs font-mono tracking-widest uppercase">Expert Only</span>
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
      );
  }

  if (completed) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${theme.bg} ${theme.text}`}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative"
        >
          {/* Confetti Background Effect (Simulated) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          
          <div className="text-9xl mb-8 animate-bounce">🏆</div>
          <h2 className="text-7xl font-black mb-4 tracking-tighter">VICTORY</h2>
          <div className="flex items-center justify-center gap-3 mb-12">
             <span className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-xl font-mono uppercase tracking-widest">{difficulty} Mode</span>
          </div>
          <p className="text-6xl mb-16 font-mono text-yellow-400 drop-shadow-lg font-bold">
             {score} <span className="text-2xl text-white/50">PTS</span>
          </p>
          <button 
            onClick={resetQuiz}
            className={`px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 mx-auto ${theme.button} hover:scale-105 transition-transform shadow-2xl`}
          >
            <RefreshCw /> Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!question) {
      return <div>Loading...</div>;
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 ${theme.bg} ${theme.text} overflow-hidden relative`}>
      {/* Background Pulse for Low Time */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500 ${timeLeft < 5 ? 'bg-red-900 animate-pulse' : ''}`} />

      {/* Timer Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white/10">
         <motion.div 
            className={`h-full ${timeLeft < 5 ? 'bg-red-500' : 'bg-blue-500'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / maxTime) * 100}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
         />
      </div>

      <div className="w-full max-w-5xl z-10">
        <div className="flex justify-between items-center mb-12">
           <button onClick={resetQuiz} className="p-3 rounded-full hover:bg-white/10 opacity-60 hover:opacity-100 transition-all border border-transparent hover:border-white/20">
                <ArrowLeft size={24} />
           </button>
           
           <div className="flex items-center gap-3 px-6 py-2 bg-black/30 rounded-full backdrop-blur-md border border-white/5">
              <span className="font-mono text-sm opacity-60 tracking-wider">QUESTION</span>
              <span className="font-bold text-lg">{currentQ + 1} <span className="opacity-40 text-sm">/ {questions.length}</span></span>
           </div>

           <div className="flex items-center gap-3 px-6 py-2 bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              <Flame size={20} fill="currentColor" className="animate-pulse" />
              <span className="text-2xl font-bold font-mono">{score}</span>
           </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={question.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="mb-16 min-h-[160px] flex items-center justify-center"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center leading-tight drop-shadow-xl">
              {question.question}
            </h2>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.options.map((opt, idx) => {
            let bgClass = 'bg-white/5 border-2 border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg';
            let textColor = 'text-white/80';
            
            if (showResult) {
              if (idx === question.correctIndex) {
                 bgClass = 'bg-green-500 border-green-400 shadow-[0_0_40px_rgba(34,197,94,0.4)] scale-[1.02]';
                 textColor = 'text-white';
              }
              else if (idx === selected) {
                 bgClass = 'bg-red-500 border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.4)] opacity-50';
                 textColor = 'text-white';
              }
              else bgClass = 'opacity-20 bg-black/20 border-transparent blur-sm';
            }

            return (
              <motion.button
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={selected === null ? { scale: 1.02 } : {}}
                whileTap={selected === null ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(idx)}
                className={`p-8 rounded-2xl text-xl md:text-2xl font-bold text-left transition-all relative overflow-hidden group ${bgClass} ${textColor}`}
                disabled={selected !== null}
              >
                <div className="flex justify-between items-center relative z-10">
                  <span>{opt}</span>
                  {showResult && idx === question.correctIndex && <Check size={32} strokeWidth={4} />}
                  {showResult && idx === selected && idx !== question.correctIndex && <X size={32} strokeWidth={4} />}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-blue-600/90 backdrop-blur-md text-white rounded-2xl text-center shadow-2xl border border-blue-400/50 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
               <Zap size={20} className="text-yellow-300" fill="currentColor" />
               <span className="font-bold text-blue-200 text-sm uppercase tracking-wider">Insight</span>
            </div>
            <p className="text-xl font-medium">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizView;