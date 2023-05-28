import React, { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "./CategoriesContext";
import useCategories from "../../hooks/useCategories";
import { Category } from "../../interfaces";

interface CategoriesProviderProps {
  children: React.ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchCategories } = useCategories();

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

export const useCategory = () => useContext(CategoriesContext);
