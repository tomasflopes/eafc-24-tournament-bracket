import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
} from "@/service/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password)
    return NextResponse.json(
      { message: "Please provide username and password" },
      { status: 400 }
    );

  if (
    username === process.env.NEXT_PUBLIC_ADMIN_USER &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    // set a cookie
    cookies().set({
      name: ADMIN_COOKIE,
      maxAge: ADMIN_COOKIE_MAX_AGE,
      value: process.env.NEXT_PUBLIC_ADMIN_USER || "auth",
      path: "/",
    });

    return NextResponse.json(
      { message: "Successfully logged in" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Invalid username or password" },
    { status: 401 }
  );
}
