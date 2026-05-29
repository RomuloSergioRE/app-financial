import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/"];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;
  const { pathname } = request.nextUrl;

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
