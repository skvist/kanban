var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

/*

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose, {port: 3010});
 */
var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;
var should = chai.should();

before(function (done) {
    mongoose.connect('mongodb://localhost:3010/testuser', function() {
        /* Drop the DB */
        mongoose.connection.db.dropDatabase( () => {
            console.log("DB Dropped");
            done();
        });
    });
});