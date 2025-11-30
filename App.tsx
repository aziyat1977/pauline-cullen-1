import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Monitor, Gamepad2, PenTool, BookOpen, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SLIDES, XP_PER_LEVEL } from './constants';
import SlideView from './components/SlideView';
import QuizView from './components/QuizView';
import VocabView from './components/VocabView';
import SimulationView from './components/SimulationView';
import AvatarSelector from './components/AvatarSelector';
import ModeSelector from './components/ModeSelector';
import AIChatBot from './components/AIChatBot';
import { VibeMode, THEMES, UserState, Avatar, UserRole } from './types';
import { setGlobalMute } from './utils';

const NavLink = ({ to, icon: Icon, label, vibe }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const activeClass = vibe === 'extrovert' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 
                      vibe === 'introvert' ? 'bg-stone-600 text-stone-100 shadow-lg' : 
                      'bg-blue-600 text-white shadow-lg shadow-blue-500/30';

  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive ? `${activeClass} font-bold scale-105` : 'opacity-60 hover:opacity-100 hover:bg-white/5'}`}
    >
      <Icon size={18} />
      <span className="hidden md:inline text-sm">{label}</span>
    </Link>
  );
};

const App: React.FC = () => {
  const [vibe, setVibe] = useState<VibeMode>('ambivert');
  const [isMuted, setIsMuted] = useState(false);
  const [userState, setUserState] = useState<UserState>({
    avatar: null,
    role: null,
    xp: 0,
    level: 1,
    streak: 0,
    completedSlides: [],
    currentSlideIndex: 0
  });

  const theme = THEMES[vibe];

  const handleAvatarSelect = (avatar: Avatar) => {
    setUserState(prev => ({ ...prev, avatar }));
  };

  const handleModeSelect = (role: UserRole) => {
    setUserState(prev => ({ ...prev, role }));
  };

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    setGlobalMute(newState);
  };

  const handleQuizComplete = (correct: boolean) => {
    if (userState.role === 'teacher') return; // Teachers don't earn XP

    setUserState(prev => {
      let newXP = prev.xp;
      let newStreak = prev.streak;
      
      if (correct) {
        newXP += 150 + (prev.streak * 10); // Streak bonus
        newStreak += 1;
      } else {
        newStreak = 0;
      }

      // Check level up (simple threshold for now)
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

      return {
        ...prev,
        xp: newXP,
        streak: newStreak,
        level: newLevel
      };
    });
  };

  const handleSlideComplete = (slideIndex: number) => {
    setUserState(prev => {
      if (!prev.completedSlides.includes(slideIndex)) {
        return { ...prev, completedSlides: [...prev.completedSlides, slideIndex] };
      }
      return prev;
    });
  };

  const handleSlideChange = (index: number) => {
    setUserState(prev => ({ ...prev, currentSlideIndex: index }));
  };

  if (!userState.avatar) {
    return <AvatarSelector onSelect={handleAvatarSelect} />;
  }

  if (!userState.role) {
    return <ModeSelector onSelect={handleModeSelect} />;
  }

  return (
    <HashRouter>
      <div className={`w-screen h-[100dvh] flex flex-col overflow-hidden font-sans ${theme.bg} transition-colors duration-700 relative`}>
        
        {/* Ambient Background Effects */}
        {vibe === 'ambivert' && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] animate-blob" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px] animate-blob animation-delay-2000" />
          </>
        )}
        {vibe === 'extrovert' && (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        )}

        {/* Sticky Header */}
        <header className={`h-16 md:h-20 flex items-center justify-between px-6 md:px-8 z-50 ${theme.nav} backdrop-blur-xl border-b border-white/5 transition-all duration-500`}>
          <div className="font-bold text-lg md:text-xl tracking-tighter flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-mono shadow-lg transform transition-transform hover:rotate-12 ${
              userState.role === 'teacher' ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-blue-600 shadow-blue-600/30'
            }`}>
              {userState.role === 'teacher' ? 'T' : 'S'}
            </div>
            <div className="flex flex-col">
               <span className="leading-none tracking-tight">IELTS MASTER</span>
               <span className="text-[10px] opacity-50 font-mono tracking-widest uppercase">Task 1 Protocol</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-black/20 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <NavLink to="/" icon={Monitor} label="Learn" vibe={vibe} />
            <NavLink to="/kahoot" icon={Gamepad2} label="Quiz" vibe={vibe} />
            <NavLink to="/vocab" icon={BookOpen} label="Vocab" vibe={vibe} />
            <NavLink to="/simulation" icon={PenTool} label="Sim" vibe={vibe} />
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-full transition-all duration-300 ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'}`}
              title={isMuted ? "Unmute" : "Mute Sound"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-full border border-white/5">
              {(['introvert', 'ambivert', 'extrovert'] as VibeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setVibe(m)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${vibe === m ? 'scale-100 bg-white/10 ring-1 ring-white/50' : 'scale-90 opacity-40 hover:opacity-100 hover:scale-95'}`}
                  title={`${m} mode`}
                >
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    m === 'introvert' ? 'bg-stone-400' : 
                    m === 'ambivert' ? 'bg-blue-500' : 
                    'bg-yellow-400'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={
              <SlideView 
                slides={SLIDES} 
                vibe={vibe} 
                role={userState.role} 
                userState={userState} 
                slideIndex={userState.currentSlideIndex}
                onSlideChange={handleSlideChange}
                onQuizComplete={handleQuizComplete} 
                onSlideComplete={handleSlideComplete}
              />
            } />
            <Route path="/kahoot" element={<QuizView vibe={vibe} role={userState.role} />} />
            <Route path="/vocab" element={<VocabView vibe={vibe} />} />
            <Route path="/simulation" element={<SimulationView vibe={vibe} role={userState.role} />} />
          </Routes>
        </main>

        {/* AI ChatBot Overlay */}
        <AIChatBot vibe={vibe} />
      </div>
    </HashRouter>
  );
};

export default App;