import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Service } from "../interfaces/Service";

const dynamoDb = new DynamoDBClient({});
const TABLE_NAME = "ServicesTable";

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamoDb.send(new ScanCommand(params));
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
      body: JSON.stringify({ error: "Could not retrieve services" }),
    };
  }
};
