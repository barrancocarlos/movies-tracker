// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');
var User = require('../models/users');

//get all movies
exports.getMovies = function (req, res) {
var movies = Movie.find().sort("-createdAt").exec(function(err, data) {
     if(err) {
         return next(err);
     }
     Genre.populate(data, {path: "genre"}, function(err, data) {
     console.log(data);
     res.render('latest-movies', { movie : data, user : req.user, helpers:{
        if_eq:function(a, b, opts) {
          if (a == b) {
              return opts.fn(this);
          } else {
              return opts.inverse(this);
          }
      }}});
    });
 });
};
