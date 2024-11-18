"use client"
import { usePathname } from "next/navigation"
import { Icons } from "../Icons/icons"
import Link from "next/link"

export default function Breadcrumb() {
   const pathname = usePathname().trim().split("/").slice(1)

   const notAllowed = ["", "admin"]

   const isThin = pathname.includes("products")

   return (
      <>
         {notAllowed.includes(pathname[0]) ? (
            <></>
         ) : (
            <div
               className={`flex items-center w-full ${
                  !isThin && "bg-white-100"
               }`}
            >
               <div
                  className={`container mx-auto flex flex-col gap-2 px-4 ${
                     !isThin && "py-4"
                  }`}
               >
                  {!pathname.includes("products") && (
                     <h3 className="text-neutral-900">{pathname[0]}</h3>
                  )}

                  <div className="text-neutral-500 py-4 h-[48px] flex items-center">
                     {pathname.map((item) => (
                        <Link
                           key={item}
                           href={`/${item}`}
                           className="flex items-center hover:text-neutral-900 transition"
                        >
                           {item.replace(/[_-]/g, " ")} <Icons.ChevronRight />
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   )
}
