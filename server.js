

"use strict"

const express = require('express');
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const port = 3000;

let currentUsers = {}; 
let last10Messages = new MessageStorage(10);



app.use(express.static('client/build'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

function sendUsers() {
  io.sockets.emit("users", Object.keys(currentUsers))
  setTimeout(sendUsers, 500);
}

io.sockets.on('connection', (socket) => {
  sendUsers()
});

io.on('connection', (socket) => {

  socket.emit("connected");
  console.log('a user connected');

  socket.emit("messages", last10Messages.getArray());

  socket.on('disconnect', () => {
    delete currentUsers[getUserKey(socket.id)];
    
    console.log('user disconnected');
  });

  socket.on('message', function (msg) {
    let message=msg;
    let curDate=new Date();
    message['status']= curDate.toLocaleTimeString();
    last10Messages.push(message);
    socket.emit('msg',message);
    socket.broadcast.emit('msg',message);
    console.log('message: ' + JSON.stringify(message));

  });

  socket.on('login', (userName) => {

    console.log(userName);
    delete currentUsers[getUserKey(socket.id)];
    

    if (!currentUsers.hasOwnProperty(userName)) {
      socket.emit('login', {
        res: "success",
        value: userName
      });
      currentUsers[userName] = socket.id;
      console.log(`Logged ${userName}, socketId ${currentUsers[userName]}`);
    } else {

      socket.emit('login', {res:"fail", value:userName});
      console.log(`Couldnt login ${userName}, already exists`);
    }

  });

  socket.on('logout', (userName) => {
    if (currentUsers[userName] == socket.id) {
      delete currentUsers[userName];

      console.log(`${userName} disconnected`);
    }
    socket.emit('logout', 'success');
  });

});


http.listen(port, () => {
  console.log('Server is listening to 3000 port');
});

function getUserKey(socketID) {
  let key;
  let x;
  for (x in currentUsers) {
    if (currentUsers[x] === socketID) {
      key = x;
      return key;
    }
  }
  return false;
}

/**
 * Special data structure to hold messages.
 * Constanly keeps 10 last messages.
 */
function MessageStorage(size) {
  this.stack = new Array();

  this.pop = function () {
    return this.stack.shift();
  }

  this.push = function (item) {
    if (this.stack.length == size) {
      this.pop();
    }
    this.stack.push(item);
  }

  this.getArray = function () {
    return this.stack;
  }
}

/***
 * My bad 
 * well

 * Well  * u know what
 * they call me black salami
 * you know 
 * this part 
 * should be honestly created part of
 * new commit
 */