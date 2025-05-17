import React, { useState } from 'react';
import './styles/style.css';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = async () => {
    setQuizStarted(true);
    setStartTime(Date.now());

    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    const data = await res.json();

    const formattedQuestions = data.results.map((q) => ({
      question: q.question,
      correct: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
    }));

    setQuestions(formattedQuestions);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    const isCorrect = answer === questions[current].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[current].question,
        selected: answer,
        correct: questions[current].correct,
        answers: questions[current].answers,
      },
    ]);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrent(0);
    setScore(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowReview(false);
  };

  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  if (!quizStarted) return <StartScreen startQuiz={startQuiz} />;

  if (quizCompleted && showReview)
    return <ReviewScreen userAnswers={userAnswers} restartQuiz={restartQuiz} />;

  if (quizCompleted)
    return (
      <ResultScreen
        score={score}
        time={totalTime}
        total={questions.length}
        restartQuiz={restartQuiz}
        showReview={() => setShowReview(true)}
      />
    );

  if (questions.length === 0 || !questions[current])
    return <p style={{ textAlign: 'center' }}>Loading questions...</p>;

  return (
    <QuestionCard
      question={questions[current].question}
      answers={questions[current].answers}
      currentQuestionIndex={current}
      totalQuestions={questions.length}
      handleAnswerClick={handleAnswerClick}
      selectedAnswer={selectedAnswer}
      correctAnswer={questions[current].correct}
    />
  );
};

export default App;
// App.js