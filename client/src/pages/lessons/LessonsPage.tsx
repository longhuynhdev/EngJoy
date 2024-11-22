import { useState } from "react";
import ListLessons from "@/components/lessons/ListLessons";
import FilterSidebar from "@/components/lessons/FilterSidebar";
import { useLessons } from "@/hooks/useLesssons";

const LessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const { lessons, loading, error } = useLessons();

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <FilterSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedDifficulties={selectedDifficulties}
        setSelectedDifficulties={setSelectedDifficulties}
      />
      <div className="flex-1">
        <ListLessons
          lessons={lessons}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          selectedDifficulties={selectedDifficulties}
        />
      </div>
    </div>
  );
};

export default LessonsPage;
