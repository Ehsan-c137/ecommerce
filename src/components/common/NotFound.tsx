"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
   const router = useRouter()
   return (
      <>
         <div className="flex flex-col gap-2">
            <Link
               href={"/"}
               className="hover:underline transition bg-black text-white-100 px-8 py-2 "
            >
               HOME
            </Link>
            <div
               className="hover:underline transition bg-black text-white-100 px-8 py-2"
               onClick={() => router.back()}
            >
               BACK
            </div>
         </div>
      </>
   )
}
