import HamburgerMenu from "@/components/UI/HamburgerMenu/HamburgerMenu"
import { Icons } from "../Icons/icons"
import Link from "next/link"
import Search from "@/components/UI/Search"
import { clsx } from "clsx"
export default async function MobileNav({
   isLoggedIn,
   isScrolled,
}: {
   isLoggedIn: boolean
   isScrolled: boolean
}) {
   return (
      <>
         <header
            style={{
               background: isScrolled ? "white" : "",
            }}
            className={clsx("flex justify-between py-3 px-4 background", {
               "!bg-black": isScrolled,
            })}
         >
            <div className="w-[56px] flex items-center">
               <HamburgerMenu isLoggedIn={isLoggedIn} />
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
