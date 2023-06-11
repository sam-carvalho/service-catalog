import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { getData } from "./utils";

const storageOption = process.env.STORAGE;

const servicesFilePath =
  storageOption === "aws"
    ? "data/services.json"
    : path.join(process.cwd(), "data", "services.json");

const getServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const services = await getData(servicesFilePath);
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: "Error getting services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getServices;
