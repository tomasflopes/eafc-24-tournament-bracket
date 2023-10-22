import prisma from "@/app/lib/prisma";
import { Match, Player } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
  // placeholder
  /*
  Attention: Be aware that to adapt this data to the frontend, the length of the array must be
  a power of 2.
  In case of lack of players, this route must handle the exceptions and fill the array accordingly.
  */
  const draw = [
    {
      players: [
        {
          id: "1",
          name: "Player 1",
        },
        {
          id: "2",
          name: "Player 2",
        },
      ],
      winner: {
        id: 2,
        name: "Winner1",
      },
      result: [0, 0],
      date: "2021-01-01 15:00",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      winner: {
        id: 2,
        name: "Winner2",
      },
      result: [0, 0],
      date: "2021-01-02 15:30",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      winner: {
        id: 2,
        name: "Winner3",
      },
      date: "2021-01-04",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      date: "2021-01-04",
    },
    {
      players: [
        {
          id: "3",
          name: "Player 3",
        },
        {
          id: "4",
          name: "Player 4",
        },
      ],
      date: "2021-01-04",
    },
    {
      date: "2021-01-04",
    },
    {
      date: "2021-01-04",
    },
    {
      date: "2021-01-02",
    },
    {
      date: "2021-01-02",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
    {
      date: "2021-01-01",
    },
  ];

  return new Response(JSON.stringify(draw), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}

export async function POST(req: NextRequest) {
  // draw the tournament bracket
  try {

    const matches= [];

    // get players
    const players: Player[] = await prisma.player.findMany();
    // randomize players
    players.sort(() => Math.random() - 0.5);

    /* create matches - the following logic was implemented based on this:
    - number of players is a power of 2
    - tournament will be during 2 days starting both days at 14h and ending at 18h
    - quarter, semi and final matches will be played on the second day
    - on the first day, there will be 2 games happening at the same time
    - on the second day, there will be only 1 runs at a time
    
    example:
    32 players

    FIRST DAY - always 2 games at the same time
    32/2 = 16 -> 16 games - round 1
    16/2 = 8 -> 8 games - round 2

    SECOND DAY - only one game is played at a time
    8/2 = 4 -> 4 games - round 3 (quarter-finals)
    4/2 = 2 -> 2 games - round 4 (semi-finals)
    2/2 = 1 - 1 game - round 5 (final) */

    // start date (30/10/2023 14h)
    const startDate = new Date();
    // num of players
    let numOfPlayers = players.length-1;
    // helpers to calc rounds
    let round = 1;
    let half = numOfPlayers / 2;

    // DAY 1 - x games till there are 8 players left (quarter-finals)
    while (numOfPlayers >= 8) {

      // TODO: calc date
      const date = new Date(startDate);

      // push match to array
      matches.push({
        round: round,
        player1Id: players[numOfPlayers].id,
        player2Id: players[numOfPlayers-1].id,
        winnerId: "" ,
        startDate: date,
      });

      numOfPlayers -= 2; // 2 players per match

      // recalc round - a round is finished when half of the players are out
      if(numOfPlayers === half) {
        round++;
        half = numOfPlayers / 2;
      }
    }

    // DAY 2 - rest of the games (quarters, semis and final)

    const createdMatches = await prisma.match.createMany({
      data: matches,
    });

    return NextResponse.json(createdMatches, { status: 200 });

  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}
