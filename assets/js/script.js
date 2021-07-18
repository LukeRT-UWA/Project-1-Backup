var apiKey = "b38fe3f237a509f2859b965513f8c249"
let cardContainer = document.getElementById('card-container')

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
        let movieScore = movieResults.popularity

        let cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "pure-u-1-5 movie-card card")
        cardContainer.appendChild(cardDiv)
        
        let movieTitleEl = document.createElement('h2')
        movieTitleEl.textContent = movieTitle
        cardDiv.appendChild(movieTitleEl)

        
        let moviePosterEl = document.createElement ('img');
        moviePosterEl.src = ("https://image.tmdb.org/t/p/w200/" + moviePoster);
        cardDiv.appendChild(moviePosterEl);
        
        let movieOverviewEl = document.createElement('p');
        movieOverviewEl.textContent = movieOverview;
        cardDiv.appendChild(movieOverviewEl);
        
        let movieScoreEl = document.createElement('h2');
        movieScoreEl.textContent = "Movie Score: "+movieScore;
        cardDiv.appendChild(movieScoreEl);
      

        const pseudoTitle = document.getElementById("pseudo-title");
        pseudoTitle.textContent = movieTitle

      }

      

      });
    }

document.getElementById('search-form').addEventListener("submit", search);