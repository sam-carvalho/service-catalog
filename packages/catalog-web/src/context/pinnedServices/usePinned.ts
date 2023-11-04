import { useContext } from "react";
import { PinnedServicesContext } from "./PinnedServicesContext";

export const usePinned = () => useContext(PinnedServicesContext);
