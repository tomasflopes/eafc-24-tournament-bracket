import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const players = await prisma.player.findMany();
  return NextResponse.json(players, { status: 200 });
}

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

    return NextResponse.json(
      { error: "There was an error" },
      { status: 500 }
    );
  }
}
