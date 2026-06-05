import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/lib/logger";

const protectedRoutes = ["/", "/dashboard", "/admin"];
const authRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];

function getUserRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdminRoute = adminRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (isAdminRoute && token) {
    const role = getUserRole(token);
    if (role !== "admin") {
      logger.warn(`[PROXY] Acesso negado à rota admin. Role: "${role}", Path: ${pathname}`);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
