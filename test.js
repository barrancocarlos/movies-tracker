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
  it('Getet all movies on /api', function(done) {
    chai.request(config.host + ':' + config.port)
      .get('/api/movies')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  //get by id
  it('Get single movie', function() {
    chai.request(config.host + ':' + config.port)
      .get('/api/movies/5a455a8dc3b83e0260528700')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).be.a('object');
        done();
      });
  });
  // create new
  it('Create new movie', function(done) {
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
  //delete
    it('Delete movie', function() {
      chai.request(config.host + ':' + config.port)
        .del('/api/5a429285a9de8719805962c2')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });


}); //end api endpoints
