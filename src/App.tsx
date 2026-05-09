/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { SelectScreen } from './components/SelectScreen';
import { ModeSelect } from './components/ModeSelect';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { StudyChart } from './components/StudyChart';
import { Hiragana, hiraganaData } from './data/hiragana';

export type ScreenState = 'home' | 'select' | 'mode-select' | 'quiz' | 'results' | 'chart';
export type QuizMode = 'typing' | 'multiple-choice' | 'drawing';

export type QuizResultsData = {
  score: number;
  total: number | 'endless';
  bestStreak: number;
  missedCharacters: Hiragana[];
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [selectedChars, setSelectedChars] = useState<string[]>([]); // Array of romaji
  const [quizLength, setQuizLength] = useState<number | 'endless'>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('typing');
  const [quizResults, setQuizResults] = useState<QuizResultsData | null>(null);

  return (
    <div className="min-h-screen sm:max-w-md mx-auto bg-slate-950 sm:bg-slate-950 sm:shadow-2xl sm:shadow-black/50 sm:border sm:border-slate-800 sm:my-8 sm:rounded-[40px] sm:min-h-[700px] sm:h-[80vh] overflow-hidden flex flex-col relative font-sans text-slate-100">
      {currentScreen === 'home' && (
        <Home 
          onNavigate={setCurrentScreen} 
        />
      )}
      {currentScreen === 'select' && (
        <SelectScreen 
          onNavigate={setCurrentScreen} 
          selectedChars={selectedChars}
          setSelectedChars={setSelectedChars}
        />
      )}
      {currentScreen === 'mode-select' && (
        <ModeSelect 
          onNavigate={setCurrentScreen} 
          quizLength={quizLength}
          setQuizLength={setQuizLength}
          setQuizMode={setQuizMode}
        />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen 
          onNavigate={setCurrentScreen} 
          selectedChars={selectedChars}
          quizLength={quizLength}
          quizMode={quizMode}
          onComplete={setQuizResults}
        />
      )}
      {currentScreen === 'results' && quizResults && (
        <ResultsScreen 
          onNavigate={setCurrentScreen} 
          results={quizResults}
        />
      )}
      {currentScreen === 'chart' && (
        <StudyChart onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}

