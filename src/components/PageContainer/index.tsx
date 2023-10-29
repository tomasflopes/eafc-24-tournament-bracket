import { Dispatch, SetStateAction, useState } from "react";
import GameTable from "../GameTable";
import TournamentButton from "../TournamentButton";
import { Match } from "@prisma/client";
import { BASE_URL } from "@/service/api";

const PageContainer: React.FC = async () => {
  const [gameList, setGameList] = useState<Match[][] | undefined>(undefined);

  const res = await fetch(`${BASE_URL}/draw`, {
    cache: "no-cache",
  });

  const data = (await res.json()) as Match[];

  return (
    <div className="w-screen flex justify-center pt-5">
      <div className="flex justify-center pt-5">
        {data.length == 0 && <TournamentButton setGameList={setGameList} />}
        {data.length > 0 && <GameTable gameList={gameList} />}
      </div>
    </div>
  );
};

export default PageContainer;
