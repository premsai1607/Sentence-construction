import React from 'react';

function ResultScreen({ answers, onRestart }) {
  // Calculate score
  const calculateScore = () => {
    return answers.reduce((total, answer) => total + (answer.isCorrect ? 1 : 0), 0);
  };

  const score = calculateScore();
  const totalQuestions = answers.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Get appropriate progress bar color based on score
  const getProgressColor = () => {
    if (percentage >= 70) return 'bg-success';
    if (percentage >= 40) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h4 className="m-0">Quiz Results</h4>
      </div>
      <div className="card-body p-4">
        {/* Score Section */}
        <div className="text-center mb-4">
          <h5 className="mb-3">Your Score</h5>
          <h2 className="display-4 fw-bold mb-2">{score}/{totalQuestions}</h2>
          
          <div className="progress mb-2" style={{ height: "20px" }}>
            <div 
              className={`progress-bar ${getProgressColor()}`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          
          <p className="lead">{percentage}% Correct</p>
        </div>
        
        <h5 className="mb-3">Question Review</h5>
        
        {/* Review each answer */}
        {answers.map((answer, index) => (
          <div key={index} className="card mb-3 border-0 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center bg-light">
              <h6 className="m-0">Question {index + 1}</h6>
              <span className={`badge ${answer.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                {answer.isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">
                {answer.sentence.split('_____').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < answer.sentence.split('_____').length - 1 && (
                      <span 
                        className={`badge ${answer.userAnswers[i] === answer.correctAnswers[i] ? 
                                    'bg-success' : 'bg-danger'} mx-1`}
                      >
                        {answer.userAnswers[i] || "unanswered"}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              
              {!answer.isCorrect && (
                <div className="mt-2 pt-2 border-top">
                  <small className="text-muted d-block mb-1">Correct answer:</small>
                  <p className="card-text mb-0">
                    {answer.sentence.split('_____').map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < answer.sentence.split('_____').length - 1 && (
                          <span className="badge bg-success mx-1">
                            {answer.correctAnswers[i]}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center mt-4">
          <button 
            className="btn btn-primary btn-lg px-4"
            onClick={onRestart}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;