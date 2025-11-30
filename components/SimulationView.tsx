import React, { useState, useEffect } from 'react';
import { VibeMode, THEMES, UserRole } from '../types';
import { Clock, CheckSquare, Save, AlertTriangle, Monitor, RotateCcw } from 'lucide-react';
import { playSound } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SimulationViewProps {
  vibe: VibeMode;
  role: UserRole;
}

const SimulationView: React.FC<SimulationViewProps> = ({ vibe, role }) => {
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [finished, setFinished] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  
  const theme = THEMES[vibe];

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  // Alert Logic
  useEffect(() => {
    if (finished) return;

    if (timeLeft === 300) { // 5 minutes remaining
       playSound('alert', vibe);
       setAlertMessage("5 Minutes Remaining");
       setTimeout(() => setAlertMessage(null), 4000);
    } else if (timeLeft === 60) { // 1 minute remaining
       playSound('alert', vibe);
       setAlertMessage("1 Minute Remaining");
       setTimeout(() => setAlertMessage(null), 4000);
    } else if (timeLeft === 10) { // Final countdown
       if (timeLeft % 2 === 0) playSound('click', vibe); // Ticking sound
    } else if (timeLeft === 0) {
       playSound('wrong', vibe);
       setFinished(true);
    }
  }, [timeLeft, finished, vibe]);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = () => {
    setFinished(true);
  };

  if (finished) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${theme.bg} ${theme.text}`}>
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-3xl w-full text-center"
         >
           <h2 className="text-6xl font-bold mb-6 tracking-tight">Time's Up!</h2>
           <p className="text-2xl mb-12 opacity-80">You wrote <span className="text-blue-400 font-bold text-3xl">{wordCount}</span> words.</p>
           
           <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-left overflow-y-auto max-h-[50vh] whitespace-pre-wrap font-serif text-lg leading-relaxed shadow-inner mb-8">
             {text}
           </div>
           
           <button 
             onClick={() => window.location.reload()} 
             className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mx-auto ${theme.button} hover:scale-105 transition-transform`}
           >
             <RotateCcw size={20} /> Restart Simulation
           </button>
         </motion.div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col md:flex-row ${theme.bg} ${theme.text} overflow-hidden`}>
      
      {/* Task Prompt Side */}
      <div className="w-full md:w-5/12 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto custom-scrollbar bg-black/10 backdrop-blur-sm">
        <div className="bg-white text-black p-8 rounded-xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
          <h3 className="font-bold text-gray-400 text-xs mb-6 uppercase tracking-widest flex items-center gap-2">
            <Monitor size={14} /> IELTS Academic Task 1
          </h3>
          <div className="mb-8 font-serif">
            <p className="mb-6 text-lg leading-relaxed">The graph below shows the percentage of travellers using different modes of transport in a city between 1950 and 1990.</p>
            <div className="bg-gray-50 border border-gray-200 p-6 mb-6 rounded-lg flex items-center justify-center min-h-[250px] shadow-inner">
               {/* Improved Placeholder Visual */}
               <svg viewBox="0 0 400 200" className="w-full h-auto opacity-70">
                  <line x1="40" y1="180" x2="380" y2="180" stroke="#ccc" strokeWidth="2" />
                  <line x1="40" y1="20" x2="40" y2="180" stroke="#ccc" strokeWidth="2" />
                  <path d="M 40 100 Q 150 20 380 150" fill="none" stroke="#2563eb" strokeWidth="4" />
                  <path d="M 40 160 Q 150 100 380 40" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="5,5" />
                  <text x="50" y="40" fill="#2563eb" fontSize="12" fontWeight="bold">Car Usage</text>
                  <text x="300" y="50" fill="#dc2626" fontSize="12" fontWeight="bold">Bicycle Usage</text>
               </svg>
            </div>
            <p className="font-bold text-lg">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <Clock size={16} /> Recommended time: 20 minutes
          </div>
        </div>
      </div>

      {/* Editor Side */}
      <div className="w-full md:w-7/12 flex flex-col relative bg-black/5">
        
        {/* ALERT OVERLAY */}
        <AnimatePresence>
          {alertMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -50, x: "-50%" }}
              className="absolute top-8 left-1/2 z-50 pointer-events-none w-max"
            >
              <div className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_0_50px_rgba(220,38,38,0.5)] flex items-center gap-4 border border-white/20">
                <AlertTriangle size={32} className="animate-pulse" strokeWidth={2.5} />
                <span className="text-2xl uppercase tracking-widest font-mono">{alertMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Toolbar */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/5 bg-black/10 backdrop-blur-md">
          <div className={`flex items-center gap-3 text-2xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'opacity-70'}`}>
            <Clock size={24} />
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className={`text-sm font-bold flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 ${wordCount < 150 ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
            <CheckSquare size={16} />
            <span>{wordCount} / 150 Words</span>
          </div>
        </div>

        <textarea
          className={`flex-grow w-full p-8 md:p-12 text-lg md:text-xl outline-none resize-none font-serif leading-loose tracking-wide custom-scrollbar ${vibe === 'extrovert' ? 'bg-zinc-950 text-gray-200 placeholder-gray-700' : 'bg-white text-gray-800 placeholder-gray-400'}`}
          placeholder="Start typing your report here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          autoFocus
        />
        
        <div className="p-4 border-t border-white/10 bg-black/10 backdrop-blur-md flex justify-between items-center">
             <div className="text-xs opacity-40 font-mono flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                AUTOSAVE ACTIVE
             </div>
             <button onClick={handleSubmit} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 ${theme.button} hover:scale-105 transition-transform shadow-lg`}>
               <Save size={18} /> SUBMIT REPORT
             </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;