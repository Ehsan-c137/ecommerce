import HamburgerMenu from "@/components/UI/HamburgerMenu/HamburgerMenu"
import { Icons } from "../Icons/icons"
import Link from "next/link"
import Search from "@/components/UI/Search"
import { useAuth } from "@/context/auth"
export default async function MobileNav() {
   const { isAuthenticated } = useAuth()
   return (
      <>
         <header className="flex justify-between py-3 px-4 background ">
            <div className="w-[56px] flex items-center">
               <HamburgerMenu isLoggedIn={isAuthenticated} />
            </div>
            <Link href={"/"} aria-label="logo">
               <Icons.Logo />
            </Link>
            <div className="flex items-center gap-2">
               <Search />
               <Link href={"/cart"} aria-label="shop cart">
                  <Icons.ShopCart />
               </Link>
            </div>
         </header>
      </>
   )
}
