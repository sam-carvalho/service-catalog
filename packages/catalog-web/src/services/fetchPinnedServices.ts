const fetchPinnedServices = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVICES_API_URL;
  const response = await fetch(`${apiUrl}/pinned-services`, { method: "GET" });
  return await response.json();
};

export default fetchPinnedServices;
