"use client";

import { BASE_URL } from "@/service/api";
import { Match } from "@/types/Match";
import { formatDateDayMonthHourMin } from "@/utils/dateUtils";
import { useState } from "react";

interface ModalProps {
  game: Match;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ game, setHidden }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/score/${game.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFinished: true,
          score: {
            player1: score.player1,
            player2: score.player2,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }
      setHidden(true);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const [score, setScore] = useState({
    player1: game.player1Score || 0,
    player2: game.player2Score || 0,
  });

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScore((prevScore) => ({
      ...prevScore,
      [name]: parseInt(value),
    }));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50">
      <div className="relative w-1/2 h-1/2 bg-slate-800">
        <button
          className="absolute top-4 right-4 p-2 text-2xl text-white bg-red-500 rounded-full h-12 w-12"
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
            <p className="text-lg text-white"></p>
            <p className="text-lg">
              {formatDateDayMonthHourMin(game.startDate)}
            </p>
          </div>
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={handleSubmit}
          >
            <input
              className="w-1/2 px-2 py-1 my-2 border-2 text-black border-gray-800 rounded-md"
              type="number"
              name="player1"
              placeholder={"0"}
              value={score.player1}
              onChange={handleChangeScore}
            />
            <input
              className="w-1/2 px-2 py-1 my-2 border-2 text-black border-gray-800 rounded-md"
              type="number"
              name="player2"
              placeholder={"0"}
              value={score.player2}
              onChange={handleChangeScore}
            />
            <button
              className="px-4 py-2 my-2 text-white bg-green-500 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
