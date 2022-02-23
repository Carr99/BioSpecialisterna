document.querySelector('body').addEventListener('click', function (event) {


    let aTag = event.target.closest('a');

    // do nothing if not click on an atag
    if (!aTag) {
        return;
    }

    let href = aTag.getAttribute('href');

    // check if external link then open in a new window
    if (href.indexOf('http') === 0) {
        aTag.setAttribute('target', '_blank');
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

    if (route === '/html/movies.html') {
        listMovies();
    }
}

window.addEventListener('popstate', router);

router();