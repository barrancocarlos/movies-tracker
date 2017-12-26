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



// Db connect =================
require('./config/database');

// passport for configuration =================
require('./config/passport')(passport);

// configuration =================

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride('_method')); // put and delete
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); // template engine
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(session({
  secret: 'ilovenodejs',
  resave: true,
  saveUninitialized: true,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes =========================

require('./routes/movies-api')(app);
require('./routes/genres-api')(app);
require('./routes/users-api')(app, passport);
require('./routes/pages')(app, passport); // pass configured passport

// Port ======================================================================
var port = "3000";
app.listen(port);
console.log("Magic happens at " + port);
