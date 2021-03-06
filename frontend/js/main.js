let intervalId = 0;
document.querySelector('body').addEventListener('click', async function (event) {

  let aTag = event.target.closest('a');
  let article = event.target.closest('article');

  let href;
  if (aTag || article) {
    if (aTag) {
      href = aTag.getAttribute('href');
    } else {
      let id = article.getAttribute('id');
      if (id.includes('&')) {
        let partialInfo = id.split('&');
        if (partialInfo[0] == 'infoPage') {
          if (await checkLoggin()) {
            console.log("loggin check passed");
            href = '/booking'; //should go to booking page
          } else {
            href = '/login';
          }

          screeningId = partialInfo[1]  // set id for sceeningId in the booking.js

        } else {
          return;
        }
      } else {
        return;
      }
    }/*
    if (href.indexOf('http') === 0) {
      aTag.setAttribute('target', '_blank');
      return;
    }
    */
  } else {
    return;
  }

  event.preventDefault();
  history.pushState(null, null, href);
  router();
});

function makeMenuChoiceActive(route) {
  let aTagsInNav = document.querySelectorAll('nav a');
  for (let aTag of aTagsInNav) {
    aTag.classList.remove('active');
    let href = aTag.getAttribute('href');
    if (href === route) {
      aTag.classList.add('active');
    }
  }
}

async function router() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = 0;
  }
  let route = location.pathname;
  makeMenuChoiceActive(route);
  route = route === '/' ? '/start' : route;
  route = '/html' + route + '.html';

  // load partial
  let content = await (await fetch(route)).text();
  content.includes('<title>Error</title > ') && location.replace(' / ');
  document.querySelector('main').innerHTML = content;


  if (route === '/html/start.html') {
    getTrailers();
  } else if (route === '/html/movies.html') {
    setupFilterHandlers();
    listMovies();
  } else if (route === '/html/login.html') {
    login();
  } else if (route === '/html/register.html') {
    registerPage();
  } else if (route === '/html/forgotPassword.html') {
    forgotPassword();

  } else if (route === '/html/movie-info.html') {
    movieInfoLister();

  } else if (route === '/html/booking.html') {
    booking();
  } else if (route === '/html/account.html') {
    listUserMovies();
  }


}

window.addEventListener('popstate', router);

function burgerMenuSlider() {
  let burger_menu = document.querySelector('.burger_menu')
  let nav = document.querySelector('.nav_links')
  let navLinks = document.querySelectorAll('.nav_links li')
  let body = document.body;

  //let navLinksA = document.querySelectorAll('.nav_links a')


  burger_menu.addEventListener('click', () => {
    // Show the burger menu when buger button is clicked
    nav.classList.toggle('nav_active');

    // Add animation for displaying the links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;// Divides by arbitrary value to get a delay time
      }
    });
    // Animation for burger menu
    burger_menu.classList.toggle('toggle');
    // Remove scrolling on page when navSlide is out
    body.classList.toggle('noscroll')
  });

}
async function checkLoggin() {
  let rawData = await fetch('http://localhost:3000/api/login', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  let loggedIn = await rawData.json();

  if (loggedIn['_error']) {
    console.log("not logged in");
    return false;
  }
  console.log(loggedIn);
  return true;
}
burgerMenuSlider();
router();
