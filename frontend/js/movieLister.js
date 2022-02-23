function listMovies() {
  let html = `
    <div class="card">
      <img src ="https://image.tmdb.org/t/p/w500/uE2Q9RaNBdJbAV1N67LhwCYluK0.jpg" alt="" class="cardImage"> </img>
      <div class="infoSection">
        <h3 class="title">Braveheart</h3>
        <p class="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </p>

        <p class ="otherInfo">15 | 148 min | Stora Salongen</p>
      </div>
    </div>

    <div class="card">
      <img src ="https://m.media-amazon.com/images/M/MV5BZTY2NTY4MzctMWNkYy00NWM4LTliOWQtMWExZDU1ZWQxNTQxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg" alt="" class="cardImage"> </img>
      <div class="infoSection">
        <h3 class="title">Rubber</h3>
        <p class="description"> Rubber rubber rubber rubber Rubber rubber </p>

        <p class ="otherInfo">15 | 128 min | Lilla Salongen</p>
      </div>
    </div>
  `
  document.querySelector('.movies').innerHTML += html;
}