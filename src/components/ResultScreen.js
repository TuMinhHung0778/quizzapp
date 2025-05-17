import React from 'react';

export default function ResultScreen({ score, time, total, restartQuiz, showReview }) {
  const passed = score >= Math.ceil(total / 2);

  return (
    <div className="result-screen">
      <h2>{passed ? '🎉 Congratulations!!' : '🔁 Completed!'}</h2>
      <p>{passed ? 'You are amazing!!' : 'Better luck next time!'}</p>
      <p>{score}/{total} correct answers in {time} seconds</p>
      <button onClick={restartQuiz}>Play Again</button>
      <button onClick={showReview} style={{ marginLeft: '10px' }}>Review Answers</button>
    </div>
  );
}
