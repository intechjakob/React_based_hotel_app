// Importing necessary modules from AWS SDK v3
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require('fs');

// Configuring the AWS region
const REGION = "eu-central-1"; // Frankfurt
const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

console.log("Writing entries to GalleryImages table.");

const galleryImagesData = JSON.parse(fs.readFileSync('../components/data/gallery_images.json', 'utf8'));

galleryImagesData.forEach(async (galleryImage) => {
  let className = galleryImage.className.trim() === "" ? "no_class" : galleryImage.className;

  const params = {
    TableName: "GalleryImages",
    Item: {
      "src": galleryImage.src,
      "alt": galleryImage.alt,
      "className": className
    }
  };

  try {
    await docClient.send(new PutCommand(params));
    console.log("Added", galleryImage.src, "to table.");
  } catch (err) {
    console.error("Unable to load data into table for gallery images", galleryImage.src, ". Error: ", JSON.stringify(err, null, 2));
  }
});
