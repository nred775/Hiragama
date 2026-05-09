import { ScreenState } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { BookOpen, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Home({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  const [bestScore, setBestScore] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    setBestScore(Number(localStorage.getItem('hiragana_best_score')) || 0);
    setBestStreak(Number(localStorage.getItem('hiragana_best_streak')) || 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col p-6 items-center justify-center bg-slate-950"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm gap-8">
        
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-32 h-32 bg-slate-900 rounded-[32px] border-4 border-slate-800 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-end items-center mx-auto mb-6 relative overflow-hidden"
          >
            <span className="text-[80px] font-bold text-slate-50 font-jp leading-[80px] mt-2 translate-y-3">あ</span>
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight leading-none">Hiragana<br/>Trainer</h1>
          <p className="text-slate-400 text-lg font-medium">Master the Japanese alphabet</p>
        </div>

        <div className="flex w-full gap-4 text-center">
          <div className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Best Score</p>
            <p className="text-3xl font-black text-violet-400">{bestScore}</p>
          </div>
          <div className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Max Streak</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-black text-orange-500">{bestStreak}</span>
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-6">
          <Button size="lg" className="w-full text-xl" onClick={() => onNavigate('select')}>
            <Settings className="mr-2" size={24} strokeWidth={2.5} /> Set Up Quiz
          </Button>

          <Button variant="outline" size="lg" className="w-full" onClick={() => onNavigate('chart')}>
            <BookOpen className="mr-2" size={20} strokeWidth={2.5} /> Study Chart
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
