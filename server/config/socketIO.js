var io = require('socket.io')(http);

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    console.log('new client connected');
    socket.emit('connection', null);
});

module.exports = io;