import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const ispublic = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (path === "/")
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  if (token && ispublic) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!token && !ispublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// in which endpoints this url need to run
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
