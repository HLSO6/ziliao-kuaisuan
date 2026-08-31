'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

const getDaysInMonth = (month: number, year: number) => {
  if (month === 1 && isLeapYear(year)) return 29; // 2月闰年
  return DAYS_IN_MONTH[month];
};

export default function DateGuessPage() {
  const [date, setDate] = useState({ month: 0, year: 2023 }); // month is 0-indexed (Jan=0)
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{correct: boolean, correctDays: number} | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const correctDays = getDaysInMonth(date.month, date.year);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setTimeTaken(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const loadNewQuestion = () => {
    const year = Math.floor(Math.random() * 10) + 2020; // 2020-2029
    const month = Math.floor(Math.random() * 12); // 0-11 (Jan-Dec)

    setDate({ month, year });
    setUserAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    loadNewQuestion();
    setStartTime(Date.now());
  }, []);

  const handleAnswerSubmit = () => {
    if (userAnswer === null) return;

    const isCorrect = userAnswer === correctDays;
    setFeedback({ correct: isCorrect, correctDays });
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestionOrFinish = () => {
    if (questionNumber < 10) { // Assuming 10 questions per session
      setQuestionNumber(prev => prev + 1);
      loadNewQuestion();
      setStartTime(Date.now());
      setTimeTaken(0);
    } else {
      // Quiz finished, store results and redirect
      const finalResults = {
        score,
        total: 10,
        timeTaken: timeTaken / 1000, // Convert ms to seconds
      };
      sessionStorage.setItem('dateGuessResult', JSON.stringify(finalResults));
      window.location.href = '/date-guess/result';
    }
  };

  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

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
            <h1 className="text-2xl font-bold text-darkText">📅 月天数推算</h1>
            <p className="text-secondaryText mt-1">推算指定年月有多少天</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-secondaryText mb-1">
                <span>第 {questionNumber} / 10 题</span>
                <span>{(timeTaken / 1000).toFixed(2)}秒</span>
              </div>
              <div className="w-full bg-lightGreenAccent rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(questionNumber / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Date Display */}
          <div className="bg-cardBg rounded-xl p-6 text-center shadow-sm border border-lightGreenAccent">
            <p className="text-2xl font-bold text-darkText">
              {date.year}年 {monthNames[date.month]}
            </p>
            <p className="text-secondaryText mt-2">这个月有多少天？</p>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
             <input
                type="number"
                value={userAnswer ?? ''}
                onChange={(e) => setUserAnswer(e.target.valueAsNumber)}
                className="w-full p-4 border-2 border-primary rounded-lg text-center text-xl"
                placeholder="请输入天数"
                disabled={!!feedback}
                min="1"
                max="31"
              />

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg text-center ${
                feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {feedback.correct ? `✓ 正确! 答案是 ${correctDays} 天。` : `✗ 错误，正确答案是 ${correctDays} 天。`}
              </div>
            )}

            {/* Submit Button */}
            {!feedback && (
              <button
                className={`w-full py-3 rounded-lg font-medium ${
                  userAnswer !== null && userAnswer > 0
                    ? 'bg-primary text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleAnswerSubmit}
                disabled={userAnswer === null || userAnswer <= 0}
              >
                提交答案
              </button>
            )}

            {/* Next Question Button (only appears after submitting) */}
            {feedback && (
               <button
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
                onClick={handleNextQuestionOrFinish}
              >
                {questionNumber < 10 ? '下一题 →' : '查看结果'}
              </button>
            )}
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}