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
    <img class="moviePoster" src = "` + result.imageUrl + `" alt = ""></img>
  <iframe style="height:300px;width:68%;border:none;overflow:hidden;" src="` + result.trailerUrl + `" frameborder="0"
    allowfullscreen>
  </iframe>
  <div class="infoRow">
  <div class="movieInfoBox">` + result.year + `</div>
  <div class="movieInfoBox">` + result.genre + `</div>
  <div class="movieInfoBox">` + result.length + `min</div>
  <div class="movieInfoBox">` + result.ageGroup + `</div>
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
    console.log(screening)
    htmlSection2 += '<article class="goBooking" id="infoPage&' + screening.screeningId + '"><p class="alignleft">' + screening.date + '</p><p class="aligncenter">' + screening.theaterName + '</p><p class="alignright">10 of 100</p></article>'
  }
  document.querySelector('.section2').innerHTML += htmlSection2;
}