import prisma from "@/app/lib/prisma";
import { Match, Player } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  return null;
}

export async function POST(req: NextRequest) {
  // draw the tournament bracket
  try {

    const { days } = await req.json();

    const matches = [];

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

    // num of players
    let totPlayers = players.length; // total number of players - this will be used to calc the number of rounds
    let nPlayer = players.length; // number of players - this will be used iterate through the players array till its end
    // helpers to calc rounds
    let round = 1;
    let half = totPlayers / 2;

    // DAY d - x games till there are y players left -> y = 'days[d].playersLeft' (optional field, if none, then 1)
    for (let d = 0; d < days.length; d++) {

      // start date of each day
      let date = parseDate(days[d].start);

      // shcedule matches till days[d].playersLeft, if not given the playersLeft, then schedule till there's only 1 player left
      while (half >= (days[d].playersLeft ? days[d].playersLeft : 1)) {

        // there's a match per PC
        for (let j = 0; j < days[d].nPcs; j++) {
          
          // *info: since this code will shcedule the matches for the rounds in advance, there will be a point 
          // where there will be no more players, cuz they still have to play the previous round           
          matches.push({
            round: round,
            player1Id: (nPlayer - 1) <= 0 ? null : players[nPlayer - 1].id, // *info
            player2Id: (nPlayer - 2) <= 0 ? null : players[nPlayer - 2].id, // *info
            winnerId: null,
            startDate: new Date(date), // create new date object to avoid reference
          });

          nPlayer = nPlayer - 2 <= 0 ? 0 : nPlayer - 2; // 2 players per match, only subtract if there are players left
          totPlayers -= 2; // 2 players per match
        }

        date.setMinutes(date.getMinutes() + days[d].gameTime + days[d].timeBreak); // recalc date = minutes per match + minutes break

        // recalc round - a round is finished when all the players played
        if (totPlayers == 0) {
          round++; // next round
          totPlayers = half; // reset totPlayers
          half = half / 2; // recalc half
        }
      }
    }

    const createdMatches = await prisma.match.createMany({
      data: matches,
    });

    return NextResponse.json(createdMatches, { status: 200 });

  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}

// date parser - must receive in the format'dd/mm/yyyy hh:mm' 
function parseDate(date: string): Date {
  const [datePart, timePart] = date.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const startDateTimeParsed = new Date(Date.UTC(year, month - 1, day, hours, minutes));


  return startDateTimeParsed;
}