const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//added to start socket.io
const { Server } = require("socket.io");
const io = new Server(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});
// File directory
app.get('/', (req, res) => {
    res.sendFile(__dirname, 'public');
});

// Chatroom
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('joining msg', () => {
      io.emit('chat message', `User joined`)
    });
   
   
   
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
})
