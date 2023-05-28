const fetchServices = async () => {
  const response = await fetch("/api/services", { method: "GET" });
  return await response.json();
};

export default fetchServices;
