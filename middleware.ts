import { NextResponse, NextRequest } from "next/server"

const protectedRoute = ["/profile", "/protected"]

export function middleware(request: NextRequest) {
   const session = request.cookies.get("session")

   const isProtectedRoute = protectedRoute.some((route) =>
      request.nextUrl.pathname.startsWith(route)
   )

   if (isProtectedRoute && !session) {
      const currentPath = request.nextUrl.pathname + request.nextUrl.search

      const isValidCallback =
         currentPath.startsWith("/") &&
         !currentPath.startsWith("//") &&
         !currentPath.includes("http")

      const loginUrl = new URL("/login", request.url)
      if (isValidCallback) {
         loginUrl.searchParams.set("callbackUrl", currentPath)
      }

      return NextResponse.redirect(loginUrl)
   }

   return NextResponse.next()
}

export const config = {
   matcher: ["/profile/:path*", "/protected/:path*"],
}
