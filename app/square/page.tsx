'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const SQUARES = [
  { n: 11, square: 121 },
  { n: 12, square: 144 },
  { n: 13, square: 169 },
  { n: 14, square: 196 },
  { n: 15, square: 225 },
];

export default function SquareTrainingPage() {
  const [mode, setMode] = useState<'flashcard' | 'quiz'>('flashcard');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{score: number, total: number, timeTaken: number} | null>(null);
  // State to hold the shuffled options for the current question
  const [currentShuffledOptions, setCurrentShuffledOptions] = useState<number[]>([]);

  const currentCard = SQUARES[currentCardIndex];

  // Effect to generate new shuffled options when the quiz card changes
  useEffect(() => {
    if (mode === 'quiz') {
      const shuffled = [...SQUARES].sort(() => Math.random() - 0.5).map(item => item.square);
      setCurrentShuffledOptions(shuffled);
      // Reset selections when options change
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [currentCardIndex, mode]); 

  const handleAnswerSubmit = () => {
    if (selectedAnswer === currentCard.square) {
      setShowFeedback(true);
    } else {
      setShowFeedback(true);
    }
  };

  const handleNextQuestionOrFinish = () => {
    if (currentCardIndex < SQUARES.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      // The options will be shuffled automatically by the useEffect above
    } else {
      // Quiz finished, calculate and store results
      const finalResults = {
        score: SQUARES.filter((_, i) => selectedAnswer === SQUARES[i].square).length + 1, // Assuming last question was correct if we reach here after submit
        total: SQUARES.length,
        timeTaken: 0, // Placeholder, add actual timer logic if needed
      };
      setResults(finalResults);
      sessionStorage.setItem('squareQuizResult', JSON.stringify(finalResults));
      // Redirect to results page after setting results
      window.location.href = '/square/result';
    }
  };

  const resetQuiz = () => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults(null);
  };

  // Simple logic to determine correctness for quiz mode feedback
  const isCorrect = selectedAnswer === currentCard.square;

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
          <h1 className="text-2xl font-bold text-darkText">2️⃣ 11-15平方</h1>
          <p className="text-secondaryText mb-4">强化高频平方数的记忆与直觉反应。</p>

          {/* Mode Selector */}
          <div className="flex bg-lightGreen rounded-xl p-1">
            <button
              className={`flex-1 py-3 rounded-xl text-center ${
                mode === 'flashcard' ? 'bg-white text-primary shadow-sm' : 'text-secondaryText'
              }`}
              onClick={() => setMode('flashcard')}
            >
              记忆卡片
            </button>
            <button
              className={`flex-1 py-3 rounded-xl text-center ${
                mode === 'quiz' ? 'bg-white text-primary shadow-sm' : 'text-secondaryText'
              }`}
              onClick={() => {
                setMode('quiz');
                resetQuiz();
              }}
            >
              随机测验
            </button>
          </div>

          {/* Content based on mode */}
          {mode === 'flashcard' ? (
            <div className="space-y-4">
              {SQUARES.map((item, index) => (
                <div
                  key={item.n}
                  className={`bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent transition-all ${
                    index === currentCardIndex ? 'scale-100' : 'scale-95 opacity-70'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-darkText">{item.n}² = ?</p>
                    <p className="text-3xl font-extrabold text-primary my-3">{item.square}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-darkText rounded-lg"
                  onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                  disabled={currentCardIndex === 0}
                >
                  上一个
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-darkText rounded-lg"
                  onClick={() => setCurrentCardIndex(Math.min(SQUARES.length - 1, currentCardIndex + 1))}
                  disabled={currentCardIndex === SQUARES.length - 1}
                >
                  下一个
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent">
                <p className="text-xl font-bold text-center text-darkText mb-4">{currentCard.n}² = ?</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {currentShuffledOptions.map((opt, idx) => (
                    <button
                      key={idx} // Use index as key since values can repeat after shuffling
                      className={`p-4 border rounded-lg text-center ${
                        showFeedback
                          ? opt === currentCard.square
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : selectedAnswer === opt
                              ? 'bg-red-100 border-red-500 text-red-700'
                              : 'border-gray-200 text-secondaryText'
                          : selectedAnswer === opt
                            ? 'bg-primary border-primary text-white'
                            : 'border-gray-200 hover:border-primary'
                      }`}
                      onClick={() => !showFeedback && setSelectedAnswer(opt)}
                      disabled={showFeedback}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!showFeedback && (
                  <button
                    className={`w-full mt-4 py-3 rounded-lg font-medium ${
                      selectedAnswer
                        ? 'bg-primary text-white hover:bg-opacity-90'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                  >
                    提交答案
                  </button>
                )}

                {showFeedback && (
                  <div className="space-y-4">
                     <div className={`mt-4 p-4 rounded-lg text-center ${
                       isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                     }`}>
                       {isCorrect ? '✓ 正确!' : '✗ 错误'}
                     </div>
                     <button
                      className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-opacity-90"
                      onClick={handleNextQuestionOrFinish}
                    >
                      {currentCardIndex < SQUARES.length - 1 ? '下一题 →' : '查看结果'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="text-center text-sm text-secondaryText">
                第 {currentCardIndex + 1} / {SQUARES.length} 题
              </div>
            </div>
          )}
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}