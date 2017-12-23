var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Log the request
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(cors());

const kanban = require('./kanban');
const item = require('./item');
const board = require('./board');


app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/', function(req, res) {
    res.send("Kanban Service API");
});

app.use('/api', kanban);
app.use('/api/item', item);
app.use('/api/board', board);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
});

/// error handlers

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
