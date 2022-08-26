// copy of my_movies.js for Lab 10

const axios = require('axios');
let cache = require('./cache.js');

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

async function getMovies(request,response,next)
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
}

module.exports = getMovies;
