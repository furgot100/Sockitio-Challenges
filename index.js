const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user left')
    })

    

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        socket.username = data.username
    })

    //handle the new message event
    socket.on('new_message', data => {
        // console.log("new message")
        io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', {username: socket.username})
    })
});

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}/`);
});