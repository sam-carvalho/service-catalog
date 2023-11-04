const useServices = () => {
  const addService = async (
    serviceName: string,
    serviceUrl: string,
    serviceLogo?: string,
    categoryId?: string
  ) => {
    try {
      const response = await fetch("/api/update-services", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serviceName,
          url: serviceUrl,
          logo: serviceLogo,
          categoryId: categoryId,
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
