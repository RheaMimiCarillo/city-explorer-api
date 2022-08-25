
// we need use strict in the backend
'use strict';

console.log('meow');

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./weather.js');

/*
// bring in json data and require it
let data = require('./data/weather.json');
*/

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
// app.get('/weather', async (request, response, next) =>
// {
//   try
//   {
//     // get latitude from search query
//     let lat = request.query.lat;
//     // get longitude from search query
//     let lon = request.query.lon;
//     // get the value city name from search query
//     let cityName = request.query.searchQuery;

//     // get today's date in YYYY-MM-DD format
//     let currentDate = getDate(0);


//     // get date 5 days from today in YYYY-MM-DD format
//     let endDate = getDate(5);

//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}&start_date=${currentDate}&end_date=${endDate}`;

//     console.log('weatherbit url: ',url);

//     // use `url` to get the weather data from the the Weather api
//     let weatherResults = await axios.get(url);

//     console.log('weather api axios request: ', weatherResults);

//     // find a weather object from the weather API json that matches the lat and the lon from LocationIQ
//     // let weatherObj = weatherResults.data.find(city =>
//     //   city.lat === lat && city.lon === lon);

//     let weatherObj = weatherResults.data;

//     console.log('just weatherObj raw data', weatherObj);
//     // weatherObj.data.map(dailyData => new Forecast(dailyData));


//     // turn weatherObj into an array of Forecast objects
//     let forecastArray = [];
//     // get only the first 5 days of the forecast
//     for(let i = 0; i < 5; i++)
//     {

//       let dailyForecast = new Forecast(weatherObj.data[i]);
//       forecastArray.push(dailyForecast);
//       console.log(`forecastArray ${i} loop`, forecastArray);
//     }



//     console.log('forecastArray ', forecastArray);

//     // send the Forecast object array back to front-end
//     // in the front end, the user can set the Forecast data into state for later use
//     response.send(forecastArray);
//   }
//   catch(error)
//   {
//     console.log('error message: ', error.message);
//     next(error);
//   }
// });

// I just realized I don't actually need this part.... ;-;

/*
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
*/
/*
// handle making an array of movie objects from a certain city
const handleMoviesRequest (url =>
{

  try
  {
    let movieResults = await axios.get(url);
    return movieResults;
  }
  catch(error)
  {

  }
});
*/

// get movie data from movie db using axios
// return an array of movies that contain the name of the city (using regex) | title= regex cityName or something

app.get('/movies', async (request, response, next) =>
{
  try
  {
    let cityName = request.query.city;
    console.log('city from /movies request: ', cityName);

    // make a `url` to use to make a GET request
    let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}&adult=false`;

    console.log('movieUrl: ', url);

    // use the `url` to do a GET from the weather api using axios
    let movieResults = await axios.get(url);
    console.log('raw api movie results: ', movieResults);


    console.log('movieResults.results: ', movieResults.data.results);
    // access the data from .results (axios) to get the raw data
    // if the city has any movies with it's name in the title

    // make an empty array to store potential Movie objects
    let movieArray = [];
    if (movieResults.data.results.length)
    {
      movieResults.data.results.forEach(movie => movieArray.push(new Movies(movie)));
    }

    console.log(movieArray);

    response.status(200).send(movieArray);
    // use a map loop or sm to make an array of Movie objects
    // return the array of Movie objects
  }
  catch (error)
  {
    console.log('error message: ', error.message);
    // response.send('You want movies?');
    next(error);
  }
});




// catch all| "star" route
// the star is a wildcard that 'catches all' other routes
// when a user enters an invalid route
app.get('*', (request, response) =>
{
  response.status(404).send('Something about Kansas');
});

// CLASSES

class Movies
{
  constructor(movieData)
  {
    // fill in this data from the properties of the movie database
    this.title = movieData.title;
    this.releaseDate = movieData.release_date;
    this.language = movieData.original_language;
    this.overview = movieData.overview;
    this.src = movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : '';
    this.score = movieData.vote_average;
    this.id= movieData.id;
  }
}

// ERRORS
// handle errors that I can define

app.use((error, request, response, next) =>
{
  console.log(error.message);
  response.status(500).send(`You're fired, Mr. Squidward: `, error.message);
});


// LISTEN
// start the server
// express has a `listen` method that takes in a `PORT` and a callback function as arguments
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
