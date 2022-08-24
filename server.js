
// we need use strict in the backend
'use strict';

console.log('meow');

// add scaffolding to see what we need to do:
/*
  REQUIRE
  in our servers, we have to use 'require' instead of 'import'.
  Server Requirements:

  // to create a server, we bring in express:
  const express = require('express');

  // Bring in our .env file
  // use this after running npm i dotenv
  require('dotenv').config();

  USE:
  if something is 'REQUIRE'd, we must use it
  here' we'll assign the required file to a variable
  (react does this in one step, Express takes two):
  const app = express();

  // our "canary in the coalmine"
  const PORT = process.env.PORT || 3002;

  Define PORT value and validate it's working

  ROUTES:
  access our endpoints
  // create a basic, default route:
  app.get correlates to axios.get
  the first parameter is a 'ur' in quotes

  app.get('/')

  ERRORS:
  app.use((error, request, response, next) =>
  {
    response.status(500).send(error.message);
  });

  LISTEN:
  - an express method:
    - takes in a port value and callback function
    - call on our instance of express (app, in this case)
    app.listen(PORT, ()  => console.log(`listening on port ${PORT}`));
    -listening for 'hits' on its 'routes'
*/

// REQUIRE
const express = require('express');

require('dotenv').config();

const cors = require('cors');

// bring in json data and require it
let data = require('./data/weather.json');


// USE

const app = express();

app.use(cors());

// try the port variable in the .env, but try 3002 if it doesn't
// if the server is running on 3002, then I know something is wrong in the .env file or how I'm importing the values
const PORT = process.env.PORT || 3002;


// the '/' means to start at the end of our 'base url'
app.get('/', (request, response) => {
  response.send('Hello from our server!');
});

// from the /weather endpoint, get the key/value pairs from the search query
// check the which city from the lat lon and searchQuery
// make a new Forecast object for each day of weather data for that locations
// put those Forecast objects into an array
// send the full array of Forecast object back to the original client
app.get('/weather', (request, response, next) =>
{
  try
  {
    // get latitude from search query
    let lat = request.query.lat;
    // get longitude from search query
    let lon = request.query.lon;
    // get the value city name from search query
    let searchQuery = request.query.searchQuery;

    // find a weather object from the weather.json that matches the name of the city the user types in
    let weatherObj = data.find(weather =>
      weather.city_name.toLowerCase() === searchQuery.toLowerCase());

    console.log('raw weather data',weatherObj);

    // turn weatherObj into an array of Forecast objects
    let forecastArray = weatherObj.data.map(dailyData => new Forecast(dailyData));


    console.log('forecastArray ', forecastArray);

    // send the Forecast object array back to front-end
    // in the front end, the user can set the Forecast data into state for later use
    response.send(forecastArray);


  }
  catch(error)
  {
    console.log('error message: ', error.message);
    next(error);
  }
});
/* LAB 08
// handle getting weather from api
// make axios request using URL and save the returned data into state
const handleWeatherApiRequest((lat, lon) =>
{
  // make a `url` to use to make a GET request
  // use the `url` to do a GET from the weather api using axios
  // access the data from .data (axios) to get the raw data
  // use a map loop or sm to make an array of Forecast objects
  // return the array of Forecast objects
  return '';
});

// handle making an array of movie objects from a certain city
const handleMoviesRequest(cityName =>
{
  // make a `url` to use to make a GET request
  // use the `url` to do a GET from the weather api using axios
  // access the data from .data (axios) to get the raw data
  // use a map loop or sm to make an array of Movie objects
  // return the array of Movie objects
  return '';
});
*/

// get movie data from movie db using axios
// return an array of movies that contain the name of the city (using regex) | title= regex cityName or something
app.get('/movies', (request, response, next) =>
{

});




// catch all| "star" route
// the star is a wildcard that 'catches all' other routes
// when a user enters an invalid route
app.get('*', (request, response) => {
  response.send('You\'re fired, Mr. Squidward.');
});

// ERRORS
// handle errors that I can define

app.use((error, request, response, next) =>
{
  response.status(500).send(error.message);
});

// CLASSES

// making Forecast objects from user input
class Forecast {
  constructor(weatherObj)
  {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

class Movies {
  constructor(cityObj)
  {
    // fill in this data from the properties of the movie database
    this.src = '';
    this.alt = '';
    this.director = '';
  }
}


// LISTEN
// start the server
// express has a `listen` method that takes in a `PORT` and a callback function as arguments
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
