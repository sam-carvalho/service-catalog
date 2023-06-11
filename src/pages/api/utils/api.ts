import { readDataFromJSON } from "./json/readDataFromJSON";
import { writeDataToJSON } from "./json/writeDataToJSON";
import { getDataFromS3 } from "./aws/getDataFromS3";
import { saveDataToS3 } from "./aws/saveDataToS3";
import { Service, Category } from "../../../interfaces";

const storageOption = process.env.STORAGE;

export const saveData = async (
  filePath: string,
  data: Service[] | Category[]
) => {
  try {
    if (!storageOption || storageOption === "json") {
      writeDataToJSON(filePath, data);
    } else if (storageOption === "aws") {
      await saveDataToS3(filePath, data);
    } else {
      throw new Error("Invalid storage option");
    }
  } catch (error) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
};

export const getData = (filePath: string) => {
  try {
    if (!storageOption || storageOption === "json") {
      return readDataFromJSON(filePath);
    } else if (storageOption === "aws") {
      return getDataFromS3(filePath);
    } else {
      throw new Error("Invalid storage option");
    }
  } catch (error) {
    throw new Error(`Failed to retrieve data: ${error.message}`);
  }
};
