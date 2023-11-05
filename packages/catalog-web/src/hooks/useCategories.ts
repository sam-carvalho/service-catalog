const useCategories = () => {
  const addCategory = async (categoryName: string) => {
    try {
      const response = await fetch(
        "https://mr3mkr6lh6.execute-api.us-east-1.amazonaws.com/dev/categories",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );
      const data = await response.json();
      return data.category;
    } catch (error) {
      console.error(error);
    }
  };

  return { addCategory };
};

export default useCategories;
