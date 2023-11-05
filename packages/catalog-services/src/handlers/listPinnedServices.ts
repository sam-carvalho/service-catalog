import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Service } from "../interfaces/Service";

const dynamoDb = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const params = {
      TableName: "ServicesTable",
      IndexName: "PinnedIndex",
      KeyConditionExpression: "isPinned = :isPinned",
      ExpressionAttributeValues: {
        ":isPinned": { S: "true" },
      },
    };

    const data = await dynamoDb.send(new QueryCommand(params));
    const services: Service[] = data.Items.map((item) =>
      unmarshall(item)
    ) as Service[];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(services),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Error retrieving pinned services",
        error,
      }),
    };
  }
};
