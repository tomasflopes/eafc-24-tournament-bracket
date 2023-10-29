"use client";

import { useState } from "react";
import { formatDateDayMonthHourMin } from "@/utils/dateUtils";
import { Match } from "@/types/Match";

interface ModalProps {
  game: Match;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
}

const Modal: React.FC<ModalProps> = ({ game, setHidden, hidden }) => {
  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                name="Score"
                placeholder={"0"}
                onChange={handleChangeScore}
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
