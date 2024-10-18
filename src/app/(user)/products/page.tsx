import Filters from "./Filters";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

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
         </div>
      </>
   );
}
