import prisma from "@/app/lib/prisma";
import { parseDate } from "@/utils/dateUtils";
import { Player } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, array, number, object, string } from "zod";

export async function GET(req: NextRequest) {
  const matches = await prisma.match.findMany({
    include: {
      player1: true,
      player2: true,
    },
  });

  return NextResponse.json(matches, { status: 200 });
}

export async function POST(req: NextRequest) {
  // draw the tournament bracket
  try {
    // schema for the request body
    const roundSchema = object({
      start: string(),
      end: string(),
      nPcs: number(),
      gameTime: number(),
      breakTime: number(),
    });

    const requestBodySchema = object({
      rounds: array(roundSchema),
    });

    // Validate the request body against the schema
    const requestBody = await req.json();
    const body = requestBodySchema.parse(requestBody);
    // valid body
    const { rounds } = body;

    const matches = [];

    // get players
    const players: Player[] = await prisma.player.findMany();
    // randomize players
    players.sort(() => Math.random() - 0.5);

    // checks if the number of rounds is log2(nPayers) so the draw can be done
    if (Math.log2(players.length) !== rounds.length) {
      return NextResponse.json(
        { error: "The number of rounds must be log2(nPayers)" },
        { status: 400 }
      );
    }

    // num of players
    let totalPlayers = players.length;
    let playerId = players.length; // player id will be an index of the players array
    // helpers to calc rounds
    let round = 1;
    let half = totalPlayers / 2;

    for (let r = 0; r < rounds.length; r++) {
      // start date of each round
      const date = parseDate(rounds[r].start);
      const gamesForRound = Math.pow(2, rounds.length - r - 1);

      for (let i = 0; i < gamesForRound; i += rounds[r].nPcs) {
        // there's a match per PC
        for (let j = 0; j < rounds[r].nPcs; j++) {
          // *info: since this code will schedule the matches for the rounds in advance, there will be a point
          // where there will be no more players, cuz they still have to play the previous round
          matches.push({
            round: r + 1,
            player1Id: players[playerId - 1]?.id, // *info
            player2Id: players[playerId - 2]?.id, // *info
            startDate: new Date(date), // create new date object to avoid reference
            order: i + j,
          });

          playerId = playerId - 2; // 2 players per match
          totalPlayers -= 2; // 2 players per match
        }

        date.setMinutes(
          date.getMinutes() + rounds[r].gameTime + rounds[r].breakTime
        ); // recalc date = minutes per match + minutes break
      }
    }

    const createdMatches = await prisma.match.createMany({
      data: matches,
    });

    return NextResponse.json(createdMatches, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError)
      return NextResponse.json({ error: e.errors }, { status: 400 });

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const deletedMatches = await prisma.match.deleteMany();

    return NextResponse.json(deletedMatches, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
