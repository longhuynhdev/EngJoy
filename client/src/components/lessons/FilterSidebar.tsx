import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import difficulties from "@/data/difficulties";
import categories from "@/data/categories";
interface FilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedDifficulties: string[];
  setSelectedDifficulties: (difficulties: string[]) => void;
}

const FilterSidebar = ({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedDifficulties,
  setSelectedDifficulties,
}: FilterSidebarProps) => {
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDifficultyChange = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(
        selectedDifficulties.filter((d) => d !== difficulty)
      );
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  return (
    <div className="w-64 mr-8">
      <Input
        type="text"
        placeholder="Search lessons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Categories Section */}
      <ScrollArea className="h-[300px] mb-4 rounded-md border p-4">
        <h2 className="mb-2 text-lg font-semibold">Categories</h2>
        {categories.map((category) => (
          <div key={category.value} className="flex items-center mb-2 space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category.label)}
              onCheckedChange={() => handleCategoryChange(category.label)}
            />
            <label
              htmlFor={`category-${category}`}
              className="text-sm font-medium"
            >
              {category.label}
            </label>
          </div>
        ))}
      </ScrollArea>

      {/* Difficulties Section */}
      <ScrollArea className="h-[200px] rounded-md border p-4">
        <h2 className="mb-2 text-lg font-semibold">Difficulty</h2>
        {difficulties.map((difficulty) => (
          <div key={difficulty.value} className="flex items-center mb-2 space-x-2">
            <Checkbox
              id={`difficulty-${difficulty}`}
              checked={selectedDifficulties.includes(difficulty.label)}
              onCheckedChange={() => handleDifficultyChange(difficulty.label)}
            />
            <label
              htmlFor={`difficulty-${difficulty}`}
              className="text-sm font-medium"
            >
              {difficulty.label}
            </label>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FilterSidebar;
