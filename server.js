
// we need use strict in the backend
'use strict';

console.log('poopoo');

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


  LISTEN:
  - an express method:
    - takes in a port value and callback function
    - call on our instance of express (app, in this case)
    app.listen(PORT, ()  => console.log(`listening on port ${PORT}`));
    -listening for 'hits' on its 'routes'
*/

const express = require('express');

require('dotenv').config();

const app = express();

// bring in json data and require it

// try the port in the env, but try 3002 if it doesn't
// if the server is working on 3002, then I know something is wrong in the .env file or how I'm importing the values
const PORT = process.env.PORT || 3002;

// the '/' means to start at the end of our 'base url'
app.get('/', (request, response) => {
  response.send('Hello from our server!');
});

app.get('/sayHello', (request,response) =>
{
  // the console shows the
  console.log(request.query.name);
  // get name from request query key/value pair
  let name = request.query.name;

  let lastName = request.query.lastName;

  let fullName = name + '' + lastName;

  // let human = new Person();
  // console.log(fullName);
  // response.send('Hello');
});

// catch all "star" route
// the star is a wildcard that 'catches all' other routes
app.get('*', (request, response) => {
  response.send('You\'re fired, Mr. Squidward.');
});

app.listen(PORT, ()  => console.log(`listening on port ${PORT}`));


// CLASSES

// making Pet objects from user input
class Person {
  constructor(personObj){
    this.name = person.name;
    this.lastName = person.lastName;

  }

}
