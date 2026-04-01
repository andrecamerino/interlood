import { WavelengthPlayer } from "./WavelengthPlayer";
import { getRandomInt } from "@/utils/getRandom";
import { getCategory, getRandomNumber, getGuessPoints, getHostPoints } from "../logic/gameLogic";

export class WavelengthGame {
  private readonly players: WavelengthPlayer[] = [];
  private hostIndex = 0;
  private currentCategory: string = "";
  private currentTarget: number = 0;
  private guessedNumbers: number[] = []; // I want to display all gussed numbers on the spectrum at the end

  startRound() {
    if (this.players.length === 0) return;

    // Reset
    this.guessedNumbers = [];

    // Initialise
    this.hostIndex = getRandomInt(0, this.players.length - 1);
    this.currentCategory = getCategory();
    this.currentTarget = getRandomNumber();
  }

  handleRoundPoints() {
    const host = this.getHost();
    const playerPoints: number[] = [];

    this.players.forEach((player, index) => {
      if (index === this.hostIndex) return;

      const selected = player.getSelectedNumber();
      const points = getGuessPoints(this.currentTarget, selected);

      this.guessedNumbers.push(selected);
      player.addScore(points);
      playerPoints.push(points);
    });

    const score = getHostPoints(playerPoints);
    host.addScore(score);
  }

  getHost(): WavelengthPlayer {
    return this.players[this.hostIndex];
  }

  getPlayers(): WavelengthPlayer[] {
    return this.players;
  }

  getCurrentCategory(): string {
    return this.currentCategory;
  }

  getCurrentTarget(): number {
    return this.currentTarget;
  }

  getGuessedNumbers(): number[] {
    return this.guessedNumbers;
  }
}