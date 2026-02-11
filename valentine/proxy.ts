import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "valentine_auth";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get(AUTH_COOKIE)?.value === "1";
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
