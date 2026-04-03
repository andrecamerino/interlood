import { Player } from "@shared/models/Player";
import { RoomPhase } from "../../shared/types/RoomPhase";
import { GameType } from "@shared/types/GameType";
import { Host } from "@shared/models/Host";

export class Room {
  protected id: string;
  protected host: Host;
  protected players: Player[] = [];
  protected phase: RoomPhase = RoomPhase.LOBBY;

  constructor(id: string, host: Host) {
    this.id = id;
    this.host = host;
  }

  addPlayer(player: Player): boolean {
    const exists = this.players.some((p) => p.getId() === player.getId());
    if (exists) return false;
    this.players.push(player);
    return true;
  }

  removePlayer(id: string): boolean {
    const index = this.players.findIndex((p) => p.getId() === id);
    if (index === -1) return false;
    this.players.splice(index, 1);
    return true;
  }

  selectGame(game: GameType) {
    this.phase = RoomPhase.SELECTING_GAME;
    // TODO: return the right room type based on selection
  }

  isHost(id: string) {
    return this.host.getId() === id;
  }
  getPhase() {
    return this.phase;
  }
  getPlayers() {
    return this.players;
  }
  getId() {
    return this.id;
  }
  getHostId() {
    return this.host.getId();
  }

  toJSON() {
    return {
      id: this.id,
      phase: this.phase,
      players: this.players.map((p) => p.toJSON()),
    };
  }
}
