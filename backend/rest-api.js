// Import the better-sqlite3 module
const betterSqlite3 = require('better-sqlite3');

// Connect to a SQLite database
const db = betterSqlite3('backend/bioSpecialisterna.db');

// Get the names of all the tables and views in the db
let tablesAndViews = db.prepare(`
    SELECT name, type
    FROM sqlite_schema
    WHERE (type = 'table' OR type = 'view')
      AND name NOT LIKE 'sqlite_%'
`).all();

// Export the function setupRESTapi as a Node.js module
module.exports = function setupRESTapi(app) {

    // Add a special route that will list all the tables and views
    app.get('/api/tablesAndViews', (req, res) => {
        res.json(tablesAndViews);
    });

    app.get('/api/seatsForScreening/screening' + '/:Id', (req, res) => {


        let totalStmt = db.prepare(`
            SELECT Seat.seatId as id, Seat.row, Seat.column
            From Seat, Screening
            WHERE screeningId == :Id AND Seat.theaterId == Screening.theaterId
        `);

        let totalSeats = totalStmt.all(req.params)

        let bookedStmt = db.prepare(`
            SELECT Seat.seatId as id, Seat.row, Seat.column
            From Seat, Booking
            WHERE Booking.screeningId == :Id AND Seat.seatId == Booking.seatId;
        `)

        let bookedSeats = bookedStmt.all(req.params);

        let result = [totalSeats, bookedSeats]

        res.json(result);



    })

    app.post('/api/register', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        let stmt = db.prepare(`
            INSERT INTO User ('email', 'password', 'isAdmin')
            VALUES ('${email}', '${password}', false);
        `);
        let result = stmt.run();
        if (result.changes >= 1)
            res.json({
                "operation": "success"
            })

    });

    // Loop through all tables and views and create REST-routes for them
    for (let {name} of tablesAndViews) {
        // Create a route to get (read) all posts from a table
        app.get('/api/' + name, (req, res) => {
            // create a prepared statement
            let stmt = db.prepare(`
                SELECT *
                FROM ${name}
            `);
            // run the prepared statement and get all data from the db
            let result = stmt.all();
            // convert the result to json and respond to web browser
            res.json(result);
        });

        // Create a route to get a single post from a table based on its id
        app.get('/api/' + name + '/:id', (req, res) => {
            // Create a prepared statement with a parameter :id as part of it
            let stmt = db.prepare(`
                SELECT *
                FROM ${name}
                WHERE id = :id
            `);
            // Get the result or set it to null if no result found
            let result = stmt.all(req.params)[0] || null;
            // Change status code of the response to 404 if no result found
            if (result === null) {
                res.status(404);
            }
            res.json(result);
        });

    }

}