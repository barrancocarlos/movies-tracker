// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var session = require('express-session');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var exphbs = require('express-handlebars'); //handlebars
var passport = require('passport'); //authentication
var flash = require('connect-flash'); //flash messages
var favicon = require('serve-favicon'); // favicon
var path = require('path'); //path
var config = require('./config/config'); //env variables



// Db connect =================
require('./config/database');

// passport for configuration =================
require('./config/passport')(passport);

// configuration =================

// log every request to the console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
// parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
// parse application/vnd.api+json as json
app.use(methodOverride('_method')); // put and delete
// define template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// static files
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(session({
  secret: 'ilovenodejs', // session secret
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// favicon
app.use(favicon(path.join(__dirname,'public','images','favicon.png')));



// routes =========================

require('./routes/movies-api')(app);
require('./routes/genres-api')(app);
require('./routes/users-api')(app, passport);
require('./routes/pages')(app, passport); // pass configured passport

// Error Handling ======================================================================

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('404: Page not found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500: Internal Server Error');
});


// Port ======================================================================
app.listen(config.port);
console.log("Running at " + config.port);
console.log(process.env.NODE_ENV);
