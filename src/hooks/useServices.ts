import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const response = await fetch("/api/services", { method: "GET" });
    const services = await response.json();
    if (!services.message) {
      setServices(services);
    } else {
      console.error(services.message);
    }
  };

  const addLogo = async (serviceLogo: File) => {
    try {
      const formData = new FormData();
      formData.append("logo", serviceLogo);

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

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

      const updatedServices = await response.json();
      setServices(updatedServices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, fetchServices, addService, addLogo };
};

export default useServices;
