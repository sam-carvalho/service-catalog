import { setupAWSAccount } from "./setupAWSAccount";

const AWS = setupAWSAccount();

export const createJSONFile = async (filePath: string) => {
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filePath,
  };

  try {
    await s3.headObject(params).promise();
  } catch (error) {
    if (error.code === "NotFound") {
      const createParams = {
        ...params,
        Body: "[]",
      };
      await s3.putObject(createParams).promise();
    } else {
      throw new Error(`Failed to check file existence: ${error.message}`);
    }
  }
};
