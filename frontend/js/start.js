function getTrailers() {
  
let html = `
      <h2>Current Movies</h2>
  <iframe width="250" height="200" src="https://www.youtube.com/embed/1NJO0jxBtMo" frameborder="0" allowfullscreen>
  </iframe>

  <iframe width="250" height="200" src="https://www.youtube.com/embed/owK1qxDselE" frameborder="0" allowfullscreen>
  </iframe>

  <iframe width="250" height="200" src="https://www.youtube.com/embed/P9mwtI82k6E" frameborder="0" allowfullscreen>
  </iframe>
  <br>
  <br>
    <h2>Upcomming Movies</h2>
    <iframe width="250" height="200" src="https://www.youtube.com/embed/1NJO0jxBtMo" frameborder="0" allowfullscreen>
  </iframe>
    `;
  
  document.querySelector('.start').innerHTML = html;
}