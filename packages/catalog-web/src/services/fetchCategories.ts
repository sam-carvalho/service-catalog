const fetchCategories = async () => {
  const response = await fetch("/api/categories", { method: "GET" });
  return await response.json();
};

export default fetchCategories;
