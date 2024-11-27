import { useState, useEffect } from "react";
import { Lesson } from "@/types/Lessons";
import { AddEditLessonData } from "@/types/AddEditLessonData";
export const useLesson = (id: string) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/lessons/${id}`
        );
        if (response.status === 404) {
          setError("404");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch lesson");
        }
        const data = await response.json();
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  return { lesson, loading, error };
};

export const useAddLesson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLesson = async (data: AddEditLessonData) => {
    setIsLoading(true);
    setError(null);

    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        throw new Error("User information not found");
      }

      const { email } = JSON.parse(userInfo);

      const response = await fetch(
        `http://localhost:8080/api/v1/lessons?userName=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add lesson");
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

  return { addLesson, isLoading, error };
};

export const useDeleteLesson = () => {
  const deleteLesson = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/v1/lessons/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete lesson");
    }
  };

  return { deleteLesson };
};
