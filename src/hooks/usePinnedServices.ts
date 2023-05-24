import { Service } from "../interfaces";

const usePinnedServices = () => {
  const fetchPinnedServices = async () => {
    const response = await fetch("/api/pinned-services", { method: "GET" });
    return await response.json();
  };

  const addPinnedService = async (services: Service[]) => {
    try {
      const response = await fetch("/api/update-pinned", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(services),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchPinnedServices, addPinnedService };
};

export default usePinnedServices;
