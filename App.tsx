import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Circle,
  ChevronRight, 
  Check, 
  Home, 
  Book, 
  Settings, 
  User,
  ArrowLeft,
  Trophy,
  Dna
} from 'lucide-react';
import { BOWLING_DATA, Level } from './verbData';
import GameSession from './GameSession';

type Screen = 'dashboard' | 'game' | 'theory' | 'dictionary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [lives, setLives] = useState(5);
  const [progress, setProgress] = useState(25);

  const handleLevelSelect = (level: Level) => {
    if (level.type === 'theory') {
      setScreen('theory');
    } else {
      setSelectedLevel(level);
      setScreen('game');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] font-sans text-slate-100 overflow-x-hidden pt-safe pb-24 selection:bg-orange-500/30 selection:text-white leading-relaxed relative">
      {/* Bowling Alley Theme Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#16213e] via-[#0f3460] to-[#1a1a2e]" />
        
        {/* Parquet / Lane Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Glows */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" 
        />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto p-6 space-y-8 pt-10 relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center text-white rotate-3">
                  <Trophy size={32} />
                </div>
                <div>
                   <h1 className="text-2xl font-black tracking-tight text-white italic">Bowling Academy</h1>
                   <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">Abrir & Cerrar</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
                 <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-6 rounded-full ${i < lives ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`} />
                    ))}
                 </div>
                 <span className="font-black text-white/40 text-xs">LIFE</span>
              </div>
            </div>

            {/* Main Trophy Stats */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
                  <Circle size={150} strokeWidth={8} />
               </div>
               <div className="relative z-10 space-y-4">
                  <p className="text-orange-100/60 font-black text-xs uppercase tracking-widest">Ընթացիկ Առաջընթաց</p>
                  <div className="flex items-end gap-3">
                     <span className="text-6xl font-black text-white italic leading-none">{progress}%</span>
                     <div className="mb-2 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">Level up</div>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                     />
                  </div>
               </div>
            </div>

            {/* Menu */}
            <div className="grid gap-4">
               {BOWLING_DATA.levels.map((level, i) => (
                 <motion.button
                   key={level.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleLevelSelect(level)}
                   className="w-full bg-white/5 border border-white/5 p-5 rounded-[2.5rem] flex items-center gap-5 hover:bg-white/10 hover:border-orange-500/30 transition-all group"
                 >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                       level.type === 'theory' ? 'bg-indigo-500/20 text-indigo-400' : 
                       level.type === 'matching' ? 'bg-orange-500/20 text-orange-400' : 
                       'bg-emerald-500/20 text-emerald-400'
                    }`}>
                       <Dna size={28} />
                    </div>
                    <div className="flex-1 text-left">
                       <h3 className="text-lg font-black text-white leading-tight">{level.title}</h3>
                       <p className="text-slate-400 text-sm font-bold">{level.description}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-orange-500 transition-all">
                       <ChevronRight size={20} strokeWidth={3} />
                    </div>
                 </motion.button>
               ))}
            </div>
          </motion.div>
        )}

        {screen === 'game' && selectedLevel && (
          <GameSession 
            key="game-session"
            level={selectedLevel} 
            onClose={() => setScreen('dashboard')} 
            lives={lives}
            setLives={setLives}
          />
        )}

        {screen === 'theory' && (
          <motion.div 
            key="theory"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-[#1a1a2e] z-50 p-8 pt-safe overflow-y-auto pb-32"
          >
             <div className="max-w-2xl mx-auto space-y-12">
                <div className="flex items-center justify-between">
                   <button onClick={() => setScreen('dashboard')} className="p-3 bg-white/5 rounded-2xl text-white">
                      <ArrowLeft size={24} />
                   </button>
                   <h1 className="text-2xl font-black italic">Բոուլինգի Կանոնները</h1>
                   <div className="w-12" />
                </div>

                <div className="bg-orange-600 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <h2 className="text-4xl font-black text-white leading-tight">Abrir & Cerrar</h2>
                      <div className="space-y-4">
                         <div className="bg-white/10 p-5 rounded-3xl border border-white/10">
                            <p className="text-orange-200 font-bold mb-2">Abrir - Բացել</p>
                            <p className="text-white font-black text-2xl italic">Yo abro la puerta.</p>
                         </div>
                         <div className="bg-white/10 p-5 rounded-3xl border border-white/10">
                            <p className="text-orange-200 font-bold mb-2">Cerrar - Փակել</p>
                            <p className="text-white font-black text-2xl italic">Tú cierras la ventana.</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid gap-6">
                   <h3 className="text-xl font-black text-orange-400 uppercase tracking-widest text-center">Խոնարհում (Ներկա ժամանակ)</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { s: 'Yo', h: 'Abro / Cierro' },
                        { s: 'Tú', h: 'Abres / Cierras' },
                        { s: 'Él/Ella/Ud.', h: 'Abre / Cierra' },
                        { s: 'Nosotros', h: 'Abrimos / Cerramos' },
                        { s: 'Vosotros', h: 'Abrís / Cerráis' },
                        { s: 'Ellos/as/Uds.', h: 'Abren / Cierran' }
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center text-center">
                           <span className="text-orange-300 font-black text-[10px] uppercase mb-1">{item.s}</span>
                           <span className="text-white font-black text-sm">{item.h}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {screen === 'dictionary' && (
           <motion.div 
            key="dictionary"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-[#1a1a2e] z-50 p-6 pt-safe overflow-y-auto pb-32 font-sans"
          >
             <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setScreen('dashboard')} className="p-3 bg-white/5 rounded-2xl text-white">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-black tracking-tight text-white">Բառարան</h1>
            </div>

            <div className="max-w-md mx-auto space-y-4">
               {BOWLING_DATA.dictionary.map((item, i) => (
                 <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between">
                    <div>
                       <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                         item.category === 'abrir' ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'
                       }`}>
                         {item.category}
                       </span>
                       <h3 className="text-xl font-black text-white mt-1 italic">{item.phrase}</h3>
                    </div>
                    <p className="text-slate-400 font-bold italic">{item.translation}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 inset-x-0 bg-[#16213e]/80 backdrop-blur-2xl border-t border-white/5 p-4 pb-8 flex items-center justify-around z-40 rounded-t-[3rem] shadow-[0_-10px_50px_rgba(0,0,0,0.5)]"
      >
        <button onClick={() => setScreen('dashboard')} className={`flex flex-col items-center gap-1 ${screen === 'dashboard' ? 'text-orange-500' : 'text-slate-500'}`}>
          <Home size={24} fill={screen === 'dashboard' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-black uppercase">Գլխավոր</span>
        </button>
        <button onClick={() => setScreen('dictionary')} className={`flex flex-col items-center gap-1 ${screen === 'dictionary' ? 'text-orange-500' : 'text-slate-500'}`}>
          <Book size={24} fill={screen === 'dictionary' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-black uppercase">Բառարան</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500">
          <Settings size={24} />
          <span className="text-[10px] font-black uppercase">Կարգավորում</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500">
          <User size={24} />
          <span className="text-[10px] font-black uppercase">Պրոֆիլ</span>
        </button>
      </motion.nav>
    </div>
  );
}
