import Drawer from "../UI/Drawer/Drawer"
import { Icons } from "../Icons/icons"

export default function MobileNav() {
   return (
      <div className="flex justify-between py-4 px-4">
         <div className="w-[56px]">
            <Drawer />
         </div>
         <Icons.Logo />
         <div className="flex items-center gap-2">
            <Icons.Search />
            <Icons.ShopCart />
         </div>
      </div>
   )
}
