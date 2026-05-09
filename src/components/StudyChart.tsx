import { ScreenState } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { hiraganaGroups, hiraganaData } from '../data/hiragana';

export function StudyChart({ 
  onNavigate 
}: { 
  onNavigate: (screen: ScreenState) => void 
}) {

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col h-full bg-slate-950 relative"
    >
      <div className="pt-6 pb-4 px-6 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('home')} className="rounded-full mr-2 -ml-2 text-slate-400 hover:text-slate-200">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </Button>
        <h2 className="text-xl font-black text-slate-50">Study Chart</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 pb-32">
        <div className="space-y-10">
          {hiraganaGroups.map(group => {
            const groupChars = hiraganaData.filter(h => h.groupId === group.id);
            return (
              <div key={group.id} className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 border-b-2 border-slate-800 pb-2">{group.label}</h3>
                
                <div className="grid grid-cols-5 gap-y-6">
                  {groupChars.map(char => (
                    <div key={char.romaji} className="flex flex-col items-center justify-center group cursor-pointer hover:-translate-y-1 transition-transform">
                      <span className="text-[40px] font-jp font-bold text-slate-50 leading-none group-hover:text-violet-400 transition-colors">{char.kana}</span>
                      <span className="text-sm font-black text-slate-500 mt-2">{char.romaji}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
