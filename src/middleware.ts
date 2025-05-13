import { NextResponse, NextRequest } from "next/server"

const protectedRoute = ["/profile", "/dashboard"]

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl
   const sessionCookie = request.cookies.get("session")
   console.log("hello ")
   const isProtectedRoute = protectedRoute.some((route) =>
      pathname.startsWith(route)
   )
   console.log(isProtectedRoute)

   if (isProtectedRoute && !sessionCookie?.value) {
      const currentPath = pathname + request.nextUrl.search

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
   matcher: [
      "/profile",
      "/profile/:path*",
      "/dashboard/:path",
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
   ],
}
