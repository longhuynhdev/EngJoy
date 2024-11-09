// lessons.ts
export interface Lesson {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  category: string[];
  difficulty: string[];
  comments: LessonComment[];
}

export interface LessonComment {
  id: string;
  text: string;
  username: string;
}
