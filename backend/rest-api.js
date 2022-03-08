// Import the better-sqlite3 module
const betterSqlite3 = require('better-sqlite3');

// Lib to generate JWT Token
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// Global access
dotenv.config();

// Connect to a SQLite database
const db = betterSqlite3('backend/bioSpecialisterna.db');

// Storing users and their tokens in memory before converting into DB
let usersAndTokens = {}


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

    app.get('/api/allMovieScreenings/' + ':id', (req, res) => {
        // Create a prepared statement with a parameter :id as part of it
        let stmt = db.prepare(`
                SELECT Screening.*, Theater.theaterName 
                FROM Screening, Theater
                WHERE movieId = ${req.params.id}
                AND Screening.theaterId = Theater.theaterId
            `);
        // Get the result or set it to null if no result found
        let result = stmt.all() || null;
        // Change status code of the response to 404 if no result found
        if (result === null) {
            res.status(404);
        }
        res.json(result);
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

    app.post('/api/book', (req, res) => {
        let data = req.body;
        let email = data.email;
        let screeningId = data.screeningId;
        let ticketType = data.ageGroup;
        let seatId = data.seatId;

        let stmt = db.prepare(`
            INSERT INTO Booking ('userEmail', 'seatId', 'ticketType', 'screeningId')
            VALUES ('${email}', ${seatId}, '${ticketType}', ${screeningId});
        `);
        result = stmt.run();

        if (result.changes >= 1)
            res.json({
                "operation": "success"
            })
    });
    app.get('/api/seatId' + '/:screeningId/:x/:y', (req, res) => {


        let stmt = db.prepare(`
        SELECT Seat.seatId
        From Seat
        Where Seat.theaterId == (Select theaterId FROM Screening WHERE screeningId == :screeningId) AND row == :y AND column == :x

    `);
        let seatId = stmt.all(req.params);
        res.json(seatId);
    });

    app.post('/api/register', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        let user = findUser(email);
        if (user === undefined) {
            let stmt = db.prepare(`
                INSERT INTO User ('email', 'password', 'isAdmin')
                VALUES ('${email}', '${password}', false);
            `);
            let result = stmt.run();
            if (result.changes >= 1)
                res.json(generateJWTToken(user))
        } else {
            res.status(409).json({ "operation": "User already exists" })
        }
    });

    app.post('/api/login', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;

        let user = findUser(email);
        if (user !== undefined)
            res.json(generateJWTToken(user));
        else
            res.status(401);
    });

    // Loop through all tables and views and create REST-routes for them
    for (let { name } of tablesAndViews) {
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
        app.get('/api/' + name + '/:idName/:id', (req, res) => {
            // Create a prepared statement with a parameter :id as part of it
            let stmt = db.prepare(`
                SELECT *
                FROM ${name}
                WHERE ${req.params.idName} = ${req.params.id}
            `);
            // Get the result or set it to null if no result found
            let result = stmt.all()[0] || null;
            // Change status code of the response to 404 if no result found
            if (result === null) {
                res.status(404);
            }
            res.json(result);
        });

    }

    function findUser(email) {
        return db.prepare('SELECT * FROM USER WHERE email = ?').get(email);
    }

    function generateJWTToken(user) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
        }
        const token = jwt.sign(data, jwtSecretKey);
        return token;
    }

    // Validates if client JWT Token is valid
    function validateJWTToken(token) {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        try {
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            return error;
        }
    }

}