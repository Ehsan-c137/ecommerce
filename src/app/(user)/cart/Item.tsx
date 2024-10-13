import { Icons } from "@/components/Icons/icons";
import Image from "next/image";

export default function Item() {
   return (
      <div className="flex  items-center gap-8">
         <div className="w-20 h-20 bg-white-100 flex items-center justify-center relative">
            <div className="absolute top-0 right-0 bg-white-200 md:hidden">
               <Icons.X />
            </div>
            <Image
               src={"/tshirt.png"}
               alt="product"
               width={60}
               height={60}
               objectFit="cover"
            />
         </div>
         <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-row md:flex-row items-center gap-8">
               <p className="text-neutral-900">Raw Black T-Shirt Lineup</p>
               <p className="text-neutral-500">Color: RED — Size: M</p>
            </div>
            <div className="flex items-center gap-8">
               <p className="text-neutral-900 font-medium text-base">$75.00</p>
               <div className="flex items-center border border-neutral-100 rounded-md">
                  <div className="h-10 w-10 flex items-center justify-center">
                     <Icons.Minus />
                  </div>

                  <p className="h-10 w-10 text-center  flex justify-center items-center">
                     5
                  </p>
                  <div className="h-10 w-10 flex items-center justify-center">
                     <Icons.Plus />
                  </div>
               </div>
            </div>
         </div>
         <div className="h-10 w-10  items-center justify-center bg-white-100 rounded-md hidden md:flex">
            <Icons.X />
         </div>
      </div>
   );
}
