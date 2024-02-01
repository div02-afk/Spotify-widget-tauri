import axios from "axios";

function loginWithSpotify() {
  // Open Spotify authorization page in default browser
  const authURL =
    "https://accounts.spotify.com/authorize?" +
    "client_id=2c1494e88d7b408fa613f6a43b395af4" +
    "&response_type=code" +
    "&redirect_uri=http://localhost:3000/callback" + // Adjust this to your actual redirect URI
    "&scope=user-read-private%20user-read-email%20user-read-currently-playing";

  window.open(authURL, "_blank");
  const accessCode = new URLSearchParams(window.location.hash.substring(1)).get(
    "code"
  );
  console.log(accessCode);
}


export default loginWithSpotify;
