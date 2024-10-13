import { Icons } from "@/components/Icons/icons";
import Filters from "./Filters";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Products from "./Products";

export default function Page() {
   return (
      <>
         <div className="h-16 w-full flex items-center bg-white-100">
            <div className="container mx-auto flex items-center">
               <Breadcrumb />
            </div>
         </div>
         <div className="flex gap-6 container mx-auto mt-8">
            <Filters />
            <div className="flex flex-col gap-3 w-full">
               <p className="text-neutral-900 font-medium">Applied Filters:</p>
               <div className="flex gap-3">
                  <button className="btn-outline text-label">
                     Perfume <Icons.X />
                  </button>
                  <button className="btn-outline text-label space-x-2">
                     <span>Size: M</span> <Icons.X />
                  </button>
               </div>
               <div className="text-neutral-500 justify-between flex items-center w-full py-4">
                  <p>Showing 1-9 of 36 results.</p>

                  <p>SORT BY</p>
               </div>

               <Products />
            </div>
         </div>
      </>
   );
}
