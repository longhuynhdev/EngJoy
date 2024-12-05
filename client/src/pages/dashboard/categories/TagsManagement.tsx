import { useState, useEffect } from "react";
import categoriesData from "@/data/categories";
import difficultiesData from "@/data/difficulties";
import { Button } from "@/components/ui/button"; 
import BackButton from "@/components/common/BackButton";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; 

const SerialNumber = ({ index }: { index: number }) => (
  <TableCell>{index + 1}</TableCell>
);

const TagsManagement = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  useEffect(() => {
    const allCategories = categoriesData.map((category) => category.label);
    const allDifficulties = difficultiesData.map((difficulty) => difficulty.label);

    setCategories(allCategories);
    setDifficulties(allDifficulties);
  }, []);
  

  return (
    <div className="space-y-10">
      {/* Back button */}
      <div className="flex justify-start">
        <BackButton link="/dashboard" text="Back to Dashboard" />
      </div>


      {/* Categories section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <Link to="/dashboard/category/addCategory">
            <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Add new category
            </Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <SerialNumber index={index} />
                <TableCell>{category}</TableCell>
                <TableCell>
                  <Link to={`/edit-category/${category}`}>
                    <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Difficulty section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Difficulty</h2>
          <Link to="/dashboard/category/addDifficulty">
            <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Add new difficulty
            </Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {difficulties.map((difficulty, index) => (
              <TableRow key={index}>
                <SerialNumber index={index} />
                <TableCell>{difficulty}</TableCell>
                <TableCell>
                  <Link to={`/edit-difficulty/${difficulty}`}>
                    <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default TagsManagement;
