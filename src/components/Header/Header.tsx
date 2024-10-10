"use client";
import Link from "next/link";
import { Icons } from "../Icons/icons";
import { useQuery } from "@tanstack/react-query";
import logout from "@/services/user/logout";
import changeInfo from "@/services/user/change_info";

export default function Header() {
   // const router = useRouter();

   const { data, isLoading } = useQuery({
      queryKey: ["profile"],
      queryFn: () => changeInfo(),
   });
   console.log();
   return (
      <header className="fixed w-full h-21 top-0  bg-white-900 px-4">
         <div className="flex items-center justify-between h-[84px] 3xl:container mx-auto">
            <div className="flex items-center gap-4">
               <Icons.Logo />
               <h2 className="text-neutral-900 hidden lg:flex">Ecommerce</h2>
            </div>
            <nav>
               <ul className="hidden lg:flex justify-between gap-8 text-neutral-500">
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/"}>Home</Link>
                  </li>
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/categories"}>Categories</Link>
                  </li>
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/products"}>Products</Link>
                  </li>
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/about"}>About</Link>
                  </li>
                  <li>
                     <Link
                        className="hover:text-neutral-900 transition-colors"
                        href={"/contact"}
                     >
                        Contact
                     </Link>
                  </li>
               </ul>
            </nav>
            <div className="flex items-center gap-8 justify-between">
               <div className="hidden lg:flex border rounded-md border-neutral-300 bg-white-900 focus-within:border-neutral-700 gap-2 px-2 py-2 transition">
                  <Icons.Search />
                  <input
                     type="text"
                     placeholder="Search products"
                     className="outline-none text-sm"
                  />
               </div>
               {isLoading && (
                  <div role="status" className="w-16 h-[32px] animate-pulse">
                     <div className="h-full w-full bg-white-200 rounded-md"></div>
                     <span className="sr-only">Loading...</span>
                  </div>
               )}
               {data?.id && (
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
                              <button className="flex justify-between items-center gap-4 text-neutral-500 hover:text-neutral-900 transition-colors">
                                 <Icons.Profile />
                                 Profile
                              </button>
                              <button
                                 className="text-neutral-500 hover:text-neutral-900 flex justify-between items-center gap-4"
                                 onClick={() => logout()}
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
               {/* 
               <Link className="btn" href={"/login"}>
                  Login
               </Link> */}
            </div>
         </div>
      </header>
   );
}
