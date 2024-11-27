import { Lesson } from "@/types/lessons";
import LessonCard from "./LessonCard";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
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
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage message={error}/>
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredLessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
      {filteredLessons.length === 0 && (
        <div className="py-8 text-center text-gray-500 col-span-full">
          No lessons found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ListLessons;
