const fetchPinnedServices = async () => {
  const response = await fetch("/api/pinned-services", { method: "GET" });
  return await response.json();
};

export default fetchPinnedServices;
