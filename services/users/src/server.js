#!/usr/bin/nodejs

var app = require('./app');

app.set('port', process.env.DBWEBB_PORT || process.env.DBWEBB_PORT || 3001);

var server = app.listen(app.get('port'), function() {
    console.log('User server listening on port ' + server.address().port);
});
