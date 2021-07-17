youtubeApiKey = "AIzaSyB599Zhnh0IGZVuo2rk6h43K_6oBU2Bs28";

gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey("AIzaSyAm4ehkwsMN4i0Cdita_8ls8y39Bapqe-M");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
}
//function start(){
//    event.preventDefault();
//
//   mediaoutput.setAttribute("class","displayhidden");
//}

//var titleinput = JSON.stringify(specificTitle);
const mediaoutput = document.getElementById("videoresult");
const titlebutton = document.getElementById("specific-title");

var request = {
        part: "snippet",
        order: "viewCount",
        q: "Christmas",
        type: "video",
        maxResults: 1,
};

function getvideo() {
    return gapi.client.youtube.search.list(request)
    .then(function (response){
        console.log("Responce",response);
        const listResults = response.result.items;

        const trailer = document.createElement("video");

        if(listResults) {
            
            const videoId = listResults[0].id.videoId;
            trailer.setAttribute("src","https://www.youtube.com/watch?v=" + videoId);
            trailer.setAttribute("poster","http://i3.ytimg.com/vi/" + videoId + "/hqdefault.jpg");
        }

        mediaoutput.appendChild(trailer);
        
        //mediaoutput.classList.remove("displayhidden");
    });
});
 
titlebutton.addEventListener("click",getvideo());

