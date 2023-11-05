import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Service ID is required" }),
    };
  }

  try {
    const params = {
      TableName: "ServicesTable",
      Key: {
        id: { S: id },
      },
    };

    await dynamoDb.send(new DeleteItemCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Service deleted successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Could not delete service" }),
    };
  }
};
