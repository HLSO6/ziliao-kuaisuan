'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [resultData, setResultData] = useState<{ correct: number; total: number } | null>(null);

  useEffect(() => {
    const correct = parseInt(searchParams.get('correct') || '0');
    const total = parseInt(searchParams.get('total') || '0');
    
    setResultData({ correct, total });
  }, [searchParams]);

  if (!resultData) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-6">
          <p className="text-center text-secondaryText">正在加载结果...</p>
        </div>
      </div>
    );
  }

  const { correct, total } = resultData;
  const percentage = Math.round((correct / total) * 100);
  
  let encouragement = '';
  if (percentage >= 90) {
    encouragement = '非常棒！你已经掌握得很好了。';
  } else if (percentage >= 70) {
    encouragement = '不错！再练几题就更稳了。';
  } else {
    encouragement = '没关系。建议重新学习相关知识点。';
  }

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-center text-darkText mb-2">本次练习完成</h1>
          
          <div className="my-8 text-center">
            <div className="text-4xl font-bold text-primary">{correct} / {total}</div>
            <div className="mt-2 text-secondaryText">{percentage}%</div>
          </div>
          
          <p className="text-center text-secondaryText mb-8">{encouragement}</p>
        </main>

        <div className="p-6 space-y-4">
          <Link 
            href="/practice" 
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            重新练习
          </Link>
          <Link 
            href="/lessons" 
            className="w-full bg-lightGreenAccent text-primary py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            返回学习
          </Link>
        </div>
      </div>
    </div>
  );
}