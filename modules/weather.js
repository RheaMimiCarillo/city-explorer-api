// lab 10
'use strict';

let cache = require('./cache.js');
const axios = require('axios');


async function getWeather(latitude, longitude)
{
  let key = 'weather-' + latitude + longitude;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5&units=I`;

  console.log('weatherbit URL: ', url);


  // check timestamp in cache to see if it's old and needs to be updated
  // if the difference between the time now and the time in the timestamp is `less` than 50000 milliseconds
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000))
  {
    // if the cache is up-to-date enough log 'Cache hit'
    console.log('Cache hit');
  }
  else
  {
    // if the cache is too old and needs to be updated, lob 'Cache miss'
    console.log('Cache miss');

    // make a new cache object with the key `'weather-' + latitude + longitude;`
    cache[key] = {};

    // add a `timestamp` property inside the cache[key] object with the current Date.now()
    cache[key].timestamp = Date.now();

    // get weatherbit data using axios
    // call `parseWeather` to get an array of `Weather` objects
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }
  //console.log('cache[key].data: ', cache[key].data);
  // return the weather-lat-lon.data: [weatherSummaries] from the cache
  return cache[key].data;
}

// make an array of `Weather objects` in `weatherSummaries` object
function parseWeather(weatherData)
{
  try
  {
    const weatherSummaries = weatherData.data.map(day =>
    {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  }
  catch (e)
  {
    // return rejected Promise with the Error object
    return Promise.reject(e);
  }
}

class Weather
{
  constructor(day)
  {
    // a blurb about this day's forecast
    this.forecast = day.weather.description;
    // the date and time of the forecast
    this.time = day.datetime;
  }
}

/*
// get the date, 5 days from today
// can use JavaScript Temporal, instead of this contrived method
const getDate = daysFromToday =>
{
  // got help here https://stackoverflow.com/a/20329800
  let currentDate = new Date();

  let futureDate = new Date(currentDate.getTime() + (daysFromToday * 24 * 60 * 60 * 1000));

  let day = futureDate.getDate();
  // two digit month help: https://stackoverflow.com/a/50769505
  let month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
  let year = futureDate.getFullYear();


  // got help changing date to two decimals: https://bobbyhadz.com/blog/javascript-change-getdate-to-2-digits#:~:text=To%20change%20the%20getDate(),the%20start%20of%20the%20string.
  day = day <= 9 ? '0' + day : day;


  console.log('year, month, day: ', `${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
};
*/

module.exports = getWeather;
