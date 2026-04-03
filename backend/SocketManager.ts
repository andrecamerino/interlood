import { Server, Socket } from "socket.io";
import { Room } from "./models/Room";
import { Player } from "@shared/models/Player";

export class SocketManager {
  private io: Server;
  private room: Room;

  constructor(io: Server) {
    this.io = io;
    this.room = new Room("room-1", "host-1"); // hardcoded for MVP
    this.init();
  }

  private init() {
    this.io.on("connection", (socket: Socket) => {
      console.log("client connected:", socket.id);
      this.onConnection(socket);
    });
  }

  private onConnection(socket: Socket) {
    socket.on("disconnect", () => this.onDisconnect(socket));
    socket.on("user join", (name: string) => this.onUserJoin(socket, name));
  }

  private onUserJoin(socket: Socket, name: string) {
    const player = new Player(socket.id, name);
    const added = this.room.addPlayer(player);

    if (!added) {
      socket.emit("join error", "Name already taken");
      return;
    }

    console.log(`${name} joined the room`);
    this.io.emit("room updated", this.room.toJSON());
  }

  private onDisconnect(socket: Socket) {
    this.room.removePlayer(socket.id);
    console.log("client disconnected:", socket.id);
    this.io.emit("room updated", this.room.toJSON());
  }

  getRoom() {
    return this.room;
  }
}
