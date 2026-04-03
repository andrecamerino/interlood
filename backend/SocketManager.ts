import { Server, Socket } from "socket.io";

export class SocketManager {
  private io: Server;

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
    socket.on("disconnect", () => this.onDisconnect(socket));
    socket.on("user join", (name: string) => this.onUserJoin(socket, name));
  }

  private onUserJoin(socket: Socket, name: string) {
    console.log(`${name} joined`);
    // Room logic will go here
  }

  private onDisconnect(socket: Socket) {
    console.log("client disconnected:", socket.id);
  }
}