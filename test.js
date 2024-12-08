import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import documentClient from "./dynamodbClient.js";

const TABLE_NAME = "CRAMY.USER";

async function AddUser(data) {
  try {
    const response = await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: data,
      })
    );
    console.log("AddUser", response);
  } catch (error) {
    console.error("AddUser", error);
  }
}

async function GetUser(id) {
  try {
    const response = await documentClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          id: id,
        },
      })
    );
    console.log("GetUser", response);
  } catch (error) {
    console.error("GetUser", error);
  }
}

async function ScanUser() {
  try {
    const response = await documentClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );
    console.log("ScanUser", response);
  } catch (error) {
    console.error("ScanUser", error);
  }
}

async function QueryUser(GSI, key, value) {
  try {
    const response = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: GSI,
        KeyConditionExpression: "#key = :value",
        ExpressionAttributeNames: {
          "#key": key,
        },
        ExpressionAttributeValues: {
          ":value": value,
        },
      })
    );
    console.log("QueryUser", response);
  } catch (error) {
    console.error("QueryUser", error);
  }
}

async function QueryUsername(first_name, last_name) {
  try {
    const response = await documentClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "first_name = :first_name AND last_name = :last_name",
        ExpressionAttributeValues: {
          ":first_name": first_name,
          ":last_name": last_name,
        },
      })
    );
    console.log("QueryUsername", response);
  } catch (error) {
    console.error("QueryUsername", error);
  }
}

/* const user = {
  id: 3,
  user_id: "14489fc4-ac5d-4d7f-9108-90dcd37c00d8",
  first_name: "john",
  last_name: "abraham",
  email: "john@gmail.com",
  phone: null,
  password: null,
  avatar_url: null,
  login_type: "MANUAL",
  role: "SME",
  details: null,
  status: false,
  created_at: 3,
  updated_at: 9,
};

AddUser(user); */

// GetUser(3);
// ScanUser();
// QueryUser("GSI.role", "role", "STUDENT");
// QueryUsername("Kavi", "Arasan");
