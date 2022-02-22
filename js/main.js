document.querySelector('body').addEventListener('click', function (event) {

    let aButton = event.target.closest('button');

    if (!aButton) { return; }
    let clickedButton = aButton.getAttribute('id');


    event.preventDefault();
    rotuer(newPage);
});

async function rotuer(aV) {
    let route = location.pathname;
    if (aV != null) {
        route = aV;
    }
    route = route === '/' ? '/start' : route;
    route = '/partials' + route + '.html';
    // load partial
    let content = await (await fetch(route)).text();
    content.includes('<title>Error</title > ') && location.replace(' / ');
    document.querySelector('main').innerHTML = content;

}

window.addEventListener('popstate', rotuer);

rotuer();