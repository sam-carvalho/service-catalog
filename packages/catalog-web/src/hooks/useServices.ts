import { Service } from "interfaces";

const useServices = () => {
  const addService = async (service: Service) => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVICES_API_URL;
    try {
      const response = await fetch(`${apiUrl}/services`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: service.name,
          url: service.url,
          logo: service.logo,
          categoryId: service.categoryId,
          isPinned: service.isPinned,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { addService };
};

export default useServices;
