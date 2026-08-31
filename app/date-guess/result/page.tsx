'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DateGuessResult {
  score: number;
  total: number;
  timeTaken: number; // Total time for the quiz
  wrongQuestions: { dateStr: string; userAnswer: number; correctAnswer: number }[]; // Stores wrong attempts
}

export default function DateGuessResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<DateGuessResult | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('dateGuessResult');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no result is found, redirect back
      router.push('/date-guess');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <p className="text-secondaryText">加载结果中...</p>
      </div>
    );
  }

  const { score, total, timeTaken, wrongQuestions } = results;
  const accuracy = Math.round((score / total) * 100);
  const averageTimePerQuestion = (timeTaken / total).toFixed(2);

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-darkText">月天数推算结果</h1>
        </header>

        <main className="flex-grow p-6">
          {/* Stats Summary */}
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-darkText">{score}</p>
              <p className="text-sm text-secondaryText">答对</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-darkText">{total - score}</p>
              <p className="text-sm text-secondaryText">错误</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-darkText">{accuracy}%</p>
              <p className="text-sm text-secondaryText">正确率</p>
            </div>
          </div>

          <div className="w-full bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-secondaryText">总用时:</span>
              <span className="font-medium text-darkText">{timeTaken.toFixed(2)} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">平均耗时/题:</span>
              <span className="font-medium text-darkText">{averageTimePerQuestion} 秒</span>
            </div>
          </div>

          {/* Wrong Questions Review */}
          {wrongQuestions.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">错题回顾</h3>
              {wrongQuestions.map((q, index) => (
                <div key={index} className="mb-4 last:mb-0 p-3 bg-white rounded-lg border border-red-100">
                  <p className="text-darkText mb-2">问题: {q.dateStr} 有多少天？</p>
                  <div className="flex justify-between">
                    <p className="text-red-700">你的答案: {q.userAnswer} 天</p>
                    <p className="text-green-700">正确答案: {q.correctAnswer} 天</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <div className="p-6 border-t border-lightGreenAccent">
          <Link href="/date-guess" className="block w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition">
            再试一次
          </Link>
          <Link href="/" className="block w-full mt-3 text-center text-primary font-medium">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}