import React, { useState, useEffect } from "react";
import { PinnedServicesContext } from "./PinnedServicesContext";
import { fetchPinnedServices } from "../../services";
import { Service } from "../../interfaces";

interface PinnedServicesProviderProps {
  children: React.ReactNode;
}

export const PinnedServicesProvider: React.FC<PinnedServicesProviderProps> = ({
  children,
}) => {
  const [pinnedServices, setPinnedServices] = useState<Service[]>([]);

  useEffect(() => {
    const initializePinnedServices = async () => {
      const pinnedServices = await fetchPinnedServices();
      setPinnedServices(pinnedServices);
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
