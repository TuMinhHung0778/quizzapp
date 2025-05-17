import React from 'react';

export default function StartScreen({ startQuiz }) {
  return (
    <div className="start-screen">
      <h1>🤖 Quiz App</h1>
      <button onClick={startQuiz}>Start Quiz!</button>
    </div>
  );
}
