const fetchCategories = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_CATEGORIES_API_URL;
  const response = await fetch(`${apiUrl}/categories`, { method: "GET" });
  return await response.json();
};

export default fetchCategories;
