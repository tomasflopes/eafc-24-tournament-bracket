"use client";

import DrawTournamentButton from "@/components/DrawTournamentButton";
import GameTable from "@/components/GameTable";
import { BASE_URL } from "@/service/api";
import { useEffect, useState } from "react";

const Admin: React.FC = () => {
  const [data, setData] = useState([]);

  async function getData() {
    const res = await fetch(BASE_URL + "/draw");
    const data = await res.json();

    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative">
      <h1 className="text-3xl font-bold text-center pt-3">Admin Page</h1>
      {data.length == 0 && <DrawTournamentButton />}
      {data.length > 0 && <GameTable gameList={data} />}
    </section>
  );
};

export default Admin;
