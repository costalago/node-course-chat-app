const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let {generateMessage, generateLocationMessage} = require('./utils/message');
let {isRealString} = require('./utils/validation');
let {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// console.log(__dirname + './../public');
// console.log(publicPath);


let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let users = new Users();


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new User connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!')
        }

        socket.join(params.room);
        // socket.leave('Principal');

        users.remove(socket.id);
        users.add(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} logged`));

    });

    socket.on('createMessage', (message, callback) => {
        let user = users.get(socket.id);

        if (user && isRealString(message.text)) {
            io.emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {

        let user = users.get(socket.id);

        if (user) {
            io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected to server');

        let user = users.remove(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });

});


server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});