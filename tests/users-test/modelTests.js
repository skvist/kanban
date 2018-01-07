var expect = require('chai').expect;

var User = require('../../services/users/src/models/user');

describe('User Model', function() {
    it('should be invalid if username is empty', function(done) {
        var user = new User();

        user.validate((err) => {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        var user = new User();

        user.validate((err) => {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});
