import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getData } from "./utils";

const storageOption = process.env.STORAGE;

const pinnedFilePath =
  storageOption === "aws"
    ? "data/pinned.json"
    : path.join(process.cwd(), "data", "pinned.json");

const getPinnedServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const pinnedServices = await getData(pinnedFilePath);
      res.status(200).json(pinnedServices);
    } catch (error) {
      res.status(500).json({ message: "Error getting pinned services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getPinnedServices;
