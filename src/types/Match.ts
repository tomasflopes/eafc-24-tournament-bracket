import { Player } from "./Player";

export interface Match {
  id: string;
  players?: [Player, Player];
  winner?: Player;
  player1Score?: number;
  player2Score?: number;
  startDate: Date;
  endDate?: Date;
}
