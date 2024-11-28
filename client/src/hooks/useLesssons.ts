import { useState, useEffect } from "react";
import { Lesson } from "@/types/Lessons";

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/lessons");
      if (!response.ok) throw new Error("Failed to fetch lessons");
      const data = await response.json();
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return { lessons, loading, error, refetchLessons: fetchLessons };
};
