const useCategories = () => {
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

  return { addCategory };
};

export default useCategories;
