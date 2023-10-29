import { Player } from "./Player";

export interface Match {
  id: string;
  players?: [Player, Player];
  winner?: Player;
  player1Score?: number;
  playerScore?: number;
  startDate: Date;
  endDate?: Date;
}
