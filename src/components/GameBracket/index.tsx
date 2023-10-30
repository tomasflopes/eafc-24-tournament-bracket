import { Match } from "@/types/Match";
import { Key } from "react";

interface GameBracketProps {
  game: Match;
  key: Key;
  winnerId?: string;
}

const GameBracket: React.FC<GameBracketProps> = ({ key, game, winnerId }) => {
  return (
    <article
      className="grid grid-rows-2 grid-cols-[1fr,4fr] h-20 my-12 w-64"
      key={key}
    >
      <h2
        className={`border-r-2 text-center pt-1 border-slate-200 border-b h-full ${
          winnerId === game.player1Id ? "font-bold text-yellow-300" : ""
        } `}
      >
        {game.player1Score}
      </h2>
      <p
        className={`border-b border-slate-200 pt-1 pl-3 pr-6 w-full h-full ${
          winnerId === game.player1Id ? "font-bold text-yellow-300" : ""
        }`}
      >
        {game.player1 && game.player1.name}
      </p>
      <h2
        className={`border-r-2 text-center pt-2 border-slate-200 h-full ${
          winnerId === game.player2Id ? "font-bold text-yellow-300" : ""
        }`}
      >
        {game.player2Score}
      </h2>
      <p
        className={`pl-3 pr-6 h-full pt-2 ${
          winnerId === game.player2Id ? "font-bold text-yellow-300" : ""
        }`}
      >
        {game.player2 && game.player2.name}
      </p>
    </article>
  );
};

export default GameBracket;
