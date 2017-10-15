let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        from: 'jose@gmail.com',
        text: 'sending an email',
        createdAt: new Date().getTime()
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});