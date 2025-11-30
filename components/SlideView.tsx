import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Globe, AlertTriangle, CheckCircle, 
  BarChart2, Volume2, Check, X, Link, TrendingUp, Users, Flame, Trophy, Star, BrainCircuit, Grip, Eye, EyeOff
} from 'lucide-react';
import { SlideContent, VibeMode, THEMES, GeneratedQuizQuestion, VisualType, UserState, UserRole } from '../types';
import { playSound, generateQuizzesForSlide } from '../utils';
import MiniQuizSlide from './MiniQuizSlide';
import { TaskVsResponseVisual, SelectionFunnelVisual } from './AnimatedExplanations';

interface SlideViewProps {
  slides: SlideContent[];
  vibe: VibeMode;
  role: UserRole;
  userState: UserState;
  slideIndex: number;
  onQuizComplete: (correct: boolean) => void;
  onSlideComplete: (index: number) => void;
  onSlideChange: (index: number) => void;
}

type StepMode = 'content' | 'quiz';

// --- VISUAL COMPONENTS ---

const MountainVisual = ({ theme }: { theme: any }) => (
  <div className="flex items-end justify-center gap-8 h-[35vh] w-full max-w-4xl mt-8 px-4">
    <div className="flex flex-col items-center gap-3 w-1/3 group">
      <div className="text-sm font-bold opacity-70 tracking-widest uppercase">Mountain A</div>
      <div className={`w-full bg-gradient-to-t from-gray-800 to-gray-500 h-[30vh] clip-path-mountain-a rounded-t-2xl relative shadow-2xl transition-transform duration-500 group-hover:scale-105`}>
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-xs tracking-wider bg-black/50 px-2 py-1 rounded backdrop-blur-sm">STEEP</div>
      </div>
    </div>
    <div className="flex flex-col items-center gap-3 w-1/3 group">
      <div className="text-sm font-bold opacity-70 tracking-widest uppercase">Mountain B</div>
      <div className={`w-full bg-gradient-to-t from-blue-900 to-blue-500 h-[20vh] clip-path-mountain-b rounded-t-2xl relative shadow-2xl transition-transform duration-500 group-hover:scale-105`}>
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-xs tracking-wider bg-black/50 px-2 py-1 rounded backdrop-blur-sm">GENTLE</div>
      </div>
    </div>
  </div>
);

const TransportGraphVisual = () => {
  const categories = [
    { type: 'Bus', color: 'bg-stone-400' },
    { type: 'Car', color: 'bg-stone-500' },
    { type: 'Bike', color: 'bg-stone-600' },
    { type: 'Foot', color: 'bg-stone-700' }
  ];

  const [activeCategories, setActiveCategories] = useState<string[]>(categories.map(c => c.type));

  const toggleCategory = (type: string) => {
    setActiveCategories(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const data = [
    { year: 1950, values: [ { type: 'Bus', val: 18 }, { type: 'Car', val: 7 }, { type: 'Bike', val: 28 }, { type: 'Foot', val: 38 } ] },
    { year: 1970, values: [ { type: 'Bus', val: 30 }, { type: 'Car', val: 26 }, { type: 'Bike', val: 22 }, { type: 'Foot', val: 16 } ] },
    { year: 1990, values: [ { type: 'Bus', val: 16 }, { type: 'Car', val: 38 }, { type: 'Bike', val: 9 }, { type: 'Foot', val: 10 } ] },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-3xl mt-8 text-black border border-white/20 ring-1 ring-black/5">
      <h3 className="text-sm font-bold mb-6 text-center tracking-widest uppercase opacity-70">Transport Trends (1950-1990)</h3>
      
      {/* Interactive Legend */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.type}
            onClick={() => toggleCategory(cat.type)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border
              ${activeCategories.includes(cat.type) 
                ? 'border-gray-300 bg-gray-100 shadow-sm scale-105 text-black' 
                : 'border-transparent opacity-40 grayscale hover:opacity-70'
              }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></div>
            {cat.type}
          </button>
        ))}
      </div>

      <div className="flex justify-around items-end h-[30vh] border-b border-gray-200 pb-4">
        {data.map((group, i) => (
          <div key={i} className="flex gap-2 items-end h-full w-1/4 justify-center relative">
             {/* Grid line effect behind */}
             <div className="absolute inset-0 border-r border-gray-50 last:border-0 pointer-events-none" />
            {group.values.map((item, j) => {
              const catConfig = categories.find(c => c.type === item.type);
              const isVisible = activeCategories.includes(item.type);
              
              return (
                <div 
                  key={j} 
                  className={`w-4 md:w-8 relative group ${catConfig?.color} transition-all duration-700 ease-out cursor-pointer rounded-t-sm hover:brightness-90
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `} 
                  style={{ height: isVisible ? `${item.val * 2.2}%` : '0%' }}
                >
                   {isVisible && (
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-xl transition-all duration-300 z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0 flex flex-col items-center">
                        <span className="font-bold whitespace-nowrap">{item.val}%</span>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                     </div>
                   )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-4 font-mono text-sm opacity-60">
        {data.map(d => <div key={d.year}>{d.year}</div>)}
      </div>
    </div>
  )
};

const MillennialsVisual = () => (
  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-full max-w-lg mt-8 text-left border border-white/20 transform hover:scale-[1.02] transition-transform duration-500">
    <h3 className="font-bold text-xl mb-6 flex items-center justify-between border-b pb-4">
      <span>Generation Survey</span>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">Live Data</span>
    </h3>
    <div className="space-y-8">
      <div className="flex items-center gap-4 group">
        <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors"><TrendingUp className="text-green-600 w-6 h-6" /></div>
        <div className="flex-grow">
          <div className="flex justify-between font-bold text-base mb-2"><span>Walking</span> <span>83%</span></div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '83%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-green-500 h-full rounded-full relative"
            >
              <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-white/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 group">
        <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors"><Users className="text-blue-600 w-6 h-6" /></div>
        <div className="flex-grow">
           <div className="flex justify-between font-bold text-base mb-2"><span>Driving</span> <span>71%</span></div>
           <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '71%' }}
               transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
               className="bg-blue-500 h-full rounded-full relative"
             >
                <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-white/30 to-transparent" />
             </motion.div>
           </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 font-mono text-right mt-4">Source: Local Government Transportation Survey</div>
    </div>
  </div>
);

const ImpactTableVisual = ({ theme }: { theme: any }) => (
  <div className="w-full max-w-2xl mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm">
    <table className={`w-full text-center ${theme.text}`}>
      <thead className="bg-black/40 uppercase text-sm font-bold tracking-wider text-gray-400">
        <tr>
          <th className="py-4 px-6">Task 1</th>
          <th className="py-4 px-6">Task 2</th>
          <th className="py-4 px-6 bg-blue-600/80 text-white">Overall</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 text-3xl font-mono">
        <tr className="group hover:bg-white/5 transition-colors">
          <td className="py-6 group-hover:text-blue-400 transition-colors">5</td>
          <td className="py-6">7</td>
          <td className="py-6 font-bold bg-blue-600/10 text-blue-400">6.5</td>
        </tr>
        <tr className="group hover:bg-white/5 transition-colors">
          <td className="py-6 group-hover:text-blue-400 transition-colors">6</td>
          <td className="py-6">8</td>
          <td className="py-6 font-bold bg-blue-600/10 text-blue-400">7.5</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ScientificVisual = () => (
  <div className="flex gap-6 mt-8 w-full max-w-3xl">
     <div className="flex-1 bg-white p-6 rounded-2xl text-black opacity-40 relative border border-gray-200 scale-95 blur-[1px]">
        <div className="h-4 w-3/4 bg-gray-200 mb-3 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 mb-3 rounded"></div>
        <div className="h-32 bg-gray-50 mt-6 rounded-lg flex items-end justify-around pb-2 px-4">
           <div className="w-6 bg-red-300 h-1/2 rounded-t"></div>
        </div>
        <div className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg"><X size={20} /></div>
     </div>
     <div className="flex-1 bg-white p-6 rounded-2xl text-black shadow-2xl border-2 border-green-500 relative transform scale-105 z-10">
        <div className="h-4 w-3/4 bg-gray-800 mb-3 rounded"></div>
        <div className="h-4 w-full bg-gray-600 mb-3 rounded"></div>
        <div className="h-32 bg-gray-50 mt-6 rounded-lg flex items-end justify-around pb-2 px-4 border border-gray-100">
           <div className="w-6 bg-blue-500 h-1/2 rounded-t shadow-lg"></div>
           <div className="w-6 bg-blue-500 h-3/4 rounded-t shadow-lg"></div>
        </div>
        <div className="absolute -top-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg ring-4 ring-white"><Check size={24} /></div>
     </div>
  </div>
);

const ChecklistVisual = ({ items, theme }: { items: string[], theme: any }) => (
  <div className="w-full max-w-xl mt-8 space-y-3 text-left">
    {items.map((item, i) => (
      <motion.div 
        key={i}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: i * 0.15, type: "spring" }}
        className={`flex items-center gap-4 p-4 rounded-xl ${theme.card} border border-white/5 hover:border-white/20 transition-all group`}
      >
        <div className="min-w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
          <Check size={18} strokeWidth={3} />
        </div>
        <span className="text-lg md:text-xl font-medium opacity-90 group-hover:opacity-100">{item}</span>
      </motion.div>
    ))}
  </div>
);

const ChartPracticeVisual = () => (
  <div className="bg-zinc-100 p-8 rounded-2xl mt-8 w-full max-w-2xl shadow-xl">
    <div className="flex items-end gap-3 h-48 border-b-2 border-l-2 border-gray-300 p-2">
      {[40, 60, 35, 80, 50, 90, 45].map((h, i) => (
        <motion.div 
          key={i} 
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 1, delay: i * 0.1, type: 'spring' }}
          className="flex-1 bg-gradient-to-t from-orange-400 to-orange-300 hover:from-orange-500 hover:to-orange-400 transition-all relative group cursor-pointer rounded-t-sm shadow-sm"
        >
           <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-3 py-1.5 rounded-lg transition-all duration-300 z-10 font-bold whitespace-nowrap transform translate-y-2 group-hover:translate-y-0 flex flex-col items-center shadow-xl">
             <span>{h}%</span>
             <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45"></div>
           </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const SlideView: React.FC<SlideViewProps> = ({ slides, vibe, role, userState, slideIndex, onQuizComplete, onSlideComplete, onSlideChange }) => {
  const [mode, setMode] = useState<StepMode>('content');
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<GeneratedQuizQuestion | null>(null);
  const [teacherMenuOpen, setTeacherMenuOpen] = useState(false);
  
  const theme = THEMES[vibe];
  const currentSlide = slides[slideIndex];

  // Initialize quiz when slide changes
  useEffect(() => {
    const questions = generateQuizzesForSlide(currentSlide);
    if (questions.length > 0) {
      setQuizQuestion(questions[0]); 
    } else {
      setQuizQuestion(null);
    }
  }, [slideIndex, currentSlide]);

  const handleNext = () => {
    playSound('click', vibe);
    
    // TEACHER: Can skip quizzes freely
    if (role === 'teacher') {
      if (slideIndex < slides.length - 1) {
        onSlideChange(slideIndex + 1);
        setMode('content');
        setShowTranslation(false);
      }
      return;
    }

    // STUDENT: Content -> Quiz (If not done and Quiz exists) -> Next
    if (mode === 'content' && quizQuestion && !userState.completedSlides.includes(slideIndex)) {
      setMode('quiz');
    } else {
      if (slideIndex < slides.length - 1) {
        onSlideComplete(slideIndex); // Mark current done
        onSlideChange(slideIndex + 1);
        setMode('content');
        setShowTranslation(false);
      }
    }
  };

  const handlePrev = () => {
    playSound('click', vibe);
    if (mode === 'quiz') {
      setMode('content');
    } else {
      if (slideIndex > 0) {
        onSlideChange(slideIndex - 1);
        setMode('content');
        setShowTranslation(false);
      }
    }
  };

  const onQuizFinish = (correct: boolean) => {
    onQuizComplete(correct);
    if (correct) {
       onSlideComplete(slideIndex);
       // Auto advance only for student
       setTimeout(() => {
         if (slideIndex < slides.length - 1) {
           onSlideChange(slideIndex + 1);
           setMode('content');
           setShowTranslation(false);
         }
       }, 1500);
    }
  };

  const getVisualContent = (visual: VisualType | undefined) => {
    switch(visual) {
      case 'warning': return (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-red-500/10 p-8 rounded-full mb-8 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        >
          <AlertTriangle className="w-20 h-20 text-red-500 animate-pulse" strokeWidth={1.5} />
        </motion.div>
      );
      case 'check': return (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-green-500/10 p-8 rounded-full mb-8 border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
        >
          <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
        </motion.div>
      );
      case 'graph': return <TransportGraphVisual />;
      case 'quote': return (
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="bg-purple-500/10 p-8 rounded-full mb-8 border border-purple-500/30"
        >
          <Volume2 className="w-20 h-20 text-purple-400" strokeWidth={1.5} />
        </motion.div>
      );
      case 'mountain': return <MountainVisual theme={theme} />;
      case 'millennials': return <MillennialsVisual />;
      case 'scientific': return <ScientificVisual />;
      case 'impact-table': return <ImpactTableVisual theme={theme} />;
      case 'checklist': return <ChecklistVisual items={currentSlide.lines} theme={theme} />;
      case 'chart-practice': return <ChartPracticeVisual />;
      case 'vocab-check': return (
        <div className="flex flex-col gap-4 mt-8 w-full max-w-lg text-lg">
           <motion.div initial={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: 0.2}} className="flex items-center gap-4 text-green-400 bg-green-500/10 p-6 rounded-2xl border border-green-500/20"><CheckCircle size={28} /> "New pedestrian way"</motion.div>
           <motion.div initial={{x: 50, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: 0.4}} className="flex items-center gap-4 text-red-400 bg-red-500/10 p-6 rounded-2xl border border-red-500/20"><X size={28} /> "New mall"</motion.div>
        </div>
      );
      case 'magpie': return <div className="text-8xl mt-4 animate-bounce drop-shadow-2xl">🦜✨</div>;
      case 'sources': return <div className="mt-8 grid grid-cols-1 gap-4 text-blue-400 underline text-sm">{currentSlide.lines.map(l => <div key={l}><Link className="inline mr-2 w-4 h-4"/>{l}</div>)}</div>;
      case 'split': return <TaskVsResponseVisual />;
      case 'funnel-filter': return <SelectionFunnelVisual />;
      default: return null;
    }
  };

  // QUIZ MODE RENDER
  if (mode === 'quiz' && quizQuestion) {
    return (
      <div className="relative w-full h-[100dvh]">
         <MiniQuizSlide quiz={quizQuestion} vibe={vibe} onComplete={onQuizFinish} />
         <div className="absolute bottom-8 left-8">
            <button onClick={handlePrev} className={`p-4 rounded-full ${theme.button} opacity-50 hover:opacity-100 transition-opacity`}>
              <ArrowLeft size={24} />
            </button>
         </div>
      </div>
    );
  }

  // CONTENT MODE RENDER
  return (
    <div className={`w-full h-[100dvh] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden ${theme.bg} ${theme.text} transition-colors duration-700`}>
      
      {/* STUDENT HUD */}
      {role === 'student' && (
        <motion.div 
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="absolute top-4 left-4 z-40 flex items-center gap-4 bg-black/20 backdrop-blur-md p-2 pr-6 rounded-full border border-white/5"
        >
          {userState.avatar && (
            <div className={`w-12 h-12 rounded-full ${userState.avatar.color} flex items-center justify-center text-2xl shadow-lg ring-2 ring-white/20 relative`}>
              {userState.avatar.emoji}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Level {userState.level}</div>
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-sm">
               <Trophy size={14} fill="currentColor" /> {userState.xp.toLocaleString()} XP
            </div>
          </div>
          <div className="ml-2 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
             <Flame className={`${userState.streak > 0 ? 'text-orange-500' : 'text-gray-600'} w-4 h-4`} fill={userState.streak > 0 ? 'currentColor' : 'none'} />
             <span className="font-mono font-bold text-base">{userState.streak}</span>
          </div>
        </motion.div>
      )}

      {/* TEACHER CONTROLS */}
      {role === 'teacher' && (
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={() => setTeacherMenuOpen(!teacherMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/90 backdrop-blur rounded-xl border border-white/10 hover:bg-zinc-700 shadow-xl transition-all"
          >
            <Grip size={18} /> <span className="text-sm font-bold tracking-wide">CONTROLS</span>
          </button>
          
          <AnimatePresence>
            {teacherMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-14 left-0 w-72 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 z-50"
              >
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Jump to Slide</div>
                <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto mb-2 custom-scrollbar pr-1">
                  {slides.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => { onSlideChange(i); setTeacherMenuOpen(false); }}
                      className={`h-8 rounded text-xs font-bold transition-all ${i === slideIndex ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3">
                   <div className="flex justify-between items-center text-xs text-zinc-400 mb-2">
                      <span>Quiz Type:</span>
                      <span className="font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{quizQuestion?.type || 'None'}</span>
                   </div>
                   {quizQuestion && (
                     <button 
                       onClick={() => { setMode('quiz'); setTeacherMenuOpen(false); }}
                       className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                     >
                       <Eye size={14} /> PREVIEW QUIZ
                     </button>
                   )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-0">
        <motion.div 
          className={`h-full relative overflow-hidden ${vibe === 'extrovert' ? 'bg-yellow-400' : vibe === 'introvert' ? 'bg-stone-400' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${((slideIndex + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        >
           <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 flex gap-3 z-30">
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className={`p-3 rounded-full ${theme.button} backdrop-blur-md shadow-lg transition-all hover:scale-105 hover:bg-opacity-100 border border-white/10`}
          title="Toggle Translation"
        >
          <Globe size={20} />
        </button>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="max-w-6xl w-full flex flex-col items-center text-center z-10 overflow-y-auto max-h-[85dvh] hide-scrollbar py-8 px-4"
        >
          {/* Main Visual */}
          {!['checklist', 'sources', 'impact-table', 'scientific', 'millennials', 'mountain', 'chart-practice'].includes(currentSlide.visual || '') && getVisualContent(currentSlide.visual)}

          {currentSlide.title && (
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-10 font-bold tracking-tight leading-tight drop-shadow-lg ${vibe === 'extrovert' ? 'uppercase text-yellow-400 font-mono tracking-tighter' : 'font-serif'}`}
            >
              {currentSlide.title}
            </motion.h1>
          )}

          {/* Lines */}
          {!['checklist', 'sources', 'impact-table'].includes(currentSlide.visual || '') && (
             <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 w-full">
             {currentSlide.lines.map((line, i) => {
                const isBlue = line.includes("150 words") || line.includes("Summarise by selecting") || line.includes("You are not preparing");
                const isRed = line.includes("List all") || line.includes("Irrelevant commentary");
                
                let icon = null;
                if (currentSlide.visual === 'list-dots') icon = <span className="mr-4 opacity-40">•</span>;
                if (currentSlide.visual === 'list-check') icon = <Check className="inline-block mr-4 text-green-500 w-8 h-8" />;
                if (currentSlide.visual === 'list-x') icon = <X className="inline-block mr-4 text-red-500 w-8 h-8" />;

                return (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.15 + 0.3 }}
                   className={`text-xl md:text-2xl lg:text-3xl leading-normal ${theme.font} 
                     ${isBlue ? 'text-blue-400 font-bold drop-shadow-md' : 'opacity-90'} 
                     ${isRed ? 'text-red-400 font-bold drop-shadow-md' : ''}
                   `}
                 >
                   {icon}
                   {line}
                 </motion.div>
               );
             })}
           </div>
          )}

          {/* Complex Visuals */}
          {['checklist', 'sources', 'impact-table', 'scientific', 'millennials', 'mountain', 'chart-practice'].includes(currentSlide.visual || '') && getVisualContent(currentSlide.visual)}

          {showTranslation && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className={`mt-10 p-6 md:p-8 rounded-2xl ${theme.highlight} text-lg md:text-xl w-full max-w-3xl mx-auto border border-white/10 shadow-2xl backdrop-blur-md`}
            >
              <div className="flex flex-col gap-4">
                 <div className="flex gap-4">
                   <span className="font-bold text-blue-400 w-10 shrink-0">RU</span>
                   <p className="opacity-90">{currentSlide.ru}</p>
                 </div>
                 <div className="w-full h-px bg-white/10"></div>
                 <div className="flex gap-4">
                   <span className="font-bold text-green-400 w-10 shrink-0">UZ</span>
                   <p className="opacity-90">{currentSlide.uz}</p>
                 </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 flex gap-8 z-20 items-center">
        <button onClick={handlePrev} disabled={slideIndex === 0 && mode === 'content'} className={`p-5 rounded-full ${theme.button} disabled:opacity-20 disabled:cursor-not-allowed backdrop-blur-md shadow-xl border border-white/10 hover:scale-105 transition-all`}>
          <ArrowLeft size={28} />
        </button>
        <div className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm opacity-40 bg-black/20 backdrop-blur`}>
          {slideIndex + 1} / {slides.length}
        </div>
        <button 
           onClick={handleNext} 
           className={`p-5 rounded-full ${theme.button} flex items-center gap-2 shadow-2xl shadow-blue-500/10 border border-white/10 hover:scale-110 transition-all`}
        >
           {/* Hint at quiz if coming up (Student Only) */}
           {role === 'student' && mode === 'content' && !userState.completedSlides.includes(slideIndex) && quizQuestion ? <BrainCircuit size={28} className="animate-pulse text-yellow-300" /> : <ArrowRight size={28} />}
           {/* Standard arrow for Teacher or completed */}
           {role === 'teacher' && <ArrowRight size={28} />}
        </button>
      </div>

      <style>{`
        .clip-path-mountain-a { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        .clip-path-mountain-b { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SlideView;