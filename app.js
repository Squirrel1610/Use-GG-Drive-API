const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "jav.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "idol.jpg", //filename will show on gg drive
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

// uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "1W9Np_oT_b1V5QrD9wSGG7KkhNCQCNkx1",
    });

    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

async function generatePublicUrl() {
  try {
    const fileId = "1HPE1Oyuky5gD6DAZ6qTWChRVt_ReB3fw";

    //give permission
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId,
      //webViewLink: link view file, webContentLink: link download file
      fields: "webViewLink, webContentLink",
    });

    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

// generatePublicUrl();

//link image after share: https://drive.google.com/uc?id=FILE_ID
