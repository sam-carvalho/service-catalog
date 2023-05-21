import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Category } from "src/interfaces/category";

const categoriesFilePath = path.join(process.cwd(), "data", "categories.json");

const readCategories = () => {
  if (!fs.existsSync(path.dirname(categoriesFilePath))) {
    fs.mkdirSync(path.dirname(categoriesFilePath), { recursive: true });
  }

  if (!fs.existsSync(categoriesFilePath)) {
    fs.writeFileSync(categoriesFilePath, "[]", "utf-8");
  }

  const categoriesData = fs.readFileSync(categoriesFilePath, "utf-8");
  return JSON.parse(categoriesData);
};

const writeCategories = (categories: Category[]) => {
  fs.writeFileSync(
    categoriesFilePath,
    JSON.stringify(categories, null, 2),
    "utf-8"
  );
};

const updateCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const categoryName = req.body.name;
      const categoryId = req.body.id;
      let categories = readCategories();
      let newCategory = {};

      if (categoryId) {
        categories = categories.map((category: Category) =>
          category.id === categoryId
            ? { id: categoryId, name: categoryName }
            : category
        );
      } else {
        newCategory = { id: uuidv4(), name: categoryName };
        categories.push(newCategory);
      }

      writeCategories(categories);
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Error updating categories" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed " });
  }
};

export default updateCategories;
