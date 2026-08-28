'use client';

import Link from 'next/link';
import { lessons } from '@/data/lessons';

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-lightGreen">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 pb-4">
          <h1 className="text-2xl font-bold text-darkText">现期与基期</h1>
          <p className="text-secondaryText mt-1">从基础概念开始，逐步掌握资料分析。</p>
        </header>

        <main className="flex-grow p-6">
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <Link href={`/lesson/${lesson.id}`} key={lesson.id}>
                <div className="bg-cardBg rounded-xl p-5 shadow-sm border border-lightGreenAccent flex items-center hover:bg-lightGreenAccent transition">
                  <div className="mr-4">
                    <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-darkText">{lesson.title}</h3>
                    <p className="text-sm text-secondaryText mt-1">{lesson.description}</p>
                  </div>
                  <div className="text-secondaryText">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Bottom padding for mobile */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}