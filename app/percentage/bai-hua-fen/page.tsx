'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { percentageQuestions } from '@/data/percentageQuestions';

export default function BaiHuaFenPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [answers, setAnswers] = useState<{questionId: string, userAnswer: string, isCorrect: boolean}[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化题目（只选择百化分类型的题目）
  useEffect(() => {
    const percentToFractionQuestions = percentageQuestions.filter(q => q.type === 'percent-to-fraction');
    
    // 随机选择25题
    const shuffled = [...percentToFractionQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 25);
    
    setQuestions(selectedQuestions);
    
    // 开始计时
    const startTimeValue = Date.now();
    setStartTime(startTimeValue);
    
    // 设置计时器
    timerRef.current = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTimeValue) / 1000));
    }, 1000);
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSelectOption = (optionKey: string) => {
    if (!showResult) {
      setSelectedOption(optionKey);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && questions[currentQuestionIndex]) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.answer;
      
      // 记录答案
      const newAnswer = {
        questionId: currentQuestion.id,
        userAnswer: selectedOption,
        isCorrect
      };
      
      setAnswers(prev => [...prev, newAnswer]);
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // 结束练习，跳转到结果页面
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      const currentAnswer = selectedOption ? {
        questionId: questions[currentQuestionIndex].id,
        userAnswer: selectedOption,
        isCorrect: questions[currentQuestionIndex].answer === selectedOption
      } : null;
      
      // 存储结果
      const results = {
        type: 'bai-hua-fen',
        questions: questions,
        answers: [...answers, ...(currentAnswer ? [currentAnswer] : [])],
        timeSpent: currentTime,
        totalQuestions: questions.length,
        correctCount: answers.filter(a => a.isCorrect).length + 
                      (currentAnswer?.isCorrect ? 1 : 0)
      };
      
      sessionStorage.setItem('percentageResults', JSON.stringify(results));
      router.push('/percentage/result');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-6">
          <p className="text-center text-secondaryText">正在加载题目...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-lightGreenAccent sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <button onClick={() => router.back()} className="text-primary">
              ← 返回
            </button>
            <div className="text-secondaryText">⏱ {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')}</div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-secondaryText mb-1">
              <span>🔢 百化分 第 {currentQuestionIndex + 1} / {questions.length} 题</span>
            </div>
            <div className="w-full bg-lightGreenAccent rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </header>

        <main className="flex-grow p-6">
          <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent">
            <div className="text-2xl font-bold text-darkText mb-6 text-center">
              {currentQuestion?.question}
            </div>
            
            <div className="space-y-3 mb-6">
              {currentQuestion?.options.map((option: any) => {
                let optionStyle = "p-4 border rounded-lg text-left";
                
                if (showResult) {
                  if (option.key === currentQuestion.answer) {
                    optionStyle += " bg-green-100 border-green-500 text-green-700";
                  } else if (option.key === selectedOption && selectedOption !== currentQuestion.answer) {
                    optionStyle += " bg-red-100 border-red-500 text-red-700";
                  }
                } else if (selectedOption === option.key) {
                  optionStyle += " bg-primary border-primary text-white";
                } else {
                  optionStyle += " border-gray-200 hover:border-primary";
                }
                
                return (
                  <button
                    key={option.key}
                    className={optionStyle}
                    onClick={() => handleSelectOption(option.key)}
                    disabled={showResult}
                    style={{ textAlign: 'left' }}
                  >
                    <span className="font-medium mr-2">{option.key}.</span> {option.text}
                  </button>
                );
              })}
            </div>
            
            {!showResult ? (
              <button
                className={`w-full py-4 rounded-xl font-medium ${
                  selectedOption 
                    ? 'bg-primary text-white hover:bg-opacity-90' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleSubmit}
                disabled={!selectedOption}
              >
                提交答案
              </button>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  selectedOption === currentQuestion.answer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {selectedOption === currentQuestion.answer ? '✓ 回答正确' : '✗ 回答错误'}
                </div>
                
                {selectedOption !== currentQuestion.answer && (
                  <div>
                    <p className="text-secondaryText mb-1">正确答案：</p>
                    <p className="font-medium text-darkText">
                      {currentQuestion.options.find((opt: any) => opt.key === currentQuestion.answer)?.text}
                    </p>
                  </div>
                )}
                
                <div className="bg-lightGreen p-4 rounded-lg">
                  <p className="font-medium text-darkText mb-2">解析：</p>
                  <p className="text-darkText">{currentQuestion.analysis}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-medium text-yellow-800 mb-2">💡 速算记忆</p>
                  <p className="text-yellow-700">{currentQuestion.tip}</p>
                </div>
                
                <button
                  className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-opacity-90"
                  onClick={handleNext}
                >
                  {currentQuestionIndex < questions.length - 1 ? '下一题 →' : '查看结果'}
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}