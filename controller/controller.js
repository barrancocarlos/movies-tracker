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
       res.render('latest-movies', { movie : data, user : req.user});
      });
   });
};

//get priority movies
exports.priority = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('priority', { movie : data, user : req.user});
      });
   });
};

//get horror movies
exports.horror = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('horror', { movie : data, user : req.user});
      });
   });
};

//get comedy movies
exports.comedy = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('comedy', { movie : data, user : req.user});
      });
   });
};

//get sci-fi movies
exports.scifi = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('sci-fi', { movie : data, user : req.user});
      });
   });
};

//get crime movies
exports.crime = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('crime', { movie : data, user : req.user});
      });
   });
};

//get drama movies
exports.drama = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('drama', { movie : data, user : req.user});
      });
   });
};

//get thriller movies
exports.thriller = function (req, res) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('thriller', { movie : data, user : req.user});
      });
   });
};

//add movies
exports.add = function (req, res) {
  var genres = Genre.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
        console.log(data);
        res.render('add-movie', { genre : data, user : req.user});
   });
};

//edit movies
exports.edit = function (req, res) {
  var movies = Movie.findById(req.params.id, function(err, data) {
       if(err) {
           return next(err);
       }
       //get genres
       Genre.populate(data, { path: "genre" },function(err, data) {
       console.log(data);
      });
      var genres = Genre.find().exec(function(err, datagenre) {
          if(err) {
              return next(err);
          }
          console.log(datagenre);
          //handlebars helper for conditional logic
          res.render('edit', { movie:data, listofgenre:datagenre, user : req.user});
      });
 });
};
