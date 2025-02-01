import { toPastel } from "@/utils/toPastelColor"

interface IProps {
   colors: string[]
   handleQueryParams: (key: string, value: string) => void
   searchParams: URLSearchParams
}

export default function Colors({
   colors,
   handleQueryParams,
   searchParams,
}: IProps) {
   return (
      <div className="flex gap-4 items-center min-w-[85px]">
         <p className="label font-medium text-xs text-neutral-500 uppercase">
            color
         </p>
         <div className="flex items-center  gap-2">
            {colors?.map((color: string) => {
               const isChecked = searchParams.getAll("color")?.includes(color)

               return (
                  <div
                     key={color}
                     className="flex items-center w-[24px] h-[24px]"
                  >
                     <label
                        style={{
                           border: "1px solid transparent w-full h-full",
                           backgroundColor: toPastel(color),
                           borderColor: isChecked ? "black" : "transparent",
                        }}
                        htmlFor={`${color}--color-single`}
                        className={`w-[24px] h-[24px] rounded-full transition p-[3px] bg-clip-content border-[1px] bg-black cursor-pointer`}
                     ></label>
                     <input
                        type="radio"
                        value={color}
                        id={`${color}--color-single`}
                        className="hidden"
                        checked={isChecked}
                        onChange={(e) => {
                           handleQueryParams("color", e.target.value)
                        }}
                     />
                  </div>
               )
            })}
         </div>
      </div>
   )
}
