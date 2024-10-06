import { Icons } from "../Icons/icons";
import Link from "next/link";

export default function Footer() {
   return (
      <footer className="grid grid-cols-1 gap-8 w-full  pt-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 lg:justify-between gap-8 p-4 lg:p-0 w-full container mx-auto">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4">
                  <Icons.Logo />
                  <p className="font-extrabold">ecommerce</p>
               </div>
               <p className="text-neutral-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
                  <br />
                  Quae possimus autem, voluptate esse quidem in!
               </p>
               <div className="flex items-center gap-6 text-">
                  <Icons.Github />
                  <Icons.Instagram />
                  <Icons.Youtube />
               </div>
            </div>
            <div className="flex gap-16 text-sm lg:text-base text-nowrap">
               <div className="grid grid-cols-1 gap-7">
                  <p className="text-neutral-300">SUPPPORT</p>
                  <div className="grid grid-cols-1 gap-4">
                     <Link href={"/about"} className="text-neutral-500">
                        FAQ
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Terms of use
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Privacy Policy
                     </Link>
                  </div>
               </div>
               <div className="grid grid-cols-1 gap-7">
                  <p className="text-neutral-300">COMPANY</p>
                  <div className="grid grid-cols-1 gap-4">
                     <Link href={"/about"} className="text-neutral-500">
                        About us
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Contact
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Careers
                     </Link>
                  </div>
               </div>
               <div className="grid grid-cols-1 gap-7">
                  <p className="text-neutral-300">SHOP</p>
                  <div className="grid grid-cols-1 gap-4">
                     <Link href={"/about"} className="text-neutral-500">
                        My Account
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Checkout
                     </Link>
                     <Link href={"/about"} className="text-neutral-500">
                        Cart
                     </Link>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-6">
               <p className="text-neutral-300">ACCEPTED PAYMENTS</p>
               <div className="flex gap-4">
                  <Icons.Mastercard />
                  <Icons.Amex />
                  <Icons.Visa />
               </div>
            </div>
         </div>
         <div className="flex items-center justify-center w-full border-t border-neutral-100 p-4 bg-white-100 ">
            <p className="text-neutral-500 ">
               © 2024 ECM. All rights reserved.
            </p>
         </div>
      </footer>
   );
}