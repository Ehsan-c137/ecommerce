/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Card from "@/components/UI/Card"
import products from "@/services/store/product/products"
import useGetAllSearchParams from "@/utils/useGetAllSearchParams"
import { useQuery } from "@tanstack/react-query"
import { Categories } from "@/utils/constant"
import { useSearchParams } from "next/navigation"
import { useCallback, useMemo, useRef } from "react"
import useHandleQueryParams from "@/utils/useHandleQueryParams"
import { Icons } from "@/components/Icons/icons"
import { useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import clsx from "clsx"
import Link from "next/link"

export default function Products({
   maxPrice,
   minPrice,
}: {
   maxPrice: number
   minPrice: number
}) {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [isListView, setIsListView] = useState(false)
   const handleQueryParams = useHandleQueryParams()
   const searchParams = useSearchParams()
   const allSearchParams = useGetAllSearchParams()
   const groupped = Object.groupBy(allSearchParams, (item) => item.name)

   const allSearchParamsObj: { [key: string]: string[] } = {}
   Object.entries(groupped).forEach(([key, value]) => {
      allSearchParamsObj[key] = value!.map((item) => item.value)
   })

   const checkParams = (array: string[], items: []) => {
      return items?.some((item) => array?.includes(item))
   }

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   })

   // useEffect(() => {
   //    handleQueryParams("ascending", "false")
   // }, [])

   const filterProduct = useCallback(
      (data: TProduct[]) => {
         if (!data) return
         if (searchParams.get("ascending") === "true") {
            data?.sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10))
         }
         if (searchParams.get("decending") === "true") {
            data?.sort((a, b) => parseInt(b.price, 10) - parseInt(a.price, 10))
         }

         return data?.filter((product: TProduct) => {
            const productColors = product.options?.colors
            const productSizes = product.options?.sizes
            const productCategory = product.category

            const isThereColor = checkParams(
               searchParams.getAll("color"),
               productColors
            )

            const isThereSize = checkParams(
               searchParams.getAll("size"),
               productSizes
            )

            const productPrice = Number(product.price)
            const minPriceN = Number(minPrice)

            if (allSearchParams.length > 0) {
               if (isThereColor) {
                  return product
               }
               if (isThereSize) {
                  return product
               }
               if (productPrice >= minPriceN && productPrice <= maxPrice) {
                  return product
               }

               if (
                  searchParams
                     .getAll("category")
                     ?.includes(Categories[productCategory])
               )
                  return product
            } else {
               return product
            }
         })
      },
      [allSearchParams, searchParams, minPrice, maxPrice]
   )

   const filteredData = useMemo(
      () => data && filterProduct(data),
      [data, filterProduct]
   )

   const cardContainerRef = useRef<HTMLDivElement | null>(null)

   // useGSAP(
   //    () => {
   //       if (cardContainerRef.current) {
   //          gsap.fromTo(
   //             ".card-item",
   //             {
   //                opacity: 0,
   //                ease: "power3.inOut",
   //                duration: 300,
   //             },
   //             { opacity: 1, stagger: 0.25 }
   //          )
   //       }
   //    },
   //    {
   //       scope: cardContainerRef.current!,
   //       dependencies: [filteredData, isListView],
   //       revertOnUpdate: false,
   //    }
   // )

   return (
      <>
         {/* {allSearchParams.filter(
            (item) =>
               item.name !== "max price" &&
               item.name !== "min price" &&
               item.name !== "ascending"
         ).length > 0 && (
            <p className="text-neutral-900 font-medium">Applied Filters:</p>
         )} */}
         <div className="text-neutral-500 justify-end flex items-center w-full mt-4">
            {/* <p>Showing 1-9 of {filteredData?.length} results.</p> */}

            <div>
               <div className="relative inline-block text-left">
                  <div className="flex items-center gap-2">
                     <button className="w-[72px] h-[36px] bg-[#c4c4c42c] flex items-center justify-center rounded-full gap-2">
                        <p>New</p>
                        <svg
                           width="8"
                           height="6"
                           viewBox="0 0 8 6"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M3.71492 5.27472L0.235658 0.574577L7.19418 0.574577L3.71492 5.27472Z"
                              fill="#333333"
                           />
                        </svg>
                     </button>
                     <button
                        id="menu-button"
                        onClick={() =>
                           handleQueryParams(
                              "listView",
                              searchParams.get("listView") == "true"
                                 ? "false"
                                 : "true"
                           )
                        }
                        className="w-[36px] h-[36px] p-2 bg-[#c4c4c42c] flex items-center justify-center rounded-full"
                     >
                        {searchParams.get("listView") == "true" ? (
                           <Icons.GroupView />
                        ) : (
                           <Icons.ListView />
                        )}
                     </button>
                     <Link
                        id="menu-button"
                        href={
                           searchParams.get("decending") === "true"
                              ? "?decending=false"
                              : "?decending=true"
                        }
                        // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        // onBlur={() => setIsDropdownOpen(false)}
                        className="w-[36px] h-[36px] bg-[#c4c4c42c] flex items-center justify-center rounded-full"
                     >
                        <Icons.Filter
                           color={
                              searchParams.get("decending") === "true"
                                 ? "#DD8560"
                                 : "black"
                           }
                        />
                     </Link>
                  </div>
                  {isDropdownOpen && (
                     <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white-900 shadow-lg ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none"
                        role="menu"
                        tabIndex={0}
                     >
                        <div className="py-1" role="dialog">
                           <a
                              href={
                                 searchParams.get("ascending") === "true"
                                    ? "?ascending=false"
                                    : "?ascending=true"
                              }
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              // onClick={() => setIsDropdownOpen(false)}
                              tabIndex={-1}
                              id="menu-item-0"
                           >
                              {searchParams.get("ascending") === "true"
                                 ? "Descending"
                                 : "Ascending"}
                           </a>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className="flex flex-wrap gap-3">
            {Object.entries(allSearchParamsObj).map(([key, value]) => {
               if (key === "max price") {
                  return
               }
               if (key === "min price") {
                  return
               }
               if (key === "ascending") {
                  return
               }
               return (
                  <div key={key} className="flex items-center gap-2">
                     <p className="font-medium">
                        {key[0].toUpperCase() + key.slice(1)}:
                     </p>
                     {value.map((item) => {
                        return (
                           <button
                              className="btn-outline text-label flex justify-between items-center gap-2 transition"
                              key={item}
                           >
                              {item[0]?.toUpperCase() + item?.slice(1)}
                              <div
                                 onClick={() => {
                                    handleQueryParams(key, item)
                                 }}
                              >
                                 <Icons.X />
                              </div>
                           </button>
                        )
                     })}
                  </div>
               )
            })}
         </div>
         <div
            ref={cardContainerRef}
            className={clsx(
               "grid grid-cols-1 md:justify-items-start md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-1 gap-4 py-2",
               {
                  "grid-cols-2": !isListView,
               }
            )}
         >
            {isError && <p>{error.message}</p>}
            {isLoading && (
               <>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "165px",
                        height: "302px",
                     }}
                  >
                     &nbsp;
                  </div>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "165px",
                        height: "302px",
                     }}
                  >
                     &nbsp;
                  </div>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "165px",
                        height: "302px",
                     }}
                  >
                     &nbsp;
                  </div>
               </>
            )}

            {filteredData?.map((product: TProduct) => {
               return (
                  <div key={product.id} className="card-item">
                     <Card data={product} isListView={isListView} />
                  </div>
               )
            })}
         </div>
      </>
   )
}
