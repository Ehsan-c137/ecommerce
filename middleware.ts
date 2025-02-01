import { NextResponse, NextRequest } from "next/server"

export function middleware(request: NextRequest) {
   const session = request.cookies.get("session")

   if (!session && request.nextUrl.pathname.startsWith("/protected")) {
      const currentPath = request.nextUrl.pathname + request.nextUrl.search

      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", currentPath)

      return NextResponse.redirect(loginUrl)
   }

   return NextResponse.next()
}

export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
      "/protected/:path*",
   ],
}
