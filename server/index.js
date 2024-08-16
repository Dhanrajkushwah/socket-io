const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = 3000;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Emit the message to all clients, including the sender, with socket ID
    io.emit('message', `${socket.id.substr(0, 5)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
