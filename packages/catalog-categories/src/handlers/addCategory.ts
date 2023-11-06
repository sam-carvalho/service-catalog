import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../interfaces/Category";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body: Category = JSON.parse(event.body as string);

    if (!body.name) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: "Name is a required field" }),
      };
    }

    const categoryId = uuidv4();

    const params = {
      TableName: "CategoriesTable",
      Item: {
        id: { S: categoryId },
        name: { S: body.name },
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
        message: "Category added successfully",
        category: { id: categoryId, name: body.name },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Error adding category" }),
    };
  }
};
