import type { Metadata, Viewport } from "next"
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

export const viewport: Viewport = {
   maximumScale: 1,
   userScalable: false,
}

const tenor_sans = Tenor_Sans({ subsets: ["latin"], weight: "400" })

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={`antialiased ${tenor_sans.className}`}>
            <Providers>{children}</Providers>
         </body>
      </html>
   )
}
