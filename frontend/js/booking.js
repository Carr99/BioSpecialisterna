function booking(screeningId){
    canvas = document.querySelector("#seats");
    ctx = canvas.getContext("2d");

    populateSeats(ctx, screeningId);


    
   
    

}
async function populateSeats(ctx, screeningId){
    let rawData = await fetch("http://localhost:3000/api/seatsForScreening/screening/" + screeningId)
    let seats = await rawData.json();

        console.log(seats);

        let rows = Math.max.apply(Math, seats[0].map(function(o) { return o.row; })) + 1
        let columns = Math.max.apply(Math, seats[0].map(function(o) { return o.column; })) + 1

        let map = Array(rows).fill().map(() => Array(columns).fill(0));

        for (const seat of seats[1]) {
            map[seat.row][seat.column] = 1;
        }
        let tileHeight = canvas.width/ map.length;
        let tileWidth = canvas.height / map[0].length;
    
        for (let row = 0; row < map.length; row++) {
            for (let column = 0; column < map[row].length; column++) {
              let tile = map[row][column];
              if (tile === 0) {
                  ctx.fillStyle = "grey";
              }else{
                  ctx.fillStyle = "red";
              }
              ctx.fillRect(column * tileWidth + (tileWidth*0.1), row * tileHeight + (tileHeight*0.1), tileWidth -(tileWidth*0.2), tileHeight -(tileHeight*0.2));
             
            }
          }




}