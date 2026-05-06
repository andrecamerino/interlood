export interface GameType {
  name: string;
  description: string;
  imgSrc: string; // TODO: implement w3 buckets for images?
  maxPlayers: number;
  new?: boolean;
}
