import { FilterProps } from "@/types/types"

interface SizeFilterProps extends FilterProps {
   sizes: string[]
   isLoading: boolean
}

export function SizeFilter({
   sizes,
   searchParams,
   onSelect,
   isLoading,
}: SizeFilterProps) {
   return (
      <div className="flex flex-col gap-2 px-4">
         <p className="text-neutral-900 font-medium">Size</p>
         {isLoading ? (
            <div className="h-[58px] w-full animate-pulse bg-white-200 rounded-sm"></div>
         ) : (
            <div className="flex items-center flex-wrap gap-3 text-sm">
               {sizes?.map((size) => {
                  if (!size) return
                  const isChecked = searchParams.getAll("size")?.includes(size)
                  return (
                     <div key={size} className="flex items-center">
                        <label
                           style={{
                              borderColor: isChecked ? "black" : "#e6e7e8",
                           }}
                           htmlFor={`${size}--size`}
                           className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer border border-neutral-100 transition body-s"
                        >
                           {size.toUpperCase()}
                        </label>
                        <input
                           type="checkbox"
                           value={size}
                           id={`${size}--size`}
                           className="hidden"
                           checked={isChecked}
                           onChange={(e) => onSelect("size", e.target.value)}
                        />
                     </div>
                  )
               })}
            </div>
         )}
      </div>
   )
}
