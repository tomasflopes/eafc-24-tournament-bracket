"use client";

import { useState } from "react";
import { formatDateDayMonthHourMin } from "@/utils/dateUtils";
import { Game } from "@/types/Game";

interface ModalProps {
  playerID: string;
  game: Game;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
}

const Modal: React.FC<ModalProps> = ({ playerID, game, setHidden, hidden }) => {
  const [localGame, setLocalGame] = useState(game);
  const [scorePlayer1, setScorePlayer1] = useState<number | undefined>(
    localGame.result ? localGame.result[0] : 0
  );
  const [scorePlayer2, setScorePlayer2] = useState<number | undefined>(
    localGame.result ? localGame.result[1] : 0
  );

  const handleChangeScorePlayer1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScorePlayer1(parseInt(e.target.value));
  };

  const handleChangeScorePlayer2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScorePlayer2(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newResult: [number, number] =
      playerID === "player1"
        ? [scorePlayer1 || 0, localGame.result ? localGame.result[1] || 0 : 0]
        : [localGame.result ? localGame.result[0] || 0 : 0, scorePlayer2 || 0];

    const updatedGame = { ...game, result: newResult };
    setLocalGame(updatedGame);

    console.log(updatedGame);

    /*fetch(`/api/games/${game.id}`, {
      method: "PUT",
      body: JSON.stringify({
        result: newResult,
      }),
    });*/

    setHidden(true);
  };

  return (
    !hidden && (
      <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50">
        <div className="relative w-1/2 h-1/2 bg-slate-800">
          <button
            className="absolute top-0 right-0 p-2 text-2xl text-white bg-red-500 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setHidden(true);
            }}
          >
            X
          </button>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-2xl font-bold">Insert the score</h1>
              <p className="text-lg text-white">
                {playerID === "player1"
                  ? game.players?.[0].name
                  : game.players?.[1].name}
              </p>
              <p className="text-lg">{formatDateDayMonthHourMin(game.date)}</p>
            </div>
            <form
              className="flex flex-col items-center justify-center w-full h-full"
              onSubmit={handleSubmit}
            >
              <input
                className="w-1/2 px-2 py-1 my-2 border-2 text-black border-gray-800 rounded-md"
                type="number"
                name="Score"
                placeholder={game.result?.toString()}
                onChange={
                  "player1" === playerID
                    ? handleChangeScorePlayer1
                    : handleChangeScorePlayer2
                }
              />
              <button
                className="px-4 py-2 my-2 text-white bg-green-500 rounded-md"
                type="submit"
                onClick={() => setHidden(true)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
