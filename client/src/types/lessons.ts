// lessons.ts
export interface Lesson {
  id: string;
  title: string;
  shortDescription: string;
  duration: string;
  points: string;
  body: string;
  author: string;
  date: string;
  categories: string[];
  difficulties: string[];
  questions: Question[];
  mediaUrl: string;
}
export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  answerId: number;
  answer: string;
  explanation: string;
  correct: boolean;
}
