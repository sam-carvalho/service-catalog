import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Service } from "../../interfaces";

const pinnedFilePath = path.join(process.cwd(), "data", "pinned.json");

const writePinnedServices = (services: Service[]) => {
  if (!fs.existsSync(path.dirname(pinnedFilePath))) {
    fs.mkdirSync(path.dirname(pinnedFilePath), { recursive: true });
  }

  if (!fs.existsSync(pinnedFilePath)) {
    fs.writeFileSync(pinnedFilePath, "[]", "utf-8");
  }

  fs.writeFileSync(pinnedFilePath, JSON.stringify(services, null, 2), "utf-8");
};

const updatePinnedServices = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    try {
      const pinnedServices: Service[] = req.body;

      writePinnedServices(pinnedServices);
      res.status(200).json({ message: "Pinned Service added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding pin" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default updatePinnedServices;
