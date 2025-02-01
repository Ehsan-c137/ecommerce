interface IProps {
   sizes: string[]
   handleQueryParams: (key: string, value: string) => void
   searchParams: URLSearchParams
}

export default function Sizes({
   sizes,
   handleQueryParams,
   searchParams,
}: IProps) {
   return (
      <div className="flex gap-4 items-center">
         <p className="label font-medium text-xs text-neutral-500 uppercase">
            size
         </p>
         <div className="flex items-center gap-2">
            {sizes?.map((item: string) => {
               const isChecked = searchParams.getAll("size")?.includes(item)

               return (
                  <div key={item} className="flex items-center">
                     <label
                        style={{
                           borderColor: isChecked ? "black" : "#e6e7e8",
                           backgroundColor: isChecked ? "black" : "transparent",
                           color: isChecked ? "#e6e7e8" : "black",
                        }}
                        htmlFor={`${item}--size`}
                        className="flex items-center text-[10px] uppercase justify-center w-[24px] h-[24px] rounded-full text-inputBackground cursor-pointer border border-neutral-100 transition"
                     >
                        {item}
                     </label>
                     <input
                        type="checkbox"
                        value={item}
                        id={`${item}--size`}
                        className="hidden"
                        checked={isChecked}
                        onChange={(e) => {
                           handleQueryParams("size", e.target.value)
                        }}
                     />
                  </div>
               )
            })}
         </div>
      </div>
   )
}
