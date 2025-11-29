import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Monitor, GraduationCap, Gamepad2, BookA, PenTool, Settings } from 'lucide-react';
import { SLIDES } from './constants';
import SlideView from './components/SlideView';
import QuizView from './components/QuizView';
import VocabView from './components/VocabView';
import SimulationView from './components/SimulationView';
import { VibeMode, THEMES } from './types';

const NavLink = ({ to, icon: Icon, label, theme }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-current/10 font-bold' : 'opacity-60 hover:opacity-100'}`}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
};

const App: React.FC = () => {
  const [vibe, setVibe] = useState<VibeMode>('ambivert');
  const theme = THEMES[vibe];

  return (
    <HashRouter>
      <div className={`w-screen h-screen flex flex-col overflow-hidden font-sans ${theme.bg} transition-colors duration-500`}>
        {/* Sticky Header */}
        <header className={`h-16 flex items-center justify-between px-6 z-50 ${theme.nav} ${theme.text}`}>
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 bg-current rounded-full flex items-center justify-center text-white text-xs">PC</span>
            TASK 1 MASTER
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" icon={Monitor} label="Teacher" theme={theme} />
            <NavLink to="/student" icon={GraduationCap} label="Student" theme={theme} />
            <NavLink to="/kahoot" icon={Gamepad2} label="Kahoot" theme={theme} />
            <NavLink to="/vocab" icon={BookA} label="Vocab" theme={theme} />
            <NavLink to="/simulation" icon={PenTool} label="Sim" theme={theme} />
          </nav>

          <div className="flex items-center gap-2 bg-black/5 p-1 rounded-full">
            {(['introvert', 'ambivert', 'extrovert'] as VibeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setVibe(m)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${vibe === m ? 'bg-current text-white scale-110 shadow-lg' : 'opacity-40 hover:opacity-80'}`}
                title={`${m} mode`}
              >
                <div className={`w-3 h-3 rounded-full ${m === 'introvert' ? 'bg-stone-400' : m === 'ambivert' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
              </button>
            ))}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<SlideView slides={SLIDES} vibe={vibe} role="teacher" />} />
            <Route path="/student" element={<SlideView slides={SLIDES} vibe={vibe} role="student" />} />
            <Route path="/kahoot" element={<QuizView vibe={vibe} />} />
            <Route path="/vocab" element={<VocabView vibe={vibe} />} />
            <Route path="/simulation" element={<SimulationView vibe={vibe} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;