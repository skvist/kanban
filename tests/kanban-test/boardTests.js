var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var chai = require('chai');
var chaiHttp = require('chai-http');
var jwt = require('jsonwebtoken');


var expect = chai.expect;
var should = chai.should();

//var request = require('request');
var app = require('../../services/kanban/src/app');
var Board = require('../../services/kanban/src/models/board');
var Item = require('../../services/kanban/src/models/item');


var config = require('../../services/kanban/src/config');
var token;
var testBoardId;

chai.use(chaiHttp);

after(function (done) {
    function clearDB() {
        var promises = [
            Board.remove().exec(),
            Item.remove().exec(),
        ];

        Promise.all(promises)
            .then(function () {
                console.log("DB cleaned");
                done();
            });
    }

    if (mongoose.connection.readyState === 0 && config.database.search('testkanban') > -1) {
        mongoose.connect(config.database, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else if (config.database.search('testkanban') > -1) {
        return clearDB();
    }
});

describe('Kanban Board routes/mongo tests', function () {
    before(function() {
        const payload = {
            username: 'doe',
            admin: false
        };

        token = jwt.sign(payload, config.jwtsecret, {
            expiresIn: 60*60*24
        });
        console.log(token);
    });


    it('should create the example board and items', (function(done) {
        chai.request(app)
            .get('/api/example')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body['success'].should.be.eql(true);
                // expect(res.body).to.equal('Users Service API');
                done();
            });
    }));

    it('should try to get all boards without token (NoTokenProvided)', (function(done) {
        chai.request(app)
            .get(`/api/board/all`)
            .end(function(err, res) {
                res.should.have.status(403);
                res.body.success.should.be.eql(false);
                res.body.title.should.be.eql('NoTokenProvided');
                expect(res).to.be.json;
                done();
            });
    }));

    it('should get All Boards (1)', (function(done) {
        chai.request(app)
            .get(`/api/board/all?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body[0].title.should.be.eql('Ramverk2 Projekt');
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(1);
                testBoardId = res.body[0]._id;
                done();
            });
    }));

    it('should get one board by ID', (function(done) {
        chai.request(app)
            .get(`/api/board/show/${testBoardId}?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('Ramverk2 Projekt');
                expect(res).to.be.json;
                done();
            });
    }));

    it('should create a new board and return success (BoardCreated)', (function(done) {
        chai.request(app)
            .post(`/api/board/create/?token=${token}`)
            .send({
                title: 'TestBoard',
                description: 'Test Desc',
                owner: 'doe',
                users: ['doe'],
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('BoardCreated');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should update testboard and return success (BoardUpdated)', (function(done) {
        chai.request(app)
            .post(`/api/board/update/${testBoardId}?token=${token}`)
            .send({
                title: 'TestBoard New Title',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('BoardUpdated');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));
    it('should get all boards related to user doe', (function(done) {
        chai.request(app)
            .get(`/api/board/user?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
                expect(res).to.be.json;
                done();
            });
    }));

});
