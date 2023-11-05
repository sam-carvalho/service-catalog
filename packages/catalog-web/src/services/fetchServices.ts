const fetchServices = async () => {
  const response = await fetch(
    "https://1mk1vvbn2m.execute-api.us-east-1.amazonaws.com/dev/services",
    { method: "GET" }
  );
  return await response.json();
};

export default fetchServices;
