'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <h1 className="text-3xl font-bold text-center text-darkText">资料快算</h1>
          <p className="text-center text-secondaryText mt-2">把资料分析，拆开练。</p>
        </header>

        <main className="flex-grow p-5">
          {/* Grid container for modules */}
          <div className="grid grid-cols-3 gap-4">
            
            {/* Speed Training Card */}
            <Link href="/speed" className="col-span-2 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-2xl p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-center">⚡ 基础速算</h2>
              </div>
              <p className="text-xs opacity-90 text-center">四则运算</p>
            </Link>

            {/* Percentage Conversion Card */}
            <Link href="/percentage" className="bg-gradient-to-br from-[#6A5ACD] to-[#5D4F8C] rounded-2xl p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-center">🔢</h2>
              </div>
              <p className="text-xs opacity-90 text-center">百化分</p>
            </Link>

            {/* Square Training Card */}
            <Link href="/square" className="bg-gradient-to-br from-[#FF5722] to-[#E64A19] rounded-2xl p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-center">2️⃣</h2>
              </div>
              <p className="text-xs opacity-90 text-center">11-15平方</p>
            </Link>

            {/* Fraction Compare Card */}
            <Link href="/fraction-compare" className="bg-gradient-to-br from-[#9C27B0] to-[#7B1FA2] rounded-2xl p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-center">⚖️</h2>
              </div>
              <p className="text-xs opacity-90 text-center">分数比大小</p>
            </Link>

            {/* Days-in-Month Calculation Card */}
            <Link href="/date-guess" className="col-span-2 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-2xl p-4 text-white shadow-lg transform transition-transform duration-200 hover:scale-[1.02]">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-2">
                <h2 className="text-lg font-semibold text-center">📅 月天数</h2>
              </div>
              <p className="text-xs opacity-90 text-center">推算年月天数</p>
            </Link>

          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}