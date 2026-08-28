'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PercentageResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // 尝试从两个可能的存储位置获取结果
    const storedResults = sessionStorage.getItem('percentageResults') || sessionStorage.getItem('percentageTrainingResults');
    if (!storedResults) {
      router.push('/percentage');
      return;
    }
    
    const parsedResults = JSON.parse(storedResults);
    setResults(parsedResults);
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-6">
          <p className="text-center text-secondaryText">正在加载结果...</p>
        </div>
      </div>
    );
  }

  const correctCount = results.correctCount;
  const totalQuestions = results.totalQuestions;
  const timeSpent = results.timeSpent || 0;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  let encouragement = '';
  if (percentage >= 90) {
    encouragement = '非常棒！这些常用数字已经很熟练了。';
  } else if (percentage >= 70) {
    encouragement = '不错！再多练几次会更稳。';
  } else {
    encouragement = '建议先把常用百分数记熟。';
  }

  // 计算训练类型中文名
  let trainingType = '';
  if (results.type === 'bai-hua-fen') {
    trainingType = '百化分';
  } else if (results.type === 'fraction-to-percent') {
    trainingType = '分化百';
  } else {
    trainingType = '百分数互化';
  }

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-center text-darkText mb-2">本次练习完成</h1>
          
          <div className="my-8 text-center space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary">{correctCount} / {totalQuestions}</div>
              <div className="mt-2 text-secondaryText">{percentage}%</div>
            </div>
            
            <div className="text-secondaryText">
              本次训练：{trainingType}<br/>
              用时：{Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, '0')}
            </div>
          </div>
          
          <p className="text-center text-secondaryText mb-8">{encouragement}</p>
        </main>

        <div className="p-6 space-y-4">
          <Link 
            href={results.type === 'bai-hua-fen' ? '/percentage/bai-hua-fen' : '/percentage/fen-hua-bai'} 
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            再练一次
          </Link>
          <Link 
            href="/percentage" 
            className="w-full bg-lightGreenAccent text-primary py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            返回百分数互化
          </Link>
        </div>
      </div>
    </div>
  );
}