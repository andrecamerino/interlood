import { getRandomRoomId } from "../utils/getRandom";
import { Room } from "./Room";
import { Host } from "@shared/models/Host";

export class RoomManager {
  private rooms: Map<string, Room> = new Map();

  addRoom(host: Host): string {
    let id: string;
    do {
      id = getRandomRoomId();
    } while (this.roomIdExists(id));
    const room = new Room(id, host);
    this.rooms.set(id, room);
    return id;
  }

  getRoom(roomId: string): Room | undefined {
    if (!this.roomIdExists(roomId)) return;
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId: string): boolean {
    if (!this.roomIdExists(roomId)) return false;
    this.rooms.delete(roomId);
    return true;
  }

  roomIdExists(roomId: string) {
    return this.rooms.has(roomId);
  }

  debug() {
    console.log(`[RoomManager] ${this.rooms.size} room(s)`);
    for (const room of this.rooms.values()) {
      room.debug();
    }
  }
}
