document.querySelector('body').addEventListener('click', function (event) {

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
                    href = '/movies'; //should go to booking page
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        if (href.indexOf('http') === 0) {
            aTag.setAttribute('target', '_blank');
            return;
        }
    } else {
        return;
    }

    event.preventDefault();
    history.pushState(null, null, href);
    router();
});

async function router() {
    let route = location.pathname;
    console.log(route);
    route = route === '/' ? '/start' : route;
    route = '/html' + route + '.html';
    console.log(route);

    // load partial
    let content = await (await fetch(route)).text();
    content.includes('<title>Error</title > ') && location.replace(' / ');
    document.querySelector('main').innerHTML = content;

    if (route === '/html/start.html') {
        getTrailers();
    } else if (route === '/html/movies.html') {
        listMovies();
        setupButtonListeners();
    } else if (route === '/html/login.html') {
        login();
    } else if (route === '/html/register.html') {
        registerPage();
    } else if (route === '/html/forgotPassword.html') {
        forgotPassword();
    } else if (route === '/html/movie-info.html') {
        movieInfoLister();
    }
}

window.addEventListener('popstate', router);

router();