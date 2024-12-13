import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/common/BackButton";
import axios from "axios";

const EditTag = ({ type }: { type: "category" | "difficulty" }) => {
  const { name } = useParams(); 
  const [newName, setNewName] = useState(name || "");  
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNameTaken, setIsNameTaken] = useState(false); // Trạng thái kiểm tra tên đã tồn tại
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);  // Mảng lưu tất cả các category

  useEffect(() => {
    if (name) {
      fetchTagDetails();  
    }
    fetchAllCategories();  // Lấy danh sách tất cả category khi component được render
  }, [name]);

  const fetchTagDetails = async () => {
    try {
      const url =
        type === "category"
          ? `http://localhost:8080/api/v1/category/${name}`
          : `http://localhost:8080/api/v1/difficulty/${name}`;
      const response = await axios.get(url);
      setDescription(response.data.description);
    } catch (err) {
      setError("Failed to fetch tag details.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const url = "http://localhost:8080/api/v1/category/getCategories";
      const response = await axios.get(url);
      setCategories(response.data);  // Lưu danh sách category vào state
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoryName = e.target.value;
    setNewName(newCategoryName);  

    // Kiểm tra tên mới có tồn tại không trong danh sách categories
    checkCategoryNameAvailability(newCategoryName);
  };

  const checkCategoryNameAvailability = (newCategoryName: string) => {
    const isTaken = categories.some(category => category.name.toLowerCase() === newCategoryName.toLowerCase());
    setIsNameTaken(isTaken);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isNameTaken) {
      setError("Category name already exists.");
      return;
    }

    try {
      const url =
        type === "category"
          ? `http://localhost:8080/api/v1/category/editCategory/${name}`
          : `http://localhost:8080/api/v1/difficulty/editDifficulty/${name}`;
      
      const response = await axios.put(url, { name: newName, description });
      console.log(response.data); 
      navigate("/dashboard/tags");
    } catch (err) {
      console.error("Error saving data:", err); 
      setError("Failed to save changes.");
    }
  };  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-start">
        <BackButton link="/dashboard/tags" text="Back to Tags" />
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Edit {type === "category" ? "Category" : "Difficulty"}
      </h1>

      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSave}>
        <div className="space-y-4">
          <Input
            type="text"
            value={newName} 
            onChange={handleNameChange} 
            placeholder={`Edit ${type === "category" ? "Category" : "Difficulty"} name`}
            required
          />
          {isNameTaken && (
            <div className="text-red-500">This category name is already taken.</div>
          )}
          <Input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder={`Edit ${type === "category" ? "Category" : "Difficulty"} description`}
            required
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/dashboard/tags")}
            className="bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTag;
