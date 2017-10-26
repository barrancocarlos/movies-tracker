var express  = require('express');
var app      = express();

// import model
var Genre = require('../models/genres');

//api function export
module.exports = function(app) {

//get all genres
app.get('/api/genres', function(req, res, next) {
   var genres = Genre.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
         console.log(data);
         res.json(data);
    });
});

//get single genre
    app.get('/api/genres:id', function(req, res, next) {
       var genres = Genre.findById(req.params.id, function(err, data) {
            if(err) {
                return next(err);
            }
            console.log(data);
            res.json(data);
        });
    });

//post new genre
    app.post('/api/genres', function(req, res, next) {
        var genre = new Genre({
           name: req.body.name,
        });
        genre.save(function(err, data) {
            if(err) {
                return next(err);
            }
            res.redirect('/latest');

         });

    });


//Delete genre
    app.delete('/api/genres:id', function(req, res) {
       Genre.findByIdAndRemove(req.params.id, function(err, data) {
            res.json(data);
        });

    });

//Update genre
    app.put('/api/genres:id', function(req, res, next) {
        console.log("edit id");
        Genre.findById(req.params.id, function(err, data) {
            data.name = req.body.name;
            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                res.json(data);
            });
        });
    });
};
