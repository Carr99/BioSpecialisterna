// Import the better-sqlite3 module
const betterSqlite3 = require('better-sqlite3');

// Connect to a SQLite database
const db = betterSqlite3('backend/bioSpecialisterna.db');

// Port that web server should start on
// (red from environment variable if it exists or set to 3000)
const port = process.env.PORT || 3000;

// Import the express module
const express = require('express');

// Create a web server (app) using express
const app = express();
const session = require('express-session')
app.use(session({
    secret: 'u8oij132U()!"#o12390',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: 'auto'}
}));

// Serve all the files in the frontend folder
app.use(express.static('frontend'));

// express.json is built in Express middleware
// needed to be able to read a request body
// (for POST / PUT / PATCH - request)
app.use(express.json({ limit: '100MB' }));

// Start the web server at port 3000
app.listen(port, () =>
  console.log('Listening on http://localhost:' + port));

// Import the rest-api setup function
const setupRESTapi = require('./backend/rest-api');
setupRESTapi(app, db, session);
module.exports = app;
const login = require('./backend/login')
login(app, db)
