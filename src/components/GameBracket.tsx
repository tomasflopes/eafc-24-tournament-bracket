import { Game } from "@/types/Game";
import { Key } from "react";

interface GameBracketProps {
  game: Game;
  key: Key;
}

const GameBracket: React.FC<GameBracketProps> = ({ key, game }) => {
  return (
    <article
      className="grid grid-rows-2 grid-cols-[1fr,4fr] h-20 my-6 w-64"
      key={key}
    >
      <h2 className="border-r-2 text-right pr-2 border-slate-200 border-b">
        {game.result && game.result[0]}
      </h2>
      <p className="border-b border-slate-200 pl-2 pr-6 w-full">
        {game.players && game.players[0].name}
      </p>
      <h2 className="border-r-2 text-right pr-2 border-slate-200">
        {game.result && game.result[1]}
      </h2>
      <p className="pl-2 pr-6">
        {game.players && game.players[1].name}
      </p>
    </article>
  );
};

export default GameBracket;
