"use strict";

module.exports = function(server) {
    const io = require('socket.io')(server);

    let userLists = {};

    io.on('connection', function (socket) {
        console.log("User connected");

        socket.on('room', (msg) => {
            console.log(msg);
            console.log("Join room: ", msg.board);
            socket.join(msg.board);

            userLists[msg.board] = userLists[msg.board] || [];
            const inRoom = userLists[msg.board].indexOf(msg.username);

            if (inRoom === -1) {
                userLists[msg.board].push(msg.username);
            }

            io.to(msg.board).emit('room', userLists[msg.board]);
        });

        socket.on('leaveroom', (msg) => {
            console.log("Leave room");
            var index = userLists[msg.board].indexOf(msg.username);

            userLists[msg.board].splice(index, 1);

            io.to(msg.board).emit('room', userLists[msg.board]);
        });

        socket.on('updated', (msg) => {
            console.log("Send update command", msg.board);
            socket.join(msg.board);
            io.sockets.in(msg.board).emit('updateitems', msg.username);
        });

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });
};
