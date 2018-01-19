var express = require('express');
var app = express();
var config = require('./config/config');

// import model
var Movie = require('./models/movies');
var Genre = require('./models/genres');
var User = require('./models/users');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);

// rest api test
describe('/api endpoits', function() {
  //get all
  it('should get all movies on /api', function(done) {
    chai.request(config.host + ':' + config.port)
      .get('/api/movies')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  //get by id
  it('/Get/:id movie', function() {
    chai.request(config.host + ':' + config.port)
      .get('/api/movies/5a455a8dc3b83e0260528700')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  // create new
  it('create new movie on /api', function(done) {
    var movie = {
      title: "Test",
      genre: "Horror",
      year: "1999",
      priority: "High",
      photo: "Hello",
      author:"5a429285a9de8719805962c2"
    };
    chai.request(config.host + ':' + config.port)
      .post('/api/movies')
      .send(movie)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });


}); //end api endpoints
