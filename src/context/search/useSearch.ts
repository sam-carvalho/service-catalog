import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export const useSearch = () => useContext(SearchContext);
