"use client";

const TournamentButton: React.FC = () => {
  const tournamentGenerator = async () => {
    const res = await fetch("/api/draw", {
      method: "POST",
    });

    if (res.status === 200) alert("Tournament generated successfully");
    else alert("Tournament generation failed");
  };

  return (
    <button
      className={`bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full`}
      onClick={tournamentGenerator}
    >
      Generate Tournament
    </button>
  );
};

export default TournamentButton;
