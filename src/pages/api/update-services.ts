import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Service } from "src/interfaces/service";

const servicesFilePath = path.join(process.cwd(), "data", "services.json");

const readServices = () => {
  if (!fs.existsSync(path.dirname(servicesFilePath))) {
    fs.mkdirSync(path.dirname(servicesFilePath), { recursive: true });
  }

  if (!fs.existsSync(servicesFilePath)) {
    fs.writeFileSync(servicesFilePath, "[]", "utf-8");
  }

  const servicesData = fs.readFileSync(servicesFilePath, "utf-8");
  return JSON.parse(servicesData);
};

const writeServices = (services: Service[]) => {
  fs.writeFileSync(
    servicesFilePath,
    JSON.stringify(services, null, 2),
    "utf-8"
  );
};

const updateServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { id, name, url, logo } = req.body;
      let services = readServices();

      if (id) {
        services = services.map((service: Service) =>
          service.id === id
            ? { id: id, name: name, url: url, logo: logo }
            : service
        );
      } else {
        const newService = { id: uuidv4(), name, url, logo };
        services.push(newService);
      }
      writeServices(services);
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: "Error updating services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed " });
  }
};

export default updateServices;
