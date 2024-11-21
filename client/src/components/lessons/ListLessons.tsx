import { useState, useEffect } from "react";
import LessonCard from "./LessonCard";
import { Lesson } from "@/types/lessons";
import { useLessons } from "@/hooks/useLesssons";
import { Loader2 } from "lucide-react";

interface ListLessonsProps {
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulties: string[];
}

const ListLessons = ({
  searchTerm,
  selectedCategories,
  selectedDifficulties,
}: ListLessonsProps) => {
  const { lessons, loading, error } = useLessons();
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!lessons) return;

    const filtered = lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        lesson.categories.some((cat) =>
          selectedCategories.includes(cat.toUpperCase())
        );

      const matchesDifficulties =
        selectedDifficulties.length === 0 ||
        lesson.difficulties.some((diff) =>
          selectedDifficulties.includes(diff.toUpperCase())
        );

      return matchesSearch && matchesCategories && matchesDifficulties;
    });

    setFilteredLessons(filtered);
  }, [lessons, searchTerm, selectedCategories, selectedDifficulties]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-md bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Lessons</h2>
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              body={lesson.body} // Handle both possible field names
              categories={lesson.categories}
              difficulties={lesson.difficulties}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 p-4 border rounded-md">
          No lessons found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ListLessons;
