'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Helper to generate a random fraction
const generateRandomFraction = () => {
  const numerator = Math.floor(Math.random() * 9) + 1; // 1-9
  const denominator = Math.floor(Math.random() * 90) + 10; // 10-99
  return { num: numerator, den: denominator, value: numerator / denominator };
};

export default function FractionComparePage() {
  const [fractions, setFractions] = useState<{num: number, den: number, value: number}[]>([]);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{correct: boolean, correctIndex: number} | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [allTimes, setAllTimes] = useState<number[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<{ question: string[]; userAnswer: number; correctAnswer: number }[]>([]);

  const NUM_FRACTIONS_PER_QUESTION = 4;
  const TOTAL_QUESTIONS = 10;

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeTaken(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const loadNewQuestion = () => {
    const newFractions = [];
    for (let i = 0; i < NUM_FRACTIONS_PER_QUESTION; i++) {
      newFractions.push(generateRandomFraction());
    }
    // Ensure the fractions are unique enough in value
    newFractions.sort((a, b) => a.value - b.value);
    setFractions(newFractions);
    setUserAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    loadNewQuestion();
    setStartTime(Date.now());
  }, []);

  const handleAnswerSubmit = () => {
    if (userAnswer === null || feedback !== null) return; // Prevent double submission

    const correctIndex = fractions.findIndex(f => f.value === Math.max(...fractions.map(f => f.value)));
    const isCorrect = userAnswer === correctIndex;
    const questionValues = fractions.map(f => `${f.num}/${f.den}`);
    
    setFeedback({ correct: isCorrect, correctIndex });
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongQuestions(prev => [...prev, { 
        question: questionValues, 
        userAnswer: userAnswer, 
        correctAnswer: correctIndex 
      }]);
    }
    // Record time for this question
    const timeForThisQuestion = timeTaken / 1000; // Convert ms to seconds
    setAllTimes(prev => [...prev, timeForThisQuestion]);
  };

  const handleNextOrFinish = () => {
    if (feedback === null) return; // Should not happen if button is disabled correctly

    if (questionNumber < TOTAL_QUESTIONS) {
        setQuestionNumber(prev => prev + 1);
        loadNewQuestion();
        // Note: We do not reset startTime or timeTaken here for the next question
        // as the overall timer continues. We only record the time for the previous question.
    } else {
        // Quiz finished, store results and redirect
        const finalResults = {
          score,
          total: TOTAL_QUESTIONS,
          timeTaken: timeTaken / 1000, // Total time in seconds
          correctTimes: allTimes.filter((_, i) => i < score), // Approximate, assumes correct answers come first
          wrongTimes: allTimes.filter((_, i) => i >= score), // Approximate
          wrongQuestions,
        };
        sessionStorage.setItem('fractionCompareResult', JSON.stringify(finalResults));
        window.location.href = '/fraction-compare/result';
    }
  };

  if (fractions.length === 0) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <p className="text-secondaryText">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-lightGreenAccent">
          <Link href="/" className="text-primary font-medium flex items-center">
            ← 返回首页
          </Link>
        </header>

        <main className="flex-grow p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darkText">⚖️ 分数比大小</h1>
            <p className="text-secondaryText mt-1">选择最大的分数</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-secondaryText mb-1">
                <span>第 {questionNumber} / {TOTAL_QUESTIONS} 题</span>
                <span>{(timeTaken / 1000).toFixed(2)}s</span>
              </div>
              <div className="w-full bg-lightGreenAccent rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(questionNumber / TOTAL_QUESTIONS) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Fractions Display */}
          <div className="grid grid-cols-2 gap-4">
            {fractions.map((f, index) => {
                let buttonStyle = "p-4 border rounded-lg text-center ";
                
                if (feedback) {
                    if (index === feedback.correctIndex) {
                        buttonStyle += "bg-green-100 border-green-500 text-green-700";
                    } else if (userAnswer === index && !feedback.correct) {
                        buttonStyle += "bg-red-100 border-red-500 text-red-700";
                    } else {
                        buttonStyle += "border-gray-200 text-secondaryText";
                    }
                } else {
                    buttonStyle += userAnswer === index 
                        ? "bg-primary border-primary text-white" 
                        : "border-gray-200 hover:border-primary";
                }

                return (
                    <button
                        key={index}
                        className={buttonStyle}
                        onClick={() => !feedback && setUserAnswer(index)}
                        disabled={!!feedback}
                    >
                        <span className="text-lg font-bold">{f.num}</span>
                        <br/>
                        <span className="text-lg">—</span>
                        <br/>
                        <span className="text-lg font-bold">{f.den}</span>
                    </button>
                );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-lg text-center ${
              feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {feedback.correct ? '✓ 回答正确!' : '✗ 回答错误'}
            </div>
          )}

          {/* Submit Button (shown before feedback) */}
          {!feedback && (
            <button
              className={`w-full py-3 rounded-lg font-medium ${
                userAnswer !== null
                  ? 'bg-primary text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleAnswerSubmit}
              disabled={userAnswer === null}
            >
              提交答案
            </button>
          )}

          {/* Next/Finish Button (shown after feedback) */}
          {feedback && (
            <button
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
              onClick={handleNextOrFinish}
            >
              {questionNumber < TOTAL_QUESTIONS ? '下一题 →' : '查看结果'}
            </button>
          )}
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}