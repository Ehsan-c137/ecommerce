import Image from "next/image"
import Link from "next/link"

interface IProps {
   name?: string
   price?: string | number
   isInStock?: boolean
}

export default function Card({ data }) {
   return (
      <Link
         href={`products/${data?.slug?.toLowerCase()}`}
         className="rounded-[4px] flex flex-col gap-2 w-[165px]"
      >
         <div className="flex items-center justify-center w-[165px] h-[220px] bg-neutral-100">
            <Image
               src={data?.main_image}
               alt={data?.name}
               width={165}
               height={220}
               unoptimized
               objectFit="cover"
               className="object-contain"
            />
         </div>
         <div className="flex flex-col">
            <p className="font-medium text-titleActive">{data?.name}</p>
            <div className="flex items-center">
               {/* <p
                  style={{
                     textDecoration:
                        data?.remaining == 0 ? "line-through" : "none",
                  }}
                  className={`px-4 py-[2px] border border-neutral-100 rounded-full`}
               >
                  IN STOCK
               </p> */}
               <p className="text-secondary">${data?.price}</p>
            </div>
         </div>
      </Link>
   )
}
