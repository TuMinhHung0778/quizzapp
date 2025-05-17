import React from 'react';

export default function QuestionCard({
  question,
  answers,
  currentQuestionIndex,
  totalQuestions,
  handleAnswerClick,
  selectedAnswer,
  correctAnswer
}) {
  return (
    <div className="question-card">
      <h2>Question {currentQuestionIndex + 1} / {totalQuestions}</h2>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answer-options">
        {answers.map((answer, idx) => {
          let className = "option";
          if (selectedAnswer) {
            if (answer === correctAnswer) className += " correct";
            else if (answer === selectedAnswer) className += " wrong";
          }

          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleAnswerClick(answer)}
              disabled={!!selectedAnswer}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
    </div>
  );
}
