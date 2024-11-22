// lessons.ts
export interface Lesson {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  categories: string[];
  difficulties: string[];
  comments: LessonComment[];
}

export interface LessonComment {
  id: string;
  text: string;
  username: string;
}
