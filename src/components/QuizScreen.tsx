import React, { useState, useEffect, useRef } from 'react';
import { ScreenState, QuizMode, QuizResultsData } from '../App';
import { hiraganaData, Hiragana } from '../data/hiragana';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { shuffleArray } from '../lib/utils';
import { DrawingCanvas, DrawingCanvasRef } from './DrawingCanvas';

export function QuizScreen({
  onNavigate,
  selectedChars, // romaji array
  quizMode,
  onComplete
}: {
  onNavigate: (screen: ScreenState) => void;
  selectedChars: string[];
  quizMode: QuizMode;
  onComplete: (data: QuizResultsData) => void;
}) {
  const [questions, setQuestions] = useState<Hiragana[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State per question
  const [inputValue, setInputValue] = useState('');
  const [choices, setChoices] = useState<Hiragana[]>([]);
  
  // Evaluation state
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'show-answer'>('idle');
  
  // Global quiz stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [missedCharacters, setMissedCharacters] = useState<Hiragana[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const canvasRef = useRef<DrawingCanvasRef>(null);
  const answeredTime = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize questions
  useEffect(() => {
    const chars = hiraganaData.filter(h => selectedChars.includes(h.romaji));
    const bag = shuffleArray([...chars]);
    setQuestions(bag);
  }, [selectedChars]);

  useEffect(() => {
    if (questions.length === 0) return;
    const currentQ = questions[currentIndex];
    
    // Setup for multiple choice
    if (quizMode === 'multiple-choice') {
      const selectedPool = hiraganaData.filter(h => selectedChars.includes(h.romaji));
      let wrongs = selectedPool.filter(c => c.romaji !== currentQ.romaji);
      wrongs = shuffleArray(wrongs).slice(0, 3);
      
      if (wrongs.length < 3) {
        let allOther = hiraganaData.filter(h => h.romaji !== currentQ.romaji && !wrongs.some(w => w.romaji === h.romaji));
        allOther = shuffleArray(allOther);
        while (wrongs.length < 3 && allOther.length > 0) {
          wrongs.push(allOther.pop()!);
        }
      }
      setChoices(shuffleArray([currentQ, ...wrongs]));
    }
    
    setStatus('idle');
    setInputValue('');
    if (canvasRef.current) canvasRef.current.clear();
  }, [currentIndex, questions, quizMode, selectedChars]);

  useEffect(() => {
    if (status === 'idle' && quizMode === 'typing') {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, status, quizMode]);

  const handleNext = (finalScore: number, finalStreak: number, finalMissed: Hiragana[]) => {
    if (currentIndex + 1 >= questions.length) {
      // Finish Quiz
      saveToLocal(finalStreak);
      onComplete({
        score: finalScore,
        total: questions.length,
        bestStreak: Math.max(bestStreak, finalStreak),
        missedCharacters: finalMissed
      });
      onNavigate('results');
    } else {
      setStatus('idle');
      setInputValue('');
      if (canvasRef.current) canvasRef.current.clear();
      setCurrentIndex(curr => curr + 1);
    }
  };

  const handleGuess = (isCorrect: boolean) => {
    setStatus(isCorrect ? 'correct' : 'wrong');
    setTotalAnswered(prev => prev + 1);
    answeredTime.current = Date.now();
    
    let newScore = score;
    let newStreak = streak;
    let newMissed = [...missedCharacters];

    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
      newStreak += 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);
      if (!newMissed.find(m => m.romaji === questions[currentIndex].romaji)) {
        newMissed.push(questions[currentIndex]);
        setMissedCharacters(newMissed);
      }
    }
  };

  const submitDrawingResult = (isCorrect: boolean) => {
    setStatus(isCorrect ? 'correct' : 'wrong');
    let newScore = score;
    let newStreak = streak;
    let newMissed = [...missedCharacters];

    if (isCorrect) {
      newScore += 1;
      setScore(newScore);
      newStreak += 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      newStreak = 0;
      setStreak(0);
      if (!newMissed.find(m => m.romaji === questions[currentIndex].romaji)) {
        newMissed.push(questions[currentIndex]);
        setMissedCharacters(newMissed);
      }
    }
    setTotalAnswered(prev => prev + 1);
  };
  
  const submitTyping = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status !== 'idle') {
      if (Date.now() - answeredTime.current > 400) {
        handleNext(score, streak, missedCharacters);
      }
      return;
    }
    const guess = inputValue.trim().toLowerCase();
    if (!guess) return;
    handleGuess(guess === questions[currentIndex].romaji);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status !== 'idle') return;
    const val = e.target.value;
    setInputValue(val);
    
    const trimmed = val.trim().toLowerCase();
    const targetLength = questions[currentIndex].romaji.length;
    
    if (trimmed.length === targetLength) {
      handleGuess(trimmed === questions[currentIndex].romaji);
    }
  };

  const saveToLocal = (currentStreakVal: number = streak) => {
    const finalBestStreak = Math.max(bestStreak, currentStreakVal);
    const existingBestScore = Number(localStorage.getItem('hiragana_best_score')) || 0;
    const existingBestStreak = Number(localStorage.getItem('hiragana_best_streak')) || 0;
    
    if (score > existingBestScore) localStorage.setItem('hiragana_best_score', score.toString());
    if (finalBestStreak > existingBestStreak) localStorage.setItem('hiragana_best_streak', finalBestStreak.toString());
  };

  const handleQuit = () => {
    saveToLocal();
    onNavigate('home');
  };

  const renderFeedback = () => {
    if (status === 'idle' || status === 'show-answer') return null;
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[320px] mb-8"
      >
        <div className={`p-5 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5 border-2 ${status === 'correct' ? 'bg-emerald-950 border-emerald-800/50' : 'bg-rose-950 border-rose-800/50'}`}>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white ${status === 'correct' ? 'bg-emerald-500 shadow-md shadow-emerald-900/50' : 'bg-rose-500 shadow-md shadow-rose-900/50'}`}>
                {status === 'correct' ? <CheckCircle strokeWidth={3} /> : <XCircle strokeWidth={3} />}
              </div>
              <div>
                <h3 className={`text-xl font-black ${status === 'correct' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {status === 'correct' ? 'Excellent!' : 'Not quite!'}
                </h3>
              </div>
            </div>
            
            {status === 'wrong' && (
              <div className="text-lg text-rose-300 font-medium pl-[64px]">
                Correct answer is: <span className="font-black text-xl text-rose-200">{quizMode === 'typing' ? currentQ.romaji : currentQ.kana}</span>
              </div>
            )}
          </div>
          
          <Button 
            autoFocus
            onClick={() => handleNext(score, streak, missedCharacters)}
            className={`w-full py-6 text-xl font-bold rounded-2xl shadow-lg ${status === 'correct' ? '!bg-emerald-600 hover:!bg-emerald-500 !text-white shadow-emerald-900/50' : '!bg-rose-600 hover:!bg-rose-500 !text-white shadow-rose-900/50'}`}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    );
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;
  // const accuracy is not used currently in QuizScreen UI directly

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative">
      {/* Top Bar */}
      <div className="h-20 px-6 flex items-center justify-between z-10 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <Button variant="ghost" size="icon" onClick={handleQuit} className="-ml-2 text-slate-400 hover:text-slate-200">
          <X size={24} strokeWidth={2.5} />
        </Button>
        <div className="flex items-center gap-4 flex-1 justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Question {currentIndex + 1} of {questions.length}</span>
          <div className="w-full max-w-[150px] h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div 
              className="h-full bg-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>
        <div className="w-16 text-slate-400 font-bold text-sm text-right flex flex-col items-end">
          {streak > 1 ? <span className="text-orange-500">{streak}🔥</span> : `${currentIndex + 1}/${questions.length}`}
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 pb-8 overflow-y-auto">
        
        {/* Question Area */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-8 pb-12">
          {quizMode === 'typing' && (
            <>
              <motion.div 
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-56 h-56 shrink-0 bg-slate-900 border-4 border-slate-800 rounded-[56px] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.15)] mb-8 relative"
              >
                <span className="text-[120px] font-bold text-slate-50 leading-none pb-2 font-jp">{currentQ.kana}</span>
              </motion.div>
              
              {renderFeedback()}
              
              {status === 'idle' && (
                <form onSubmit={submitTyping} className="w-full max-w-[280px]">
                  <div className="relative w-full">
                    <input 
                      ref={inputRef}
                      type="text" 
                      value={inputValue}
                      onChange={handleInputChange}
                      readOnly={status !== 'idle'}
                      placeholder="Type the sound..."
                      autoFocus
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      className={`w-full h-16 bg-slate-900 border-2 border-slate-800 rounded-3xl px-8 text-2xl font-bold text-center text-slate-50 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:bg-slate-800 transition-all
                        ${status === 'correct' ? '!border-emerald-500 !bg-emerald-900/40 text-emerald-400' : 
                          status === 'wrong' ? '!border-rose-500 !bg-rose-900/40 text-rose-400' : ''}`}
                    />
                  </div>
                </form>
              )}
            </>
          )}

          {quizMode === 'multiple-choice' && (
            <>
              <motion.div 
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[80px] font-black text-violet-400 mb-6 uppercase tracking-tight shrink-0"
              >
                {currentQ.romaji}
              </motion.div>
              
              {renderFeedback()}

              <div className="grid grid-cols-2 gap-4 w-full max-w-[320px]">
                {choices.map((choice, i) => {
                  const isSelected = inputValue === choice.romaji;
                  const isCorrectAnswer = choice.romaji === currentQ.romaji;
                  
                  let btnState = 'bg-slate-900 border-slate-800 hover:border-slate-600 text-slate-300 shadow-sm';
                  if (status !== 'idle') {
                    if (isCorrectAnswer) btnState = 'bg-emerald-900/40 border-emerald-500 text-emerald-400 shadow-lg';
                    else if (isSelected) btnState = 'bg-rose-900/40 border-rose-500 text-rose-400';
                    else btnState = 'bg-slate-950 border-slate-900 text-slate-600 opacity-40';
                  }

                  return (
                    <button
                      key={i}
                      disabled={status !== 'idle'}
                      onClick={() => {
                        setInputValue(choice.romaji);
                        handleGuess(choice.romaji === currentQ.romaji);
                      }}
                      className={`h-32 text-6xl font-jp rounded-3xl border-4 transition-all ${btnState}`}
                    >
                      {choice.kana}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {quizMode === 'drawing' && (
            <div className="w-full max-w-[320px] flex flex-col items-center">
              <div className="text-4xl font-black text-violet-400 mb-8 uppercase tracking-widest shrink-0">{currentQ.romaji}</div>
              
              {status !== 'show-answer' && renderFeedback()}
              
              <div className="relative w-full aspect-square border-4 border-slate-800 rounded-[48px] bg-slate-900 shadow-[0_0_40px_rgba(139,92,246,0.15)] flex overflow-hidden">
                <DrawingCanvas ref={canvasRef} />
                
                {status === 'show-answer' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-slate-900/95"
                  >
                    <span className="text-[140px] font-bold text-slate-50 font-jp opacity-40 pb-2">{currentQ.kana}</span>
                  </motion.div>
                )}
              </div>

              {status === 'idle' && (
                <div className="flex gap-4 w-full mt-8">
                  <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800" onClick={() => canvasRef.current?.clear()}>Clear</Button>
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={() => setStatus('show-answer')}>Check Answer</Button>
                </div>
              )}

              {status === 'show-answer' && (
                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                  <Button variant="danger" size="lg" className="shadow-lg shadow-rose-900/40 border border-rose-800/50" onClick={() => submitDrawingResult(false)}>
                    <XCircle className="mr-2" strokeWidth={2.5} /> Wrong
                  </Button>
                  <Button variant="success" size="lg" className="shadow-lg shadow-emerald-900/40 border border-emerald-800/50" onClick={() => submitDrawingResult(true)}>
                    <CheckCircle className="mr-2" strokeWidth={2.5} /> Got It
                  </Button>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

      {/* Streak Celebration */}
      <AnimatePresence>
        {status === 'correct' && streak > 0 && streak % 3 === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: -50 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center"
          >
            <span className="text-6xl mb-2">🎉</span>
            <span className="text-2xl font-black text-orange-400 drop-shadow-md text-center">{streak} in a row!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
