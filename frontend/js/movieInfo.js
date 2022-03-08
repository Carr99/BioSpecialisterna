var movieId = 1; //Passed from moviesLister.js

async function movieInfoLister() {
  let rawData = await fetch('/api/movie/movieId/' + movieId);
  let result = await rawData.json();
  printMovieInfo(result);
  let rawDataScreening = await fetch('/api/allMovieScreenings/' + movieId);
  resultScreening = await rawDataScreening.json();
  printScreenings(resultScreening);
}

function printMovieInfo(result) {
  let htmlSection1 = '<h2>' + result.title + `</h2>
  <div class="posterLeft">
  <img class="moviePoster" src = "` + result.imageUrl + `" alt = ""></img>
  </div>
  <div class="trailerRight">
  <iframe class="movieTrailer" src="` + result.trailerUrl + `" frameborder="0"
    allowfullscreen>
  </iframe>
  </div>
  <div class="infoRow">
  <div class="movieInfoBox"><p class="movieInfo">` + result.year + `</p></div>
  <div class="movieInfoBox"><p class="movieInfo">` + result.genre + `</p></div>
  <div class="movieInfoBox"><p class="movieInfo">` + result.length + `min</p></div>
  <div class="movieInfoBox"><p class="movieInfo">` + result.ageGroup + `</p></div>
  </div>
  <p class="movieDesc">` + result.description + `</p>
  <p class="movieDesc"><b>Director: </b>` + result.director + `</p>
  <p class="movieDesc"><b>Actors: </b>Morgan Freeman, Tim Robbins, Bob Gunton ...</p>`;
  document.querySelector('.section1').innerHTML += htmlSection1;
}

function printScreenings(screenings) {
  console.log(screenings);
  let htmlSection2 = `<h2>Available Times</h2>`;
  for (let screening of screenings) {
    htmlSection2 += '<article class="goBooking" id="infoPage&' + screening.screeningId + '"><div class="columnMargin"><p class="column1">' + screening.date + '</p><p class="column2">' + screening.theaterName + '</p><p class="column3">10 of 100</p></div></article>'
  }
  document.querySelector('.section2').innerHTML += htmlSection2;
}