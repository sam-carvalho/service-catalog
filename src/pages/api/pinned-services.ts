import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const getPinnedServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const pinnedFilePath = path.join(process.cwd(), "data", "pinned.json");
      let pinnedServices = [];
      if (fs.existsSync(pinnedFilePath)) {
        const pinnedServicesData = fs.readFileSync(pinnedFilePath, "utf-8");
        pinnedServices = JSON.parse(pinnedServicesData);
      }
      res.status(200).json(pinnedServices);
    } catch (error) {
      res.status(500).json({ message: "Error getting pinned services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default getPinnedServices;
