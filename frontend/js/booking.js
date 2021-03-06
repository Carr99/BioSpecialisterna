let tileHeight;
let tileWidth;
let map;
let price = 0;
let juniorTickets = 0;
let standardTickets = 0;
let seniorTickets = 0;
let selected = false;
let selection = [];
let screeningId = 1;
function booking() {


    canvas = document.querySelector("#seats");

    ctx = canvas.getContext("2d");

    intervalId = setInterval(populateSeats, 1000);
    canvas.addEventListener("mousemove", function (e) {

        seatHover(e);

    });
    canvas.addEventListener("click", function (e) {
        selectSeats(e)

    });
    canvas.addEventListener("mouseleave", function (e) {
        if (!selected) {
            selection = [];
            draw(ctx);
        }
    })
    let bookButton = document.querySelector("#createBooking");

    let priceHeader = document.querySelector("#priceHeader");
    let juniorMinus = document.querySelector("#juniorMinus");
    let juniorPlus = document.querySelector("#juniorPlus");
    let standardMinus = document.querySelector("#standardMinus");
    let standardPlus = document.querySelector("#standardPlus");
    let seniorMinus = document.querySelector("#seniorMinus");
    let seniorPlus = document.querySelector("#seniorPlus");

    let juniorCount = document.querySelector("#juniorCount");
    let standardCount = document.querySelector("#standardCount");
    let seniorCount = document.querySelector("#seniorCount");

    bookButton.addEventListener("click", function (e) {
        bookTickets(screeningId);
    });


    juniorMinus.addEventListener("click", () => {
        if (juniorTickets > 0) {
            price -= 65;
            juniorTickets--;
            juniorCount.innerHTML = `<h3>${juniorTickets}</h3>`;
            priceHeader.textContent = price + " Kr";
        }
    });
    juniorPlus.addEventListener("click", () => {
        price += 65;
        juniorTickets++;
        juniorCount.innerHTML = `<h3>${juniorTickets}</h3>`;
        priceHeader.textContent = price + " Kr";
    });
    standardMinus.addEventListener("click", () => {
        if (standardTickets > 0) {
            price -= 85;
            standardTickets--;
            standardCount.innerHTML = `<h3>${standardTickets}</h3>`;
            priceHeader.textContent = price + " Kr";
        }
    });
    standardPlus.addEventListener("click", () => {
        price += 85;
        standardTickets++;
        standardCount.innerHTML = `<h3>${standardTickets}</h3>`;
        priceHeader.textContent = price + " Kr";
    });
    seniorMinus.addEventListener("click", () => {
        if (seniorTickets > 0) {
            price -= 75;
            seniorTickets--;
            seniorCount.innerHTML = `<h3>${seniorTickets}</h3>`;
            priceHeader.textContent = price + " Kr";
        }
    });
    seniorPlus.addEventListener("click", () => {
        price += 75;
        seniorTickets++;
        seniorCount.innerHTML = `<h3>${seniorTickets}</h3>`;
        priceHeader.textContent = price + " Kr";
    });








}
async function populateSeats() {
    let rawData = await fetch("http://localhost:3000/api/seatsForScreening/screening/" + screeningId)
    let seats = await rawData.json();

    let rows = Math.max.apply(Math, seats[0].map(function (o) { return o.row; })) + 1
    let columns = Math.max.apply(Math, seats[0].map(function (o) { return o.column; })) + 1

    map = Array(rows).fill().map(() => Array(columns).fill(0));

    for (let seat of seats[1]) {
        map[seat.row][seat.column] = 1;
        if (selected) {
            for (selectedSeat of selection) {
                if (selectedSeat[0] === seat.row && selectedSeat[1] === seat.column) {
                    selection = []
                    selected = false;
                }
            }
        }
    }
    tileHeight = canvas.width / map.length;
    tileWidth = canvas.height / map[0].length;

    draw(ctx);
    if (selection.length > 0) {
        if (selected) {
            draw(ctx, selection, "blue");
        } else {
            draw(ctx, selection, "green");
        }
    }

    return true;





}
function seatHover(e) {
    if (selected === false) {
        let selection = calculateSelection(e);
        draw(ctx, selection, "green");
    }


}
function selectSeats(e) {
    if (selected === false) {
        let selection = calculateSelection(e);
        draw(ctx, selection, "blue");
        selected = true;
    } else {
        selected = false;
    }


}
function calculateSelection(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;   // relationship bitmap vs. element for X
    let scaleY = canvas.height / rect.height;
    let x = Math.trunc(((e.clientX - rect.left) * scaleX) / tileWidth);
    let y = Math.trunc(((e.clientY - rect.top) * scaleY) / tileHeight);

    let totalTickets = juniorTickets + standardTickets + seniorTickets;
    selection = [];
    for (let i = 0; i < totalTickets; i++) {
        let ageGroup = "";
        if (i < juniorTickets) {
            ageGroup = "Junior";
        } else if (i < juniorTickets + standardTickets) {
            agegroup = "Adult";
        } else {
            ageGroup = "Senior";
        }
        let seatFound = false;
        while (!seatFound) {
            if (x > map[0].length - 1) {
                x = 0;
                if (y === map.length - 1) {
                    y = 0;
                }
                else {
                    y++
                }

            }
            if (y > map.length) {
                x = 0;
                y = 0;
            }

            if (map[y][x] === 0) {
                selection.push([y, x, ageGroup]);
                seatFound = true;
                x++;
            } else {
                x++;
            }
        }
    }
    return selection;
}
function draw(ctx, selection = [[-1, -1]], color = "") {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            let tile = map[row][column];
            if (tile === 0) {
                ctx.fillStyle = "grey";
            }
            else {
                ctx.fillStyle = "red";
            }
            for (seat of selection) {
                if (seat[0] === row && seat[1] === column) {
                    ctx.fillStyle = color;
                }
            }
            ctx.fillRect(column * tileWidth + (tileWidth * 0.1), row * tileHeight + (tileHeight * 0.1), tileWidth - (tileWidth * 0.2), tileHeight - (tileHeight * 0.2));

        }
    }
}
async function bookTickets(screeningId) {
    if (selection.length > 0) {
        let rawData = await fetch("http://localhost:3000/api/seatsForScreening/screening/" + screeningId)
        let seats = await rawData.json();

        for (const seat of selection) {
            for (const bookedSeat of seats[1]) {
                if (seat[0] === bookedSeat.row && seat[1] === bookedSeat.column) {
                    return false;
                }
            }
        }
        for (const seat of selection) {

            let rawData = await fetch('http://localhost:3000/api/seatId/' + screeningId + '/' + seat[1] + '/' + seat[0], {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            });

            let seatId = await rawData.json();

            let query = {

                "screeningId": screeningId,
                "ageGroup": seat[2],
                "seatId": seatId[0].seatId
            };

            rawData = await fetch('http://localhost:3000/api/book', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query)
            });
        }
        selection = [];
        selected = false;
        alert("booking created, visit your account to view bookings.")
    } else {
        alert("Please select seats to book.");
    }
}