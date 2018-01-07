var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;
var should = chai.should();

//var request = require('request');
var app = require('../../services/kanban/src/app');

chai.use(chaiHttp);

describe('User open routes', function () {
    it('/ should have status 200', (function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    }));
    it('/api should have status 200', (function(done) {
        chai.request(app)
            .get('/api')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    }));
    it('/wrongurl should have status 200', (function(done) {
        chai.request(app)
            .get('/api')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    }));
});
