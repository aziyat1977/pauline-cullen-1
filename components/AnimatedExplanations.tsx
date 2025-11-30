
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, Filter, ArrowDown, Database, Check, X, Scale } from 'lucide-react';

export const TaskVsResponseVisual = () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl h-[400px] gap-4 mt-8">
      {/* TASK 1 SIDE */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex-1 bg-blue-600/10 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden flex flex-col items-center shadow-[0_0_20px_rgba(37,99,235,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
        <div className="bg-blue-500 text-white p-3 rounded-full mb-4 shadow-lg shadow-blue-500/30">
          <FileText size={32} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">TASK 1</h3>
        <h4 className="text-sm font-mono opacity-70 mb-6 uppercase tracking-widest text-blue-200">Task Achievement</h4>
        
        <div className="space-y-4 w-full">
          {/* EMPHASIZED: Data & Facts */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: [1, 1.03, 1],
              borderColor: ["rgba(59,130,246,0.3)", "rgba(59,130,246,0.8)", "rgba(59,130,246,0.3)"]
            }}
            transition={{ delay: 0.3, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-blue-900/40 p-4 rounded-lg border border-blue-500/30 shadow-lg"
          >
            <Database size={20} className="text-blue-400" />
            <span className="text-base font-bold text-white">Data & Facts</span>
          </motion.div>

          {/* EMPHASIZED: Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: [1, 1.03, 1],
              borderColor: ["rgba(59,130,246,0.3)", "rgba(59,130,246,0.8)", "rgba(59,130,246,0.3)"]
            }}
            transition={{ delay: 1.0, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-blue-900/40 p-4 rounded-lg border border-blue-500/30 shadow-lg"
          >
            <Filter size={20} className="text-blue-400" />
            <span className="text-base font-bold text-white">Summary</span>
          </motion.div>

          {/* DE-EMPHASIZED: No Opinion */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3 bg-red-900/10 p-3 rounded-lg border border-red-500/20 opacity-70"
          >
            <X size={18} className="text-red-400" />
            <span className="text-sm font-bold text-red-300">No Opinions</span>
          </motion.div>
        </div>
      </motion.div>

      {/* VS BADGE */}
      <div className="flex items-center justify-center -my-4 md:my-0 md:-mx-4 z-20">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white text-black font-black rounded-full w-12 h-12 flex items-center justify-center shadow-xl text-xl border-4 border-zinc-900"
        >
          VS
        </motion.div>
      </div>

      {/* TASK 2 SIDE */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="flex-1 bg-orange-600/10 border border-orange-500/30 rounded-xl p-6 relative overflow-hidden flex flex-col items-center shadow-[0_0_20px_rgba(249,115,22,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
        <div className="bg-orange-500 text-white p-3 rounded-full mb-4 shadow-lg shadow-orange-500/30">
          <MessageCircle size={32} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-2">TASK 2</h3>
        <h4 className="text-sm font-mono opacity-70 mb-6 uppercase tracking-widest text-orange-200">Task Response</h4>
        
        <div className="space-y-4 w-full">
          {/* EMPHASIZED: Your Opinion */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, 2, 0],
              borderColor: ["rgba(249,115,22,0.3)", "rgba(249,115,22,0.8)", "rgba(249,115,22,0.3)"]
            }}
            transition={{ delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-orange-900/40 p-4 rounded-lg border border-orange-500/30 shadow-lg"
          >
            <Check size={20} className="text-orange-400" />
            <span className="text-base font-bold text-white">Your Opinion</span>
          </motion.div>

          {/* EMPHASIZED: Arguments */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, -2, 0],
              borderColor: ["rgba(249,115,22,0.3)", "rgba(249,115,22,0.8)", "rgba(249,115,22,0.3)"]
            }}
            transition={{ delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-orange-900/40 p-4 rounded-lg border border-orange-500/30 shadow-lg"
          >
            <Scale size={20} className="text-orange-400" />
            <span className="text-base font-bold text-white">Arguments</span>
          </motion.div>

          {/* Normal Conclusion */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3 bg-orange-900/20 p-3 rounded-lg border border-orange-500/20 opacity-80"
          >
             <Check size={18} className="text-orange-400" />
            <span className="text-sm font-bold text-orange-200">Conclusion</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const SelectionFunnelVisual = () => {
  const rawData = [
    { id: 1, text: "15%", type: 'noise', x: '10%' },
    { id: 2, text: "Rising Trend", type: 'gold', x: '30%' },
    { id: 3, text: "1995", type: 'noise', x: '50%' },
    { id: 4, text: "Peaked at 50", type: 'gold', x: '70%' },
    { id: 5, text: "Blue bar", type: 'noise', x: '85%' },
    { id: 6, text: "Steep Drop", type: 'gold', x: '40%' },
  ];

  return (
    <div className="relative w-full max-w-lg h-[450px] mt-8 bg-zinc-900/50 rounded-xl border border-white/10 p-4 flex flex-col items-center overflow-hidden">
      <h3 className="absolute top-4 left-4 text-xs font-mono opacity-50 uppercase">Data Processing</h3>

      {/* Falling Data Items */}
      {rawData.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ y: -50, x: item.x, opacity: 0 }}
          animate={{ 
            y: [ -20, 150, item.type === 'gold' ? 350 : 200 ], 
            opacity: [0, 1, item.type === 'gold' ? 1 : 0],
            scale: item.type === 'gold' ? [1, 1, 1.5] : [1, 1, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className={`absolute text-xs md:text-sm font-bold px-2 py-1 rounded ${
            item.type === 'gold' ? 'bg-yellow-500 text-black z-20 shadow-[0_0_15px_rgba(234,179,8,0.6)]' : 'bg-gray-700 text-gray-400 z-10'
          }`}
          style={{ left: 0 }} 
        >
          {item.text}
        </motion.div>
      ))}

      {/* The Filter */}
      <div className="absolute top-[180px] w-3/4 h-16 bg-blue-600/80 backdrop-blur-sm rounded-lg border-2 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 z-30">
        <Filter className="text-white animate-pulse" />
        <span className="font-bold text-white text-sm md:text-lg">SELECTING MAIN FEATURES</span>
      </div>

      {/* Funnel Graphics */}
      <svg className="absolute top-[160px] w-full h-[100px] z-0 opacity-20 pointer-events-none">
        <path d="M 50 0 L 150 100 L 250 100 L 350 0" fill="none" stroke="white" strokeWidth="2" />
      </svg>

      {/* Output Area */}
      <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-green-900/50 to-transparent flex flex-col items-center justify-end pb-6">
        <div className="flex gap-2 mb-2">
           <ArrowDown className="text-green-400 animate-bounce" />
           <span className="text-green-400 font-mono text-xs">TASK 1 REPORT</span>
        </div>
        <div className="flex gap-2">
           <div className="w-16 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
           <div className="w-24 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
           <div className="w-12 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
        </div>
      </div>
    </div>
  );
};
