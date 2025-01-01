"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Icons } from "@/components/Icons/icons"
import Breadcrumb from "@/components/UI/Breadcrumb"

export default function AdminPanelLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const pathname = usePathname()
   const items = [
      "Dashboard",
      "products",
      "Orders",
      "Customers",
      "Reviews",
      "Settings",
   ]

   const NavItems = items.map((item) => {
      const url = `/admin/${item.toLowerCase()}`
      const isActive = pathname === url
      return (
         <Link
            key={item}
            href={url}
            className={`transition ${
               isActive && "bg-white-100 text-neutral-900"
            } border-r-white-200 rounded-lg text-neutral-500 px-4 py-2 hover:text-neutral-900`}
         >
            {item}
         </Link>
      )
   })

   return (
      <div className="bg-white-100 h-[100vh] flex gap-10">
         <div className="w-[260px] bg-white-900 px-4 py-4 flex flex-col  gap-10">
            <h5 className="flex items-center justify-center gap-2 font-extrabold w-full">
               <Icons.AdminIcon />
               Admin
            </h5>
            <div className="flex flex-col gap-4"> {NavItems}</div>
         </div>
         <div className="w-full flex flex-col gap-10 p-4">
            <div className="flex w-full justify-between items-center">
               <Breadcrumb />
               <button>
                  <Icons.Logout />
               </button>
            </div>
            <div>{children}</div>
         </div>
      </div>
   )
}
