import { Room } from "@/models/Room";
import { WavelengthGame } from "./WavelengthGame";
import { WavelengthPlayer } from "./WavelengthPlayer";
import { RoomPhase } from "@shared/types/RoomPhase";

export class WavelengthRoom extends Room {
  private game: WavelengthGame | null = null;

  startGame() {
    this.phase = RoomPhase.IN_GAME;
    const players = this.players.map(
      p => new WavelengthPlayer(p.getId(), p.getName())
    );
    this.game = new WavelengthGame(players);
    this.game.startGame();
  }

  endGame() {
    this.phase = RoomPhase.LOBBY;
    this.game = null;
  }

  getGame() { return this.game; }
}