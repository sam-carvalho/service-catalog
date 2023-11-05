const useServices = () => {
  const addService = async (
    serviceName: string,
    serviceUrl: string,
    serviceLogo: string,
    categoryId: string,
    isPinned: string
  ) => {
    try {
      const response = await fetch(
        "https://1mk1vvbn2m.execute-api.us-east-1.amazonaws.com/dev/services",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: serviceName,
            url: serviceUrl,
            logo: serviceLogo,
            categoryId: categoryId,
            isPinned: isPinned,
          }),
        }
      );

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return { addService };
};

export default useServices;
