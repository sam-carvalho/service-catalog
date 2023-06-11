import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../../interfaces";
import { getData, saveData } from "./utils";

const storageOption = process.env.STORAGE;

const categoriesFilePath =
  storageOption === "aws"
    ? "data/categories.json"
    : path.join(process.cwd(), "data", "categories.json");

const updateCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      await handleCategoryUpdate(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error updating categories" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

const handleCategoryUpdate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name } = req.body;
  let categories = await getData(categoriesFilePath);
  let newCategory: Category | {} = {};

  if (id) {
    const existingCategory = categories.find(
      (category: Category) => category.id === id
    );
    if (existingCategory) {
      categories = updateExistingCategory(categories, id, name);
    } else {
      throw new Error(`Category with ID ${id} not found.`);
    }
  } else {
    newCategory = createNewCategory(name);
    categories.push(newCategory);
  }

  await saveData(categoriesFilePath, categories);
  res.status(200).json(newCategory);
};

const updateExistingCategory = (
  categories: Category[],
  id: string,
  name: string
) => {
  return categories.map((category: Category) =>
    category.id === id
      ? {
          id: id,
          name: name,
        }
      : category
  );
};

const createNewCategory = (name: string) => {
  return {
    id: uuidv4(),
    name,
  };
};

export default updateCategories;
