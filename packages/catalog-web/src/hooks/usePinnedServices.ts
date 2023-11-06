import { Service } from "../interfaces";

const usePinnedServices = () => {
  const updatePinnedStatus = async (services: Service[]) => {
    const pinnedServices = services.map((service) => ({
      id: service.id,
      isPinned: service.isPinned === "true" ? "false" : "true",
    }));

    const apiUrl = process.env.NEXT_PUBLIC_SERVICES_API_URL;

    try {
      const response = await fetch(`${apiUrl}/services/pin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pinnedServices),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { updatePinnedStatus };
};

export default usePinnedServices;
