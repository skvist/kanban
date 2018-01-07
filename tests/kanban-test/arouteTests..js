var chai = require('chai');
var chaiHttp = require('chai-http');
var jwt = require('jsonwebtoken');
var config = require('../../services/kanban/src/config');

var expect = chai.expect;
var should = chai.should();

//var request = require('request');
var app = require('../../services/kanban/src/app');
var token;

chai.use(chaiHttp);

describe('Kanban open routes', function () {
    before(function(done) {
        const payload = {
            username: 'doe',
            admin: false
        };

        token = jwt.sign(payload, config.jwtsecret, {
            expiresIn: 60*60*24
        });
        console.log(token);
        done();
    });

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

    it('/api/item should have status 200', (function(done) {
        chai.request(app)
            .get(`/api/item?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    }));
    it('/api/board should have status 200', (function(done) {
        chai.request(app)
            .get(`/api/board?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    }));
});
