"use client";

import TournamentButton from "@/components/TournamentButton";

const Admin: React.FC = () => {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative">
      <h1 className="text-3xl font-bold text-center pt-3">Admin Page</h1>
      <div className="flex justify-center pt-5">
        <TournamentButton />
      </div>
    </section>
  );
};

export default Admin;
