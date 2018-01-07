var expect = require('chai').expect;

var Board = require('../../services/kanban/src/models/board');
var Item = require('../../services/kanban/src/models/item');


describe('Board Model', function() {
    it('should be invalid if title is empty', function(done) {
        var board = new Board();

        board.validate((err) => {
            expect(err.errors.title).to.exist;
            done();
        });
    });
    it('should be invalid if owner is empty', function(done) {
        var board = new Board();

        board.validate((err) => {
            expect(err.errors.owner).to.exist;
            done();
        });
    });
});

describe('Item Model', function() {
    it('should be invalid if title is empty', function(done) {
        var item = new Item();

        item.validate((err) => {
            expect(err.errors.title).to.exist;
            done();
        });
    });
    it('should be invalid if type is empty', function(done) {
        var item = new Item();

        item.validate((err) => {
            expect(err.errors.type).to.exist;
            done();
        });
    });
    it('should be invalid if board is empty', function(done) {
        var item = new Item();

        item.validate((err) => {
            expect(err.errors.board).to.exist;
            done();
        });
    });
});
