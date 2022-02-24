function listMovies() {
  let html = `
    <div class="movie_card" id="braveheart">
  <div class="info_section">
    <div class="movie_header">
      <img class="poster" src="https://image.tmdb.org/t/p/w500/uE2Q9RaNBdJbAV1N67LhwCYluK0.jpg" />
      <h1>Braveheart</h1>
      <h4>1995, M. Gibson</h4>
      <span class="length">117 min</span><span class="length">PG-13</span>
      <br>
      <p class="genre">Biography</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King
        Edward I of England.
      </p>
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>

<div class="movie_card" id="rubber">
  <div class="info_section">
    <div class="movie_header">
      <img class="poster" src="https://m.media-amazon.com/images/M/MV5BZTY2NTY4MzctMWNkYy00NWM4LTliOWQtMWExZDU1ZWQxNTQxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg" />
      <h1>Rubber</h1>
      <h4>2010, Q. Dupieux</h4>
      <span class="length">82 min</span><span class="length">PG-15</span>
      <br>
      <p class="genre">Comedy</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        A homicidal car tire, discovering it has destructive psionic power, sets its sights on a desert town once a mysterious
        woman becomes its obsession.
      </p>
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>

<div class="movie_card" id="frozen">
  <div class="info_section">
    <div class="movie_header">
      <img class="poster"
        src="https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_.jpg" />
      <h1>Frozen</h1>
      <h4>2013, C. Buck</h4>
      <span class="length">102 min</span><span class="length">PG-7</span>
      <br>
      <p class="genre">Comedy</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite
        winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather
        condition.
      </p>
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>
  `
  document.querySelector('.movies').innerHTML += html;
}