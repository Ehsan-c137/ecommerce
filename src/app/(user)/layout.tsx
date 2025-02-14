import type { Metadata } from "next"
import HeaderWrapper from "@/components/Header/HeaderWrapper"

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

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className="background">
         <HeaderWrapper />
         <main
            className="background"
            style={{
               minHeight: "calc(100vh - 56px)",
            }}
         >
            {children}
         </main>
      </div>
   )
}
