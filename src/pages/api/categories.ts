import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const categoriesFilePath = path.join(
        process.cwd(),
        "data",
        "categories.json"
      );
      let categories = [];
      if (fs.existsSync(categoriesFilePath)) {
        const categoriesData = fs.readFileSync(categoriesFilePath, "utf-8");
        categories = JSON.parse(categoriesData);
      }
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error getting categories" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getCategories;
