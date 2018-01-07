var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var config = require('../../services/users/src/config');

/* var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose, {port: 3010});
 */

var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;
var should = chai.should();

//var request = require('request');
var app = require('../../services/users/src/app');
var User = require('../../services/users/src/models/user');


chai.use(chaiHttp);

after(function (done) {
    function clearDB() {
        var promises = [
            User.remove().exec(),
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

describe('User routes/mongo', function () {
    it('should create the example user', (function(done) {
        chai.request(app)
            .get('/api/createuser')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body['success'].should.be.eql(true);
                // expect(res.body).to.equal('Users Service API');
                done();
            });
    }));

    it('should get All users (1 doe)', (function(done) {
        chai.request(app)
            .get('/api/all')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body[0].username.should.be.eql('doe');
                expect(res).to.be.json;
                done();
            });
    }));


    it('should get user doe', (function(done) {
        chai.request(app)
            .get('/api/show/doe')
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.email.should.be.eql('johndoe@example.com');
                done();
            });
    }));

    it('should get no user', (function(done) {
        chai.request(app)
            .get('/api/show/nouser')
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                should.equal(res.body, null);
                done();
            });
    }));

    it('should create a new user', (function(done) {
        chai.request(app)
            .post('/api/create')
            .send({
                username: 'janedoe',
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                password: 'password',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['success'].should.be.eql(true);
                res.body['title'].should.be.eql('UserCreated');
                done();
            });
    }));

    it('should fail when creating a new user', (function(done) {
        chai.request(app)
            .post('/api/create')
            .send({
                username: 'janedoe',
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                password: 'password',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['title'].should.be.eql('ValidationError');
                res.body['success'].should.be.eql(false);
                done();
            });
    }));

    it('should login', (function(done) {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'janedoe',
                password: 'password',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['title'].should.be.eql('LoginSuccessful');
                res.body['success'].should.be.eql(true);
                done();
            });
    }));
    it('should fail login with WrongPassword', (function(done) {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'janedoe',
                password: 'wrongpassword',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['title'].should.be.eql('WrongPassword');
                res.body['success'].should.be.eql(false);
                done();
            });
    }));
    it('should fail login with NoPasswordProvided', (function(done) {
        chai.request(app)
            .post('/api/login')
            .send({
                username: 'janedoe',
                password: '',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['title'].should.be.eql('NoPasswordProvided');
                res.body['success'].should.be.eql(false);
                done();
            });
    }));
    it('should fail login with NoUsernameProvided', (function(done) {
        chai.request(app)
            .post('/api/login')
            .send({
                username: '',
                password: 'test',
            })
            .end(function(err, res) {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body['title'].should.be.eql('NoUsernameProvided');
                res.body['success'].should.be.eql(false);
                done();
            });
    }));


  /*   beforeEach(function(done) {
        mockgoose.helper.reset();
        done();
    });*/

/*
    after(function (done) {
        mongoose.connect('mongodb://localhost:3010/testuser', function() {
            /* Drop the DB */
          /*  mongoose.connection.db.dropDatabase();
            console.log("DB Dropped");
            done();
        });

    }); */
});
