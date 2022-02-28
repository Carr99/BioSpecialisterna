let tileHeight;
let tileWidth;
let map;
let juniorTickets = 0;
let standardTickets = 0;
let seniorTickets = 0;
function booking(screeningId){


    canvas = document.querySelector("#seats");

    ctx = canvas.getContext("2d");

    populateSeats(ctx, screeningId);
    canvas.addEventListener("mousemove", function(e){

        seatHover(e);

    });
    let bookButton = document.querySelector("#createBooking");

    let juniorMinus = document.querySelector("#juniorMinus");
    let juniorPlus = document.querySelector("#juniorPlus");
    let standardMinus = document.querySelector("#standardMinus");
    let standardPlus = document.querySelector("#standardPlus");
    let seniorMinus = document.querySelector("#seniorMinus");
    let seniorPlus = document.querySelector("#seniorPlus");

    let juniorCount = document.querySelector("#juniorCount");
    let standardCount = document.querySelector("#standardCount");
    let seniorCount = document.querySelector("#seniorCount");


    juniorMinus.addEventListener("click", () =>{
        if(juniorTickets > 0){
            juniorTickets--;
            juniorCount.innerHTML =`<h3>${juniorTickets}</h3>`;
        }
    });
    juniorPlus.addEventListener("click", () =>{
        juniorTickets++;
            juniorCount.innerHTML =`<h3>${juniorTickets}</h3>`;
    });
    standardMinus.addEventListener("click", () =>{
        if(standardTickets > 0){
            standardTickets--;
            standardCount.innerHTML = `<h3>${standardTickets}</h3>`;
        }
    });
    standardPlus.addEventListener("click", () =>{
        standardTickets++;
        standardCount.innerHTML = `<h3>${standardTickets}</h3>`;
    });
    seniorMinus.addEventListener("click", () =>{
        if(seniorTickets > 0){
            seniorTickets--;
            seniorCount.innerHTML = `<h3>${seniorTickets}</h3>`;
        }
    });
    seniorPlus.addEventListener("click", () =>{
        seniorTickets++;
        seniorCount.innerHTML = `<h3>${seniorTickets}</h3>`;
    });

   


    
   
    

}
async function populateSeats(ctx, screeningId){
    let rawData = await fetch("http://localhost:3000/api/seatsForScreening/screening/" + screeningId)
    let seats = await rawData.json();

        console.log(seats);

        let rows = Math.max.apply(Math, seats[0].map(function(o) { return o.row; })) + 1
        let columns = Math.max.apply(Math, seats[0].map(function(o) { return o.column; })) + 1

        map = Array(rows).fill().map(() => Array(columns).fill(0));

        for (const seat of seats[1]) {
            map[seat.row][seat.column] = 1;
        }
        tileHeight = canvas.width/ map.length;
        tileWidth = canvas.height / map[0].length;
    
        draw(ctx);





}
function seatHover(e){
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;   // relationship bitmap vs. element for X
    let scaleY = canvas.height / rect.height;
    let x = Math.trunc(((e.clientX - rect.left) * scaleX)/ tileWidth);
    let y = Math.trunc(((e.clientY - rect.top) * scaleY)/ tileHeight);

    let totalTickets = juniorTickets + standardTickets + seniorTickets;
    console.log("total tickets: " + totalTickets)
    let selection = [];
    for (let i = 0; i < totalTickets; i++){
        let seatFound = false;
        while(!seatFound){
            if(x > map[0].length -1){
                x = 0;
                if(y === map.length -1){
                    y = 0;
                }
                else{
                    y++
                }

            }
            if (y > map.length){
                x = 0;
                y = 0;
            }

            if(map[y][x] === 0){
                selection.push([y,x]);
                seatFound = true;
                x++;
            }else{
                x++;
            }
        }
    }
    console.log("Selected seats" + selection.toString())
    draw(ctx, selection);
}
function draw(ctx, selection = [[-1,-1]]){
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
          let tile = map[row][column];
          console.log( Array[0,5] === selection[0])
          if (tile === 0) {
              ctx.fillStyle = "grey";
          }
          else{
              ctx.fillStyle = "red";
          }
          for(seat of selection){
              if (seat[0] === row && seat[1] === column){
                  ctx.fillStyle = "green";
              } 
          }
          ctx.fillRect(column * tileWidth + (tileWidth*0.1), row * tileHeight + (tileHeight*0.1), tileWidth -(tileWidth*0.2), tileHeight -(tileHeight*0.2));
         
        }
      }
}