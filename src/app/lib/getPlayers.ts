import prisma from "./prisma";

export const getPlayers = async () => {
  const players = await prisma.match.findMany({
    include: {
      player1: true,
      player2: true,
      winner: true,
    },
  });
  return players;
};
