import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { SocketManager } from "./SocketManager";

const app = express();
const server = createServer(app);
const PORT = 3002;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // react frontend
  },
});

new SocketManager(io);

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});