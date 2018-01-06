const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const Board = require('./models/board');
const Item = require('./models/item');

var router = express.Router();

mongoose.connect(config.database, {useMongoClient: true });
mongoose.Promise = global.Promise;

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
