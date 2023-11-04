import { setupAWSAccount } from "./setupAWSAccount";
import { createJSONFile } from "./createS3JSONFile";

export const getDataFromS3 = async (filePath: string) => {
  const AWS = setupAWSAccount();
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
  };

  await createJSONFile(filePath);

  try {
    const result = await s3.getObject(params).promise();
    return JSON.parse(result?.Body as string);
  } catch (error) {
    throw new Error(`Failed to retrieve data from S3: ${error.message}`);
  }
};
