import React, { useState, useEffect } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { fetchCategories } from "../../services";
import { Category } from "../../interfaces";

interface CategoriesProviderProps {
  children: React.ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const initializeCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    initializeCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
