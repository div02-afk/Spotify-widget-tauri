const express = require("express");
const axios = require("axios");
const app = express();
const querystring = require("querystring");
const cors = require("cors");
app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
));

let message = "";


app.get("/data", (req, res) => {
  console.log("frontend requested data");
  const dataToSend = message;
  res.send(dataToSend);
});
app.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log("code", code);
  const client_id = "2c1494e88d7b408fa613f6a43b395af4";
  const client_secret = "536c09fa548948d0a7ce9c401ac99b68";
  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/callback",
        client_id: client_id,
        client_secret: client_secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Log the response from Spotify
    

    // Retrieve access token and refresh token
    const { access_token, refresh_token } = data;
    const accessToken = access_token;
    const refreshToken = refresh_token;
    message = {
      code : code,
      accessToken : accessToken,
      refreshToken : refreshToken
    }
    // File path where you want to store the data
    res.send("You can close this window now");
  } catch (error) {
    console.error(
      "Error exchanging authorization code for access token:",
      error.message
    );
    res.send("Error getting access token");
  }
  // res.send("You can close this window now");
});

app.listen(process.env.PORT||3000, () => {
  console.log("Server running on port 3000");
});
