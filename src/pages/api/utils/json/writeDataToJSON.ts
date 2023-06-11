import fs from "fs";
import { Service, Category } from "../../../../interfaces";
import { createJSONFile } from "./createJSONFile";

export const writeDataToJSON = (
  filePath: string,
  data: Service[] | Category[]
) => {
  try {
    createJSONFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error(`Failed to write data to JSON file: ${error.message}`);
  }
};
