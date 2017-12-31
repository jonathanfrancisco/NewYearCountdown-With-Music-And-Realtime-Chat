
const path = require('path');

const express = require('express');
const app = express();
      app.use(express.static('public'));
      app.use(express.static(path.join(__dirname,'public')));

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
server.listen(3000);


app.get('/', (req, res)=> {
    res.render('index');
});

let usersConnected = 0;

io.on('connection', (socket)=> {
    
    console.log('a user has connected');

    usersConnected++;

    console.log('There are '+usersConnected+' users');

    socket.on('chatMessage', (message) => {
       io.emit('chatMessage',message); 
    })

    socket.on('disconnect', () => {
        console.log('a user diconnected');
        usersConnected--;
        console.log('There are '+usersConnected+' users');
    })

});
