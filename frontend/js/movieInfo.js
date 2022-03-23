var movieId = 1; //Passed from moviesLister.js
var allScreenings;
var screenings;

async function movieInfoLister() {
  let rawData = await fetch('/api/movieActors/movieId/' + movieId);
  let result = await rawData.json();
  printMovieInfo(result);
  let rawDataScreening = await fetch('/api/allMovieScreenings/' + movieId);
  allScreenings = await rawDataScreening.json();
  screenings = allScreenings;
  printScreenings();
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
  <p class="movieDesc"><b>Actors: </b>` + result.actors + `</p>`;
  document.querySelector('.section1').innerHTML += htmlSection1;
}

async function printScreenings() {
  let htmlSection2 = '';
  for (let screening of screenings) {
    let result = await fetch('/api/seatsForScreening/screening/' + screening.screeningId)
    result = await result.json();
    let availableSeats = result[0].length - result[1].length;
    htmlSection2 += '<article class="goBooking" id="infoPage&' + screening.screeningId + '"><div class="columnMargin"><p class="column1">' + screening.date + '</p><p class="column2">' + screening.theaterName + '</p><p class="column3">' + availableSeats + ' seats left</p></div></article>'
  }
  document.querySelector('.section2').innerHTML = htmlSection2;
}

function filterDate() {
  screenings = allScreenings;
  let select = document.getElementById('dateFilter');
  let value = select.options[select.selectedIndex].value;
  let tempScreenings = screenings;
  screenings = [];

  let today = new Date();
  let endDate = new Date()

  if (value == 'all') {
    screenings = allScreenings;
    printScreenings();
    return;
  } else if (value == 'tomorrow') {
    endDate.setDate(today.getDate() + 1);
  } else if (value == 'thisWeek') {
    endDate.setDate(today.getDate() + 7);
  } else if (value == 'thisMonth') {
    endDate.setDate(today.getDate() + 30);
  }

  today = changeDate(today);
  endDate = changeDate(endDate);
  endDate = new Date(endDate);

  for (let screening of tempScreenings) {
    let screeningDate = screening.date.slice(0, -6)
    let date = new Date(screeningDate);
    if (date <= endDate) {
      screenings.push(screening);
    }
  }
  printScreenings();
}

function changeDate(date) {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}