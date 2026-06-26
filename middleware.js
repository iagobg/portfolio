import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

function startsWithLocale(pathname, locale) {
  return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    startsWithLocale(pathname, "en") ||
    startsWithLocale(pathname, "pt-BR")
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/pt-BR" : `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
