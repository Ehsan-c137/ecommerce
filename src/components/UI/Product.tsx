import Image from "next/image"
import { useState } from "react"
export default function Product({ item }: { item: TProduct }) {
   const [isLoaded, setIsLoaded] = useState(false)
   return (
      <div className={`w-[165px] text-center`}>
         <div className="h-[220px]">
            <Image
               src={item?.main_image}
               width={"165"}
               height={220}
               alt={item?.name}
               className="transition"
               style={{
                  opacity: isLoaded ? 1 : 0,
                  objectFit: "cover",
               }}
               onLoad={() => setIsLoaded(true)}
            />
         </div>
         <p className="text-body body-s truncate">{item?.name}</p>
         <p className="text-primary text-md">${item?.price}</p>
      </div>
   )
}
