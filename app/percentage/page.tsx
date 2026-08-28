'use client';

import Link from 'next/link';

export default function PercentageHome() {
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
          <h1 className="text-2xl font-bold text-darkText">🔢 百分数互化</h1>
          <p className="text-secondaryText">百化分 · 分化百</p>
          <p className="text-secondaryText mb-6">把常见百分数快速转换成分数，提高资料分析计算速度。</p>

          {/* Bai Hua Fen Card */}
          <Link href="/percentage/bai-hua-fen">
            <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent hover:bg-lightGreenAccent transition">
              <h2 className="text-xl font-semibold text-darkText mb-2">百化分</h2>
              <p className="text-secondaryText mb-4">百分数 → 分数</p>
              <div className="bg-lightGreen p-3 rounded-lg inline-block">
                <p className="text-darkText">25% = 1/4</p>
              </div>
              <div className="mt-4 text-primary font-medium flex items-center">
                开始练习 →
              </div>
            </div>
          </Link>

          {/* Fen Hua Bai Card */}
          <Link href="/percentage/fen-hua-bai">
            <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent hover:bg-lightGreenAccent transition">
              <h2 className="text-xl font-semibold text-darkText mb-2">分化百</h2>
              <p className="text-secondaryText mb-4">分数 → 百分数</p>
              <div className="bg-lightGreen p-3 rounded-lg inline-block">
                <p className="text-darkText">1/8 = 12.5%</p>
              </div>
              <div className="mt-4 text-primary font-medium flex items-center">
                开始练习 →
              </div>
            </div>
          </Link>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}