import { FilterSectionProps } from "@/types/types"

export function FilterSection({
   title,
   isLoading,
   items,
   searchParams,
   paramName,
   onSelect,
}: FilterSectionProps) {
   return (
      <div className="flex flex-col gap-2 px-4 pt-6 md:w-[228px] w-full">
         <p className="text-neutral-900 font-medium">{title}</p>
         <div className="flex flex-col text-nowrap">
            {isLoading && (
               <div className="w-full bg-white-200 animate-pulse h-[135px] rounded-md" />
            )}
            {items?.map((data) => {
               const item = data.name
               const isChecked = searchParams.getAll(paramName)?.includes(item)

               return (
                  <div
                     className="flex items-center py-3 px-1 border-b border-neutral-200 w-full"
                     key={item}
                  >
                     <input
                        id={`${item}-checkbox`}
                        type="checkbox"
                        value={item}
                        checked={isChecked}
                        onChange={(e) => onSelect(paramName, e.target.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                     />
                     <label
                        htmlFor={`${item}-checkbox`}
                        className="ms-2 text-sm font-medium text-neutral-700 w-full cursor-pointer"
                     >
                        {item[0].toUpperCase() + item.slice(1)}
                     </label>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
