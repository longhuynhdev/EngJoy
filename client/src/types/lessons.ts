// lessons.ts
export interface Lesson {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  category: "grammar" | "vocabulary" | "idioms" | "writing";
  difficulty: "beginner" | "intermediate" | "advanced";
  comments: LessonComment[];
}

export interface LessonComment {
  id: string;
  text: string;
  username: string;
}
