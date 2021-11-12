export const open = (uri) => (window.location.href = uri);

export const actionUrl = (() => {
  const authEndpoint = "https://accounts.spotify.com/authorize"; // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = "2de8edd3e5424748a18d6ff3a8256647";
  const redirectUri = `${window.location.protocol}//${window.location.host}`;
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ]; // Get the hash of the url

  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
})();

export const auth = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";
  return hash;
};
