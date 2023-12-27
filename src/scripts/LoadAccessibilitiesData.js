// Importing the necessary modules from AWS SDK v3
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs');

// Configuring the AWS region
const REGION = "eu-central-1"; // Frankfurt
const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

console.log("Writing entries to Accessibilities table.");

// Read and parse the data file
const accessibilitiesData = JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf8'));

accessibilitiesData.forEach(async (accessibility) => {
  const params = {
    TableName: "Accessibilities",
    Item: {
      "name": accessibility.name
    }
  };

  try {
    const data = await docClient.send(new PutCommand(params));
    console.log("Added", accessibility.name, "to table.");
  } catch (err) {
    console.error("Unable to load data into table for accessibility", accessibility.name, ". Error:", err);
  }
});
