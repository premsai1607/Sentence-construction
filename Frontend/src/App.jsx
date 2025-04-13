import React, { useState } from 'react';

import './bootstrap-import';
import StartScreen from './Components/StartScreen';
import QuizScreen from './Components/QuizScreen';
import ResultScreen from './Components/ResultScreen';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = () => {
    setGameState('quiz');
    setUserAnswers([]);
  };

  const finishQuiz = (answers) => {
    setUserAnswers(answers);
    setGameState('result');
  };

  const restartQuiz = () => {
    setGameState('start');
    setUserAnswers([]);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4 px-3">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-10 col-lg-8">
          {gameState === 'start' && <StartScreen onStart={startQuiz} />}
          {gameState === 'quiz' && <QuizScreen onComplete={finishQuiz} />}
          {gameState === 'result' && <ResultScreen answers={userAnswers} onRestart={restartQuiz} />}
        </div>
      </div>
    </div>
  );
}

export default App;