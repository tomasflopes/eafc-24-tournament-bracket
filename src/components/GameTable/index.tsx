"use client";

import { Match } from "@/types/Match";
import TableHeading from "@/components/TableHeading";
import { formatDateDayMonthHourMin } from "@/utils/dateUtils";
import Modal from "@/components/Modal";
import { useState } from "react";

interface GameTableProps {
  gameList: Match[][] | undefined;
}

const GameTable: React.FC<GameTableProps> = ({ gameList: gameList }) => {
  const [isHidden, setIsHidden] = useState(true);
  console.log(gameList);

  return (
    <section className="flex gap-x-8 px-8 h-full min-w-screen text-lg mt-14">
      <table className="w-full text-sm text-center">
        <TableHeading />
        <tbody>
          {gameList &&
            gameList.map((gameRound, i) => (
              <>
                {gameRound.map((game) => (
                  <tr key={game.id} className="bg-slate-800 border-b">
                    <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                      {game.player1 && game.player1.name}
                    </td>
                    <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                      {game.player1 && game.player2.name}
                    </td>
                    <td
                      className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4"
                      onClick={() => setIsHidden(false)}
                    >
                      {(game.player1Score || 0) +
                        "-" +
                        ((game.player2Score && game.player2Score) || 0)}
                      <Modal
                        game={game}
                        setHidden={setIsHidden}
                        hidden={isHidden}
                      />
                    </td>
                    <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                      {formatDateDayMonthHourMin(game.startDate)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default GameTable;
