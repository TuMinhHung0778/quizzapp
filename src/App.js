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

    const formatted = data.results.map((q) => ({
      question: q.question,
      correct: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
    }));

    setQuestions(formatted);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[current].correct;
    if (isCorrect) setScore(score + 1);

    setUserAnswers([...userAnswers, {
      question: questions[current].question,
      correct: questions[current].correct,
      selected: answer,
      answers: questions[current].answers
    }]);
  };

  const goToNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setCurrent(0);
    setSelectedAnswer(null);
    setScore(0);
    setStartTime(null);
    setQuizCompleted(false);
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
    return <p className="screen-center">Loading questions...</p>;

  return (
    <QuestionCard
      question={questions[current].question}
      answers={questions[current].answers}
      currentQuestionIndex={current}
      totalQuestions={questions.length}
      handleAnswerClick={handleAnswerClick}
      selectedAnswer={selectedAnswer}
      correctAnswer={questions[current].correct}
      goToNext={goToNext}
    />
  );
};

export default App;
