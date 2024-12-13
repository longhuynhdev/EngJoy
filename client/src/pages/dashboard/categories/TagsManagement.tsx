import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import axios from "axios";

const TagsManagement = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/api/v1/category/getCategories");
      const fetchedCategories = response.data.map((category: { name: string }) => category.name);
      setCategories(fetchedCategories);
    } catch (err: any) {
      console.error("Failed to fetch categories:", err);
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/difficulty/getDifficulties");
      const fetchedDifficulties = response.data.map((difficulty: { name: string }) => difficulty.name);
      setDifficulties(fetchedDifficulties);
    } catch (err: any) {
      console.error("Failed to fetch difficulties:", err);
      setError(err.message || "Failed to fetch difficulties.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDifficulties();
  }, []);

  // Handle edit category
  const handleEditCategory = (name: string) => {
    navigate(`/dashboard/tags/editCategory/${name}`);
  };

  // Handle edit difficulty
  const handleEditDifficulty = (name: string) => {
    navigate(`/dashboard/tags/editDifficulty/${name}`);
  };

  // Delete category
  const handleDeleteCategory = async (name: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/category/deleteCategory/${name}`);
      fetchCategories(); // Refresh the list
    } catch (err) {
      alert(`Failed to delete category "${name}".`);
    }
  };

  // Delete difficulty
  const handleDeleteDifficulty = async (name: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/difficulty/deleteDifficulty/${name}`);
      fetchDifficulties(); // Refresh the list
    } catch (err) {
      alert(`Failed to delete difficulty "${name}".`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-10">
      <div className="flex justify-start">
        <BackButton link="/dashboard" text="Back to Dashboard" />
      </div>
      <section className="px-4 py-2 text-xs font-bold text-white flex justify-end">
        <Button onClick={() => navigate("/dashboard/tags/addCategory")}>Add New Category</Button> 
      </section>
      {/* Categories Management */}
      <section>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
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
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>
                  <Button
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteCategory(category)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="px-4 py-2 text-xs font-bold text-white flex justify-end">
        <Button onClick={() => navigate("/dashboard/tags/addDifficulty")}>Add New Difficulty</Button> 
      </section>
      {/* Difficulties Management */}
      <section>
        <h2 className="text-xl font-bold mb-4">Difficulties</h2>
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
                <TableCell>{index + 1}</TableCell>
                <TableCell>{difficulty}</TableCell>
                <TableCell>
                  <Button
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleEditDifficulty(difficulty)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteDifficulty(difficulty)}
                  >
                    Delete
                  </Button>
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
