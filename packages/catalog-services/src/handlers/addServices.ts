import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Service } from "../interfaces/Service";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body: Service = JSON.parse(event.body as string);

    if (!body.name || !body.url) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Name and URL are required fields" }),
      };
    }

    body.logo = body.logo || "/default.png";

    if (!body.url.startsWith("https://")) {
      body.url = `https://${body.url}`;
    }

    const params = {
      TableName: "ServicesTable",
      Item: {
        id: { S: uuidv4() },
        name: { S: body.name },
        url: { S: body.url },
        logo: { S: body.logo },
        isPinned: { S: body.isPinned },
        categoryId: { S: body.categoryId },
      },
    };

    await dynamoDb.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Service added successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error adding service" }),
    };
  }
};
