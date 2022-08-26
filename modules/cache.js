// lab 10

'use strict';


// only exporting one object, so make this object have separate entries for weather and movies

// maybe use .find() to find the object that has the weatherDate and movieDate object and seeing
/*
  {
    'weather-' + latitude + longitude(key): {
      timestamp: 1234901283094,
      data: [
        <weather-data form axios>
      ]
    },
  }

*/


module.exports = {
  /* what it might look like
  {
    <key 'weather-' + latitude + longitude>: {
      timestamp: 1234901283094,
      data: [
        <weather-data from weatherbit>
      ]
    },
  }

*/
};
