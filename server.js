// lab 10

'use strict';

/* REQUIRE */

// require the use of a .env file
require('dotenv').config;

// express.js
const express = require('express');

const cors = require('cors');

// import weather functionality
const weather = require('./modules/weather.js');

// import movies functionality
const movies = require('./movies.js');

/* USE */

// make an instance of `express` called `app`
const app = express();
app.use(cors());

// declare PORT using the .env file value, or port 3002
const PORT = process.env.PORT || 3002;


/* ROUTES */

// base route
app.get('/', (request, response) => {
  response.status(200).send('Meow-mix, Meow-mix, pls deliver!');
});

// get weather data
app.get('/weather', weatherHandler);

// get movie data
app.get('/movies', movies);

// star route
app.get('*', (request, response) =>
{
  response.status(404).send(`We're lost, aren't we?`);
});


// event handlers
function weatherHandler(request, response)
{
  // declare lat and lon from the query
  const { lat, lon } = request.query;

  // call the `weather` function from `weather.js` in modules folder
  // 1. call the weather(lat, lon) function (promise)
  // 2. then => respond to user with `summaries` object
  //   - I'm not quite sure what this is, yet
  // 3. and catch an error if pops up
  //   - log the `error object
  //   - respond with the 200 status code and a string
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) =>
    {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

// LISTEN
// expecting the port to either be 3001 or the frontend url
app.listen(PORT, () => console.log(`Listening on port: ${process.env.PORT}`));
