import Image from "next/image"
import { useState } from "react"
export default function Product({ item }) {
   const [isLoaded, setIsLoaded] = useState(false)
   return (
      <div className={`w-[165px] text-center`}>
         <Image
            src={item?.main_image}
            width={"165"}
            height={200}
            alt={item?.name}
            className="transition"
            style={{
               opacity: isLoaded ? 1 : 0,
            }}
            onLoad={() => setIsLoaded(true)}
         />
         <p className="text-body body-s">{item?.name}</p>
         <p className="text-primary text-md">${item?.price}</p>
      </div>
   )
}
