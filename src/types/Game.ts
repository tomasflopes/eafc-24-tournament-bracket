import { Player } from "./Player";

export interface Game {
  id: string;
  players?: [Player, Player];
  winner?: Player;
  result?: [number, number];
  date: Date;
}
