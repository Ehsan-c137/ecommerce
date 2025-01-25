"use client"

import { useEffect } from "react"
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
      console.error(error)
   }, [error])

   return (
      <>
         <div className="w-[100vw] h-[100vh] flex flex-col p-8 text-center items-center justify-around overflow-hidden">
            <div className="w-full h-100 flex flex-col gap-8 justify-center items-center text-center">
               <p className="text-titleActive">Something went wrong</p>
            </div>
            <div className="flex flex-col items-center gap-10">
               <p>
                  <Icons.Dress />
               </p>
               <div className="flex flex-col gap-4">
                  <Button
                     className="bg-titleActive text-offWhite"
                     intent={"primary"}
                     onClick={() => router.push("/")}
                  >
                     Home
                  </Button>
                  <Button
                     className="bg-titleActive text-offWhite"
                     intent={"primary"}
                     onClick={() => reset()}
                  >
                     Refresh
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}
