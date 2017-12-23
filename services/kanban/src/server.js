#!/usr/bin/nodejs

var app = require('./app');

app.set('port', process.env.port || process.env.DBWEBB_PORT_2 || 3002);

var server = app.listen(app.get('port'), function() {
    console.log('Kanban server listening on port ' + server.address().port);
});
