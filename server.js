const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

// Simple HTTP endpoint to check whether the server is running.
app.get("/", (req, res) => {
    res.send("Card game backend is running!");  
    }
)

app.get("/rooms", (req, res) => {
    let checkedRooms = rooms.filter(item => {
        return item.playersCurrent.length < item.playersTotal
    }).map(item => {
        return {
            
        }
    })
    console.log(checkedRooms);
    res.send(checkedRooms);
});


const server = http.createServer(app);

// Allow connections from anywhere (important for free hosting like Render)
const io = new Server(server, { cors: { origin: "*"}});

// In-memory game state store
const activeGames = new Map();
console.log("activeGames");
console.log(activeGames)

const rooms = [
  {
    id: 1,
    name: "Jasper",
    playersTotal: 2,
    playersCurrent: [],
  },
  {
    id: 2,
    name: "Dregs",
    playersTotal: 3,
    playersCurrent: ["ted", "philip", "harry"],
  },
  {
    id: 3,
    name: "The Capitol",
    playersTotal: 4,
    playersCurrent: ["ted", "philip", "harry", "thomas"],
  },
];

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