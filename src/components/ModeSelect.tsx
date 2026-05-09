import { ScreenState, QuizMode } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { ChevronLeft, Keyboard, LayoutGrid, PenTool } from 'lucide-react';

export function ModeSelect({ 
  onNavigate, 
  selectedChars,
  setQuizMode
}: { 
  onNavigate: (screen: ScreenState) => void, 
  selectedChars: string[],
  setQuizMode: (mode: QuizMode) => void
}) {

  const selectMode = (mode: QuizMode) => {
    setQuizMode(mode);
    onNavigate('quiz');
  };

  const hasEnoughForMultipleChoice = selectedChars.length >= 4;

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

          <div className="relative">
            <button 
              onClick={() => hasEnoughForMultipleChoice && selectMode('multiple-choice')}
              disabled={!hasEnoughForMultipleChoice}
              className={`w-full p-5 rounded-3xl border-2 text-left flex items-center gap-5 transition-all
                ${hasEnoughForMultipleChoice 
                  ? 'bg-slate-900 border-slate-800 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 group' 
                  : 'bg-slate-900/50 border-slate-800/50 opacity-50 cursor-not-allowed'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors border shadow-sm
                ${hasEnoughForMultipleChoice
                  ? 'bg-orange-900/30 text-orange-400 border-orange-500/30 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500'
                  : 'bg-slate-800 text-slate-500 border-slate-700'}`}
              >
                <LayoutGrid size={32} />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-50">Multiple Choice</h4>
                <p className="text-slate-400 text-sm font-medium">See the sound, pick the character.</p>
              </div>
            </button>
            {!hasEnoughForMultipleChoice && (
              <p className="text-rose-400 text-xs font-bold mt-2 ml-2">Requires at least 4 characters selected.</p>
            )}
          </div>

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
