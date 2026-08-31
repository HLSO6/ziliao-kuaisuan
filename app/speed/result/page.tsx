'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateQuestions, TrainingConfig } from '@/lib/questionGenerator';

interface AnswerData {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

interface SpeedResultData {
  answers: AnswerData[];
  totalQuestions: number;
  timeSpent: number;
  config: TrainingConfig;
}

export default function SpeedResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<SpeedResultData | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('speedTrainingResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // 如果没有找到结果，则重定向回练习或首页
      router.push('/speed');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <p className="text-secondaryText">加载结果中...</p>
      </div>
    );
  }

  const { answers, totalQuestions, timeSpent, config } = results;
  const score = answers ? answers.filter(a => a.isCorrect).length : 0;
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const averageTimePerQuestion = totalQuestions > 0 ? (timeSpent / totalQuestions).toFixed(2) : '0.00';
  
  const correctTimes = answers ? answers.filter(a => a.isCorrect).map(a => a.timeSpent) : [];
  const wrongTimes = answers ? answers.filter(a => !a.isCorrect).map(a => a.timeSpent) : [];
  
  const averageCorrectTime = correctTimes.length > 0 
    ? (correctTimes.reduce((sum, t) => sum + t, 0) / correctTimes.length).toFixed(2) 
    : '0.00';
  const averageWrongTime = wrongTimes.length > 0 
    ? (wrongTimes.reduce((sum, t) => sum + t, 0) / wrongTimes.length).toFixed(2) 
    : '0.00';

  const wrongQuestions = answers ? answers.filter(a => !a.isCorrect).map(a => ({
    question: a.question,
    userAnswer: a.userAnswer,
    correctAnswer: a.correctAnswer
  })) : [];

  // 重新开始训练函数
  const handleRestart = () => {
    // 存储配置
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
        {/* 头部 */}
        <header className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-darkText">速算训练结果</h1>
        </header>

        <main className="flex-grow p-6">
          {/* 统计摘要 */}
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-darkText">{score}</p>
              <p className="text-sm text-secondaryText">答对</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-darkText">{totalQuestions - score}</p>
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
              <span className="font-medium text-darkText">{timeSpent.toFixed(0)} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">平均耗时/题:</span>
              <span className="font-medium text-darkText">{averageTimePerQuestion} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">平均正确耗时:</span>
              <span className="font-medium text-darkText">{averageCorrectTime} 秒</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondaryText">平均错误耗时:</span>
              <span className="font-medium text-darkText">{averageWrongTime} 秒</span>
            </div>
          </div>

          {/* 错题回顾 */}
          {wrongQuestions.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-3">错题回顾</h3>
              {wrongQuestions.map((q, index) => (
                <div key={index} className="mb-4 last:mb-0 p-3 bg-white rounded-lg border border-red-100">
                  <p className="text-darkText mb-2">题目: {q.question}</p>
                  <div className="flex justify-between">
                    <p className="text-red-700">你的答案: {q.userAnswer}</p>
                    <p className="text-green-700">正确答案: {q.correctAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <div className="p-6 border-t border-lightGreenAccent space-y-3">
          <button 
            onClick={handleRestart}
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            再来一组
          </button>
          <Link 
            href="/speed" 
            className="w-full bg-lightGreenAccent text-primary py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block text-center"
          >
            返回速算训练
          </Link>
        </div>
      </div>
    </div>
  );
}