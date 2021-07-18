const youtubeAPI = "AIzaSyB51qZZmoDWTnFEW4PUjMr9ZikaTbNMaAY"

function loadClient() {
    gapi.client.setApiKey(youtubeAPI);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}
  // Make sure the client is loaded before calling this method.
function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 1,
      "order": "viewCount",
      "q": "trailer",
      "type": [
        "video"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
}

window.onload = function() {
    loadClient();
    execute();
    gapi.load("client");
}

