import { useState } from "react";
import ListLessons from "@/components/lessons/ListLessons";
import FilterSidebar from "@/components/lessons/FilterSidebar";

const LessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );

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
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          selectedDifficulties={selectedDifficulties}
        />
      </div>
    </div>
  );
};

export default LessonsPage;
