import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

function prefersPortuguese(acceptLanguage = "") {
  const languages = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  const firstSupported = languages.find((language) => language.startsWith("pt") || language.startsWith("en"));
  return firstSupported?.startsWith("pt") || false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/pt-BR")
  ) {
    return NextResponse.next();
  }

  const preferredLocale = request.cookies.get("preferredLocale")?.value;
  if (preferredLocale) {
    return NextResponse.next();
  }

  if (prefersPortuguese(request.headers.get("accept-language") || "")) {
    const url = request.nextUrl.clone();
    url.pathname = `/pt-BR${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
