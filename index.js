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

    console.log("New user connected")

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        socket.username = data.username
    })
});

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}/`);
});