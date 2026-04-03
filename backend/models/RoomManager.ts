import { getRandomRoomId } from "../utils/getRandom";
import { Room } from "./Room";

export class RoomManager {
  private rooms: Map<string, Room> = new Map();

  addRoom(hostId: string): string {
    let id: string;
    do {
      id = getRandomRoomId();
    } while (this.roomIdExists(id));
    const room = new Room(id, hostId);
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
}
