import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Service } from "../../interfaces";
import { saveData } from "./utils";

const storageOption = process.env.STORAGE;

const pinnedFilePath =
  storageOption === "aws"
    ? "data/pinned.json"
    : path.join(process.cwd(), "data", "pinned.json");

const addPinnedServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const pinnedServices: Service[] = req.body;
      await saveData(pinnedFilePath, pinnedServices);
      res.status(200).json({ message: "Pinned Service added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding pin" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default addPinnedServices;
