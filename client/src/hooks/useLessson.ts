import { useState, useEffect } from "react";
import { Lesson } from "@/types/lessons";

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
