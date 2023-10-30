"use client";

import Modal from "@/components/Modal";
import TableHeading from "@/components/TableHeading";
import { Match } from "@/types/Match";
import { formatDateDayMonthHourMin } from "@/utils/dateUtils";
import { useState } from "react";

interface GameTableProps {
  gameList: Match[];
}

const GameTable: React.FC<GameTableProps> = ({ gameList: gameList }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [selectedGame, setSelectedGame] = useState<Match | null>(null);

  const handleModalOpen = (game: Match) => {
    setSelectedGame(game);
    setIsHidden(false);
  };

  return (
    <section className="flex h-full w-full text-lg mt-14">
      <table className="w-full text-md text-center">
        <TableHeading />
        <tbody>
          {gameList &&
            gameList.map((game) => (
              <tr key={game.id} className="bg-slate-800 opacity-80 border-b">
                <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                  {game.player1 && game.player1.name}
                </td>
                <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                  {game.player2 && game.player2.name}
                </td>
                <td
                  className="w-1/4 px-2 cursor-pointer py-2 text-xs md:text-base sm:px-6 sm:py-4"
                  onClick={() => handleModalOpen(game)}
                >
                  {(game.player1Score || 0) +
                    "-" +
                    ((game.player2Score && game.player2Score) || 0)}
                </td>
                <td className="w-1/4 px-2 py-2 text-xs md:text-base sm:px-6 sm:py-4">
                  {formatDateDayMonthHourMin(game.startDate)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!isHidden && (
        <Modal game={selectedGame as Match} setHidden={setIsHidden} />
      )}
    </section>
  );
};

export default GameTable;
