import { useState, useEffect } from "react";
import { Question } from "@/types/question";
import { FormValues } from "@/components/questions/QuestionForm";

export const useQuestion = (id: string) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/questions/${id}`
        );
        if (response.status === 404) {
          setError("404");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        setQuestion(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  return { question, loading, error };
};

export const useAddQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addQuestion = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const transformedData = {
        ...data,
        answers: data.answers.map((answer, index) => ({
          ...answer,
          answerId: index + 1,
        })),
      };

      const response = await fetch("http://localhost:8080/api/v1/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([transformedData]), // Wrap in array
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
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

  return { addQuestion, isLoading, error };
};

export const useEditQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editQuestion = async (id: string, data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/questions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 401) {
        throw new Error("Please login to continue");
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to edit lessons");
      }
      if (response.status === 404) {
        throw new Error("Lesson not found");
      }
      if (!response.ok) {
        throw new Error("Failed to edit lesson");
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

  return { editQuestion, isLoading, error };
};

export const useDeleteQuestion = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteQuestion = async (id: string): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/questions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        throw new Error("Please login to continue");
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to delete questions");
      }
      if (response.status === 404) {
        throw new Error("Question not found");
      }
      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  return { deleteQuestion, error };
};