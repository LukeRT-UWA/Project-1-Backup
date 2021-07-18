gapi.load("client", loadClient);

function init() {
    gapi.client.setApiKey("YOUR_PUBLIC_KEY");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyB51qZZmoDWTnFEW4PUjMr9ZikaTbNMaAY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}

const searchbutton = document.getElementById('search-button');
const videoList = document.getElementById('videoListContainer');
const MovieTitle = "Moana Official Trailer"
var pageToken = '';

searchbutton.addEventListener('click', e => {
    e.preventDefault();
    execute();
});
  
function paginate(e, obj) {
    e.preventDefault();
    pageToken = obj.getAttribute('data-id');
    execute();
}

// Make sure the client is loaded before calling this method.
function execute() {

    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": "viewCount",
        "maxResults": 1,
        "q": "moana",
        "videoEmbeddable": "true",
    };
  
    if (pageToken != '') {
        arr_search.pageToken = pageToken;
    }
  
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("response",response);

        let videoID = response.result.items[0].id.videoId;
        
        let mediaEl = document.createElement("iframe");
        mediaEl.setAttribute("src","https://www.youtube.com/embed/" + videoID);
        
        videoList.appendChild(mediaEl)
    },
    function(err) { console.error("Execute error", err); });
}


