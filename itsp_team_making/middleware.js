// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const user = req.cookies.get("user");

  // protect only /add route
  if (req.nextUrl.pathname.startsWith("/add") && !user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/add"],
};