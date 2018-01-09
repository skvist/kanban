var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var chai = require('chai');
var chaiHttp = require('chai-http');
var jwt = require('jsonwebtoken');


var expect = chai.expect;
var should = chai.should();

var app = require('../../services/kanban/src/app');
var Board = require('../../services/kanban/src/models/board');
var Item = require('../../services/kanban/src/models/item');


var config = require('../../services/kanban/src/config');
var token;
var testBoardId;
var testItemId;

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

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.database, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});

describe('Kanban Item routes/mongo tests', function () {
    before(function(done) {
        const payload = {
            username: 'doe',
            admin: false
        };

        token = jwt.sign(payload, config.jwtsecret, {
            expiresIn: 60*60*24
        });
        console.log(token);

        /*  chai.request(app)
            .get('/api/example')
            .end(function(err, res) {
                res.should.have.status(200);
            });
        */
        chai.request(app)
            .get(`/api/board/all?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                testBoardId = res.body[0]._id;
            });
        done();
    });

    it('should try to get all boards without token (NoTokenProvided)', (function(done) {
        chai.request(app)
            .get(`/api/item/all`)
            .end(function(err, res) {
                res.should.have.status(403);
                res.body.success.should.be.eql(false);
                res.body.title.should.be.eql('NoTokenProvided');
                expect(res).to.be.json;
                done();
            });
    }));

    it('should get All Items (4)', (function(done) {
        chai.request(app)
            .get(`/api/item/all?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(4);
                res.body[0].createdby.should.be.eql('doe');
                testItemId =  res.body[0]._id;
                done();
            });
    }));

    it('should get one Item by ID', (function(done) {
        chai.request(app)
            .get(`/api/item/show/${testItemId}?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('Lämna in ramverk2-projektet');
                expect(res).to.be.json;
                done();
            });
    }));

    it('should fail to get item by ID (ItemDoesNotExist)', (function(done) {
        chai.request(app)
            .get(`/api/item/show/5a4f78f1399e250059d1bcf8?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('ItemDoesNotExist');
                res.body.success.should.be.eql(false);
                expect(res).to.be.json;
                done();
            });
    }));
    it('should fail to get item by ID (CastError)', (function(done) {
        chai.request(app)
            .get(`/api/item/show/aaa?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('CastError');
                res.body.success.should.be.eql(false);
                expect(res).to.be.json;
                done();
            });
    }));


    it('should create a new Item and return ItemCreated', (function(done) {
        chai.request(app)
            .post(`/api/item/create/${testBoardId}?token=${token}`)
            .send({
                title: 'NewTestItem',
                description: 'New test desc',
                createdby: 'doe',
                type: "backlog",
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('ItemCreated');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should try to create a new Item and return WrongType', (function(done) {
        chai.request(app)
            .post(`/api/item/create/${testBoardId}?token=${token}`)
            .send({
                title: 'NewTestItem',
                description: 'New test desc',
                createdby: 'doe',
                type: "wrongtype",
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('WrongType');
                res.body.success.should.be.eql(false);
                expect(res).to.be.json;
                done();
            });
    }));


    it('should update test Item and return success (ItemUpdated)', (function(done) {
        chai.request(app)
            .post(`/api/item/update/${testItemId}?token=${token}`)
            .send({
                title: 'TestItem New Title',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('ItemUpdated');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should TRY to update test Item and fail (WrongType)', (function(done) {
        chai.request(app)
            .post(`/api/item/update/${testItemId}?token=${token}`)
            .send({
                type: 'wrongtype',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('WrongType');
                res.body.success.should.be.eql(false);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should get all items related to test board', (function(done) {
        chai.request(app)
            .get(`/api/item/board/${testBoardId}?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(5);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should delete test Item and return success (ItemDeleted)', (function(done) {
        chai.request(app)
            .delete(`/api/item/delete/${testItemId}?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('ItemDeleted');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));

    it('should delete board by ID (BoardDeleted)', (function(done) {
        chai.request(app)
            .delete(`/api/board/delete/${testBoardId}?token=${token}`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.title.should.be.eql('BoardDeleted');
                res.body.success.should.be.eql(true);
                expect(res).to.be.json;
                done();
            });
    }));
});
