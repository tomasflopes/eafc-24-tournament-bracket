import GameBracket from "@/components/GameBracket";
import { BASE_URL } from "@/service/api";
import { Game } from "@/types/Game";
import { formatDateDDStrMonthYYYY } from "@/utils/dateUtils";

export default async function Home() {
  const res = await fetch(`${BASE_URL}/draw`, {
    cache: "no-cache",
  });

  const draw = (await res.json()) as Game[];

  const gameList: Game[][] = [];
  let lastIndex = 0;

  for (let i = Math.log2(draw.length + 1) - 1; i >= 0; i--) {
    const nOfGamesInRound = Math.pow(2, i);
    gameList.push(draw.slice(lastIndex, nOfGamesInRound + lastIndex));
    lastIndex += nOfGamesInRound;
  }

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-black absolute top-4 left-1/2 -translate-x-1/2">
        NEI-ISEP: EA FC 24 Drawer
      </h1>

      <div className="flex gap-x-8 px-8 h-full min-w-screen text-lg mt-14">
        {gameList.map((gameRound, i) => (
          <>
            <section key={i} className="w-full flex flex-col justify-around">
              {gameRound.map((game) => (
                <div
                  className="w-full flex flex-col justify-center"
                  key={game.id}
                >
                  <h2 className="text-center text-yellow-300 font-bold absolute mb-32">
                    {game.date &&
                      formatDateDDStrMonthYYYY(new Date(game.date).getTime())}
                  </h2>
                  <GameBracket game={game} key={game.id} />
                </div>
              ))}
            </section>
            <div className="flex flex-col justify-around w-40 mx-4">
              {gameList[i + 1]?.map((game, j) => (
                <div
                  key={game.id}
                  style={{ height: `${100 / gameList[i].length}%` }}
                  className={`w-40
                    border-t border-b relative border-r border-slate-200 after:border-b 
                    after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 after:w-6 after:h-[0.05px] after:bg-slate-200 
                   after:border-slate-200 after:content-['']`}
                >
                  <h2 className="absolute top-0">
                    {gameList[i][2 * j].winner?.name}
                  </h2>
                  <h2 className="absolute bottom-0">
                    {gameList[i][2 * j + 1].winner?.name}
                  </h2>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </main>
  );
}
