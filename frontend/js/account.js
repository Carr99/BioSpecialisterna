
var userMovies = null;

async function listUserMovies() {

    if (userMovies === null) {
      let rawData = await fetch('/api/userMovies');
      // deserialize the json into a "live" data structure
      userMovies = await rawData.json();
      console.log(userMovies)
    }
  
   document.querySelector('.userMovies').innerHTML = '';
     
    for (let userMovie of userMovies) {
    displayUserMovieCard(userMovie);
    }

}



  function displayUserMovieCard(userMovie) {

    let html = `
      <div class="movie_card" id="${userMovie.bookingId}">
        <div class="info_section">
         <div class="movie_header">
            <img class="poster" src="${userMovie.imageUrl}" />
           <h1>${userMovie.title}</h1>
           <h4>${userMovie.date}, ${userMovie.theaterName}</h4>
           <br>
      </div>
    </div>
    <div class="blur_back background_img"></div>
  </div>
  `
  
    document.querySelector('.userMovies').innerHTML += html;
  }
