import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from 'react';

interface Category {
  name: string;
  description: string;
}

interface Difficulty {
  name: string;
  description: string;
}

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:8080/api/v1/category/getCategories');
        const difficultiesResponse = await fetch('http://localhost:8080/api/v1/difficulty/getDifficulties');

        if (!categoriesResponse.ok || !difficultiesResponse.ok) {
          throw new Error('Failed to fetch categories or difficulties');
        }

        const categoriesData = await categoriesResponse.json();
        const difficultiesData = await difficultiesResponse.json();

        setCategories(categoriesData);
        setDifficulties(difficultiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategories([]);
        setDifficulties([]);
      }
    };

    fetchData();
  }, []);


  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleDifficultyChange = (difficulty: string) => {
    const updatedDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter((d) => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(updatedDifficulties);
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div key={category.name} className="flex items-center mb-2 space-x-2">
        <Checkbox
          id={`category-${category.name}`}
          checked={selectedCategories.includes(category.name)}
          onCheckedChange={() => handleCategoryChange(category.name)}
        />
        <label htmlFor={`category-${category.name}`} className="text-sm font-medium">
          {category.name}
        </label>
      </div>
    ));
  };

  const renderDifficulties = () => {
    return difficulties.map((difficulty) => (
      <div key={difficulty.name} className="flex items-center mb-2 space-x-2">
        <Checkbox
          id={`difficulty-${difficulty.name}`}
          checked={selectedDifficulties.includes(difficulty.name)}
          onCheckedChange={() => handleDifficultyChange(difficulty.name)}
        />
        <label htmlFor={`difficulty-${difficulty.name}`} className="text-sm font-medium">
          {difficulty.name}
        </label>
      </div>
    ));
  };

  return (
    <div className="w-64 mr-8">
      <Input
        type="text"
        placeholder="Search lessons..."
        name={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Categories Section */}
      <ScrollArea className="h-[300px] mb-4 rounded-md border p-4">
        <h2 className="mb-2 text-lg font-semibold">Categories</h2>
        {renderCategories()}
      </ScrollArea>

      {/* Difficulties Section */}
      <ScrollArea className="h-[200px] rounded-md border p-4">
        <h2 className="mb-2 text-lg font-semibold">Difficulty</h2>
        {renderDifficulties()}
      </ScrollArea>
    </div>
  );
};

export default FilterSidebar;