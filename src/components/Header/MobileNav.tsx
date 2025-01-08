import Drawer from "../UI/Drawer/Drawer"
import { Icons } from "../Icons/icons"
import checkLoggedin from "@/services/user/check_loggedin"

export default async function MobileNav() {
   const isLoggedin = await checkLoggedin()

   return (
      <header className="flex justify-between py-3 px-4">
         <div className="w-[56px] flex items-center">
            <Drawer />
         </div>
         <Icons.Logo />
         <div className="flex items-center gap-2">
            <Icons.Search />
            {isLoggedin && <Icons.ShopCart />}
         </div>
      </header>
   )
}
