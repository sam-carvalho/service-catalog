import React, { createContext } from "react";
import { Service } from "../../interfaces";

type ServicesContextProps = {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
};

export const ServicesContext = createContext<ServicesContextProps>({
  services: [],
  setServices: () => {},
});
