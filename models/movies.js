var mongoose = require('mongoose');

var Genre = require('./genres');

//new schema
var MovieSchema = mongoose.Schema({
    title: {type: String, required: true},
    genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
    },
    year: {type: String},
    priority: {
              type: String,
              enum: ["Low", "High"]
    },
    photo: {type: String},
    createdAt: {type: Date, default: Date.now},

});

//new model
var Movie = mongoose.model('movies', MovieSchema);

module.exports = Movie;
