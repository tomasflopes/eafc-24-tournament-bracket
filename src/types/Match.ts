export interface Match {
  id: string;
  round: number;
  isFinished: boolean;
  player1Score: number | null;
  player2Score: number | null;
  startDate: Date;
  endDate: Date | null;
  player1Id?: string;
  player2Id?: string;
  winnerId: string | null;
  player1?: {
    id: string;
    name: string;
  };
  player2?: {
    id: string;
    name: string;
  };
  winner?: {
    id: string;
    name: string;
  };
}
