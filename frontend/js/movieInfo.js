function movieInfoLister() {
  htmlSection1 = `<h2>The Shawshank Redemption</h2>
    <img class='moviePoster' src = "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" alt = ""></img >
  <iframe class='movieTrailer' width="70%" height="250" src="https://www.youtube.com/embed/P9mwtI82k6E" frameborder="0"
    allowfullscreen>
  </iframe>
  <h4>Description</h4>
  <p>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common
    decency.</p>
  <h4>Actors</h4>
  <p>Morgan Freeman, Tim Robbins, Bob Gunton ...</p>`;
  htmlSection2 = `<h2>Available Times</h2>
    <article>2022-02-26, Stora salen, 10 of 100 left</article >
    <article>2022-02-26, Stora salen, 10 of 100 left</article>
    <article>2022-02-26, Stora salen, 10 of 100 left</article>`;
  document.querySelector('.section1').innerHTML += htmlSection1;
  document.querySelector('.section2').innerHTML += htmlSection2;
}