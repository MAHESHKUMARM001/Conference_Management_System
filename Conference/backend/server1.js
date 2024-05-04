// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
// Initialize Express app
const app = express();
const server = http.createServer(app);

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Initialize Socket.IO
const io = socketIo(server);

// Listen for new socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for incoming messages from clients
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Broadcast the received message to all clients
        io.emit('message', data);
    });

    // Handle disconnection
    // socket.on('disconnect', () => {
    //     console.log('Client disconnected');
    // });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
