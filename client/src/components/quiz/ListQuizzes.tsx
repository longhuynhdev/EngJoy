import { Lesson } from "@/types/lessons";
import { Loader2 } from "lucide-react";
import QuizCard from "./QuizCard";

interface ListQuizzesProps {
  quizzes: Lesson[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategories: string[];
  selectedDifficulties: string[];
}

const ListQuizzes = ({
  quizzes,
  loading,
  error,
  searchTerm,
  selectedCategories,
  selectedDifficulties,
}: ListQuizzesProps) => {
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

  const filteredQuizzes = quizzes.filter((quiz: Lesson) => {
    const matchesSearch = quiz.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategories =
      selectedCategories.length === 0 ||
      quiz.categories.some((cat) => selectedCategories.includes(cat));
    const matchesDifficulties =
      selectedDifficulties.length === 0 ||
      quiz.difficulties.some((diff) => selectedDifficulties.includes(diff));

    return matchesSearch && matchesCategories && matchesDifficulties;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredQuizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
      {filteredQuizzes.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No quizzes found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ListQuizzes;
