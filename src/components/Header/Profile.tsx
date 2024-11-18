"use client"
import { useQuery } from "@tanstack/react-query"
import getProfile from "@/services/user/change_info"
import logout from "@/services/user/logout"
import { Icons } from "../Icons/icons"
import Link from "next/link"

import { useRouter } from "next/navigation"

export default function Profile() {
   const { data, status } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getProfile(),
   })
   const router = useRouter()

   return (
      <>
         {status === "pending" && (
            <div role="status" className="w-16 h-[32px] animate-pulse">
               <div className="h-full w-full bg-white-200 rounded-md"></div>
               <span className="sr-only">Loading...</span>
            </div>
         )}
         {status === "success" && data.id && (
            <div className="flex items-center justify-between gap-4 w-16">
               <Link href={"/cart"}>
                  <Icons.ShopCart />
               </Link>
               <div className="relative group py-8">
                  <div
                     id="popover-default"
                     // role="tooltip"
                     className="absolute hidden -left-[90px] top-16 group-hover:flex z-10 w-32 "
                  >
                     <div className="flex flex-col gap-2 px-3 py-2 text-sm text-gray-500 transition-opacity duration-300 bg-white-100 border border-white-200 rounded-lg shadow-sm opacity-1 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <Link
                           href={"/profile"}
                           className="flex justify-between items-center gap-4 text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                           <Icons.Profile />
                           Profile
                        </Link>
                        <button
                           className="text-neutral-500 hover:text-neutral-900 flex justify-between items-center gap-4"
                           onClick={() => {
                              logout()
                              router.refresh()
                           }}
                        >
                           <Icons.Logout />
                           Logout
                        </button>
                     </div>
                  </div>
                  <Icons.Profile />
               </div>
            </div>
         )}
      </>
   )
}
