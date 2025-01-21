"use client"

import { useEffect } from "react"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { Button } from "@/components/UI/Button"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/Icons/icons"

export default function Error({
   error,
   reset,
}: {
   error: Error
   reset: () => void
}) {
   const router = useRouter()
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
   }, [error])

   return (
      <>
         <Header />
         <div className="w-[100vw] h-[100vh] flex flex-col p-8 text-center items-center justify-around">
            <div className="w-full h-100 d-flex flex-column gap-8 justify-content-center align-items-center text-center">
               <p className="text-titleActive">Something went wrong</p>
            </div>
            <div className="flex flex-col items-center gap-10">
               <p>
                  <Icons.Dress />
               </p>
               <p
                  className="text-titleActive"
                  style={{
                     fontSize: "16px",
                  }}
               >
                  We can&apos;t find the page you looking for, it will return to
                  the
               </p>

               <div className="d-flex gap-4">
                  <Button
                     className="text-titleActive"
                     intent={"primary"}
                     onClick={() => router.push("/")}
                  >
                     Home
                  </Button>
                  <Button
                     className="text-titleActive"
                     intent={"primary"}
                     onClick={() => reset()}
                  >
                     Refresh
                  </Button>
               </div>
            </div>
         </div>

         <Footer />
      </>
   )
}
