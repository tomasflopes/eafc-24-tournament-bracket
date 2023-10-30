"use client";

import { BASE_URL } from "@/service/api";
import { roundsSettings } from "@/service/roundsSettings";
import React, { useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const DrawTournamentButton: React.FC = () => {
  const [isExploding, setIsExploding] = useState(false);

  const tournamentGenerator = async () => {
    const res = await fetch(`${BASE_URL}/draw`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roundsSettings),
    });
    if (res.status === 200) {
      setIsExploding(true);
    } else alert("Tournament generation failed");
  };

  return (
    <>
      <button
        className={`bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full`}
        onClick={tournamentGenerator}
      >
        Generate Tournament
      </button>
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

export default DrawTournamentButton;
