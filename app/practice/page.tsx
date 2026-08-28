'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { questions } from '@/data/questions';

export default function PracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lesson') || '';
  
  // Filter questions based on lesson if specified
  const filteredQuestions = lessonId 
    ? questions.filter(q => q.lessonId === lessonId)
    : questions;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  useEffect(() => {
    if (!currentQuestion) {
      // If no questions available, redirect to home
      router.push('/');
    }
  }, [currentQuestion, router]);

  const handleSelectOption = (optionKey: string) => {
    if (!showResult) {
      setSelectedOption(optionKey);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Record the answer
      const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
      setAnswers(newAnswers);
      
      // Show result
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Calculate score and go to results page
      const answersCopy = { ...answers };
      if (selectedOption && currentQuestion) {
        answersCopy[currentQuestion.id] = selectedOption;
      }
      
      const correctCount = filteredQuestions.reduce((count, question) => {
        const userAnswer = answersCopy[question.id];
        return count + (userAnswer === question.answer ? 1 : 0);
      }, 0);
      
      // Store result in sessionStorage
      sessionStorage.setItem('practiceResult', JSON.stringify({
        score: correctCount,
        total: filteredQuestions.length
      }));
      
      // Redirect to result page
      router.push('/result');
    }
  };

  if (!currentQuestion) {
    return <div className="min-h-screen bg-lightGreen flex items-center justify-center">加载中...</div>;
  }

  const correctAnswer = currentQuestion.answer;
  const isCorrect = selectedOption === correctAnswer;
  
  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="text-primary mr-3">
              ←
            </button>
            <h1 className="text-xl font-bold text-darkText">练习题</h1>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-secondaryText mb-1">
              <span>第 {currentQuestionIndex + 1} / {filteredQuestions.length} 题</span>
            </div>
            <div className="w-full bg-lightGreenAccent rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </header>

        <main className="flex-grow p-6">
          <div className="bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent">
            <div className="mb-6">
              <p className="text-darkText whitespace-pre-line">{currentQuestion.question}</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option) => {
                let optionStyle = "p-4 border rounded-lg text-left";
                
                if (showResult) {
                  if (option.key === correctAnswer) {
                    optionStyle += " bg-green-100 border-green-500 text-green-700";
                  } else if (option.key === selectedOption && !isCorrect) {
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
                className={`w-full py-3 rounded-lg font-medium ${
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
                  isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isCorrect ? '✓ 回答正确' : '✗ 回答错误'}
                </div>
                
                {!isCorrect && (
                  <div>
                    <p className="text-secondaryText mb-1">正确答案：</p>
                    <p className="font-medium text-darkText">
                      {currentQuestion.options.find(opt => opt.key === correctAnswer)?.text}
                    </p>
                  </div>
                )}
                
                <div className="bg-lightGreen p-4 rounded-lg">
                  <p className="font-medium text-darkText mb-2">解析：</p>
                  <p className="text-darkText">{currentQuestion.analysis}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-medium text-yellow-800 mb-2">💡 本题技巧</p>
                  <p className="text-yellow-700">{currentQuestion.tip}</p>
                </div>
                
                <button
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
                  onClick={handleNext}
                >
                  {currentQuestionIndex < filteredQuestions.length - 1 ? '下一题 →' : '查看结果'}
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