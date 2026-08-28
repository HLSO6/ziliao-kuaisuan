'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { percentageQuestions, PercentageQuestion } from '@/data/percentageQuestions';

export default function FenHuaBaiPractice() {
  const router = useRouter();
  const [questions, setQuestions] = useState<PercentageQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{questionIndex: number, userAnswer: string, isCorrect: boolean}[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化题目
  useEffect(() => {
    // 从题库中筛选出分数化百分数的题目
    const fractionToPercentQuestions = percentageQuestions.filter(q => q.type === 'fraction-to-percent');
    
    // 随机抽取25题
    const shuffled = [...fractionToPercentQuestions].sort(() => 0.5 - Math.random());
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

  const handleSubmit = () => {
    if (!questions[currentQuestionIndex]) return;
    
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isAnswerCorrect = selectedOption === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);
    
    // 记录用户答案
    const newUserAnswer = {
      questionIndex: currentQuestionIndex,
      userAnswer: selectedOption || '',
      isCorrect: isAnswerCorrect
    };
    
    setUserAnswers(prev => [...prev, newUserAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
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
        type: 'fraction-to-percent',
        questions: questions,
        answers: [...userAnswers, ...(isCorrect !== null ? [{
          questionIndex: currentQuestionIndex,
          userAnswer: selectedOption || '',
          isCorrect: isCorrect
        }] : [])],
        timeSpent: currentTime,
        totalQuestions: questions.length,
        correctCount: finalCorrectCount
      };
      
      sessionStorage.setItem('percentageTrainingResults', JSON.stringify(results));
      router.push('/percentage/result');
    }
  };

  // 计算进度
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
          <div className="bg-cardBg rounded-2xl p-6 shadow-sm border border-lightGreenAccent">
            <div className="text-lg font-semibold text-darkText mb-6 text-center">
              🔢 分化百
            </div>
            <div className="text-xl font-bold text-darkText mb-8 text-center">
              {currentQuestion?.question}
            </div>
            
            {!submitted ? (
              <div className="space-y-4 mb-6">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.key}
                    className={`w-full p-4 border rounded-xl text-left ${
                      selectedOption === option.key
                        ? 'border-primary bg-lightGreenAccent'
                        : 'border-lightGreenAccent hover:border-primary'
                    }`}
                    onClick={() => setSelectedOption(option.key)}
                  >
                    <span className="font-medium">{option.key}. </span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <div className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
                </div>
                
                <div className="bg-lightGreen p-4 rounded-lg">
                  <p className="text-secondaryText">正确答案：</p>
                  <p className="text-darkText font-medium">{currentQuestion.options.find(opt => opt.key === currentQuestion.answer)?.text}</p>
                </div>
                
                <div className="bg-lightGreen p-4 rounded-lg">
                  <p className="text-secondaryText">解析：</p>
                  <p className="text-darkText">{currentQuestion.analysis}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-700"><span className="font-medium">💡 {currentQuestion.tip}</span></p>
                </div>
              </div>
            )}
            
            {!submitted ? (
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
              <button
                className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-opacity-90"
                onClick={handleNext}
              >
                {currentQuestionIndex < questions.length - 1 ? '下一题 →' : '查看结果'}
              </button>
            )}
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}