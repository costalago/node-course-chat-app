const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + './../public');
// console.log(publicPath);


let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new User connected');


    // socket.emit('newMessage', {
    //     from: 'pepe',
    //     text: 'sending an message',
    //     createdAt: new Date().getTime()
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user logged'));

    socket.on('createMessage', (message, callback) => {
        console.log('User has created an message', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');

        // to send to the other users
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected to server');
    });
});




server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});