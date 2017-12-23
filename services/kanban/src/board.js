const express = require('express');
//const jwtVerify = require('express-jwt-verify');
const mongoose = require('mongoose');
const config = require('./config');
const Board = require('./models/board');

var ObjectId = mongoose.Schema.ObjectId;
var router = express.Router();

mongoose.connect(config.database, {useMongoClient: true });
mongoose.Promise = global.Promise;
//User.schema.plugin(uniqueValidator);



/* GET Kanban Board listing. */
router.get('/', function(req, res) {
    res.send('Placeholder for Kanban Board endpoint');
});

/* GET all Kanban boards*/
router.get('/all', async (req, res) => {
    const showBoards = await Board.find({});

    res.json(showBoards);
});

/* GET one Kanban Board. */
router.get('/show/board/:id', async (req, res) => {
    let id = req.params.id;

    const showBoard = await Board.findById(id, function (err, document) {
        if (err) { console.log(err); }
        //console.log(document);
        return document;
    });

    res.json(showBoard);
});


/* POST Insert a new Board into db . */
router.post('/create/board/', async (req, res, next) => {
    const body = req.body;

    const newBoard = new Board( {
        title: body.title,
        description: body.description,
        owner: body.owner,
    });

    newBoard.save(function(err) {
        if (err) {
            console.log(err.message);
            res.json({ success: false, title: err.name, message: err.message });
        } else {
            console.log(`Board ${body.title} created`);
            res.json({
                success: true,
                title: "BoardCreated",
                message: `Board ${body.title} created.`
            });
        }
    });

    //console.log(newItem);
});


/* POST Update Board . */
router.post('/update/:id', async (req, res) => {
    const board = req.body;
    const boardId = req.params.id;

    Board.findByIdAndUpdate(boardId, board, {new: true }, (err, document) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, title: err.name, message: err.message });
        } else if (!document) {
            return res.json({
                success: false,
                title: "BoardDoesNotExist",
                message: `The Board with id ${boardId} i does not exist.`
            });
        } else {
            console.log(`Board ${document.title} updated`);
            return res.json({
                success: true,
                title: "BoardUpdated",
                message: `Board ${document.title} updated.`
            });
        }
    });
});
/* DELETE Insert an board from db . */
router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;

    console.log(id);
    Board.findByIdAndRemove(id, (err, document) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, title: err.name, message: err.message });
        } else if (!document) {
            return res.json({
                success: false,
                title: "BoardDoesNotExist",
                message: `The Board with id ${id} does not exist.`
            });
        } else {
            return res.json({
                success: true,
                title: "BoardDeleted",
                message: `Board ${document.title} deleted.`
            });
        }
    });
});

module.exports = router;
