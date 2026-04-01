import { WavelengthPlayer } from "./WavelengthPlayer";
import { getRandomInt } from "@/utils/getRandom";
import {
  getCategory,
  getRandomNumber,
  getGuessPoints,
  getHostPoints,
} from "../logic/gameLogic";
import { WavelengthCategory } from "../data/categories";

// TODO: Implement timer once connected web sockets
export class WavelengthGame {
  private players: WavelengthPlayer[] = [];
  private hostIndex = 0;
  private currentCategory!: WavelengthCategory;
  private currentTarget: number = 0;
  private selectedWord: string = ""; // Only for host
  private guessedNumbers: number[] = []; // I want to display all gussed numbers on the spectrum at the end

  constructor(players: WavelengthPlayer[]) {
    this.players = players;

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

  /** @returns {boolean} boolean that represents if player succesfuly added */
  addPlayer(name: string): boolean {
    const exists = this.players.some((player) => player.getName() === name);

    if (exists) return false;

    const player = new WavelengthPlayer(name, name);
    this.players.push(player);
    return true;
  }

  // TODO: Implement removePlayer e.g. when kicked by room host

  setSelectedWord(word: string) {
    this.selectedWord = word;
  }

  getHost(): WavelengthPlayer {
    return this.players[this.hostIndex];
  }

  getHostIndex(): number {
    return this.hostIndex;
  }

  getPlayers(): WavelengthPlayer[] {
    return this.players;
  }

  getCurrentCategory(): WavelengthCategory {
    return this.currentCategory;
  }

  getCurrentTarget(): number {
    return this.currentTarget;
  }

  getGuessedNumbers(): number[] {
    return this.guessedNumbers;
  }

  getSelectedWord() {
    return this.selectedWord;
  }
}
