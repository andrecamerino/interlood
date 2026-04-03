export interface GameType {
  name: string;
  descripton: string;
  imgSrc: string; // TODO: implement w3 buckets for images?
  maxPlayers: number;
  new?: boolean;
}
