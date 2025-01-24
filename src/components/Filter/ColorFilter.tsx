import { FilterProps } from "@/types/types"

interface ColorFilterProps extends FilterProps {
   colors: string[]
}

export function ColorFilter({
   colors,
   searchParams,
   onSelect,
}: ColorFilterProps) {
   return (
      <div className="flex flex-col gap-4 px-4">
         <p className="text-neutral-900 font-medium">Color</p>
         <div className="flex items-center gap-3">
            {colors.map((color) => {
               const isChecked = searchParams.getAll("color")?.includes(color)
               return (
                  <div key={color} className="flex items-center">
                     <label
                        style={{
                           border: "1px solid transparent",
                           borderColor: isChecked ? "black" : "transparent",
                           backgroundColor: color,
                        }}
                        htmlFor={`${color}--color`}
                        className="w-7 h-7 rounded-full transition p-[3px] bg-clip-content cursor-pointer"
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
      </div>
   )
}
