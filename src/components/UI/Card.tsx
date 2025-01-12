"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "../Icons/icons"
import { useState } from "react"

export default function Card({
   data,
   isListView = true,
}: {
   data: TProduct
   isListView?: boolean
}) {
   const [imageLoaded, setImageLoaded] = useState(false)
   const handleImageLoad = () => {
      setImageLoaded(true)
   }
   return (
      <div
         className={clsx("item-card flex gap-2 ", {
            "flex-row w-full h-[134px]": isListView,
            "w-[165px]  flex-col": !isListView,
         })}
      >
         <Link
            href={`products/${data?.slug?.toLowerCase()}`}
            className={clsx(
               "flex items-center justify-center transition opacity-0 duration-500",
               {
                  "w-[130px] h-[134px]": isListView,
                  "!opacity-100": imageLoaded,
               }
            )}
         >
            <Image
               src={data?.main_image}
               alt={data?.name}
               width={100}
               height={134}
               sizes="100vw"
               style={{
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
               }}
               onLoad={handleImageLoad}
               unoptimized
            />
         </Link>
         <div
            className={clsx("flex flex-col justify-between", {
               "py-2 w-full": isListView,
            })}
         >
            <Link href={`products/${data?.slug?.toLowerCase()}`}>
               <p className="font-medium text-titleActive">{data?.name}</p>
            </Link>
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
            </div>
            <div className="flex-col gap-2 w-full">
               <p className="text-secondary">${data?.price}</p>
               <div className="flex justify-between w-full">
                  <div className="flex gap-2">
                     <p className="text-label">size</p>
                     {data?.options?.sizes?.map((item) => (
                        <div
                           key={item}
                           className="w-[24px] h-[24px] rounded-full border flex items-center justify-center"
                        >
                           <p className="text-label text-xs">{item}</p>
                        </div>
                     ))}
                  </div>

                  <Icons.CardHeart />
               </div>
            </div>
         </div>
      </div>
   )
}
