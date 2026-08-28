export interface Lesson {
  id: string;
  day: string;
  title: string;
  description: string;
  conclusion: string;
  why: string;
  example: string;
  tip: string;
}

export interface Question {
  id: string;
  lessonId: string;
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  answer: string;
  analysis: string;
  tip: string;
}