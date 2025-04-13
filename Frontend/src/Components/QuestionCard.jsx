import React, { useState, useEffect } from 'react';

function QuestionCard({ question, questionNumber, totalQuestions, onNext, timeLimit = 30 }) {
  const [selectedWords, setSelectedWords] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Reset timer and selections when question changes
  useEffect(() => {
    setTimeLeft(timeLimit);
    setSelectedWords({});
  }, [question, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle word selection
  const handleWordSelect = (word, blankIndex) => {
    setSelectedWords(prev => {
      // If this blank already has this word, remove it (unselect)
      if (prev[blankIndex] === word) {
        const newSelected = { ...prev };
        delete newSelected[blankIndex];
        return newSelected;
      }
      // Otherwise, select this word for this blank
      return { ...prev, [blankIndex]: word };
    });
  };

  // Handle click on a filled blank to unselect
  const handleBlankClick = (blankIndex) => {
    setSelectedWords(prev => {
      const newSelected = { ...prev };
      delete newSelected[blankIndex];
      return newSelected;
    });
  };

  // Check if all blanks are filled
  const allBlanksFilled = () => {
    return question.blanks.every(
      (_, index) => selectedWords[index] !== undefined
    );
  };

  // Move to the next question
  const handleNextQuestion = () => {
    const answer = {
      questionId: question.id,
      sentence: question.sentence,
      userAnswers: question.blanks.map((_, index) => selectedWords[index] || ""),
      correctAnswers: question.correctAnswers,
      isCorrect: question.blanks.every((_, index) => 
        selectedWords[index] === question.correctAnswers[index]
      )
    };
    
    onNext(answer);
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Question {questionNumber} of {totalQuestions}</h5>
        <span className={`badge ${timeLeft <= 5 ? 'bg-danger' : 'bg-light text-dark'} px-3 py-2`}>
          <i className="bi bi-clock me-1"></i>
          {timeLeft}s
        </span>
      </div>
      <div className="card-body p-4">
        {/* Timer Progress Bar */}
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div 
            className={`progress-bar ${timeLeft > 10 ? 'bg-primary' : 'bg-danger'}`}
            style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            role="progressbar"
          ></div>
        </div>

        <h5 className="card-title mb-3">Fill in the blanks</h5>
        
        {/* Sentence with blanks */}
        <div className="mb-4 fs-5">
          {question.sentence.split('_____').map((part, index) => (
            <span key={index}>
              {part}
              {index < question.sentence.split('_____').length - 1 && (
                <span 
                  className={`badge ${selectedWords[index] ? 'bg-primary' : 'bg-light text-dark'} mx-1 px-2 py-1`}
                  onClick={() => selectedWords[index] && handleBlankClick(index)}
                  style={{ cursor: selectedWords[index] ? 'pointer' : 'default' }}
                >
                  {selectedWords[index] || "_____"}
                </span>
              )}
            </span>
          ))}
        </div>
        
        {/* Word options */}
        <div className="row g-2 mb-4">
          {question.options.map((option, index) => (
            <div className="col-6 col-md-3" key={index}>
              <button
                className={`btn ${Object.values(selectedWords).includes(option) ? 'btn-secondary' : 'btn-outline-primary'} w-100`}
                onClick={() => {
                  // Find the first empty blank
                  const emptyBlankIndex = question.blanks.find(
                    (_, i) => selectedWords[i] === undefined
                  );
                  
                  if (emptyBlankIndex !== undefined && !Object.values(selectedWords).includes(option)) {
                    handleWordSelect(option, emptyBlankIndex);
                  }
                }}
                disabled={Object.values(selectedWords).includes(option)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="bi bi-info-circle me-1"></i>
            Click on a filled blank to unselect it
          </small>
          <button
            className="btn btn-primary px-4"
            disabled={!allBlanksFilled()}
            onClick={handleNextQuestion}
          >
            {questionNumber < totalQuestions ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;