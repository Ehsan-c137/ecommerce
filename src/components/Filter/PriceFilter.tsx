import DoubleRangePicker from "@/components/UI/DubleRangePicker/DoubleRangePicker"
import { PriceFilterProps } from "@/types/types"

export function PriceFilter({
   minPrice,
   maxPrice,
   isLoading,
   onSelect,
}: PriceFilterProps) {
   const handleSetMinPrice = (min: number) => {
      onSelect("min price", min > minPrice ? `${min}` : "")
   }

   const handleSetMaxPrice = (max: number) => {
      onSelect("max price", max <= maxPrice ? `${max}` : "")
   }

   return (
      <div className="flex flex-col gap-4 px-4">
         <p className="text-neutral-900 font-medium">Price</p>
         {isLoading ? (
            "Loading..."
         ) : (
            <DoubleRangePicker
               min={minPrice}
               max={maxPrice}
               setMaxPrice={handleSetMaxPrice}
               setMinPrice={handleSetMinPrice}
            />
         )}
      </div>
   )
}
