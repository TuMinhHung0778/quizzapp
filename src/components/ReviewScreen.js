import React from 'react';

export default function ReviewScreen({ userAnswers, restartQuiz }) {
  return (
    <div className="review-screen">
      <h2>Review Answers</h2>
      {userAnswers.map((item, index) => (
        <div key={index} className="review-item">
          <p dangerouslySetInnerHTML={{ __html: item.question }} />
          <ul>
            {item.answers.map((ans, idx) => (
              <li key={idx} style={{
                color: ans === item.correct ? 'green' : ans === item.selected ? 'red' : 'black',
                fontWeight: ans === item.correct || ans === item.selected ? 'bold' : 'normal'
              }} dangerouslySetInnerHTML={{ __html: ans }} />
            ))}
          </ul>
        </div>
      ))}
      <button onClick={restartQuiz}>Back to Start</button>
    </div>
  );
}
