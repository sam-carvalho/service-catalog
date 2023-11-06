const fetchServices = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVICES_API_URL;
  const response = await fetch(`${apiUrl}/services`, { method: "GET" });
  return await response.json();
};

export default fetchServices;
