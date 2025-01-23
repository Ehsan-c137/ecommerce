import type { Metadata } from "next"
import { Tenor_Sans } from "next/font/google"
import "./globals.css"
import Providers from "@/providers"

export const metadata: Metadata = {
   title: "Open Fashion",
   description: "a place for everything you want",
   icons: [
      {
         url: "/android-chrome-192x192.png",
         sizes: "192x192",
         type: "image/png",
      },
      {
         url: "/android-chrome-512x512.png",
         sizes: "512x512",
         type: "image/png",
      },
   ],
}

const tenor_sans = Tenor_Sans({ subsets: ["latin"], weight: "400" })

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={`antialiased scroll-smooth ${tenor_sans.className}`}>
            <Providers>{children}</Providers>
         </body>
      </html>
   )
}
