const express = require('express');
const jwtVerify = require('express-jwt-verify');
const mongoose = require('mongoose');
const config = require('./config');
const Board = require('./models/board');
const Item = require('./models/item');
const checkAccess = require('./middleware/access-to-item');
const checkAccessBoard = require('./middleware/access-to-board');

/* const mongo = require('mongodb');
    const ObjectId = mongo.ObjectID;
    const MongoClient = require('mongodb').MongoClient; */

//uniqueValidator = require('mongoose-unique-validator');

// var ObjectId = mongoose.Schema.ObjectId;
var router = express.Router();

mongoose.connect(config.database, {useMongoClient: true });
mongoose.Promise = global.Promise;
//User.schema.plugin(uniqueValidator);



/* GET Kanban listing. */
router.get('/', function(req, res) {
    res.send('Placeholder for the API endpoint');
});

/* Create an example board and some items. */
router.get('/example', function(req, res) {
    const exampleboard = require('./models/exampleboard');
    const exampleitem = require('./models/exampleitems');

    //console.log(exampleboard);

    var newBoard = new Board(
        exampleboard
    );

    newBoard.save(function(err) {
        if (err) {
            console.log(err.message);
            res.json({ success: false, title: err.name, message: err.message });
        } else {
            console.log('Kanban board created');
            //res.json({ success: true, message: "Kanban board created!" });
        }
    }).then( () => {
        exampleitem.forEach(doc => {
            doc["board"] = newBoard._id;
            console.log(doc);
            var newItem = new Item(
                doc
            );

            newItem.save(function(err) {
                if (err) {
                    console.log(err.message);
                    res.json({ success: false, title: err.name, message: err.message });
                } else {
                    console.log('Items created');
                }
            });
        });
    });

    res.json({ success: true, message: "Kanban board and items created!" });
});



module.exports = router;
