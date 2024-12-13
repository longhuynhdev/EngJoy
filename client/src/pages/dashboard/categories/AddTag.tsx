import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; 

function AddTag({ type }) {
  const [newTag, setNewTag] = useState({ name: "", description: "" });

  const handleAddTag = async () => {
    if (!newTag.name.trim() || !newTag.description.trim()) {
      alert("Name and description are required.");
      return;
    }
    try {
      if (type === "category") {
        await axios.post("http://localhost:8080/api/v1/category/addCategory", newTag);
        alert("Category added successfully!");
      } else if (type === "difficulty") {
        await axios.post("http://localhost:8080/api/v1/difficulty/addDifficulty", newTag);
        alert("Difficulty added successfully!");
      }
      setNewTag({ name: "", description: "" }); // Clear input fields
    } catch (err) {
      alert("Failed to add tag.");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">
        Add New {type === "category" ? "Category" : "Difficulty"}
      </h2>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder={`${type === "category" ? "Category" : "Difficulty"} Name`}
          value={newTag.name}
          onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder={`${type === "category" ? "Category" : "Difficulty"} Description`}
          value={newTag.description}
          onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
          className="border p-2 rounded"
        />
        <Button onClick={handleAddTag}>Add</Button>
      </div>
    </section>
  );
}

export default AddTag;
