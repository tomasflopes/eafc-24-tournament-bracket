import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import prisma from "@/app/lib/prisma";

export async function POST(
  req: Request,
  context: { params: { matchId: string } }
) {
  try {
    const { matchId } = context.params;

    const schema = z.object({
      isFinished: z.boolean(),
      score: z
        .object({
          player1: z.number().min(0),
          player2: z.number().min(0),
        })
        .optional(),
    });

    const body = await req.json();
    const parsed = schema.parse(body);
    if (parsed.isFinished && !parsed.score)
      return NextResponse.json(
        { error: "Score is required." },
        { status: 400 }
      );

    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match)
      return NextResponse.json(
        { error: "Match with given id does not exist." },
        { status: 404 }
      );

    // ties won't happen
    const winner =
      parsed.isFinished && parsed.score
        ? parsed.score?.player1 > parsed.score?.player2
          ? match.player1Id
          : match.player2Id
        : undefined;

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: {
        isFinished: parsed.isFinished,
        endDate: parsed.isFinished ? new Date() : undefined,
        player1Score: parsed.score?.player1,
        player2Score: parsed.score?.player2,
        winnerId: winner,
      },
      include: { winner: true },
    });

    const key = updated.order % 2 === 0 ? "player2Id" : "player1Id";
    await prisma.match.updateMany({
      where: { order: updated.order / 2 },
      data: { [key]: winner },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    if (e instanceof ZodError)
      return NextResponse.json({ error: e.errors }, { status: 400 });
    return NextResponse.next({ status: 500 });
  }
}
