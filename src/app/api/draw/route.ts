import prisma from "@/app/lib/prisma";
import { Match, Player } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { object, array, string, number, optional } from 'zod';

export async function GET(req: NextRequest) {

    return NextResponse.json([], { status: 200 });
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
            playersLeft: optional(number()),
        });

        const requestBodySchema = object({
            rounds: array(roundSchema),
        });

        // Validate the request body against the schema
        const requestBody = await req.json();
        requestBodySchema.parse(requestBody);

        // valid body
        const { rounds } = requestBody;

        const matches = [];

        // get players
        const players: Player[] = await prisma.player.findMany();
        // randomize players
        players.sort(() => Math.random() - 0.5);

        // checks if the number of rounds is log2(nPayers) so the draw can be done
        if (Math.log2(players.length) != rounds.length) {
            return NextResponse.json({ error: "The number of rounds must be log2(nPayers)" }, { status: 400 });
        }

        /* create matches - the following logic was implemented based on this example:
        
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

        // round r - x games till there are y players left -> y = 'rounds[d].playersLeft' (optional field, if none, then 1)
        for (let r = 0; r < rounds.length; r++) {

            // start date of each round
            let date = parseDate(rounds[r].start);

            // shcedule matches till rounds[d].playersLeft, if not given the playersLeft, then schedule till there's only 1 player left
            const pLeft = (rounds[r].playersLeft || 1);
            while (half >= pLeft) {

                // there's a match per PC
                for (let j = 0; j < rounds[r].nPcs; j++) {

                    // *info: since this code will shcedule the matches for the rounds in advance, there will be a point 
                    // where there will be no more players, cuz they still have to play the previous round           
                    matches.push({
                        round: round,
                        player1Id: players[nPlayer - 1]?.id, // *info
                        player2Id: players[nPlayer - 2]?.id, // *info
                        startDate: new Date(date), // create new date object to avoid reference
                    });

                    nPlayer = nPlayer - 2; // 2 players per match
                    totPlayers -= 2; // 2 players per match
                }

                date.setMinutes(date.getMinutes() + rounds[r].gameTime + rounds[r].breakTime); // recalc date = minutes per match + minutes break

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