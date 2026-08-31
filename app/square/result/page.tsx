'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SquareResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<{score: number, total: number, timeTaken: number} | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('squareQuizResult');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no result is found, redirect back
      router.push('/square');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <p className="text-secondaryText">加载结果中...</p>
      </div>
    );
  }

  const { score, total, timeTaken } = results;
  const accuracy = Math.round((score / total) * 100);
  const averageTimePerQuestion = (timeTaken / total).toFixed(2);

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-darkText">平方测验结果</h1>
        </header>

        <main className="flex-grow p-6 flex flex-col items-center justify-center">
          {/* Score Circle */}
          <div className="relative w-48 h-48 mb-8">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4a9c6d"
                strokeWidth="3"
                strokeDasharray={`${accuracy}, 100`}
              />
              <text x="18" y="20.5" textAnchor="middle" fill="#4a9c6d" fontSize="8" fontWeight="bold">{accuracy}%</text>
            </svg>
          </div>

          <div className="text-center mb-8">
            <p className="text-3xl font-bold text-darkText">{score} / {total}</p>
            <p className="text-secondaryText mt-2">答对题目 / 总题数</p>
          </div>

          <div className="w-full max-w-xs bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent space-y-3">
            <div className="flex justify-between">
              <span className="text-secondaryText">总用时:</span>
              <span className="font-medium text-darkText">{timeTaken.toFixed(2)} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">平均耗时/题:</span>
              <span className="font-medium text-darkText">{averageTimePerQuestion} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">正确率:</span>
              <span className="font-medium text-darkText">{accuracy}%</span>
            </div>
          </div>
        </main>

        <div className="p-6 border-t border-lightGreenAccent">
          <Link href="/square" className="block w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition">
            再测一次
          </Link>
          <Link href="/" className="block w-full mt-3 text-center text-primary font-medium">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}