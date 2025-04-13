import React, { useState, useEffect } from 'react';

import quizData from '../data/quizData.jsx';
import QuestionCard from '../Components/QuestionCard';
import LoadingSpinner from '../Components/LoadingSpinner';

function QuizScreen({ onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions (simulated API call)
  useEffect(() => {
    setTimeout(() => {
      try {
        setQuestions(quizData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz questions. Please try again.");
        setLoading(false);
      }
    }, 1500);
  }, []);

  // Handle next question or finish quiz
  const handleNext = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="card shadow">
        <div className="card-header bg-danger text-white">
          <h5 className="m-0">Error</h5>
        </div>
        <div className="card-body p-4 text-center">
          <div className="mb-3 text-danger">
            <i className="bi bi-exclamation-triangle fs-1"></i>
          </div>
          <h5 className="mb-3">Oops! Something went wrong</h5>
          <p className="mb-4">{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard 
      question={questions[currentQuestionIndex]}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      onNext={handleNext}
      timeLimit={30}
    />
  );
}

export default QuizScreen;