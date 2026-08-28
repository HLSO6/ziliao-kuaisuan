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

        <main className="flex-grow p-5 space-y-6">
          {/* Today's Recommendation Card */}
          <div className="bg-gradient-to-br from-primary to-[#4a9c6d] rounded-2xl p-6 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center mb-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <h2 className="text-xl font-semibold">📚 现期与基期</h2>
              </div>
            </div>
            <p className="mb-2 opacity-90">资料分析的第一步</p>
            <p className="mb-6 text-sm opacity-80">先分清谁是现期，谁是基期，再开始计算。</p>
            <Link href="/lessons" className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md">
              开始学习 →
            </Link>
          </div>

          {/* Speed Training Card */}
          <div className="bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-2xl p-6 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center mb-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <h2 className="text-xl font-semibold">⚡ 速算训练</h2>
              </div>
            </div>
            <p className="mb-2 opacity-90">自己选题，随机训练</p>
            <p className="mb-6 text-sm opacity-80">乘法、除法、加减，自由选择数字范围和题量。</p>
            <Link href="/speed" className="inline-block bg-white text-[#FF9800] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md">
              开始训练 →
            </Link>
          </div>

          {/* Percentage Conversion Card */}
          <div className="bg-gradient-to-br from-[#6A5ACD] to-[#5D4F8C] rounded-2xl p-6 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center mb-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <h2 className="text-xl font-semibold">🔢 百分数互化</h2>
              </div>
            </div>
            <p className="mb-2 opacity-90">百化分 · 分化百</p>
            <p className="mb-6 text-sm opacity-80">把常见百分数快速转换成分数，提高资料分析计算速度。</p>
            <Link href="/percentage" className="inline-block bg-white text-[#6A5ACD] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md">
              开始练习 →
            </Link>
          </div>

          {/* Learning Progress */}
          <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-4">学习进度</h2>
            <div className="flex items-center justify-between mb-3">
              <span className="text-secondaryText">已学习</span>
              <span className="font-medium text-primary">{progress.completed} / {progress.total}</span>
            </div>
            <div className="w-full bg-lightGreenAccent rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-[#4a9c6d] h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
              ></div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-lightGreen rounded-full px-4 py-2 text-sm text-secondaryText">
                {progress.completed === 0 ? '开始学习第一个知识点吧！' : progress.completed >= progress.total ? '恭喜完成所有知识点！' : '坚持学习，你会越来越棒！'}
              </div>
            </div>
          </div>

          {/* Daily Practice */}
          <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent">
            <div className="flex items-center mb-2">
              <h2 className="text-lg font-semibold text-darkText">📝 每日一题</h2>
            </div>
            <p className="text-secondaryText mb-4">用1分钟，练一个知识点。</p>
            <Link href="/practice" className="w-full bg-gradient-to-r from-primary to-[#4a9c6d] text-white py-4 rounded-xl text-center font-medium hover:opacity-90 transition-all block shadow-md">
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