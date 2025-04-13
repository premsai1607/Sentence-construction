import React from 'react';

function StartScreen({ onStart }) {
  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h4 className="m-0">Fill-in-the-Blanks Quiz</h4>
      </div>
      <div className="card-body p-4">
        <h5 className="card-title mb-3">Welcome to the Quiz!</h5>
        <p className="card-text mb-4">
          This quiz will test your knowledge with fill-in-the-blank questions.
          You will have 30 seconds to answer each question.
        </p>
        <ul className="list-group mb-4">
          <li className="list-group-item">5 challenging questions</li>
          <li className="list-group-item">Select words to fill in the blanks</li>
          <li className="list-group-item">Time limit: 30 seconds per question</li>
          <li className="list-group-item">See your results at the end</li>
        </ul>
        <div className="text-center">
          <button 
            className="btn btn-primary btn-lg px-5"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;