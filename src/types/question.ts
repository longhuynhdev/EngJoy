export interface Question {
  id: string;
  question: string;
  answers: {
    id: string;
    answer: string;
    explanation: string;
    idCorrect: boolean;
  }[];
}
