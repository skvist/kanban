#!/usr/bin/nodejs

var express = require('express');
var cors = require('cors');

var app = express();

app.set('port', process.env.port || process.env.DBWEBB_PORT_3 || 3003);

var server = app.listen(app.get('port'), function() {
    console.log('Realtime server listening on port ' + server.address().port);
});

app.use(cors());

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get('/', function (req, res) {
    res.send('Realtime server');
});


require('./app')(server);
