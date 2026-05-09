import { ScreenState, QuizResultsData } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { Home, Settings, RotateCcw } from 'lucide-react';

export function ResultsScreen({ 
  onNavigate, 
  results
}: { 
  onNavigate: (screen: ScreenState) => void, 
  results: QuizResultsData
}) {

  const totalNum = results.total;
  const accuracy = totalNum === 0 ? 0 : Math.round((results.score / totalNum) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center bg-slate-950 p-6 relative overflow-y-auto"
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8 py-10">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-2">Quiz Complete!</h2>
          <p className="text-slate-400 text-lg font-medium">Great job practicing today.</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-violet-900/30 p-6 rounded-[32px] text-center border-2 border-violet-500/30 flex flex-col justify-center">
            <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">Score</p>
            <p className="text-4xl font-extrabold text-violet-400">{results.score} <span className="text-2xl text-violet-500">/ {results.total}</span></p>
          </div>
          <div className="bg-orange-900/30 p-6 rounded-[32px] text-center border-2 border-orange-500/30 flex flex-col justify-center">
            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Best Streak</p>
            <div className="flex items-center justify-center gap-1">
              <p className="text-4xl font-extrabold text-orange-400">{results.bestStreak}</p>
              <span className="text-2xl">🔥</span>
            </div>
          </div>
          <div className="col-span-2 bg-emerald-900/30 p-6 rounded-[32px] text-center border-2 border-emerald-500/30">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Accuracy</p>
            <div className="flex flex-col items-center gap-3">
              <p className="text-5xl font-black text-emerald-400">{accuracy}%</p>
              <div className="w-full h-3 bg-slate-800 rounded-full mt-1 overflow-hidden border border-emerald-900 shadow-inner">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${accuracy}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {results.missedCharacters.length > 0 && (
          <div className="w-full">
            <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest pl-1">Needs Review</h3>
            <div className="flex flex-wrap gap-2">
              {results.missedCharacters.map(char => (
                <div key={char.romaji} className="bg-slate-900 border-2 border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                  <span className="text-2xl font-jp text-slate-50 font-bold leading-none">{char.kana}</span>
                  <span className="text-sm text-slate-400 font-black">{char.romaji}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-4 mt-6">
          <Button size="lg" className="w-full text-xl" onClick={() => onNavigate('quiz')}>
            <RotateCcw className="mr-2" size={24} strokeWidth={2.5} /> Retry Same Setup
          </Button>
          <Button variant="secondary" size="lg" className="w-full" onClick={() => onNavigate('select')}>
            <Settings className="mr-2" size={20} strokeWidth={2.5} /> Change Characters
          </Button>
          <Button variant="ghost" size="lg" className="w-full" onClick={() => onNavigate('home')}>
            <Home className="mr-2" size={20} strokeWidth={2.5} /> Return Home
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
