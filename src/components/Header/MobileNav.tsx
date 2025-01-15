import HamburgerMenu from "@/components/UI/HamburgerMenu/HamburgerMenu"
import { Icons } from "../Icons/icons"
// import checkLoggedin from "@/services/user/check_loggedin"
import Link from "next/link"

export default async function MobileNav() {
   // const isLoggedin = await checkLoggedin()

   return (
      <header className="flex justify-between py-3 px-4">
         <div className="w-[56px] flex items-center">
            <HamburgerMenu />
         </div>
         <Link href={"/"}>
            <Icons.Logo />
         </Link>
         <div className="flex items-center gap-2">
            <Icons.Search />
            <Link href={"/cart"}>
               <Icons.ShopCart />
            </Link>
         </div>
      </header>
   )
}
