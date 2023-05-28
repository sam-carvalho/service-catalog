const useCategories = () => {
  const fetchCategories = async () => {
    const response = await fetch("/api/categories", { method: "GET" });
    return await response.json();
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
      return newCategory;
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchCategories, addCategory };
};

export default useCategories;
