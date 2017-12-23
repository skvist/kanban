const express = require('express');
const jwtVerify = require('express-jwt-verify');
const mongoose = require('mongoose');
const config = require('./config');
const Board = require('./models/board');
const Item = require('./models/item');
const checkAccess = require('./middleware/checkaccess');

/* const mongo = require('mongodb');
    const ObjectId = mongo.ObjectID;
    const MongoClient = require('mongodb').MongoClient; */

//uniqueValidator = require('mongoose-unique-validator');

var ObjectId = mongoose.Schema.ObjectId;
var router = express.Router();

router.use(jwtVerify(config.jwtsecret));

mongoose.connect(config.database, {useMongoClient: true });
mongoose.Promise = global.Promise;
//User.schema.plugin(uniqueValidator);

/* GET Kanban Item listing. */
router.get('/', (req, res) => {
    res.send('Placeholder for Kanban Item endpoint');
});

/* GET all Items */
router.get('/all', async (req, res) => {
    const showItems = await Item.find({});

    res.json(showItems);
});

/* GET Show one item */
router.get('/show/:id', checkAccess(), async (req, res) => {
    let id = req.params.id;

    console.log(id);
    const showItem = await Item.findById(id, (err, document) => {
        if (err) {
            console.log(err);
            res.json({ success: false, title: err.name, message: err.message });
        }
        //console.log(document);
        return document;
    });

    res.json(showItem);
});

/* POST Insert Item into db . */

router.post('/create/:boardid/:type/', async (req, res, next) => {
    const item = req.body;
    const boardId = req.params.boardid;
    //const itemId = req.params.itemid;
    const type = req.params.type;

    console.log(type);

    const typeExists = ["backlog", "inprogress", "test", "done"].indexOf(type);

    if (typeExists < 0) {
        return res.json({
            success: false,
            title: "WrongType",
            message: `The type ${type} is not allowed.`
        });
    }

    const findBoard = await Board.findById(boardId, (err, document) => {
        if (err) {
            console.log(err);
            res.json({ success: false, title: err.name, message: err.message });
        }
        return document;
    });

    if (!findBoard) {
        return res.json({
            success: false,
            title: "BoardDoesNotExist",
            message: `The board with id ${type} i does not exist.`
        });
    }

    console.log(boardId);

    const newItem = new Item( {
        title: item.title,
        description: item.description,
        type,
        duedate: item.duedate,
        position: item.position,
        createdby: item.createdby,
        assigned: item.assigned,
        board: findBoard._id
    });

    newItem.save((err) => {
        if (err) {
            console.log(err.message);
            res.json({ success: false, title: err.name, message: err.message });
        } else {
            console.log(`Item ${item.title} created`);
            res.json({
                success: true,
                title: "ItemCreated",
                message: `Item ${item.title} created.`
            });
        }
    });

    //console.log(newItem);
});


/* POST Update item . */
router.post('/update/:id', async (req, res) => {
    const item = req.body;
    const itemId = req.params.id;

    Item.findByIdAndUpdate(itemId, item, {new: true }, (err, document) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, title: err.name, message: err.message });
        } else if (!document) {
            return res.json({
                success: false,
                title: "ItemDoesNotExist",
                message: `The Item with id ${itemId} i does not exist.`
            });
        } else {
            console.log(`Item ${document.title} updated`);
            return res.json({
                success: true,
                title: "ItemUpdated",
                message: `Item ${document.title} updated.`
            });
        }
    });
});

/* DELETE Insert an item from db . */
router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;

    console.log(id);
    Item.findByIdAndRemove(id, (err, document) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, title: err.name, message: err.message });
        } else if (!document) {
            return res.json({
                success: false,
                title: "ItemDoesNotExist",
                message: `The Item with id ${id} does not exist.`
            });
        } else {
            return res.json({
                success: true,
                title: "ItemDeleted",
                message: `Item ${document.title} deleted.`
            });
        }
    });
});


module.exports = router;
