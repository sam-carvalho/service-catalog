import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Service } from "../../interfaces";
import { getData, saveData } from "./utils";

const storageOption = process.env.STORAGE;

const servicesFilePath =
  storageOption === "aws"
    ? "data/services.json"
    : path.join(process.cwd(), "data", "services.json");

const updateServices = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      await handleServiceUpdate(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error updating services" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

const handleServiceUpdate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, categoryId } = req.body;
  let { url } = req.body;
  let { logo } = req.body;

  if (!name || !url) {
    return res
      .status(400)
      .json({ message: "Name and URL are required fields" });
  }

  let services = await getData(servicesFilePath);

  if (id) {
    services = updateExistingService(services, id, name, url, logo, categoryId);
  } else {
    if (!logo) {
      logo = "/default.png";
    }

    if (!url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const newService = createNewService(name, url, logo, categoryId);
    services.push(newService);
  }

  await saveData(servicesFilePath, services);
  res.status(200).json({ message: "Service added successfully" });
};

const updateExistingService = (
  services: Service[],
  id: string,
  name: string,
  url: string,
  logo: string,
  categoryId: string
) => {
  return services.map((service: Service) =>
    service.id === id
      ? {
          id: id,
          name: name,
          url: url,
          logo: logo,
          categoryId: categoryId,
        }
      : service
  );
};

const createNewService = (
  name: string,
  url: string,
  logo: string,
  categoryId: string
) => {
  return {
    id: uuidv4(),
    name,
    url,
    logo,
    categoryId,
  };
};

export default updateServices;
