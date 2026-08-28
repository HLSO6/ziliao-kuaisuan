'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateQuestions, TrainingConfig, DigitLength } from '@/lib/questionGenerator';

export default function SpeedPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<TrainingConfig | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{questionIndex: number, userAnswer: number, isCorrect: boolean}[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 获取配置参数
  useEffect(() => {
    // 从URL参数构建配置对象
    const operation = searchParams.get('operation') as 'multiply' | 'divide' | 'add' | 'subtract';
    const firstDigitsParam = searchParams.get('firstDigits');
    const secondDigitsParam = searchParams.get('secondDigits');
    const questionCount = parseInt(searchParams.get('questionCount') || '20');
    
    let firstDigits: DigitLength = 2;
    let secondDigits: DigitLength = 2;
    
    if (firstDigitsParam === 'random') {
      firstDigits = 'random';
    } else {
      const num = parseInt(firstDigitsParam || '2');
      if ([1, 2, 3, 4].includes(num)) {
        firstDigits = num as DigitLength;
      } else {
        firstDigits = 2; // 默认值
      }
    }
    
    if (secondDigitsParam === 'random') {
      secondDigits = 'random';
    } else {
      const num = parseInt(secondDigitsParam || '2');
      if ([1, 2, 3, 4].includes(num)) {
        secondDigits = num as DigitLength;
      } else {
        secondDigits = 2; // 默认值
      }
    }
    
    const newConfig: TrainingConfig = {
      operation,
      firstDigits,
      secondDigits,
      questionCount
    };
    
    setConfig(newConfig);
    sessionStorage.setItem('speedTrainingConfig', JSON.stringify(newConfig));
    
    // 生成题目
    const generatedQuestions = generateQuestions(newConfig);
    setQuestions(generatedQuestions);
    
    // 开始计时
    const startTimeValue = Date.now();
    setStartTime(startTimeValue);
    
    // 设置计时器
    timerRef.current = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTimeValue) / 1000));
    }, 1000);
  }, [searchParams]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = () => {
    if (!questions[currentQuestionIndex]) return;
    
    const correctAnswer = questions[currentQuestionIndex].answer;
    const userAnswerNum = parseInt(userAnswer);
    const isAnswerCorrect = userAnswerNum === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);
    
    // 记录用户答案
    const newUserAnswer = {
      questionIndex: currentQuestionIndex,
      userAnswer: userAnswerNum,
      isCorrect: isAnswerCorrect
    };
    
    setUserAnswers(prev => [...prev, newUserAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setSubmitted(false);
      setIsCorrect(null);
    } else {
      // 结束训练，跳转到结果页面
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // 计算结果
      const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
      const finalCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      
      const results = {
        config: config,
        questions: questions,
        answers: [...userAnswers, ...(isCorrect !== null ? [{
          questionIndex: currentQuestionIndex,
          userAnswer: parseInt(userAnswer),
          isCorrect: isCorrect
        }] : [])],
        timeSpent: currentTime,
        totalQuestions: questions.length,
        correctCount: finalCorrectCount
      };
      
      sessionStorage.setItem('speedTrainingResults', JSON.stringify(results));
      router.push('/speed/result');
    }
  };

  // 计算进度
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!config || questions.length === 0) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-6">
          <p className="text-center text-secondaryText">正在加载训练内容...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
              <span>第 {currentQuestionIndex + 1} / {questions.length} 题</span>
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
          <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent text-center">
            <div className="text-3xl font-bold text-darkText mb-8 min-h-[60px] flex items-center justify-center">
              {currentQuestion?.displayQuestion.replace(' = ?', '')}
            </div>
            
            {!submitted ? (
              <div className="space-y-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="请输入答案"
                  className="w-full p-4 border border-lightGreenAccent rounded-xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <button
                  className={`w-full py-4 rounded-xl font-medium ${
                    userAnswer 
                      ? 'bg-primary text-white hover:bg-opacity-90' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                >
                  提交答案
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
                </div>
                
                {!isCorrect && (
                  <div className="space-y-2">
                    <p className="text-secondaryText">你的答案：</p>
                    <p className="font-medium text-darkText text-xl">{userAnswer}</p>
                    <p className="text-secondaryText">正确答案：</p>
                    <p className="font-medium text-darkText text-xl">{currentQuestion.answer}</p>
                  </div>
                )}
                
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