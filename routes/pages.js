var express  = require('express');
var app      = express();
var exphbs  = require('express-handlebars');

// import model
var Movie = require('../models/movies');
var Genre = require('../models/genres');
var User = require('../models/users');

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
app.get('/latest', isLoggedIn, function(req, res, next) {
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
});

//high priority
app.get('/priority', isLoggedIn, function(req, res, next) {
  var movies = Movie.find().exec(function(err, data) {
       if(err) {
           return next(err);
       }
       Genre.populate(data, {path: "genre"},function(err, data) {
        console.log(data);
        res.render('priority', { movie : data, user : req.user, helpers:{
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

//horror movies
app.get('/horror', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('horror', { movie : data, user : req.user, helpers:{
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
app.get('/comedy', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('comedy', { movie : data, user : req.user, helpers:{
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
app.get('/sci-fi', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('sci-fi', { movie : data, user : req.user, helpers:{
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
app.get('/crime', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('crime', { movie : data, user : req.user, helpers:{
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
app.get('/drama', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('drama', { movie : data, user : req.user, helpers:{
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
app.get('/thriller', isLoggedIn, function(req, res, next) {
   var movies = Movie.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        Genre.populate(data, {path: "genre"},function(err, data) {
         console.log(data);
         res.render('thriller', { movie : data, user : req.user, helpers:{
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


//Add movie
app.get('/add', isLoggedIn, function(req, res) {
    var genres = Genre.find().exec(function(err, data) {
         if(err) {
             return next(err);
         }
          console.log(data);
          res.render('add-movie', { genre : data, user : req.user});
     });
 });

 //Edit movie
 app.get('/:id', isLoggedIn, function(req, res, next) {
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
             res.render('edit', { movie:data, listofgenre:datagenre, user : req.user, helpers:{
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
