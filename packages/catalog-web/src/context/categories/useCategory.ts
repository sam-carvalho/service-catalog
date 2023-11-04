import { useContext } from "react";
import { CategoriesContext } from "./CategoriesContext";

export const useCategory = () => useContext(CategoriesContext);
