var mongoose = require('mongoose');

//avoid mongoose library warning
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movies');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("Movies db is connected");
});
