
// we need use strict in the backend
'use strict';

console.log('meow');

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./weather.js');
const getMovies = require('./my_movies.js');



// USE

const app = express();

app.use(cors());

// try the port variable in the .env, but try 3002 if it doesn't
// if the server is running on 3002, then I know something is wrong in the .env file or how I'm importing the values
const PORT = process.env.PORT || 3002;


// the '/' means to start at the end of our 'base url'
app.get('/', (request, response) => {
  response.status(200).send('Meow-mix, Meow-mix, pls deliver!');
});

// from the /weather endpoint, get the key/value pairs from the search query
// check the which city from the lat lon and searchQuery
// make a new Forecast object for each day of weather data for that locations
// put those Forecast objects into an array
// send the full array of Forecast object back to the original client
app.get('/weather', getWeather);


// get movies data
app.get('/movies', getMovies);

// catch all| "star" route
// the star is a wildcard that 'catches all' other routes
// when a user enters an invalid route
app.get('*', (request, response) =>
{
  response.status(404).send('Something about Kansas');
});


// ERRORS
// handle errors that I can define

app.use((error, request, response) =>
{
  console.log(error.message);
  response.status(500).send(`You're fired, Mr. Squidward: `, error.message);
});


// LISTEN
// start the server
// express has a `listen` method that takes in a `PORT` and a callback function as arguments
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
