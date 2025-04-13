import React from 'react';

function LoadingSpinner() {
  return (
    <div className="card shadow">
      <div className="card-body p-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{width: "3rem", height: "3rem"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mb-0 text-muted">Loading your quiz...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;