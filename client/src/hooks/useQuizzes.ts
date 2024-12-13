import { useEffect, useState } from "react";
import { Lesson } from "@/types/lessons";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/quiz"); // API endpoint cho quizzes
        if (!response.ok) throw new Error("Failed to fetch quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, loading, error };
};
