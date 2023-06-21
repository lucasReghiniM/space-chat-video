const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let rooms = {};
let userNames = {};
let users = {};

io.on('connection', socket => {
  let currentRoom = null;

  socket.on('join', ({ roomId, name }) => {
    if (rooms[roomId] && rooms[roomId].length >= 2) {
      socket.emit('roomFull');
      return;
    }

    currentRoom = roomId;
    socket.join(roomId);
    userNames[socket.id] = name;

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    if (!users[roomId]) {
      users[roomId] = []; 
    }

    users[roomId].push(socket.id);

    const usersInThisRoom = users[roomId]
      .filter(userId => userId !== socket.id)
      .map(userId => userNames[userId]);

    socket.emit('allUsers', usersInThisRoom);
    socket.to(roomId).emit('userJoined', { name });

  });

  socket.on('message', ({ roomId, message }) => {
    if (rooms[roomId]) {
      const name = userNames[socket.id];
      const messageObj = { text: message, user: name };
      rooms[roomId].push(messageObj);
      io.to(roomId).emit('message', messageObj);
    }
  });

  socket.on('videoSignal', ({ roomId, signal }) => {
    // Relay the video signal to all other users in the room except the sender
    socket.to(roomId).emit('userJoined', { signal, callerID: socket.id });
  });
  
  socket.on('returningSignal', ({ roomId, signal, callerID }) => {
    // Send the returning signal to the specified callerID in the specified room
    socket.to(roomId).to(callerID).emit('receivingReturnedSignal', { signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    if (currentRoom && io.sockets.adapter.rooms[currentRoom] && io.sockets.adapter.rooms[currentRoom].length === 0) {
      delete rooms[currentRoom];
    }
    delete userNames[socket.id];
  });
});

server.listen(8000, () => console.log('Server is running on port 8000'));
