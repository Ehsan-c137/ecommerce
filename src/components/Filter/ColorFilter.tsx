import { FilterProps } from "@/types/types"
import { toPastel } from "@/utils/toPastelColor"
interface ColorFilterProps extends FilterProps {
   colors: string[]
   isLoading: boolean
}

export function ColorFilter({
   colors,
   searchParams,
   onSelect,
   isLoading,
}: ColorFilterProps) {
   return (
      <div className="flex flex-col gap-4 px-4">
         <p className="text-neutral-900 font-medium">Color</p>
         {isLoading ? (
            <div className="h-[90px] animate-pulse bg-white-200 rounded-sm"></div>
         ) : (
            <div className="flex items-center  flex-wrap gap-3">
               {colors?.map((color) => {
                  const isChecked = searchParams
                     .getAll("color")
                     ?.includes(color)
                  return (
                     <div key={color} className="flex items-center">
                        <label
                           style={{
                              border: "1px solid transparent",
                              borderColor: isChecked ? "black" : "transparent",
                              backgroundColor: toPastel(color),
                           }}
                           htmlFor={`${color}--color`}
                           className="w-7 h-7 rounded-full transition p-[3px] bg-clip-content cursor-pointer hover:scale-105 relative after:bg-black after:opacity-10 after:absolute after:inset-0 after:rounded-full"
                        />
                        <input
                           type="checkbox"
                           value={color}
                           id={`${color}--color`}
                           className="hidden"
                           checked={isChecked}
                           onChange={(e) => onSelect("color", e.target.value)}
                        />
                     </div>
                  )
               })}
            </div>
         )}
      </div>
   )
}
