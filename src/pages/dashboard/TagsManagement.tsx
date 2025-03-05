import { useState, useEffect } from "react";
import categoriesData from "@/data/categories";
import difficultiesData from "@/data/difficulties";

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
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add new category</button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{category}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Difficulty</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add new difficulty</button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
            </tr>
          </thead>
          <tbody>
            {difficulties.map((difficulty, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{difficulty}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TagsManagement;
