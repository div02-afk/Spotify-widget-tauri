import store from "./store";
function loginWithSpotify() {
  // Open Spotify authorization page in default browser
  const authURL =
    "https://accounts.spotify.com/authorize?" +
    "client_id=2c1494e88d7b408fa613f6a43b395af4" +
    "&response_type=code" +
    "&redirect_uri=https://spotify-widget-server.vercel.app/callback" + // Adjust this to your actual redirect URI
    "&scope=user-read-private%20user-read-email%20user-read-currently-playing%20user-modify-playback-state";

  window.open(authURL, "_blank");
  const accessCode = new URLSearchParams(window.location.hash.substring(1)).get(
    "code"
  );
  console.log(accessCode);
}

async function getCurrentlyPlayingTrack() {
  const access_token = store.getState().accessToken;
  console.log("getting song details");
  if (access_token === "") return;
  if (access_token) {
    let accessToken = access_token;
    const currentlyPlayingEndpoint =
      "https://api.spotify.com/v1/me/player/currently-playing";

    // Make authenticated request to Spotify API
    const response = await fetch(currentlyPlayingEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token in the Authorization header
      },
    });

    const info = await response.json();

    const songInfo = {
      name: info.item.name,
      artist: info.item.artists,
      album: info.item.album.name,
      isplaying: info.is_playing,
      image: info.item.album.images,
    };
    console.log("Currently playing track:", songInfo);
    store.dispatch({ type: "songInfo", payload: songInfo });
  }
}

async function spotifyMediaControl(control) {
  const access_token = store.getState().accessToken;
  console.log("controlling media");
  if (access_token === "") return;
  if (access_token) {
    const method = control === "play" || control == "pause" ? "PUT" : "POST";
    let accessToken = access_token;
    fetch(`https://api.spotify.com/v1/me/player/${control}`, {
      method: method,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          getCurrentlyPlayingTrack();
        } else {
          console.error(
            "Failed to skip to the next track:",
            response.status,
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error("Error skipping to the next track:", error);
      });
  }
}

export { loginWithSpotify, getCurrentlyPlayingTrack, spotifyMediaControl };
