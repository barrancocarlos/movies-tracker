var express  = require('express');
var app      = express();
var exphbs  = require('express-handlebars');

// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');

//api function export
module.exports = function(app) {

//home Page
app.get('/', function(req, res) {
     res.render('index');
 });

 //categories Page
 app.get('/categories', function(req, res) {
      res.render('categories');
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

//comedy movies
app.get('/comedy', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('comedy', { movie : data, helpers:{
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

//comedy movies
app.get('/comedy', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('comedy', { movie : data, helpers:{
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

//sci-fi movies
app.get('/sci-fi', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('sci-fi', { movie : data, helpers:{
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

//crime movies
app.get('/crime', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('crime', { movie : data, helpers:{
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

//drama movies
app.get('/drama', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('drama', { movie : data, helpers:{
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

//thriller movies
app.get('/thriller', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('thriller', { movie : data, helpers:{
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

//high priority
app.get('/priority', function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('priority', { movie : data, helpers:{
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



 // Latest movies
app.get('/latest', function(req, res, next) {
  var movies = Movie.find().sort("-createdAt").exec(function(err, data) {
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
