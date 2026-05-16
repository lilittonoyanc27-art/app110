import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Volume2, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  Dna
} from 'lucide-react';
import { BOWLING_DATA, Level, MatchingPair, SentenceChallenge } from './verbData';

interface GameSessionProps {
  level: Level;
  onClose: () => void;
  lives: number;
  setLives: (l: number) => void;
}

export default function GameSession({ level, onClose, lives, setLives }: GameSessionProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<MatchingPair[]>([]);
  const [shuffledRight, setShuffledRight] = useState<MatchingPair[]>([]);
  const [sentenceChallenges, setSentenceChallenges] = useState<SentenceChallenge[]>([]);
  const [isBowling, setIsBowling] = useState(false);

  useEffect(() => {
    if (level.type === 'matching') {
      const base = [...BOWLING_DATA.matching];
      setMatchingPairs(base);
      setShuffledLeft([...base].sort(() => Math.random() - 0.5));
      setShuffledRight([...base].sort(() => Math.random() - 0.5));
    } else if (level.type === 'test') {
      const shuffled = [...BOWLING_DATA.sentences].sort(() => Math.random() - 0.5);
      setSentenceChallenges(shuffled);
    }
  }, [level.type]);

  const progress = level.type === 'matching' 
    ? (matches.length / matchingPairs.length) * 100 
    : ((currentSentenceIdx) / sentenceChallenges.length) * 100;

  // Matching Logic
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const pair = matchingPairs.find(p => p.original === selectedLeft);
      if (pair && pair.translation === selectedRight) {
        setMatches(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (matches.length + 1 === matchingPairs.length) {
          setTimeout(() => setFeedback('correct'), 500);
        }
      } else {
        setWrongMatch(true);
        setTimeout(() => {
          setWrongMatch(false);
          setSelectedLeft(null);
          setSelectedRight(null);
          if (lives > 0) setLives(lives - 1);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight, matchingPairs, matches, lives, setLives]);

  const handleSentenceAnswer = (ans: string) => {
    if (feedback || isBowling) return;
    const isCorrect = ans === sentenceChallenges[currentSentenceIdx].answer;
    
    setIsBowling(true);
    
    // Animate ball
    setTimeout(() => {
      if (isCorrect) {
        setFeedback('correct');
      } else {
        setFeedback('wrong');
        if (lives > 0) setLives(lives - 1);
      }
      setIsBowling(false);
    }, 1500);
  };

  const nextAction = () => {
    if (level.type === 'test') {
      if (currentSentenceIdx + 1 < sentenceChallenges.length) {
        setCurrentSentenceIdx(prev => prev + 1);
        setFeedback(null);
      } else {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f3460] z-[100] flex flex-col pt-safe overflow-hidden font-sans">
      {/* Sticky Top Section: UI + Bowling Lane */}
      <div className="sticky top-0 z-[60] bg-[#1a1a2e] shadow-2xl border-b border-white/5">
        {/* Header UI */}
        <div className="relative z-50 flex items-center gap-4 p-4">
          <button onClick={onClose} className="p-2 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-colors">
            <X size={24} />
          </button>
          <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-md">
            <Heart className="text-orange-500 fill-orange-500" size={18} />
            <span className="text-white font-black text-lg">{lives}</span>
          </div>
        </div>

        {/* 3D Bowling Lane Visual - Reduced height for better scroll area */}
        <div className="h-[25vh] sm:h-[30vh] bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-end justify-center overflow-hidden relative">
          {/* Perspective Lane */}
          <div 
            className="w-[150%] h-[200px] bg-gradient-to-t from-orange-900/30 to-transparent absolute bottom-0 origin-bottom"
            style={{ transform: 'perspective(400px) rotateX(45deg)' }}
          >
              {/* Lane Stripes */}
              <div className="absolute inset-0 flex justify-around px-24 opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-[1px] h-full bg-white/20" />
                ))}
              </div>
          </div>

          {/* Pins Container */}
          <div className="relative mb-4 flex items-end justify-center gap-2 scale-[0.6] sm:scale-[0.8] origin-bottom">
              {/* Pins Arranged in Triangle */}
              <div className="flex flex-col items-center gap-1">
                {/* Row 4 */}
                <div className="flex gap-2 mb-[-12px]">
                    {[...Array(4)].map((_, i) => (
                      <Pin key={`r4-${i}`} fallen={feedback === 'correct'} />
                    ))}
                </div>
                {/* Row 3 */}
                <div className="flex gap-2 mb-[-12px]">
                    {[...Array(3)].map((_, i) => (
                      <Pin key={`r3-${i}`} fallen={feedback === 'correct'} />
                    ))}
                </div>
                {/* Row 2 */}
                <div className="flex gap-2 mb-[-12px]">
                    {[...Array(2)].map((_, i) => (
                      <Pin key={`r2-${i}`} fallen={feedback === 'correct'} />
                    ))}
                </div>
                {/* Row 1 */}
                <div className="flex gap-2">
                    <Pin fallen={feedback === 'correct'} />
                </div>
              </div>

              {/* Bowling Ball */}
              <motion.div 
                animate={isBowling ? { 
                  y: -250, 
                  scale: 0.2, 
                  x: feedback === 'wrong' ? (Math.random() > 0.5 ? 80 : -80) : 0,
                  opacity: [1, 1, 0] 
                } : { 
                  y: 0, 
                  scale: 1, 
                  x: 0, 
                  opacity: 1 
                }}
                transition={{ duration: 1.2, ease: "easeIn" }}
                className="absolute bottom-[-80px] w-16 h-16 bg-gradient-to-br from-slate-700 to-black rounded-full shadow-2xl flex items-center justify-center border-4 border-white/10 z-50"
              >
                <div className="grid grid-cols-2 gap-1 opacity-40">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white col-span-2 mx-auto rounded-full" />
                </div>
              </motion.div>
          </div>
        </div>
      </div>

      {/* Game Content - Scrollable area */}
      <div className="flex-1 flex flex-col p-6 w-full max-w-xl mx-auto overflow-y-auto pb-48 relative z-10 scrollbar-hide">
        {level.type === 'matching' ? (
          <div className="space-y-8 py-4">
            <h2 className="text-white text-center font-black text-xl italic tracking-tight drop-shadow-xl underline decoration-orange-500 decoration-4">
               Համապատասխանեցրու բառերը
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                {shuffledLeft.map((pair) => (
                  <button
                    key={pair.id}
                    disabled={matches.includes(pair.original)}
                    onClick={() => setSelectedLeft(pair.original)}
                    className={`w-full p-4 rounded-3xl border-b-[6px] font-black transition-all flex items-center gap-3 min-h-[4.5rem] text-sm sm:text-base ${
                      matches.includes(pair.original) 
                        ? 'bg-emerald-500 border-emerald-700 text-white opacity-40 scale-95 shadow-none' 
                        : selectedLeft === pair.original
                          ? (wrongMatch ? 'bg-rose-500 border-rose-700 text-white animate-shake' : 'bg-orange-500 border-orange-700 text-white shadow-xl -translate-y-2')
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Volume2 size={16} className={matches.includes(pair.original) ? 'opacity-0' : 'text-slate-500'} />
                    {pair.original}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                 {shuffledRight.map((pair) => {
                   const matchedPair = matchingPairs.find(p => p.translation === pair.translation);
                   const isMatched = matchedPair ? matches.includes(matchedPair.original) : false;
                   return (
                    <button
                      key={`trans-${pair.id}`}
                      disabled={isMatched}
                      onClick={() => setSelectedRight(pair.translation)}
                      className={`w-full p-4 rounded-3xl border-b-[6px] font-black transition-all min-h-[4.5rem] text-sm sm:text-base ${
                        isMatched 
                          ? 'bg-emerald-500 border-emerald-700 text-white opacity-40 scale-95 shadow-none' 
                          : selectedRight === pair.translation
                            ? (wrongMatch ? 'bg-rose-500 border-rose-700 text-white animate-shake' : 'bg-orange-500 border-orange-700 text-white shadow-xl -translate-y-2')
                            : 'bg-[#16213e] border-[#0f3460] text-white hover:opacity-90'
                      }`}
                    >
                      {pair.translation}
                    </button>
                   );
                 })}
              </div>
            </div>
          </div>
        ) : (
          /* Sentence Mode */
          sentenceChallenges[currentSentenceIdx] && (
            <div className="flex-1 flex flex-col gap-8 py-4">
              <h2 className="text-white text-center font-black text-2xl tracking-tighter italic">Գլորիր գունդը ճիշտ բալի վրա</h2>
              
              <div className="space-y-4">
                 <div className="bg-[#1a1a2e]/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-2 border-white/5 text-center space-y-4">
                    <p className="text-xl sm:text-2xl font-black text-white leading-tight italic">
                      {sentenceChallenges[currentSentenceIdx].sentence.split('___').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i === 0 && <span className="text-orange-500 border-b-4 border-orange-500/50 mx-1 px-1">___</span>}
                        </React.Fragment>
                      ))}
                    </p>
                    <p className="text-slate-400 font-bold italic text-sm">{sentenceChallenges[currentSentenceIdx].translation}</p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {sentenceChallenges[currentSentenceIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSentenceAnswer(opt)}
                        disabled={!!feedback || isBowling}
                        className={`p-6 rounded-[2rem] border-b-[6px] border-black font-black text-xl transition-all active:scale-95 active:border-b-0 ${
                          !feedback 
                            ? 'bg-white text-slate-900 hover:bg-orange-50 shadow-xl' 
                            : opt === sentenceChallenges[currentSentenceIdx].answer 
                              ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                              : 'bg-white opacity-40'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Strike Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className={`fixed bottom-0 inset-x-0 p-10 pt-8 rounded-t-[4rem] shadow-[0_-30px_100px_rgba(0,0,0,0.8)] z-[150] border-t-4 ${
              feedback === 'correct' ? 'bg-emerald-600 border-emerald-400' : 'bg-rose-600 border-rose-400'
            }`}
          >
             <div className="max-w-xl mx-auto space-y-8">
                <div className="flex items-center gap-5 text-white">
                   <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-xl">
                     {feedback === 'correct' ? <Trophy size={48} className="text-amber-300" /> : <AlertCircle size={48} />}
                   </div>
                   <div className="flex-1">
                      <h3 className="text-4xl font-black italic tracking-tighter shadow-sm">{feedback === 'correct' ? 'STRIKE!' : ''}</h3>
                      <p className="font-bold opacity-80">{feedback === 'correct' ? 'Հիանալի էր' : 'Փորձիր նորից'}</p>
                   </div>
                </div>

                <button 
                  onClick={nextAction}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    feedback === 'correct' ? 'bg-white text-emerald-600' : 'bg-white text-rose-600'
                  }`}
                >
                  Հաջորդը
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pin({ fallen }: { fallen?: boolean }) {
   return (
      <motion.div 
         animate={fallen ? { 
            rotateX: 80, 
            y: 40, 
            z: 20, 
            rotateZ: Math.random() * 90 - 45,
            opacity: 0.6 
         } : { rotateX: 0, y: 0, z: 0, rotateZ: 0, opacity: 1 }}
         transition={{ duration: 0.5, type: "spring" }}
         className="w-8 h-12 bg-white rounded-full relative shadow-lg flex flex-col items-center border border-slate-200"
         style={{ perspective: '100px' }}
      >
         <div className="w-full h-2 bg-rose-600 absolute top-4 shadow-sm" />
         <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5" />
      </motion.div>
   );
}
