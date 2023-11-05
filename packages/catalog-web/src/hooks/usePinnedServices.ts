import { Service } from "../interfaces";

const usePinnedServices = () => {
  const updatePinnedStatus = async (services: Service[]) => {
    const pinnedServices = services.map((service) => ({
      id: service.id,
      isPinned: service.isPinned === "true" ? "false" : "true",
    }));

    try {
      const response = await fetch(
        "https://1mk1vvbn2m.execute-api.us-east-1.amazonaws.com/dev/services/pin",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pinnedServices),
        }
      );

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { updatePinnedStatus };
};

export default usePinnedServices;
