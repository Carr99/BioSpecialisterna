var g_rated = false;
var pg_7 = false;
var pg_11 = false;
var pg_15 = false;

var movies = null;

async function listMovies() {

  if (movies === null) {
    let rawData = await fetch('/api/movie');
    // deserialize the json into a "live" data structure
    movies = await rawData.json();
    console.log('Movies fetched fom DB')
  }

  document.querySelector('.movies').innerHTML = '';
  for (let movie of movies) {
    if (!g_rated && !pg_7 && !pg_11 && !pg_15 || (g_rated && pg_7 && pg_11 && pg_15)) { // No filters used, display all movies
      displayMovieCard(movie);
    } else if (movie.ageGroup === 'PG 15' && pg_15) {
      displayMovieCard(movie);
    }
    else if (movie.ageGroup === 'PG 11' && pg_11) {
      displayMovieCard(movie);
    }
    else if (movie.ageGroup === 'PG 7' && pg_7) {
      displayMovieCard(movie);
    } else if (movie.ageGroup === 'G-rated' && g_rated) {
      displayMovieCard(movie);
    }
  }
  setupCardHandlers();
}

function displayMovieCard(movie) {

  let html = `
    <div class="movie_card" id="${movie.movieId}">
      <div class="info_section">
       <div class="movie_header">
          <img class="poster" src="${movie.imageUrl}" />
         <h1>${movie.title}</h1>
         <h4>${movie.year}, ${movie.director}</h4>
          <span class="length">${movie.length} min</span><span class="length">${movie.ageGroup}</span>
          <br>
         <p class="genre">${movie.genre}</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        ${movie.description}
      </p>
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>
`

  document.querySelector('.movies').innerHTML += html;
}

function setupCardHandlers() {

  let cards = document.getElementsByClassName('movie_card');

  for (let card of cards) {
    card.addEventListener('click', () => {
      // Öppna movieInfo med hjälp av movieId variablen nedan
      movieId = card.id;
      console.log(movieId)
      history.pushState(null, null, '/movie-info');
      router();
    });
  }
}

function setupFilterHandlers() {
  let buttons = document.getElementsByClassName('filter_button');

  for (let button of buttons) {
    if (button.id === 'g_rated') {
        button.addEventListener('click', () => {
          if (!g_rated) {
            g_rated = true;
            button.style.background = 'black';
            button.style.color = 'white'
          } else {
            g_rated = false;
            button.style.background = '#f5f5f5';
            button.style.color = 'black'
          }
          listMovies();
        });
      } else if (button.id === 'pg_7') {
        button.addEventListener('click', () => {
          if (!pg_7) {
            pg_7 = true;
            button.style.background = 'black';
            button.style.color = 'white'
          } else {
            pg_7 = false;
            button.style.background = '#f5f5f5';
            button.style.color = 'black'
          }
          listMovies();
        });
      } else if (button.id === 'pg_11') {
        button.addEventListener('click', () => {
          if (!pg_11) {
            pg_11 = true;
            button.style.background = 'black';
            button.style.color = 'white'
          } else {
            pg_11 = false;
            button.style.background = '#f5f5f5';
            button.style.color = 'black'
          }
          listMovies();
        });
      } else if (button.id === 'pg_15') {
        button.addEventListener('click', () => {
          if (!pg_15) {
            pg_15 = true;
            button.style.background = 'black';
            button.style.color = 'white'
          } else {
            pg_15 = false;
            button.style.background = '#f5f5f5';
            button.style.color = 'black'
          }
          listMovies();
        });      
    }
  }
}