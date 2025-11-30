
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AVATARS } from '../constants';
import { Avatar } from '../types';
import { User, Sparkles } from 'lucide-react';
import { playSound } from '../utils';

interface AvatarSelectorProps {
  onSelect: (avatar: Avatar) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (avatar: Avatar) => {
    if (selectedId) return; // Prevent multiple selections
    setSelectedId(avatar.id);
    playSound('click', 'ambivert'); // Default sound feedback
    playSound('levelup', 'ambivert'); 
    
    // Delay actual selection to show the animation
    setTimeout(() => {
      onSelect(avatar);
    }, 800);
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900 to-black pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10"
      >
        <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-4 animate-pulse">
           <User size={48} className="text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Identity</h1>
        <p className="text-xl text-gray-400">Select an avatar to track your progress and XP.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl z-10">
        {AVATARS.map((avatar, idx) => {
          const isSelected = selectedId === avatar.id;
          const isOtherSelected = selectedId !== null && !isSelected;

          return (
            <motion.button
              key={avatar.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isSelected ? 1.2 : isOtherSelected ? 0.85 : 1, 
                opacity: isOtherSelected ? 0.4 : 1,
                y: isSelected ? -20 : 0
              }}
              transition={{ 
                delay: isSelected ? 0 : idx * 0.05,
                type: "spring",
                stiffness: 300
              }}
              whileHover={!selectedId ? { scale: 1.1, y: -10 } : {}}
              whileTap={!selectedId ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(avatar)}
              className="flex flex-col items-center gap-4 group relative"
            >
              {/* Glow Effect for Selected */}
              {isSelected && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  className="absolute inset-0 bg-white/20 blur-3xl rounded-full z-0"
                />
              )}

              <div className={`
                w-24 h-24 md:w-32 md:h-32 rounded-full ${avatar.color} 
                flex items-center justify-center text-5xl md:text-6xl 
                shadow-2xl transition-all relative overflow-hidden z-10
                ${isSelected ? 'ring-4 ring-white shadow-[0_0_50px_rgba(255,255,255,0.6)]' : 'ring-4 ring-transparent group-hover:ring-white/50'}
              `}>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                {avatar.emoji}
                <div className={`absolute inset-0 bg-white transition-opacity ${isSelected ? 'opacity-20' : 'opacity-0 group-hover:opacity-20'}`} />
              </div>
              
              <span className={`
                font-bold text-lg md:text-xl tracking-wider transition-all
                ${isSelected ? 'text-white scale-110' : 'group-hover:text-blue-400'}
              `}>
                {avatar.name}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      <div className="absolute bottom-8 text-gray-500 text-sm flex items-center gap-2">
        <Sparkles size={16} /> Earn XP and maintain your streak!
      </div>
    </div>
  );
};

export default AvatarSelector;
