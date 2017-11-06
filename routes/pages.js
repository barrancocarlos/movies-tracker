var express  = require('express');
var app      = express();
var exphbs  = require('express-handlebars');

// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');

//api function export
module.exports = function(app) {

//Home Page
app.get('/', function(req, res) {
     res.render('index');
 });

//horror movies
app.get('/horror', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('horror', { movie : data, helpers:{
          if_eq:function(a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        }}});
      });
   });
});



//res.render('edit', { movie:data, listofgenre:datagenre, helpers:{test:"Hello"}});
  // helpers:{if_eq:
  //   function(a, b, block) {
  //     return a == b ? block(this):block.inverse(this);
  //   }

 // Latest movies
app.get('/latest', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('latest-movies', { movie : data});
      });
   });
});

//Add movie
app.get('/add', function(req, res) {
  var genres = Genre.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
        console.log(data);
        res.render('add-movie', { genre : data});
   });
 });

 //Edit movie
 app.get('/:id', function(req, res, next) {
   var movies = Movie.findById(req.params.id, function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, { path: "genre" },function(err, data) {
        console.log(data);
       });
       var genres = Genre.find().exec(function(err, datagenre) {
           if(err) {
               return next(err);
           }
           console.log(datagenre);

           res.render('edit', { movie:data, listofgenre:datagenre, helpers:{
             if_eq:function(a, b, opts) {
               if (a == b) {
                   return opts.fn(this);
               } else {
                   return opts.inverse(this);
               }
           }}});
       });
    });
 });

};//end function
