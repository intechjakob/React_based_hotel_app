// Importing the DynamoDB client from AWS SDK v3
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

// Configuring the AWS region
const REGION = "eu-central-1"; // Frankfurt
const ddbClient = new DynamoDBClient({ region: REGION });

const params = {
  TableName: "Accessibilities",
  KeySchema: [
    // Partition Key
    { AttributeName: "name", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

const createTable = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Created table with description: ", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Unable to create table: ", JSON.stringify(err, null, 2));
  }
};

createTable();
