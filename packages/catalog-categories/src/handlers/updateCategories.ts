import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Category } from "../interfaces/Category";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body: Partial<Category> & { id: string } = JSON.parse(
      event.body as string
    );

    if (!body.id) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Category ID is required" }),
      };
    }

    const params = {
      TableName: "CategoriesTable",
      Key: { id: { S: body.id } },
      UpdateExpression: "set #n = :n",
      ExpressionAttributeValues: {
        ":n": { S: body.name },
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
        message: "Category updated successfully",
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
      body: JSON.stringify({ message: "Error updating category" }),
    };
  }
};
