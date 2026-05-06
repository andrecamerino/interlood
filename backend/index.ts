import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { SocketManager } from "./SocketManager";

const app = express();
const server = createServer(app);
const PORT = Number(process.env.PORT ?? 3002);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:3000";

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

new SocketManager(io);

app.get("/", (req, res) => {
  res.send(`
    <h1>Socket Connected on PORT: ${PORT}</h1>
  `);
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});