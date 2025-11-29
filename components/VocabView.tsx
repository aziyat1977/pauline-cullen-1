import React from 'react';
import { motion } from 'framer-motion';
import { VOCABULARY } from '../constants';
import { VibeMode, THEMES } from '../types';

interface VocabViewProps {
  vibe: VibeMode;
}

const VocabView: React.FC<VocabViewProps> = ({ vibe }) => {
  const theme = THEMES[vibe];

  return (
    <div className={`w-full min-h-full overflow-y-auto p-8 ${theme.bg} ${theme.text}`}>
      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center sticky top-0 py-4 bg-inherit z-10">Essential Vocabulary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-20">
        {VOCABULARY.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-8 rounded-2xl flex flex-col h-full ${theme.highlight} border-2 border-transparent hover:border-current transition-all`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme.accent}`}>{item.term}</h3>
            <div className="w-12 h-1 bg-current opacity-20 mb-6" />
            <p className="text-lg mb-6 leading-relaxed flex-grow">{item.definition}</p>
            <div className="text-sm opacity-70 italic border-l-4 border-current pl-4">
              "{item.example}"
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VocabView;