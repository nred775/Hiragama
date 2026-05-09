import { ScreenState, QuizMode } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { ChevronLeft, Keyboard, LayoutGrid, PenTool } from 'lucide-react';

export function ModeSelect({ 
  onNavigate, 
  quizLength, 
  setQuizLength,
  setQuizMode
}: { 
  onNavigate: (screen: ScreenState) => void, 
  quizLength: number | 'endless',
  setQuizLength: (len: number | 'endless') => void,
  setQuizMode: (mode: QuizMode) => void
}) {

  const selectMode = (mode: QuizMode) => {
    setQuizMode(mode);
    onNavigate('quiz');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col h-full bg-slate-950"
    >
      <div className="pt-6 pb-4 px-6 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center mb-8 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('select')} className="rounded-full mr-2 -ml-2 text-slate-400 hover:text-slate-200">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </Button>
        <h2 className="text-xl font-black text-slate-50">Quiz Setup</h2>
      </div>

      <div className="px-6 flex-1 flex flex-col gap-10">
        
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Quiz Length</h3>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 'endless'].map(len => (
              <Button 
                key={len}
                variant={quizLength === len ? 'primary' : 'outline'}
                onClick={() => setQuizLength(len as any)}
                className={`capitalize ${quizLength === len ? '!bg-violet-600 !border-violet-600 !text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                size="sm"
              >
                {len === 'endless' ? '∞' : len}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-12">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Select Mode</h3>
          
          <button 
            onClick={() => selectMode('typing')}
            className="w-full bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 hover:border-violet-500 hover:shadow-lg hover:-translate-y-1 transition-all text-left flex items-center gap-5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-900/40 text-violet-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors border border-violet-500/30 group-hover:border-violet-500 shadow-sm">
              <Keyboard size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-50">Typing Mode</h4>
              <p className="text-slate-400 text-sm font-medium">See the character, type the sound.</p>
            </div>
          </button>

          <button 
            onClick={() => selectMode('multiple-choice')}
            className="w-full bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all text-left flex items-center gap-5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-900/30 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors border border-orange-500/30 group-hover:border-orange-500 shadow-sm">
              <LayoutGrid size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-50">Multiple Choice</h4>
              <p className="text-slate-400 text-sm font-medium">See the sound, pick the character.</p>
            </div>
          </button>

          <button 
            onClick={() => selectMode('drawing')}
            className="w-full bg-slate-900 p-5 rounded-3xl border-2 border-slate-800 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all text-left flex items-center gap-5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors border border-emerald-500/30 group-hover:border-emerald-500 shadow-sm">
              <PenTool size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-50">Drawing Mode</h4>
              <p className="text-slate-400 text-sm font-medium">See the sound, draw the character.</p>
            </div>
          </button>

        </div>

      </div>
    </motion.div>
  );
}
