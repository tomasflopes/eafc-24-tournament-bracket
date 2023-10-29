import { ADMIN_COOKIE } from "@/service/cookies";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const cookieValue = cookies().get(ADMIN_COOKIE) as {
    name: string;
    value: string;
  };
  if (
    !cookieValue ||
    cookieValue.value !== process.env.NEXT_PUBLIC_ADMIN_USER
  )
  return NextResponse.redirect(new URL("/admin", request.url)); 
}

export const config = {
  matcher: "/admin/:path*",
};


