var express  = require('express');
var app      = express();

module.exports = function(app, passport) {
// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
// show the signup form
app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
});
app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', { message: req.flash('loginMessage') });
});
};
