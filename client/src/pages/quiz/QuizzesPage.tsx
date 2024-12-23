import { useState } from "react";
import ListQuizzes from "@/components/quiz/ListQuizzes"; // Sử dụng ListQuizzes thay vì ListLessons
import FilterSidebar from "@/components/lessons/FilterSidebar"; // FilterSidebar có thể tái sử dụng
import useQuizzes from "@/hooks/useQuizzes"; // Hook riêng cho quizzes
import { Banner } from "@/components/common/Banner";
import bannerImage from "@/img/banner.png";

const QuizzesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const { quizzes, loading, error } = useQuizzes(); // Tương tự useLessons, nhưng dành cho quizzes

  return (
    <>
      <Banner
        title="Welcome to Quizzes"
        description="Choose a quiz and test your knowledge"
        height="20rem"
        backgroundUrl={bannerImage}
      />
      <div className="container flex px-4 py-8 mx-auto">
        <FilterSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedDifficulties={selectedDifficulties}
          setSelectedDifficulties={setSelectedDifficulties}
        />
        <div className="flex-1">
          <ListQuizzes
            quizzes={quizzes}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            selectedDifficulties={selectedDifficulties}
          />
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
