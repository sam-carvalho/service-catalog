const fetchCategories = async () => {
  const response = await fetch(
    "https://mr3mkr6lh6.execute-api.us-east-1.amazonaws.com/dev/categories",
    { method: "GET" }
  );
  return await response.json();
};

export default fetchCategories;
