import { Lesson } from "@/types/lessons";
import { Loader2 } from "lucide-react";
import LessonCard from "./LessonCard";

interface ListLessonsProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulties: string[];
}

const ListLessons = ({
  lessons,
  loading,
  error,
  searchTerm,
  selectedCategories,
  selectedDifficulties,
}: ListLessonsProps) => {
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

  const filteredLessons = lessons.filter((lesson: Lesson) => {
    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategories =
      selectedCategories.length === 0 ||
      lesson.categories.some((cat) => selectedCategories.includes(cat));
    const matchesDifficulties =
      selectedDifficulties.length === 0 ||
      lesson.difficulties.some((diff) => selectedDifficulties.includes(diff));

    return matchesSearch && matchesCategories && matchesDifficulties;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredLessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
      {filteredLessons.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No lessons found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ListLessons;
