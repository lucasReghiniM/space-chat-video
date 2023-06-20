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

io.on('connection', socket => {
  let currentRoom = null;

  socket.on('join', ({ roomId, name }) => {
    currentRoom = roomId;
    socket.join(roomId);
    userNames[socket.id] = name;
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
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
    socket.to(roomId).emit('videoSignal', { signal });
  });

  socket.on('disconnect', () => {
    if (currentRoom && io.sockets.adapter.rooms[currentRoom] && io.sockets.adapter.rooms[currentRoom].length === 0) {
      delete rooms[currentRoom];
    }
    delete userNames[socket.id];
  });
});

server.listen(8000, () => console.log('Server is running on port 8000'));
