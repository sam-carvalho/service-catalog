import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Service } from "../interfaces/Service";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body: Partial<Service> & { id: string } = JSON.parse(
      event.body as string
    );

    if (!body.id) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Service ID is required" }),
      };
    }

    const params = {
      TableName: "ServicesTable",
      Key: { id: { S: body.id } },
      UpdateExpression:
        "set #n = :n, url = :url, logo = :logo, categoryId = :categoryId, isPinned = :isPinned",
      ExpressionAttributeValues: {
        ":n": { S: body.name },
        ":url": { S: body.url },
        ":logo": { S: body.logo },
        ":categoryId": { S: body.categoryId },
        ":isPinned": { S: body.isPinned },
      },
      ExpressionAttributeNames: {
        "#n": "name",
      },
    };

    const updateResponse = await dynamoDb.send(new UpdateItemCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Service updated successfully",
        attributes: updateResponse.Attributes,
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
