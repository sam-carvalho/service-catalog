import React, { createContext } from "react";
import { Service } from "../../interfaces";

interface PinnedServicesContextProps {
  pinnedServices: Service[];
  setPinnedServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const PinnedServicesContext = createContext<PinnedServicesContextProps>({
  pinnedServices: [],
  setPinnedServices: () => {},
});
