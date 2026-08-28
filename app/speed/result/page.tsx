'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateQuestions, TrainingConfig } from '@/lib/questionGenerator';

export default function SpeedResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('speedTrainingResults');
    if (!storedResults) {
      router.push('/speed');
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

  // 计算正确题目数量
  const correctCount = results.answers ? results.answers.filter((ans: any) => ans.isCorrect).length : 0;
  const totalQuestions = results.totalQuestions;
  const timeSpent = results.timeSpent || 0;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  let encouragement = '';
  if (percentage >= 90) {
    encouragement = '非常棒！继续保持速度和准确率。';
  } else if (percentage >= 70) {
    encouragement = '不错！继续练习，速度会越来越快。';
  } else {
    encouragement = '先保证准确率，再慢慢提升速度。';
  }

  // 重新开始训练函数
  const handleRestart = () => {
    const config = results.config;
    // 重新生成题目
    const newQuestions = generateQuestions(config);
    // 存储新配置和新题目
    sessionStorage.setItem('speedTrainingConfig', JSON.stringify(config));
    // 跳转到练习页面
    router.push('/speed/practice?' + new URLSearchParams({
      operation: config.operation,
      firstDigits: config.firstDigits.toString(),
      secondDigits: config.secondDigits.toString(),
      questionCount: config.questionCount.toString()
    }).toString());
  };

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-center text-darkText mb-2">训练完成</h1>
          
          <div className="my-8 text-center space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary">{correctCount} / {totalQuestions}</div>
              <div className="mt-2 text-secondaryText">{percentage}%</div>
            </div>
            
            <div className="text-secondaryText">
              总用时：{Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, '0')}
            </div>
          </div>
          
          <p className="text-center text-secondaryText mb-8">{encouragement}</p>
        </main>

        <div className="p-6 space-y-4">
          <button 
            onClick={handleRestart}
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            再来一组
          </button>
          <Link 
            href="/speed" 
            className="w-full bg-lightGreenAccent text-primary py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            返回速算训练
          </Link>
        </div>
      </div>
    </div>
  );
}