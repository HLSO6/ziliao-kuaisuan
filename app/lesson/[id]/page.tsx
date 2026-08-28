'use client';

import { useParams } from 'next/navigation';
import { lessons } from '@/data/lessons';
import Link from 'next/link';

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params.id as string;
  
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-lightGreen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm">
          <p className="text-center text-secondaryText">未找到该知识点</p>
          <Link href="/lessons" className="block mt-4 text-center text-primary font-medium">
            ← 返回知识点列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-lightGreenAccent sticky top-0 bg-white z-10">
          <Link href="/lessons" className="flex items-center text-primary font-medium">
            ← 返回
          </Link>
        </header>

        <main className="flex-grow p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-darkText">{lesson.day}</h1>
            <h2 className="text-xl font-semibold text-darkText mt-2">{lesson.title}</h2>
          </div>

          <div className="space-y-6">
            <section className="bg-lightGreen p-4 rounded-lg">
              <h3 className="font-bold text-primary mb-2">【结论】</h3>
              <p className="text-darkText">{lesson.conclusion}</p>
            </section>

            <section className="bg-lightGreen p-4 rounded-lg">
              <h3 className="font-bold text-primary mb-2">【为什么】</h3>
              <p className="text-darkText">{lesson.why}</p>
            </section>

            <section className="bg-lightGreen p-4 rounded-lg">
              <h3 className="font-bold text-primary mb-2">【举例】</h3>
              <p className="text-darkText">{lesson.example}</p>
            </section>

            <section className="bg-lightGreen p-4 rounded-lg">
              <h3 className="font-bold text-primary mb-2">【💡 小技巧】</h3>
              <p className="text-darkText">{lesson.tip}</p>
            </section>
          </div>
        </main>

        <div className="p-6 border-t border-lightGreenAccent">
          <Link 
            href={`/practice?lesson=${lessonId}`} 
            className="w-full bg-primary text-white py-4 rounded-xl text-center font-medium hover:bg-opacity-90 transition block"
          >
            📝 来练一题
          </Link>
        </div>
      </div>
    </div>
  );
}