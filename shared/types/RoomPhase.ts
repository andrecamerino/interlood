export enum RoomPhase {
  LOBBY = "LOBBY",           // waiting for players to join
  SELECTING_GAME = "SELECTING_GAME",  // host picks which game to play
  IN_GAME = "IN_GAME",        // a game is running
}