// Port that web server should start on
// (red from environment variable if it exists or set to 3000)
const port = process.env.PORT || 3000;

// Import the express module
const express = require('express');

// Create a web server (app) using express 
const app = express();

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
setupRESTapi(app);
