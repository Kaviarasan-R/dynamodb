import { GetCommand, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import documentClient from "./dynamodbClient.js";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME = "Relationship";

async function One2One() {
  try {
    /* const response = await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_2",
          SK: "profile",
          Data: "JSON OBJECT",
        },
      })
    ); */
    const response = await documentClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: "user_2",
          SK: "profile",
        },
      })
    );
    console.log("One2One", response);
  } catch (error) {
    console.error("One2One", error);
  }
}

async function One2Many() {
  try {
    /* await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_1",
          SK: "task_1",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_1",
          SK: "task_2",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_2",
          SK: "task_1",
          Data: "JSON OBJECT",
        },
      })
    ); */
    const response = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": { S: "user_1" },
          ":sk": { S: "task" },
        },
      })
    );
    console.log("One2Many", response.Items);
  } catch (error) {
    console.error("One2Many", error);
  }
}

async function Many2Many() {
  try {
    /* await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "afflr",
          SK: "team_user_1",
          GSI1: "user_1",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "afflr",
          SK: "team_user_2",
          GSI1: "user_2",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "retainful",
          SK: "team_user_3",
          GSI1: "user_1",
          Data: "JSON OBJECT",
        },
      })
    ); */
    const getTeams = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: {
          ":pk": { S: "afflr" },
        },
      })
    );
    console.log("getTeams", getTeams.Items);

    // GSI Perspective
    const getUsersWithTeam = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1 = :gsi1 AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":gsi1": { S: "user_1" },
          ":sk": { S: "team_user" },
        },
      })
    );
    console.log("getUsersWithTeam", getUsersWithTeam.Items);
  } catch (error) {
    console.error("Many2Many", error);
  }
}

async function Many2One() {
  try {
    /* await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_1",
          SK: "task_1",
          GSI1: "afflr",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_1",
          SK: "task_2",
          GSI1: "retainful",
          Data: "JSON OBJECT",
        },
      })
    );
    await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "user_2",
          SK: "task_1",
          GSI1: "afflr",
          Data: "JSON OBJECT",
        },
      })
    ); */
    const getUserTasks = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": { S: "user_1" },
          ":sk": { S: "task" },
        },
      })
    );
    console.log("getUserTasks", getUserTasks.Items);

    // GSI Perspective
    const getTeamTasks = await documentClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1 = :gsi1 AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":gsi1": { S: "afflr" },
          ":sk": { S: "task" },
        },
      })
    );
    console.log("getTeamTasks", getTeamTasks.Items);
  } catch (error) {
    console.error("Many2One", error);
  }
}

One2One();
One2Many();
Many2Many();
Many2One();
