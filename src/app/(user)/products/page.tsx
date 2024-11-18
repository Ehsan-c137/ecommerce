import Filters from "./Filters"
import Breadcrumb from "@/components/UI/Breadcrumb"

export default function Page() {
   return (
      <>
         <div className="flex gap-6 container mx-auto mt-4 px-4">
            <Filters />
         </div>
      </>
   )
}
