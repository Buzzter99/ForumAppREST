const env = require("dotenv").config();
const clientId = process.env.DROPBOX_CLIENT_ID;
const clientSecret = process.env.DROPBOX_CLIENT_SECRET;
const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
const Dropbox = require("dropbox").Dropbox;
async function refreshAccessToken() {
  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });
  const data = await response.json();
  if (data.access_token) {
    return { accessToken: data.access_token };
  } else {
    throw new Error("Failed to refresh access token");
  }
}
async function generateUrlByFolder(fileToGenerate) {
  const token = await refreshAccessToken();
  const dbx = new Dropbox({ accessToken: token.accessToken });
  try {
    const response = await dbx.filesGetTemporaryLink({
      path: fileToGenerate,
    });
    return response.result.link;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { generateUrlByFolder };
