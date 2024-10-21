"use client";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons/icons";
import Link from "next/link";
export default function Breadcrumb() {
   const pathname = usePathname().trim().split("/").slice(1);

   return (
      <div className="text-neutral-500 py-4 h-[48px] flex items-center">
         {pathname.map((item) => (
            <Link
               key={item}
               href={`/${item}`}
               className="flex items-center hover:text-neutral-900 transition"
            >
               {item.replaceAll("_", " ")} <Icons.ChevronRight />
            </Link>
         ))}
      </div>
   );
}
