import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("/api/categories", { method: "GET" });
    const categories = await response.json();
    if (!categories.message) {
      setCategories(categories);
    } else {
      console.error(categories.message);
    }
  };

  const addCategory = async (categoryName: string) => {
    try {
      const response = await fetch("/api/update-categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      return newCategory;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchCategories, addCategory };
};

export default useCategories;
