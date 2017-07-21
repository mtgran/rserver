const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.use(express.static(__dirname + '/public'));

// It shows in the console a message for every request
app.use((request, response, next) => {

  var now = new Date().toString();
  var logRequest = `Current time ${now}: ${request.method} ${request.url}`;
  console.log(logRequest);
  fs.appendFile('logRequestFile.txt', logRequest + '\n', (err) => {
  if (err) throw err;

  //  console.log('Unable to append to the file.');
  });

  next();
});


app.use((request, response, next ) => {

  response.render('maintenance.hbs');
  next();
});


////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.get('/', (request, response) => {
//  response.send('<h1>Hello Express</h1>');

response.render('home.hbs', {

  pageTitle: 'Routing home page'
  //,
  //currentYear: new Date().getFullYear()
});
/*
  response.send({
    nameApp: 'routing.incochain.com',
    version: {
        routing: '0.0.1',
        notes: 'developer version'
    }
  });
*/
});

////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.get('/list', (request, response) => {



});

////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.get('/getOrder', (request, response) => {



});

////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.get('/createOrder', (request, response) => {



});

////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.get('/about', (request, response) => {

  response.render('about.hbs', {
    pageTitle: 'About page'
    //,
    //currentYear: new Date().getFullYear()
  });
/*
  response.send({
    info: 'Routing Order for Supply Chain Management',
    version: {
        routing: '0.0.1',
        notes: 'developer version'
    }

  });

*/
});

////////////////////////////////////////////////////////////
// Method Bad
////////////////////////////////////////////////////////////
app.get('/bad', (request, response) => {

  response.send({
    errorMessage: 'Unable to handle this request'

  });


});


////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
app.listen(3000, () => {
  console.log('Server is up in port 3000');
});
