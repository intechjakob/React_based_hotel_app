// Importing necessary modules from AWS SDK v3
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs');

// Configuring the AWS region
const REGION = "eu-central-1"; // Frankfurt
const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

console.log("Writing entries to MenuLinks table.");

const menuLinksData = JSON.parse(fs.readFileSync('../components/data/menu_links.json', 'utf8'));

menuLinksData.forEach(async (menuLink) => {
  const params = {
    TableName: "MenuLinks",
    Item: {
      "class": menuLink.class,
      "href": menuLink.href,
      "text": menuLink.text
    }
  };

  try {
    await docClient.send(new PutCommand(params));
    console.log("Added", menuLink.text, "to table.");
  } catch (err) {
    console.error("Unable to load data into table for menu links", menuLink.text, ". Error: ", JSON.stringify(err, null, 2));
  }
});
