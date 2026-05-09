import { ScreenState } from '../App';
import { Button } from './ui/Button';
import { motion } from 'motion/react';
import { ChevronLeft, Check } from 'lucide-react';
import { hiraganaData, hiraganaGroups } from '../data/hiragana';

export function SelectScreen({ 
  onNavigate, 
  selectedChars, 
  setSelectedChars 
}: { 
  onNavigate: (screen: ScreenState) => void, 
  selectedChars: string[],
  setSelectedChars: (chars: string[]) => void
}) {

  const toggleGroup = (groupId: string) => {
    const groupChars = hiraganaData.filter(h => h.groupId === groupId).map(h => h.romaji);
    const allSelected = groupChars.every(c => selectedChars.includes(c));
    
    if (allSelected) {
      setSelectedChars(selectedChars.filter(c => !groupChars.includes(c)));
    } else {
      const newSelections = new Set([...selectedChars, ...groupChars]);
      setSelectedChars(Array.from(newSelections));
    }
  };

  const toggleChar = (romaji: string) => {
    if (selectedChars.includes(romaji)) {
      setSelectedChars(selectedChars.filter(c => c !== romaji));
    } else {
      setSelectedChars([...selectedChars, romaji]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col h-full bg-slate-950 relative"
    >
      <div className="pt-6 pb-4 px-6 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('home')} className="rounded-full -ml-2 text-slate-400 hover:text-slate-200">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </Button>
        <h2 className="text-xl font-black text-slate-50">Characters</h2>
        <div className="w-12 text-slate-400 font-bold text-sm text-center">
          {selectedChars.length}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-40">
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="secondary" size="sm" className="font-bold" onClick={() => setSelectedChars(hiraganaData.map(h => h.romaji))}>Select All</Button>
        <Button variant="outline" size="sm" className="font-bold border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50" onClick={() => setSelectedChars([])}>Clear All</Button>
      </div>

        <div className="space-y-6">
          {hiraganaGroups.map(group => {
            const groupChars = hiraganaData.filter(h => h.groupId === group.id);
            const allSelected = groupChars.every(c => selectedChars.includes(c.romaji));
            const someSelected = groupChars.some(c => selectedChars.includes(c.romaji));

            return (
              <div key={group.id} className="space-y-3">
                <div 
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-colors cursor-pointer group ${
                    allSelected 
                      ? 'bg-violet-900/40 border-violet-500' 
                      : someSelected 
                        ? 'bg-slate-900 border-violet-800' 
                        : 'bg-slate-900 border-slate-800 opacity-70'
                  }`}
                  onClick={() => toggleGroup(group.id)}
                >
                  <div>
                    <h3 className={`font-bold ${allSelected ? 'text-violet-100' : 'text-slate-200'}`}>{group.label}</h3>
                  </div>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors ${
                    allSelected ? 'bg-violet-600 border-violet-600 text-white' : 
                    someSelected ? 'bg-slate-900 border-violet-500 text-violet-400' : 'bg-slate-800 border-slate-700'
                  }`}>
                    {(allSelected || someSelected) && <Check size={16} strokeWidth={4} />}
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 px-1">
                  {groupChars.map(char => {
                    const isSelected = selectedChars.includes(char.romaji);
                    return (
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        key={char.romaji}
                        onClick={() => toggleChar(char.romaji)}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-200 ${
                          isSelected 
                            ? 'bg-slate-800 border-violet-500 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] shadow-violet-500/20' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-3xl font-jp font-bold">{char.kana}</span>
                        <span className="text-xs font-black opacity-60 mt-1">{char.romaji}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-16">
        <Button 
          size="lg" 
          className="w-full shadow-2xl"
          disabled={selectedChars.length < 4}
          onClick={() => onNavigate('mode-select')}
        >
          {selectedChars.length < 4 ? `Select at least 4 (${selectedChars.length}/4)` : 'Continue'}
        </Button>
      </div>
    </motion.div>
  );
}
