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
import clsx from "clsx"

export default function Products({
   maxPrice,
   minPrice,
}: {
   maxPrice: number
   minPrice: number
}) {
   const searchParams = useSearchParams()
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [isListView, setIsListView] = useState(!!searchParams.get("listView"))
   const handleQueryParams = useHandleQueryParams()
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

   return (
      <>
         <div className="text-neutral-500 justify-end flex items-center w-full mt-4">
            <div>
               <div className="relative inline-block text-left">
                  <div className="flex items-center gap-2">
                     <button
                        id="menu-button"
                        aria-label={
                           searchParams.get("listView") == "true"
                              ? "group view"
                              : "list view"
                        }
                        onClick={() => {
                           handleQueryParams("listView", "true")
                           setIsListView((prev) => !prev)
                        }}
                        className="w-[36px] h-[36px] p-2 bg-[#c4c4c42c] flex items-center justify-center rounded-full"
                     >
                        {searchParams.get("listView") == "true" ? (
                           <Icons.GroupView />
                        ) : (
                           <Icons.ListView />
                        )}
                     </button>
                     <button
                        id="menu-button"
                        onClick={() => {
                           handleQueryParams("decending", "true")
                        }}
                        aria-label="decending filter"
                        className="w-[36px] h-[36px] bg-[#c4c4c42c] flex items-center justify-center rounded-full"
                     >
                        <Icons.Filter
                           color={
                              searchParams.get("decending") === "true"
                                 ? "#DD8560"
                                 : "black"
                           }
                        />
                     </button>
                  </div>
                  {isDropdownOpen && (
                     <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white-900 shadow-lg ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none"
                        role="menu"
                        tabIndex={0}
                        onBlur={() => setIsDropdownOpen(false)}
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
               const skipKey = [
                  "max price",
                  "min price",
                  "acending",
                  "decending",
                  "listView",
               ]
               if (skipKey.includes(key)) {
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
               "grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 py-2",
               {
                  "grid-cols-2": !isListView,
               }
            )}
         >
            {isError && <p>{error.message}</p>}
            {isLoading &&
               Array.from({ length: 6 }).map((_, i) => {
                  return (
                     <div
                        key={i}
                        className=" bg-white-200 animate-pulse"
                        style={{
                           width: isListView ? "343px" : "165px",
                           height: isListView ? "134px" : "302px",
                        }}
                     >
                        &nbsp;
                     </div>
                  )
               })}

            {filteredData?.map((product: TProduct) => {
               return (
                  <Card
                     key={product.id}
                     data={product}
                     isListView={isListView}
                  />
               )
            })}
         </div>
      </>
   )
}
