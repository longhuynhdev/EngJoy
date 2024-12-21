import { useState, useEffect } from "react";
import { Lesson } from "@/types/Lessons";
import { AddEditQuizData } from "@/types/AddEditQuizData";
export const useQuiz = (id: string) => {
  const [lesson, setQuiz] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/quiz/{id}`
        );
        if (response.status === 404) {
          setError("404");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  return { lesson, loading, error };
};

export const useAddQuiz = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const addQuiz = async (data: AddEditQuizData) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
          throw new Error("User information not found");
        }
  
        const { email } = JSON.parse(userInfo);
  
        const response = await fetch(
          `http://localhost:8080/api/v1/quiz/createQuiz`,
          {
            method: "PUT", // Changed to PUT as per your updated API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              // Optionally include user email if needed in the payload, adjust if required:
              createdBy: email, // Example of passing email (adjust based on API requirements)
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to add quiz");
        }
  
        const result = await response.json();
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { addQuiz, isLoading, error };
  };

export const useEditQuiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editQuiz = async (id: string, data: AddEditQuizData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/quiz/updateQuiz/{id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit quiz");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { editQuiz, isLoading, error };
};

export const useDeleteQuiz = () => {
  const deleteQuiz = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/v1/quiz/deleteQuiz/{id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete lesson");
    }
  };

  return { deleteQuiz };
};
