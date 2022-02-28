var movieId = 1; //Passed from moviesLister.js

async function movieInfoLister() {
  let rawData = await fetch('/api/movie/movieId/' + movieId);
  // deserialize the json into a "live" data structure
  let result = await rawData.json();
  htmlSection1 = '<h2>' + result.title + `</h2>
    <img class="moviePoster" src = "` + result.imageUrl + `" alt = ""></img >
  <iframe class="movieTrailer" width="70%" height="250" src="` + result.trailerUrl + `" frameborder="0"
    allowfullscreen>
  </iframe>
  <h4>Description</h4>
  <p>` + result.description + `</p>
  <h4>Actors</h4>
  <p>Morgan Freeman, Tim Robbins, Bob Gunton ...</p>`;
  document.querySelector('.section1').innerHTML += htmlSection1;
  htmlSection2 = `<h2>Available Times</h2>
    <article class="goBooking" id="infoPage&screeningId">2022-02-26, Stora salen, 10 of 100 left</article>
    <article class="goBooking" id="infoPage&screeningId">2022-02-26, Stora salen, 10 of 100 left</article>
    <article class="goBooking" id="infoPage&screeningId">2022-02-26, Stora salen, 10 of 100 left</article>`;
  document.querySelector('.section2').innerHTML += htmlSection2;
}