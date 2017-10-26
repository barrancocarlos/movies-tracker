var express  = require('express');
var app      = express();
var path = require('path');
var multer  = require('multer');
// file upload destination folder
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // file upload extension
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
// file upload variable
var upload = multer({
  storage: storage
});



// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');

//api function export
module.exports = function(app) {

//get all movies
app.get('/api/movies', function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.json(data);
       });
    });
});

//get single movie
    app.get('/api/movies/:id', function(req, res, next) {
       var movies = Movie.findById(req.params.id, function(err, data) {
            if(err) {
                return next(err);
            }
            console.log(data);
            res.json(data);
        });
    });

//post new movie
    app.post('/api/movies', upload.single('photo'), function(req, res, next) {
        var movie = new Movie({
           title: req.body.title,
           year: req.body.year,
           genre: req.body.genre,
           priority: req.body.priority,
           photo: req.file.filename,
        });
        movie.save(function(err, data) {
            if(err) {
                return next(err);
            }
            res.redirect('/latest');

         });

    });


//Delete movie
    app.delete('/api/movies/:id', function(req, res) {
       Movie.findByIdAndRemove(req.params.id, function(err, data) {
            res.redirect('/latest');
       });
    });

//Update movie
    app.put('/api/movies/:id', function(req, res, next) {
        console.log("edit id");
        Movie.findById(req.params.id, function(err, data) {
            data.title = req.body.title;
            data.year = req.body.year;
            data.genre = req.body.genre;
            data.priority = req.body.priority;
            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                  res.redirect('/latest');
            });
        });
    });
};
