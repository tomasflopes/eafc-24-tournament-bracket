import { Match } from "@/types/Match";
import { Key } from "react";

interface GameBracketProps {
  game: Match;
  key: Key;
}

const GameBracket: React.FC<GameBracketProps> = ({ key, game }) => {
  return (
    <article
      className="grid grid-rows-2 grid-cols-[1fr,4fr] h-20 my-6 w-64"
      key={key}
    >
      <h2 className="border-r-2 text-right pr-2 border-slate-200 border-b">
        {game.player1Score}
      </h2>
      <p className="border-b border-slate-200 pl-2 pr-6 w-full">
        {game.player1 && game.player1.name}
      </p>
      <h2 className="border-r-2 text-right pr-2 border-slate-200">
        {game.player2Score}
      </h2>
      <p className="pl-2 pr-6">{game.player2 && game.player2.name}</p>
    </article>
  );
};

export default GameBracket;
