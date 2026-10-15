const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Simple HTTP endpoint to check whether the server is running.
app.get("/", (req, res) => {
    res.send("Card game backend is running!");  
    }
)

const server = http.createServer(app);

// Allow connections from anywhere (important for free hosting like Render)
const io = new Server(server, { cors: { origin: "*"}});

// In-memory game state store
const activeGames = new Map();
console.log("activeGames");
console.log(activeGames)

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`Player disconnected: ${socket.id}`)
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
});