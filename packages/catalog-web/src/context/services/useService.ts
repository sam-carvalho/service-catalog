import { useContext } from "react";
import { ServicesContext } from "./ServicesContext";

export const useService = () => useContext(ServicesContext);
