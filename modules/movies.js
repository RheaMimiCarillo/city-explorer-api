// copy of my_movies.js for Lab 10

const axios = require('axios');
let cache = require('./cache.js');

async function getMovies(cityName)
{
  //console.log('in movies.js');
  //console.log('city from /movies request: ', cityName);
  //console.log('movies cache key: ', key);
  // make a `url` to use to make a GET request


  let key = 'movie-' + cityName;

  let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}&adult=false`;

  console.log('movieUrl: ', url);

  // movies cache expires every year
  let timeToCache = 1000 * 60 * 24 * 365;

  // console.log('timeToCache: ', timeToCache);
  // console.log('Date.now(): ', Date.now());

  // check timestamp in cache to see if it's old and needs to be updated
  // if the difference between the time now and the time in the timestamp is `less` than a year in milliseconds
  if (cache[key] && (Date.now() - cache[key].timestamp < timeToCache))
  {
    // if the cache is up-to-date enough log 'Cache hit'
    console.log('Cache hit for Movies');
  }
  else
  {
    console.log('Cache miss for Movies');

    cache[key] = {};

    cache[key].timestamp = Date.now();

    cache[key].data = await axios.get(url)
      .then(response => parseMovies(response.data.results));

  }
  // console.log(`${cache[key]}.data: `, cache[key].data);

  return cache[key].data;
}

let parseMovies = movieData =>
{
  try
  {
    const moviesArray = movieData.map(movie =>
    {
      return new Movies(movie);
    });
    return Promise.resolve(moviesArray);
  }
  catch (e)
  {
    // return rejected Promise with the Error object
    return Promise.reject(e);
  }
};

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

module.exports = getMovies;
