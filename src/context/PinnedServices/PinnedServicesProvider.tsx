import React, { useContext, useState, useEffect } from "react";
import { PinnedServicesContext } from "./PinnedServicesContext";
import usePinnedServices from "../../hooks/usePinnedServices";
import { Service } from "../../interfaces";

interface PinnedServicesProviderProps {
  children: React.ReactNode;
}

export const PinnedServicesProvider: React.FC<PinnedServicesProviderProps> = ({
  children,
}) => {
  const [pinnedServices, setPinnedServices] = useState<Service[]>([]);
  const { fetchPinnedServices } = usePinnedServices();

  useEffect(() => {
    const initializePinnedServices = async () => {
      const services = await fetchPinnedServices();
      setPinnedServices(services);
    };

    initializePinnedServices();
  }, []);

  return (
    <PinnedServicesContext.Provider
      value={{ pinnedServices, setPinnedServices }}
    >
      {children}
    </PinnedServicesContext.Provider>
  );
};

export const usePinServices = () => useContext(PinnedServicesContext);
