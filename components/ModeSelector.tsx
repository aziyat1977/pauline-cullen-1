
import React from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../types';
import { GraduationCap, Gamepad2, Presentation, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  onSelect: (role: UserRole) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-black pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Select Your Mode</h1>
        <p className="text-xl text-gray-400">How will you be using the platform today?</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10">
        
        {/* STUDENT MODE */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('student')}
          className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-8 text-left transition-all hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Student Mode</h2>
            <p className="text-gray-400 mb-8 flex-grow">
              Gamified learning path. Earn XP, maintain streaks, and unlock levels by mastering quizzes.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-blue-400">
              <Sparkles size={16} /> LEARNING AI ENABLED
            </div>
          </div>
        </motion.button>

        {/* TEACHER MODE */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('teacher')}
          className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-8 text-left transition-all hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
              <Presentation size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Teacher Mode</h2>
            <p className="text-gray-400 mb-8 flex-grow">
              Presentation tools. Control the flow, access speaker notes, and toggle answers instantly.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-emerald-400">
              <GraduationCap size={16} /> CLASSROOM READY
            </div>
          </div>
        </motion.button>

      </div>
    </div>
  );
};

export default ModeSelector;
