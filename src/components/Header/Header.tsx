import Link from "next/link"
import { Icons } from "../Icons/icons"
import checkLoggedin from "@/services/user/check_loggedin"
import Profile from "./Profile"
import MobileNav from "./MobileNav"

export default async function Header() {
   const isLogged = await checkLoggedin()

   return (
      <>
         <MobileNav />

         <header className="hidden lg:fixed w-full h-21 top-0 z-10 bg-white-900 px-4">
            <div className="flex items-center justify-between h-[84px] 3xl:container mx-auto">
               <div className="flex items-center gap-4 lg:w-[337px]">
                  <Icons.Logo />
               </div>
               <nav>
                  <ul className="hidden lg:flex justify-between gap-8 text-neutral-500">
                     <li className="hover:text-neutral-900 transition-colors link_slide">
                        <Link href={"/"}>Home</Link>
                     </li>
                     <li className="hover:text-neutral-900 transition-colors link_slide">
                        <Link href={"/categories"}>Categories</Link>
                     </li>
                     <li className="hover:text-neutral-900 transition-colors link_slide">
                        <Link href={"/products"}>Products</Link>
                     </li>
                     <li className="hover:text-neutral-900 transition-colors link_slide">
                        <Link href={"/about"}>About</Link>
                     </li>
                     <li className="link_slide">
                        <Link href={"/contact"}>Contact</Link>
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

                  {isLogged ? (
                     <Profile />
                  ) : (
                     <Link className="btn" href={"/login"}>
                        Login
                     </Link>
                  )}
               </div>
            </div>
         </header>
      </>
   )
}
