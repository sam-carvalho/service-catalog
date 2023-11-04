import React, { createContext } from "react";
import { Category } from "../../interfaces";

type CategoriesContextProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  categories: [],
  setCategories: () => {},
});
