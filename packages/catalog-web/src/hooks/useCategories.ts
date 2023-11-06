const useCategories = () => {
  const addCategory = async (categoryName: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_CATEGORIES_API_URL;
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await response.json();
      return data.category;
    } catch (error) {
      console.error(error);
    }
  };

  return { addCategory };
};

export default useCategories;
