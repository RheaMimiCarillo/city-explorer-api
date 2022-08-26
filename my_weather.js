const axios = require('axios');


// CLASSES

// making Forecast objects from user input
class Forecast
{
  constructor(weatherObj)
  {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;

    // round temperature to nearest, whole number
    this.maxTemp = Math.round(weatherObj.high_temp);
  }
}


async function getWeather (request, response, next)
{
  try
  {
    // let param = {
    //   key: process.env.WEATHER_API_KEY,
    //   lat: request.query.lat,
    //   lon: request.query.lon
    // };
    // get latitude from search query
    let lat = request.query.lat;
    // get longitude from search query
    let lon = request.query.lon;

    // get today's date in YYYY-MM-DD format
    let currentDate = getDate(0);

    // get date 5 days from today in YYYY-MM-DD format
    let endDate = getDate(5);

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}&start_date=${currentDate}&end_date=${endDate}`;

    console.log('weatherbit url: ',url);

    // use `url` to get the weather data from the the Weather api
    let weatherResults = await axios.get(url);


    let weatherObj = weatherResults.data;

    console.log('just weatherObj raw data', weatherObj);


    // turn weatherObj into an array of 5 Forecast objects
    let forecastArray = [];
    // get only the first 5 days of the forecast
    for(let i = 0; i < 5; i++)
    {

      let dailyForecast = new Forecast(weatherObj.data[i]);
      forecastArray.push(dailyForecast);
      console.log(`forecastArray ${i} loop`, forecastArray);
    }

    console.log('forecastArray ', forecastArray);

    // send the Forecast object array back to front-end
    // in the front end, the user can set the Forecast data into state for later use
    response.send(forecastArray);
  }
  catch(error)
  {
    console.log('error message: ', error.message);
    // response.send('You want movies?');
    next(error);
  }
}


// get the date, 5 days from today
// can use JavaScript Temporal, instead of the contrived method
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


// syntax to export just a function
module.exports = getWeather;
