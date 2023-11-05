import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Service } from "../interfaces/Service";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const services: Partial<Service[]> = JSON.parse(event.body);

    if (!services || !Array.isArray(services)) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          error: "Invalid input format, expected an array of services.",
        }),
      };
    }

    const updatePromises = services.map((service) => {
      const updateParams = {
        TableName: "ServicesTable",
        Key: { id: { S: service.id } },
        UpdateExpression: "set isPinned = :isPinned",
        ExpressionAttributeValues: {
          ":isPinned": { S: service.isPinned },
        },
      };
      return dynamoDb.send(new UpdateItemCommand(updateParams));
    });

    await Promise.all(updatePromises);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Service updated successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error updating service" }),
    };
  }
};
