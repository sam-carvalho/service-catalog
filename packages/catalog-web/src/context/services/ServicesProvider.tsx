import React, { useState, useEffect } from "react";
import { ServicesContext } from "./ServicesContext";
import { fetchServices } from "../../services";
import { Service } from "../../interfaces";

interface ServicesProviderProps {
  children: React.ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const initializePinnedServices = async () => {
      const services = await fetchServices();
      setServices(services);
    };

    initializePinnedServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, setServices }}>
      {children}
    </ServicesContext.Provider>
  );
};
