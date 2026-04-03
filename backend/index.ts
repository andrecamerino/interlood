import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const PORT = 3002;
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your React port
  },
});

const players: string[] = [];

app.get("/", (req, res) => {
  res.send(`
    <h1>Players: ${players.length}</h1>
    <ul>
      ${players.map((p) => `<li>${p}</li>`).join("")}
    </ul>
  `);
});
// TODO: implement emit and recieve updates on player adds on frontend

io.on("connection", (socket) => {
  console.log("client connected:", socket.id); // add this

  socket.on("user join", (name) => {
    console.log(`${name} joined the room`);
    players.push(name);
    io.emit("players updated", players);
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
