import { setupAWSAccount } from "./setupAWSAccount";
import { Service, Category } from "../../../../interfaces";

const AWS = setupAWSAccount();

export const saveDataToS3 = async (
  filePath: string,
  data: Service[] | Category[]
) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
    Body: JSON.stringify(data),
  };

  try {
    await s3.putObject(params).promise();
  } catch (error) {
    console.error("Error saving data to S3:", error.message);
    throw new Error(`Failed to save data to S3: ${error.message}`);
  }
};
