var apiKey = "b38fe3f237a509f2859b965513f8c249"
let cardContainer = document.getElementById('card-container')
let historydiv = document.getElementById("History")

function parallax_height() {
  var scroll_top = $(this).scrollTop();
  var header_height = $(".main-header-section").outerHeight();
  $(".main-header").css({ height: header_height - scroll_top });
}
parallax_height();
$(window).scroll(function() {
  parallax_height();
});
$(window).resize(function() {
  parallax_height();
});



// .then((response) => response.json());


function fetchAPI(userInput) {
    return fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + userInput + "&page=1&include_adult=false")
    .then((response) => { if (response.ok) { return response.json()}
    else { openModal()}
    })
    
    
    // .catch((error) => {
    //   alert("hi") })
    
}

function search(event) {
  event.preventDefault();
  var userInput = document.getElementById('search-input').value;
  localStorage.setItem(userInput, userInput)
  cardContainer.innerHTML= ""
  

  fetchAPI(userInput)
      .then((data) => {
        
        const movieData = data;
        for (let index = 0; index < movieData.results.length; index++) {
          const movieResults = movieData.results[index];
          console.log(movieResults)
        let movieTitle = movieResults.title
        let moviePoster = movieResults.poster_path
        let movieReleaseDate = movieResults.release_date
        let movieOverview = movieResults.overview
        let movieScore = movieResults.vote_average

        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "pure-u-1-5 movie-card card")
        cardContainer.appendChild(cardDiv)
        
        let movieTitleEl = document.createElement('h2')
        movieTitleEl.textContent = movieTitle
        cardDiv.appendChild(movieTitleEl)

        if(moviePoster !== null){
          let moviePosterEl = document.createElement ('img');
          moviePosterEl.src = ("https://image.tmdb.org/t/p/w200/" + moviePoster);
          cardDiv.appendChild(moviePosterEl);
        }
        else{
          let moviePosterEl = document.createElement ('img');
          moviePosterEl.src = ("https://via.placeholder.com/150");
          cardDiv.appendChild(moviePosterEl);
        }


        
        let movieOverviewEl = document.createElement('p');
        movieOverviewEl.textContent = movieOverview;
        cardDiv.appendChild(movieOverviewEl);
        
        let movieScoreEl = document.createElement('h2');
        movieScoreEl.textContent = "Movie Score: "+movieScore;
        cardDiv.appendChild(movieScoreEl);

        const pseudoTitle = document.getElementById("pseudo-title");


      }

      });
      
    }
function history(){
  console.log("HISTORY WORKS");
  for (var i = 0; i < localStorage.length; i++){
      console.log("HISTORY Create");
      
      button = document.createElement('button');
      button.setAttribute("type", "button"); 
      button.classList.add("btn", "pure-button", "pure-button-primary");
      button.textContent = localStorage.getItem(localStorage.key(i));
      button.style.float = "left";
      button.id = localStorage.getItem(localStorage.key(i));
      historydiv.append(button);
      
  }};
document.getElementById('search-form').addEventListener("submit", search);
history()
