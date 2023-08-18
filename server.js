const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Add this line to enable CORS for all routes
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('send message', (data) => {
      // Emit the message to all connected clients
      io.emit('receive message', {
        nickname: data.nickname,
        message: data.message
      });
    });
  });
  

server.listen(3000, () => {
  console.log('server listening on *:3000');
});
