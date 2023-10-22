import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   // placeholders
//   const players = [
//     { id: 1, name: "Player 1" },
//     { id: 2, name: "Player 2" },
//     { id: 3, name: "Player 3" },
//     { id: 4, name: "Player 4" },
//   ];

//   return new Response(JSON.stringify(players), {
//     headers: { "content-type": "application/json" },
//   });
// }

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    
    const player = await prisma.player.create({
      data: {
        name,
      },
    });

    return NextResponse.json(player, { status: 200 });

  } catch (e) {
    console.log(e);
    
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }

}
