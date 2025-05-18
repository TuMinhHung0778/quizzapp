import React from 'react';

export default function StartScreen({ startQuiz }) {
  return (
    <div className="start-screen">
      <img src="/images/robot.png" alt="robot" style={{ width: 150, marginBottom: 20 }} />
      <h1>🤖 Quiz App</h1>
      <button onClick={startQuiz} className="quiz-button">Start Quiz!</button>
    </div>
  );
}
