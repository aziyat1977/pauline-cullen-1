import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Globe, AlertTriangle, CheckCircle, BarChart2 } from 'lucide-react';
import { SlideContent, VibeMode, THEMES, GeneratedQuizQuestion } from '../types';
import { playSound, generateQuizzesForSlide } from '../utils';
import MiniQuizSlide from './MiniQuizSlide';

interface SlideViewProps {
  slides: SlideContent[];
  vibe: VibeMode;
  role: 'teacher' | 'student';
}

// 0 = Content Slide
// 1 = Quiz 1
// 2 = Quiz 2
// 3 = Quiz 3
type StepMode = 0 | 1 | 2 | 3;

const SlideView: React.FC<SlideViewProps> = ({ slides, vibe, role }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [step, setStep] = useState<StepMode>(0); // Current step within the slide (0=content, 1-3=quizzes)
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentQuizzes, setCurrentQuizzes] = useState<GeneratedQuizQuestion[]>([]);
  
  const theme = THEMES[vibe];
  const currentSlide = slides[slideIndex];

  // Generate NEW quizzes whenever we land on a new Content Slide (step 0)
  useEffect(() => {
    if (step === 0) {
      const generated = generateQuizzesForSlide(currentSlide);
      setCurrentQuizzes(generated);
    }
  }, [slideIndex, currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideIndex, step, currentQuizzes]);

  const nextStep = () => {
    playSound('swoosh', vibe);
    
    // If we are on content (0), go to quiz 1 (1)
    if (step < 3) {
      setStep((prev) => (prev + 1) as StepMode);
    } else {
      // If we are on quiz 3 (3), go to next slide content (0)
      if (slideIndex < slides.length - 1) {
        setSlideIndex(slideIndex + 1);
        setStep(0);
        setShowTranslation(false);
      }
    }
  };

  const prevStep = () => {
    playSound('swoosh', vibe);

    if (step > 0) {
      setStep((prev) => (prev - 1) as StepMode);
    } else {
      // Go back to previous slide's last quiz (3)
      if (slideIndex > 0) {
        setSlideIndex(slideIndex - 1);
        setStep(3);
        // We need to regenerate the quizzes for the previous slide to ensure data exists, 
        // though strictly they might change. For a persistent feel we'd need state memory, 
        // but "generating new each time" was the requirement.
        // The useEffect will handle generation when slideIndex updates.
      }
    }
  };

  // Helper to skip quizzes if needed (e.g. for Teacher)
  const skipToNextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
      setStep(0);
      setShowTranslation(false);
      playSound('swoosh', vibe);
    }
  };

  const getVisualIcon = (visual: string) => {
    switch(visual) {
      case 'warning': return <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />;
      case 'check': return <CheckCircle className="w-16 h-16 text-green-500 mb-6" />;
      case 'graph': return <BarChart2 className="w-16 h-16 text-blue-500 mb-6" />;
      case 'quote': return <Volume2 className="w-16 h-16 text-purple-500 mb-6" />;
      default: return null;
    }
  };

  // --- RENDER ---

  // If we are in quiz mode (step 1, 2, or 3)
  if (step > 0) {
    // Safety check if quizzes haven't generated yet
    if (!currentQuizzes[step - 1]) return <div className="flex items-center justify-center h-full">Loading Quiz...</div>;

    return (
      <div className="relative w-full h-full">
         <MiniQuizSlide 
           quiz={currentQuizzes[step - 1]} 
           vibe={vibe} 
           onComplete={nextStep} 
           stepNumber={step}
         />
         {/* Navigation Override for Quizzes */}
         <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 pointer-events-none">
            <div className="pointer-events-auto flex gap-4">
              <button onClick={prevStep} className={`p-3 rounded-full ${theme.button} opacity-50 hover:opacity-100`}>
                <ArrowLeft size={24} />
              </button>
              {role === 'teacher' && (
                <button onClick={skipToNextSlide} className={`px-4 py-2 rounded-full ${theme.button} text-sm font-bold opacity-70 hover:opacity-100`}>
                  SKIP ALL QUIZZES
                </button>
              )}
            </div>
         </div>
      </div>
    );
  }

  // STANDARD CONTENT SLIDE (Step 0)
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden ${theme.bg} ${theme.text} transition-colors duration-500`}>
      
      {/* Progress Bar (Overall) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
        <motion.div 
          className={`h-full ${vibe === 'extrovert' ? 'bg-yellow-400' : vibe === 'introvert' ? 'bg-stone-500' : 'bg-blue-600'}`}
          initial={{ width: 0 }}
          animate={{ width: `${((slideIndex) / slides.length) * 100}%` }}
        />
      </div>

      <div className="absolute top-6 right-6 flex gap-4">
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className={`p-2 rounded-full ${theme.button} transition-transform hover:scale-110`}
          title="Toggle Translation"
        >
          <Globe size={24} />
        </button>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="max-w-4xl w-full flex flex-col items-center text-center z-10"
        >
          {getVisualIcon(currentSlide.visual || 'text')}

          {currentSlide.title && (
            <h1 className={`text-5xl md:text-7xl mb-12 font-bold tracking-tight ${vibe === 'extrovert' ? 'uppercase' : ''}`}>
              {currentSlide.title}
            </h1>
          )}

          <div className="space-y-6">
            {currentSlide.lines.map((line, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className={`text-2xl md:text-4xl leading-tight ${theme.font}`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {showTranslation && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`mt-12 p-6 rounded-lg ${theme.highlight} text-lg md:text-xl max-w-2xl mx-auto`}
            >
              <p className="mb-2 font-semibold text-blue-600/80">RU: {currentSlide.ru}</p>
              <p className="font-semibold text-green-600/80">UZ: {currentSlide.uz}</p>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 flex gap-8 z-20">
        <button onClick={prevStep} disabled={slideIndex === 0 && step === 0} className={`p-4 rounded-full ${theme.button} disabled:opacity-30 disabled:cursor-not-allowed`}>
          <ArrowLeft size={32} />
        </button>
        <div className={`px-6 py-4 rounded-full font-mono text-xl ${theme.highlight}`}>
          Slide {slideIndex + 1}
        </div>
        <button 
           onClick={nextStep} 
           disabled={slideIndex === slides.length - 1 && step === 3} 
           className={`p-4 rounded-full ${theme.button} disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2`}
        >
          <span className="text-xs font-bold uppercase tracking-wider hidden md:block">Start Quiz</span>
          <ArrowRight size={32} />
        </button>
      </div>

      {role === 'teacher' && (
        <div className="absolute bottom-4 left-4 text-xs opacity-50 font-mono">
           TEACHER MODE | ID: {currentSlide.id}
        </div>
      )}
    </div>
  );
};

export default SlideView;