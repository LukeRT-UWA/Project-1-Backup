var apiKey = "b38fe3f237a509f2859b965513f8c249"
let cardContainer = document.getElementById('card-container')
let singlecardContainer = document.getElementById('singe-card-container')

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

        const movieData = data;
        for (let index = 0; index < movieData.results.length; index++) {
          const movieResults = movieData.results[index];
          console.log(movieResults)
        let movieTitle = movieResults.title
        let moviePoster = movieResults.poster_path
        let movieReleaseDate = movieResults.release_date
        let movieOverview = movieResults.overview
        let movieScore = movieResults.vote_average
        
        manycard(moviePoster,movieTitle,movieReleaseDate,movieScore);
      }
      });
    }

function manycards (moviePoster,movieTitle,movieReleaseDate,movieScore) {

  let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "pure-u-1-5 movie-card");
        cardContainer.appendChild(cardDiv);

        let moviePosterEl = document.createElement ('img')
        moviePosterEl.src = ("https://image.tmdb.org/t/p/w200/" + moviePoster)
        cardDiv.appendChild(moviePosterEl)

        let movieBriefInfoEl = document.createElement("div");

        let movieTitleEl = document.createElement("button");
        movieTitleEl.setAttribute("class","")
        movieTitleEl.textContent = movieTitle;
        let movieReleaseDateEl = document.createElement("p");
        movieReleaseDateEl.textContent = movieReleaseDate;
        let movieScoreEl = document.createElement("p");
        movieScoreEl.textContent = movieScore;

        movieBriefInfoEl.appendChild(movieTitleEl,movieReleaseDateEl,movieScoreEl);
        cardDiv.appendChild(movieBriefInfoEl);

        movieTitleEl.addEventListener("click",onecard());

}

function onecard (moviePoster,movieTitle,movieReleaseDate,movieScore,movieOverview) {

  cardContainer.setAttribute("class","hidden");

  let cardDiv1 = document.createElement("div");
        cardDiv1.setAttribute("class", "pure-u-1-5 movie-card");
        singlecardContainer.appendChild(cardDiv);

        let moviePosterEl = document.createElement ('img')
        moviePosterEl.src = ("https://image.tmdb.org/t/p/w200/" + moviePoster)
        cardDiv.appendChild(moviePosterEl)

        let movieBriefInfoEl = document.createElement("div");

        let movieTitleEl = document.createElement("h2");
        movieTitleEl.textContent = movieTitle;
        let movieReleaseDateEl = document.createElement("p");
        movieReleaseDateEl.textContent = movieReleaseDate;
        let movieScoreEl = document.createElement("p");
        movieScoreEl.textContent = movieScore;
        let movieBlurbEl = document.createElement("p");
        movieBlurbEl.textContent = movieOverview;

        execute(movieTitle);

        movieBriefInfoEl.appendChild(movieTitleEl,movieReleaseDateEl,movieScoreEl);
        cardDiv1.appendChild(movieBriefInfoEl);   
}

document.getElementById('search-form').addEventListener("submit", search);


//const movieTitle = fetchAPI()
//movieTitle = movieTitle[0].title;
