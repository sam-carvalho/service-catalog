import fs from "fs";
import { createJSONFile } from "./createJSONFile";

export const readDataFromJSON = (filePath: string) => {
  try {
    createJSONFile(filePath);
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error(`Failed to read data from JSON file: ${error.message}`);
  }
};
