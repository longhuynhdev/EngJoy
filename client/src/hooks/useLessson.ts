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
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`http://localhost:8080/api/v1/lessons`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        throw new Error("Please login to continue");
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to create lessons");
      }
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

export const useEditLesson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editLesson = async (id: string, data: AddEditLessonData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/lessons/${id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
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

  return { editLesson, isLoading, error };
};

export const useDeleteLesson = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteLesson = async (id: string): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/lessons/${id}`,
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
        throw new Error("You don't have permission to delete lessons");
      }
      if (response.status === 404) {
        throw new Error("Lesson not found");
      }
      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  return { deleteLesson, error };
};
