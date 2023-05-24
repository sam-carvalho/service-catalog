import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const getServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const servicesFilePath = path.join(
        process.cwd(),
        "data",
        "services.json"
      );
      let services = [];
      if (fs.existsSync(servicesFilePath)) {
        const servicesData = fs.readFileSync(servicesFilePath, "utf-8");
        services = JSON.parse(servicesData);
      }
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: "Error getting services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getServices;
