import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import documentClient from "./dynamodbClient.js";

const TABLE_NAME = "Employee";

const input = {
  ExclusiveStartTableName: "STRING_VALUE",
  Limit: Number("int"),
};
const command = new ListTablesCommand(input);
const response = await documentClient.send(command);

console.log("All Tables", response);

async function addEmployee(employee) {
  try {
    const response = await documentClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: employee,
      })
    );
    console.log("addEmployee", response);
  } catch (error) {
    console.error("addEmployee", error);
  }
}

async function getAllEmployees() {
  try {
    const response = await documentClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );
    console.log("getAllEmployees", response);
  } catch (error) {
    console.error("getAllEmployees", error);
  }
}

async function getEmployeeById(id) {
  try {
    const response = await documentClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          LoginAlias: id,
        },
      })
    );
    console.log("getEmployeeById", response);
  } catch (error) {
    console.error("getEmployeeById", error);
  }
}

async function deleteEmployeeById(id) {
  try {
    const response = await documentClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          LoginAlias: id,
        },
      })
    );
    console.log("deleteEmployeeById", response);
  } catch (error) {
    console.error("deleteEmployeeById", error);
  }
}

// Use UpdateCommand Instead of PutCommand
async function updateEmployeeById(employee) {
  try {
    const LoginAlias = employee.LoginAlias;
    const Skills = employee.Skills;

    const response = await documentClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          LoginAlias: LoginAlias,
        },
        UpdateExpression: "set Skills = :skills",
        ExpressionAttributeValues: {
          ":skills": Skills,
        },
      })
    );
    console.log("updateEmployeeById", response);
  } catch (error) {
    console.error("updateEmployeeById", error);
  }
}

/* 
getAllEmployees();

const addParams = {
  LoginAlias: "kavi",
  FirstName: "Kavi",
  LastName: "Arasan",
  ManagerLoginAlias: "kavi",
  Skills: new Set(["software", "management"]),
};
addEmployee(addParams);

deleteEmployeeById("johns");

getEmployeeById("kavi");

const updateParams = {
  LoginAlias: "kavi",
  FirstName: "Kavi",
  LastName: "Arasan",
  ManagerLoginAlias: "kavi",
  Skills: new Set(["software"]),
};
updateEmployeeById(updateParams);
*/
