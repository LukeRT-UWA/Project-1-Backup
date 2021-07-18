var apiKey = "b38fe3f237a509f2859b965513f8c249"
let cardContainer = document.getElementById('card-container')

function fetchAPI(userInput) {
    return fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + userInput + "&page=1&include_adult=false")
    .then((response) => response.json())
    // .then(function (response) { })
}

function search(event) {
  event.preventDefault();
  var userInput = document.getElementById('search-input').value;
  cardContainer.innerHTML= ""
 

  fetchAPI(userInput)
      .then((data) => {
        
        let movieTitleYT = document.getElementById("pseudo-title");

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
        cardDiv.setAttribute("class", "pure-u-1-5 movie-card")
        cardContainer.appendChild(cardDiv)

        let movieTitleEl = document.createElement('h1')
        movieTitleEl.textContent = movieTitle
        cardDiv.appendChild(movieTitleEl)

        movieTitleYT.textContent = movieTitle

        let moviePosterEl = document.createElement ('img')
        moviePosterEl.src = ("https://image.tmdb.org/t/p/w200/" + moviePoster)
        cardDiv.appendChild(moviePosterEl)
      }
      });
    }

document.getElementById('search-form').addEventListener("submit", search);
