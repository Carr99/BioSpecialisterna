var movieId = 1; //Passed from moviesLister.js

async function movieInfoLister() {
  let rawData = await fetch('/api/movie/movieId/' + movieId);
  // deserialize the json into a "live" data structure
  let result = await rawData.json();
  htmlSection1 = '<h2>' + result.title + `</h2>
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
  htmlSection2 = `<h2>Available Times</h2>
    <article class="goBooking" id="infoPage&1">2022-02-26, Stora salen, 10 of 100 left</article>
    <article class="goBooking" id="infoPage&2">2022-02-26, Stora salen, 10 of 100 left</article>
    <article class="goBooking" id="infoPage&3">2022-02-26, Stora salen, 10 of 100 left</article>`;
  document.querySelector('.section2').innerHTML += htmlSection2;
}