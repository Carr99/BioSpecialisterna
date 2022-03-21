var reloadedPage = false;
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
    setupBookingHandlers();

}

async function setupBookingHandlers() {
  
  let cards = document.getElementsByClassName('movie_card');

  for (let card of cards) {
    card.addEventListener('click', () => {
      // Öppna movieInfo med hjälp av movieId variablen nedan
      bookingId = card.id;
      console.log(bookingId)
    
      if (confirm("Are you sure you want to cancel this booking?") == true) {
        let query = {
          "bookingId": bookingId
      };

      fetch('http://localhost:3000/api/deleteBooking', {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(query)
      });
      reloadedPage = true;
      history.pushState(null, null, '/');
      router();
      } else {
      
    }
     
    });
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
