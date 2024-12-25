export interface AddEditQuizData {
  title: string;
  shortDescription: string;
  duration: number;
  points: string;
  date: string;  
  categories: string[];
  difficulties: string[];
  questions: {
    question: string;
    answers: {
      answer: string;
      correct: boolean;
      explanation?: string;
    }[];
  }[];
}
