import React, { useState, useEffect } from 'react';
import { VibeMode, THEMES } from '../types';
import { Clock } from 'lucide-react';

interface SimulationViewProps {
  vibe: VibeMode;
}

const SimulationView: React.FC<SimulationViewProps> = ({ vibe }) => {
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const theme = THEMES[vibe];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`w-full h-full flex flex-col md:flex-row ${theme.bg} ${theme.text}`}>
      
      {/* Task Prompt Side */}
      <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-300 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm text-black">
          <h3 className="font-bold text-gray-500 text-sm mb-2">WRITING TASK 1</h3>
          <p className="mb-4">You should spend about 20 minutes on this task.</p>
          <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center bg-gray-50 mb-4 h-64 flex items-center justify-center">
            [Interactive Graph Placeholder]
            <br />
            (Transport Modes 1950-1990)
          </div>
          <p className="mb-4 font-serif italic">
            Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
          </p>
          <p className="text-sm">Write at least 150 words.</p>
        </div>
      </div>

      {/* Editor Side */}
      <div className="w-full md:w-1/2 flex flex-col p-8">
        <div className="flex justify-between items-center mb-6">
          <div className={`flex items-center gap-2 text-xl font-mono ${timeLeft < 300 ? 'text-red-500 animate-pulse' : ''}`}>
            <Clock size={24} />
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className={`text-lg font-bold ${wordCount < 150 ? 'text-orange-500' : 'text-green-500'}`}>
            Words: {wordCount} / 150
          </div>
        </div>

        <textarea
          className={`flex-grow w-full p-6 text-lg outline-none resize-none rounded-xl ${vibe === 'extrovert' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 shadow-inner'}`}
          placeholder="Start typing your report here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
        
        <div className="mt-4 flex justify-end">
             <button className={`px-8 py-3 rounded-lg font-bold ${theme.button}`}>
               Submit Report
             </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationView;