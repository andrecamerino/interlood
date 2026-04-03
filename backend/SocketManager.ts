import { Server, Socket } from "socket.io";
import { Player } from "@shared/models/Player";
import { RoomManager } from "./models/RoomManager";

export class SocketManager {
  private io: Server;
  private roomManager: RoomManager = new RoomManager();
  private socketRoomMap: Map<string, string> = new Map(); // socketId → roomId

  constructor(io: Server) {
    this.io = io;
    this.init();
  }

  private init() {
    this.io.on("connection", (socket: Socket) => {
      console.log("client connected:", socket.id);
      this.onConnection(socket);
    });
  }

  private onConnection(socket: Socket) {
    this.createRoom(socket);

    socket.on("user join", (roomId: string, name: string) =>
      this.joinRoom(socket, roomId, name),
    );

    socket.on("disconnect", () => {
      const roomId = this.socketRoomMap.get(socket.id);
      this.onDisconnect(socket, roomId);
    });
  }

  private createRoom(socket: Socket) {
    socket.on("create room", () => {
      const roomId = this.roomManager.addRoom(socket.id);
      socket.emit("room created", roomId);
    });
  }

  private joinRoom(socket: Socket, roomId: string, name: string) {
    const player = new Player(socket.id, name);
    const room = this.roomManager.getRoom(roomId);
    if (!room) {
      socket.emit("room error", "Room not found");
      return;
    }
    const added = room.addPlayer(player);

    if (!added) {
      socket.emit("join error", "Name already taken");
      return;
    }

    this.socketRoomMap.set(socket.id, roomId);
    socket.join(roomId);

    console.log(`${name} joined the room`);
    this.io.to(roomId).emit("room updated", room.toJSON());
  }

  private onDisconnect(socket: Socket, roomId: string | undefined) {
    if (!roomId) return;
    const room = this.roomManager.getRoom(roomId);
    if (!room) return;
    room.removePlayer(socket.id);
    this.socketRoomMap.delete(socket.id);
    this.io.to(roomId).emit("room updated", room.toJSON());
  }
}
