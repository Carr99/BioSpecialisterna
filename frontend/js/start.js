async function getTrailers() {
  let rawData = await fetch('/api/movie/');
  let movies = await rawData.json();

  let htmlCurrent = '';
  let htmlUpComming = '';

  for (let movie of movies) {
    if(movie.movieId === 1 || movie.movieId === 2)
      htmlCurrent += `
      <iframe width="250" height="200" src="${movie.trailerUrl}" frameborder="0" allowfullscreen>
  </iframe>
    `
  }

  for (let movie of movies) { 
    if(movie.movieId === 3 || movie.movieId === 4)
    htmlUpComming += `
      <iframe width="250" height="200" src="${movie.trailerUrl}" frameborder="0" allowfullscreen>
  </iframe>
    `
  }

  document.querySelector('.current').innerHTML = htmlCurrent;
  document.querySelector('.upComming').innerHTML = htmlUpComming;
}