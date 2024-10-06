import Link from "next/link";
import { Icons } from "../Icons/icons";

export default function Header() {
   return (
      <header className="fixed w-full h-21 top-0  bg-white-900 px-4">
         <div className="flex items-center justify-between h-[84px] container mx-auto">
            <div className="flex items-center gap-4">
               <Icons.Logo />
               <h2 className="text-neutral-900 hidden lg:flex">Ecommerce</h2>
            </div>
            <nav>
               <ul className="hidden lg:flex justify-between gap-8 text-neutral-500">
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/asfd"}>Home</Link>
                  </li>
                  <li className="hover:text-neutral-900 transition-colors">
                     <Link href={"/categories"}>Categories</Link>
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
               <Icons.ShopCart />
               <Icons.Profile />
            </div>
         </div>
      </header>
   );
}
