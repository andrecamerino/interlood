import { WavelengthPlayer } from "@/models/wavelength/WavelengthPlayer";
import { getRandomInt } from "@/utils/getRandom";
import {
  getCategory,
  getRandomNumber,
  getGuessPoints,
  getHostPoints,
} from "@/logic/gameLogic";
import { WavelengthCategory } from "@/data/categories";
import { WavelengthGamePhases } from "@shared/models/wavelength/WavelengthGamePhases";

// TODO: Implement timer once connected web sockets
export class WavelengthGame {
  // TODO: Optimise player array, add map for indexing for faster add, remove etc
  private players: WavelengthPlayer[] = [];
  private hostIndex = 0;
  private currentCategory!: WavelengthCategory;
  private currentTarget: number = 0;
  private selectedWord: string = ""; // Only for host
  private guessedNumbers: number[] = []; // I want to display all gussed numbers on the spectrum at the end
  private gamePhase: WavelengthGamePhases = WavelengthGamePhases.WAITING;

  private minNumber: number = 1;
  private maxNumber!: number;

  constructor(players: WavelengthPlayer[]) {
    this.players = players;

    if (this.players.length === 0) return;
  }

  // TODO: implement timer with run round and sockets
  // TODO: add skip timer function
  runRound() {
    throw new Error("timer not implemented");
    setTimeout(() => this.startGame(), 20000); // 20s
    setTimeout(() => this.startGuessing(), 20000); // 20s
    setTimeout(() => this.reveal(), 10000); // 10s
    this.endGame();
  }

  startGame() {
    this.setPhase(WavelengthGamePhases.SELECTING_WORD);

    this.maxNumber = this.players.length <= 20 ? 10 : 100;

    this.resetGame();

    // Initialise
    this.hostIndex = getRandomInt(0, this.players.length - 1);
    this.currentCategory = getCategory();
    this.currentTarget = getRandomNumber(this.maxNumber);
  }

  startGuessing() {
    this.setPhase(WavelengthGamePhases.GUESSING_NUMBERS);
    // start timer
  }

  reveal() {
    this.setPhase(WavelengthGamePhases.REVEALING);
    this.handleRoundPoints();
  }

  showLeaderboard() {
    this.setPhase(WavelengthGamePhases.SHOWING_LEADERBOARD);
  }

  endGame() {
    this.setPhase(WavelengthGamePhases.FINISHED);
  }

  resetGame() {
    this.selectedWord = "";
    this.guessedNumbers = [];
  }

  setPhase(phase: WavelengthGamePhases) {
    this.gamePhase = phase;
    // TODO: update socket here
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

  removePlayer(name: string): boolean {
    const index = this.players.findIndex((player) => player.getName() === name);

    if (index === -1) return false;

    this.players.splice(index, 1);

    // Fix host index
    if (this.players.length === 0) {
      this.hostIndex = 0;
    } else if (index < this.hostIndex) {
      this.hostIndex--; // shift left
    } else if (index === this.hostIndex) {
      this.hostIndex = this.hostIndex % this.players.length; // move to next valid
    }

    return true;
  }

  canSelectWord(): boolean {
    return this.gamePhase === WavelengthGamePhases.SELECTING_WORD;
  }

  canGuess(): boolean {
    return this.gamePhase === WavelengthGamePhases.GUESSING_NUMBERS;
  }

  canReveal(): boolean {
    return this.gamePhase === WavelengthGamePhases.REVEALING;
  }

  getLeaderboard(): WavelengthPlayer[] {
    return [...this.players].sort((a, b) => b.getScore() - a.getScore());
  }

  isShowingLeaderboard(): boolean {
    return this.getPhase() === WavelengthGamePhases.SHOWING_LEADERBOARD;
  }

  setSelectedWord(word: string) {
    this.selectedWord = word;
  }

  isHost(player: WavelengthPlayer): boolean {
    return this.getHost() === player;
  }

  getPhase(): WavelengthGamePhases {
    return this.gamePhase;
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

  getMinNumber() {
    return this.minNumber;
  }

  getMaxNumber() {
    return this.maxNumber;
  }
}
