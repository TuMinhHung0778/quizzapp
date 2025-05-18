import React from 'react';

export default function ResultScreen({ score, time, total, restartQuiz, showReview }) {
  const passed = score >= total / 2;
  const image = passed ? "/images/congrats.png" : "/images/repeat.png";

  return (
    <div className="screen-center">
      <img src={image} alt="result" style={{ width: 120, marginBottom: 20 }} />
      <h2>{passed ? "🎉 Congratulations!!" : "🔁 Completed!"}</h2>
      <p>{passed ? "You are amazing!!" : "Better luck next time!"}</p>
      <p>{score}/{total} correct answers in {time} seconds</p>
      <button onClick={restartQuiz} className="quiz-button">Play Again</button>
      <button onClick={showReview} className="quiz-button">Review Answers</button>
    </div>
  );
}
