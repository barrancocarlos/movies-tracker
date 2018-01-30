var express  = require('express');
var app      = express();
var exphbs  = require('express-handlebars');

// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');
var User = require('../models/users');

//import controller
var controller = require('../controller/controller');

//api function export
module.exports = function(app, passport) {

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

//home Page
app.get('/', isLoggedIn,function(req, res) {
     res.render('index');
 });


 //categories Page
  app.get('/categories', isLoggedIn, function(req, res) {
    res.render('categories', { user : req.user });
});

 // Latest movies
app.get('/latest', isLoggedIn, controller.getMovies);

//high priority
app.get('/priority', isLoggedIn, controller.priority);

//horror movies
app.get('/horror', isLoggedIn, controller.horror);

//comedy movies
app.get('/comedy', isLoggedIn, controller.comedy);

//sci-fi movies
app.get('/sci-fi', isLoggedIn, controller.scifi);

//crime movies
app.get('/crime', isLoggedIn, controller.crime);

//drama movies
app.get('/drama', isLoggedIn, controller.drama);

//thriller movies
app.get('/thriller', isLoggedIn, controller.thriller);


//Add movie
app.get('/add', isLoggedIn, controller.add);

 //Edit movie
 app.get('/:id', isLoggedIn, controller.edit);


};//end function
