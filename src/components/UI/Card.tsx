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
            "flex-row w-full h-[130px] justify-between": isListView,
            "w-[165px] h-[278px] flex-col": !isListView,
         })}
      >
         <Link
            href={`products/${data?.slug?.toLowerCase()}`}
            className={clsx(
               "flex items-center justify-center transition opacity-0 duration-300 overflow-hidden",
               {
                  "w-[130px] h-[134px]": isListView,
                  "h-[222px]": !isListView,
                  "!opacity-100": imageLoaded,
               }
            )}
         >
            <Image
               src={data?.main_image + "?imwidth=320"}
               alt={data?.name}
               width={isListView ? 130 : 165}
               height={isListView ? 165 : 134}
               sizes="100vw"
               style={{
                  width: "auto",
                  height: isListView ? "100%" : "auto",
                  objectFit: "cover",
               }}
               onLoad={handleImageLoad}
               unoptimized
            />
         </Link>
         <div className="gap-2 hidden">
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
         <div
            className={clsx("flex flex-col justify-between", {
               "py-2 w-full": isListView,
            })}
         >
            <Link href={`products/${data?.slug?.toLowerCase()}`}>
               <p
                  className={clsx("font-medium text-titleActive", {
                     truncate: !isListView,
                  })}
               >
                  {data?.name}
               </p>
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
            <div className="flex justify-between items-center w-full">
               <p className="text-secondary">${data?.price}</p>

               <Icons.CardHeart />
            </div>
         </div>
      </div>
   )
}
