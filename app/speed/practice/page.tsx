'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Operation = 'multiply' | 'divide' | 'add' | 'subtract';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateQuestion = (operation: Operation, firstDigits: number, secondDigits: number) => {
  let num1, num2, answer;
  if (operation === 'add') {
    num1 = getRandomInt(Math.pow(10, firstDigits - 1), Math.pow(10, firstDigits) - 1);
    num2 = getRandomInt(Math.pow(10, secondDigits - 1), Math.pow(10, secondDigits) - 1);
    answer = num1 + num2;
  } else if (operation === 'subtract') {
    num1 = getRandomInt(Math.pow(10, firstDigits - 1), Math.pow(10, firstDigits) - 1);
    num2 = getRandomInt(Math.pow(10, secondDigits - 1), Math.pow(10, secondDigits) - 1);
    // Ensure positive result
    if (num1 < num2) [num1, num2] = [num2, num1];
    answer = num1 - num2;
  } else if (operation === 'multiply') {
    num1 = getRandomInt(Math.pow(10, firstDigits - 1), Math.pow(10, firstDigits) - 1);
    num2 = getRandomInt(Math.pow(10, secondDigits - 1), Math.pow(10, secondDigits) - 1);
    answer = num1 * num2;
  } else { // divide
    // Generate division question with integer result
    const result = getRandomInt(Math.pow(10, Math.min(firstDigits, secondDigits) - 1), Math.pow(10, Math.min(firstDigits, secondDigits)) - 1);
    num2 = getRandomInt(Math.pow(10, secondDigits - 1), Math.pow(10, secondDigits) - 1);
    num1 = result * num2; // So that num1 / num2 = result
    answer = result;
  }
  return { num1, num2, operation, answer };
};

export default function SpeedPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const operation = (searchParams.get('operation') || 'multiply') as Operation;
  const firstDigitsParam = searchParams.get('firstDigits');
  const secondDigitsParam = searchParams.get('secondDigits');
  const questionCount = parseInt(searchParams.get('questionCount') || '10');

  const firstDigits = firstDigitsParam === 'random' ? 'random' : parseInt(firstDigitsParam || '2');
  const secondDigits = secondDigitsParam === 'random' ? 'random' : parseInt(secondDigitsParam || '2');

  const [currentQuestion, setCurrentQuestion] = useState({ num1: 0, num2: 0, operation: 'add' as Operation, answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{correct: boolean, correctAnswer: number} | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Example: 10 seconds per question
  const [score, setScore] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft <= 0 && feedback === null) {
      // Time's up for this question
      handleAnswerSubmit(); // Submit with empty answer
    }
  }, [timeLeft, feedback]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && feedback === null) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, feedback]);

  useEffect(() => {
    // Generate first question
    const genFirstQ = generateQuestion(
      operation,
      typeof firstDigits === 'number' ? firstDigits : getRandomInt(1, 4),
      typeof secondDigits === 'number' ? secondDigits : getRandomInt(1, 4)
    );
    setCurrentQuestion(genFirstQ);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleAnswerSubmit = () => {
    const userAnswer = parseFloat(userInput);
    const isCorrect = Math.abs(userAnswer - currentQuestion.answer) < 0.001; // Tolerance for floats

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    const timeUsed = 10 - timeLeft; // Assuming 10s per question
    setTimes(prev => [...prev, timeUsed]);
    setFeedback({ correct: isCorrect, correctAnswer: currentQuestion.answer });

    setTimeout(() => {
      if (currentIndex < questionCount - 1) {
        const genNextQ = generateQuestion(
          operation,
          typeof firstDigits === 'number' ? firstDigits : getRandomInt(1, 4),
          typeof secondDigits === 'number' ? secondDigits : getRandomInt(1, 4)
        );
        setCurrentQuestion(genNextQ);
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
        setFeedback(null);
        setTimeLeft(10); // Reset timer
      } else {
        // Quiz finished, calculate and store results
        const results = {
          score,
          total: questionCount,
          times,
          operation,
          firstDigits: firstDigitsParam,
          secondDigits: secondDigitsParam,
        };
        sessionStorage.setItem('speedQuizResult', JSON.stringify(results));
        router.push('/speed/result');
      }
    }, 1500);
  };

  const getOperationSymbol = (op: Operation) => {
    switch(op) {
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'add': return '+';
      case 'subtract': return '-';
      default: return op;
    }
  };

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-lightGreenAccent">
          <Link href="/speed" className="text-primary font-medium flex items-center">
            ← 返回配置
          </Link>
        </header>

        <main className="flex-grow p-6 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-darkText">⚡ 基础速算</h1>
            <p className="text-secondaryText">第 {currentIndex + 1} / {questionCount} 题</p>
            <div className="mt-2 text-lg font-mono text-primary">{timeLeft}s</div>
          </div>

          <div className="bg-cardBg rounded-xl p-8 shadow-sm border border-lightGreenAccent w-full max-w-xs text-center">
            <div className="text-4xl font-bold text-darkText mb-6">
              {currentQuestion.num1} {getOperationSymbol(currentQuestion.operation)} {currentQuestion.num2} = ?
            </div>

            <input
              ref={inputRef}
              type="number"
              value={userInput}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-primary rounded-lg text-center text-xl mb-4"
              placeholder="输入答案"
              disabled={!!feedback}
              onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit()}
            />

            {feedback && (
              <div className={`p-4 rounded-lg text-center mb-4 ${
                feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback.correct ? '✓ 正确!' : `✗ 错误，正确答案是 ${feedback.correctAnswer}`}
              </div>
            )}

            <button
              className={`w-full py-3 rounded-lg font-medium ${
                userInput
                  ? 'bg-primary text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleAnswerSubmit}
              disabled={!userInput || !!feedback}
            >
              {feedback ? '下一题...' : '提交'}
            </button>
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}