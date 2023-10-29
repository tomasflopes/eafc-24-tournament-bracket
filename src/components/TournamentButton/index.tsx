"use client";

import { BASE_URL } from "@/service/api";
import { Match } from "@prisma/client";
import { useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import GameTable from "../GameTable";

const TournamentButton: React.FC = ({}) => {
  const [isExploding, setIsExploding] = useState(false);
  const [showGameTable, setShowGameTable] = useState(false);
  const [draw, setDraw] = useState<Match[][]>();
  const [showButton, setShowButton] = useState(true);

  const tournamentGenerator = async () => {
    const res = await fetch(`${BASE_URL}/draw`, {
      cache: "no-cache",
    });
    if (res.status === 200) {
      const draw = (await res.json()) as Match[];
      setIsExploding(true);
      setShowButton(false);

      const gameList: Match[][] = [];
      let lastIndex = 0;

      for (let i = Math.log2(draw.length + 1) - 1; i >= 0; i--) {
        const nOfGamesInRound = Math.pow(2, i);
        gameList.push(draw.slice(lastIndex, nOfGamesInRound + lastIndex));
        lastIndex += nOfGamesInRound;
      }
      setDraw(gameList);
      setShowGameTable(true);
    } else alert("Tournament generation failed");
  };

  return (
    <>
      {showButton && (
        <button
          className={`bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full`}
          onClick={tournamentGenerator}
        >
          Generate Tournament
        </button>
      )}
      {showGameTable && <GameTable gameList={draw} />}
      <ReactCanvasConfetti
        particleCount={500}
        gravity={1.2}
        drift={0.2}
        spread={180}
        fire={isExploding}
        origin={{ y: 0.625, x: 0.5 }}
        className="fixed w-full h-full top-0 left-0 -z-10"
      />
    </>
  );
};

export default TournamentButton;
