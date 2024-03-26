import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const MathProblem = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
`;

const AnswerInput = styled.input`
  padding: 10px;
  margin-top: 20px;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Score = styled.p`
  font-size: 24px;
  margin-top: 20px;
`;

function MathGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [results, setResults] = useState<{ correct: number; incorrect: number } | null>(null);

  useEffect(() => {
    if (gameStarted) {
      generateNewProblem();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setTimeout(() => {
        generateNewProblem();
      }, 4000); // Change this value to adjust the speed (in milliseconds)
      return () => clearTimeout(timer);
    }
  }, [num1, num2, operator, gameStarted]);

  const generateNewProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10);
    const newNum2 = Math.floor(Math.random() * 10);
    const operators = ['+', '-', 'x'];
    const newOperator = operators[Math.floor(Math.random() * operators.length)];

    setNum1(newNum1);
    setNum2(newNum2);
    setOperator(newOperator);
    setAnswer('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAnswer(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const correctAnswer = calculateCorrectAnswer();
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
    }
    generateNewProblem();
  };

  const calculateCorrectAnswer = () => {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'x':
        return num1 * num2;
      default:
        return NaN;
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setResults(null);
  };

  const handleFinishGame = () => {
    setGameStarted(false);
    const correctAnswers = score;
    const incorrectAnswers = 10 - score;
    setResults({ correct: correctAnswers, incorrect: incorrectAnswers });
  };

  return (
    <Container>
      <h1>HARD WORK ALWAYS PAYS OFF</h1>
      <h1 style={{ color: '#333' }}>Math Game</h1>
      {!gameStarted ? (
        <SubmitButton onClick={handleStartGame}>Start</SubmitButton>
      ) : (
        <>
          <MathProblem>
            {num1} {operator} {num2} =
          </MathProblem>
          <form onSubmit={handleSubmit}>
            <AnswerInput
              type="number"
              value={answer}
              onChange={handleChange}
              placeholder="Your answer"
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
          <Score>Score: {score}</Score>
          <SubmitButton onClick={handleFinishGame}>Finish</SubmitButton>
        </>
      )}
      {results && (
        <div>
          <h2>Results</h2>
          <p>Correct Answers: {results.correct}</p>
          <p>Incorrect Answers: {results.incorrect}</p>
        </div>
      )}
    </Container>
  );
}

export default MathGame;
