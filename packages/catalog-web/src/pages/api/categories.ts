import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getData } from "./utils";

const storageOption = process.env.STORAGE;

const categoriesFilePath =
  storageOption === "aws"
    ? "data/categories.json"
    : path.join(process.cwd(), "data", "categories.json");

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const categories = await getData(categoriesFilePath);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error getting categories" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getCategories;
