'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SpeedTrainingHome() {
  const [operation, setOperation] = useState<'multiply' | 'divide' | 'add' | 'subtract'>('multiply');
  const [firstDigits, setFirstDigits] = useState<number | 'random'>(2);
  const [secondDigits, setSecondDigits] = useState<number | 'random'>(2);
  const [questionCount, setQuestionCount] = useState<number>(20);

  const digitOptions: Array<number | 'random'> = [1, 2, 3, 4, 'random'];
  const countOptions = [10, 20, 50, 100];

  const getDigitLabel = (digit: number | 'random') => {
    if (digit === 'random') return '随机';
    return `${digit}位数`;
  };

  const getOperationSymbol = (op: string) => {
    switch(op) {
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'add': return '＋';
      case 'subtract': return '−';
      default: return op;
    }
  };

  const configString = `${getDigitLabel(firstDigits)} ${getOperationSymbol(operation)} ${getDigitLabel(secondDigits)}`;
  
  const params = new URLSearchParams({
    operation,
    firstDigits: firstDigits.toString(),
    secondDigits: secondDigits.toString(),
    questionCount: questionCount.toString()
  }).toString();

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
          {/* Operation Selection */}
          <div className="bg-cardBg rounded-2xl p-5 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-4">选择运算</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { key: 'multiply', label: '× 乘法' },
                { key: 'divide', label: '÷ 除法' },
                { key: 'add', label: '＋ 加法' },
                { key: 'subtract', label: '− 减法' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`py-3 rounded-lg border ${
                    operation === key 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-200 text-darkText hover:border-primary'
                  }`}
                  onClick={() => setOperation(key as any)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Digit Range Selection */}
          <div className="bg-cardBg rounded-2xl p-5 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-4">选择数字范围</h2>
            <div className="space-y-4">
              <div>
                <p className="text-secondaryText mb-2">第一个数字</p>
                <div className="grid grid-cols-5 gap-2">
                  {digitOptions.map(digit => (
                    <button
                      key={`first-${digit}`}
                      className={`py-2 rounded-lg border text-sm ${
                        firstDigits === digit 
                          ? 'bg-primary text-white border-primary' 
                          : 'border-gray-200 text-darkText hover:border-primary'
                      }`}
                      onClick={() => setFirstDigits(digit)}
                    >
                      {getDigitLabel(digit)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-secondaryText mb-2">第二个数字</p>
                <div className="grid grid-cols-5 gap-2">
                  {digitOptions.map(digit => (
                    <button
                      key={`second-${digit}`}
                      className={`py-2 rounded-lg border text-sm ${
                        secondDigits === digit 
                          ? 'bg-primary text-white border-primary' 
                          : 'border-gray-200 text-darkText hover:border-primary'
                      }`}
                      onClick={() => setSecondDigits(digit)}
                    >
                      {getDigitLabel(digit)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="bg-cardBg rounded-2xl p-5 shadow-sm border border-lightGreenAccent">
            <h2 className="text-lg font-semibold text-darkText mb-4">选择题目数量</h2>
            <div className="grid grid-cols-4 gap-3">
              {countOptions.map(count => (
                <button
                  key={count}
                  className={`py-3 rounded-lg border ${
                    questionCount === count 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-200 text-darkText hover:border-primary'
                  }`}
                  onClick={() => setQuestionCount(count)}
                >
                  {count}题
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-lightGreen rounded-2xl p-4 text-center">
            <p className="text-secondaryText">预览配置</p>
            <p className="text-darkText font-medium mt-1">{configString}</p>
            <p className="text-secondaryText text-sm mt-1">{questionCount}题</p>
          </div>
        </main>

        <div className="p-6 border-t border-lightGreenAccent">
          <Link 
            href={`/speed/practice?${params}`} 
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            开始训练 →
          </Link>
        </div>
      </div>
    </div>
  );
}