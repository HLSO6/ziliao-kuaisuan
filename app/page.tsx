'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [progress, setProgress] = useState({ completed: 0, total: 8 });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <h1 className="text-3xl font-bold text-center text-darkText">资料快算</h1>
          <p className="text-center text-secondaryText mt-2">把资料分析，拆开练。</p>
        </header>

        <main className="flex-grow p-6 space-y-8">
          {/* Today's Recommendation Card */}
          <div className="bg-primary rounded-xl p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">📚 现期与基期</h2>
            <p className="mb-4 opacity-90">资料分析的第一步</p>
            <p className="mb-6 text-sm opacity-80">先分清谁是现期，谁是基期，再开始计算。</p>
            <Link href="/lessons" className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
              开始学习 →
            </Link>
          </div>

          {/* Learning Progress */}
          <div className="bg-cardBg rounded-xl p-6 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-4">学习进度</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-secondaryText">已学习</span>
              <span className="font-medium text-primary">{progress.completed} / {progress.total}</span>
            </div>
            <div className="w-full bg-lightGreenAccent rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Daily Practice */}
          <div className="bg-cardBg rounded-xl p-6 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-2">📝 每日一题</h2>
            <p className="text-secondaryText mb-4">用1分钟，练一个知识点。</p>
            <Link href="/practice" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
              开始答题 →
            </Link>
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}