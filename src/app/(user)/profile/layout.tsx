"use client"

import { Icons } from "@/components/Icons/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProfileLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const pathname = usePathname()
   const Items = [
      {
         name: "Orders",
         url: "/profile/orders",
         icon: <Icons.ShopCart />,
      },
      {
         name: "Wishlist",
         url: "/profile/whishlist",
         icon: <Icons.Heart />,
      },
      {
         name: "Address",
         url: "/profile/address",
         icon: <Icons.Address />,
      },
      {
         name: "Password",
         url: "/profile/password",
         icon: <Icons.Password />,
      },
      {
         name: "Account Detail",
         url: "/profile/account-detail",
         icon: <Icons.Person />,
      },
      {
         name: "Logout",
         url: "/profile/overview",
         icon: <Icons.Logout />,
      },
   ]
   return (
      <>
         <div className="flex gap-10 container mx-auto px-4 mt-16 relative">
            <div className="h-fit w-fit sticky top-[--header-height] flex gap-10">
               <div className="flex flex-col gap-4 w-[174px]">
                  {Items.map((item) => (
                     <Link
                        key={item.name}
                        href={item.url}
                        className={`flex gap-3 items-center text-nowrap text-medium text-neutral-500 hover:text-neutral-900  rounded-lg py-2 px-4 transition transition-custom ${
                           pathname === item.url &&
                           "bg-neutral-100 text-neutral-900"
                        }`}
                     >
                        <span>{item.icon}</span>
                        {item.name}
                     </Link>
                  ))}
               </div>
               <div className="h-[344px] w-[1px] bg-neutral-100"></div>
            </div>
            {children}
         </div>
      </>
   )
}
