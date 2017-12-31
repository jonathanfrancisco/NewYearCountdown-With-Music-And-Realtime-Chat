
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



let people = {};


io.on('connection', (socket)=> {

    // JOINING THE AWESOME CHAT
    socket.on('join', (name) => {
        console.log(socket.id);
      io.emit('join', name);

        people[socket.id] = name;

      console.log(people);

    });
    
    // SENDING OF MESSAGE
    socket.on('chatMessage', (message) => {

       io.emit('chatMessage',`<strong>${people[socket.id]}: </strong> ${message}`); 
    
    })


    // DISCONNECTING FROM AWESOME CHAT :(
    socket.on('disconnect', (name) => {
        
        console.log(`${people[socket.id]} has disconnected.`);  
        io.emit('disconnect', people[socket.id]);
        delete people[socket.id];

    });

});




