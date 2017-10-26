var mongoose = require('mongoose');

//new schema
var GenreSchema = mongoose.Schema({
    name: {type: String, required: true},
});

//new model
var Genre = mongoose.model('genres', GenreSchema);


module.exports = Genre;
