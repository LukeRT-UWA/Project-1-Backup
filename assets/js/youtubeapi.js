youtubeApiKey = "AIzaSyB599Zhnh0IGZVuo2rk6h43K_6oBU2Bs28";

const specificTitleEl = document.getElementById("specific-title");
const specificTitle = document.getElementById("specific-title").value;
const cardContainer = document.getElementById("card-container");
const mediaoutput = document.getElementById("videoresult");

gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey(youtubeApiKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}

function start(){
    event.preventDefault();

    mediaoutput.setAttribute("class","displayhidden");
}

var titleinput = JSON.stringify(specificTitle);

function request() {
    return {
        part: "snippet",
        order: "viewCount",
        q: "moana",
        type: "video",
    };
};

//specificTitleEl.addEventListener("click", function getvideo());

function getvideo() {
    return gapi.client.youtube.search.list(request)
    .then(function (response){
        console.log(response);
        const listResults = response.result.items;

        const trailer = document.createElement("video");

        if(listResults) {
            
            const videoId = listResults[0].id.videoId;
            trailer.setAttribute("src","https://www.youtube.com/watch?v=" + videoId);
            trailer.setAttribute("poster","http://i3.ytimg.com/vi/" + videoId + "/hqdefault.jpg");
        }

        mediaoutput.appendChild(trailer);
        cardContainer.appendChild(mediaoutput);
        
        mediaoutput.classList.remove("displayhidden");
    });
};
 
getvideo();

