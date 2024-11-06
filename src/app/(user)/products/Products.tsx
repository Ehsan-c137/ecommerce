"use client"

import Card from "@/components/Card/Card"
import products from "@/services/store/product/products"
import useGetAllSearchParams from "@/utils/useGetAllSearchParams"
import { useQuery } from "@tanstack/react-query"
import { Categories } from "@/utils/constant"
import { useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import useHandleQueryParams from "@/utils/useHandleQueryParams"
import { Icons } from "@/components/Icons/icons"
import { useState } from "react"
import Link from "next/link"

export default function Products({ maxPrice, minPrice }) {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const searchParams = useSearchParams()
   const allSearchParams = useGetAllSearchParams()
   const groupped = Object.groupBy(allSearchParams, (item) => item.name)
   const allSearchParamsObj = {}
   Object.entries(groupped).forEach(([key, value]) => {
      allSearchParamsObj[key] = value.map((item) => item.value)
   })

   const handleQueryParams = useHandleQueryParams()

   const checkParams = (array: string[], items: []) => {
      return items?.some((item) => array?.includes(item))
   }

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   })

   const filterProduct = useCallback(
      (data) => {
         if (!data) return
         if (searchParams.get("ascending") === "true") {
            data?.sort((a, b) => a.price - b.price)
         }
         if (searchParams.get("ascending") === "false") {
            data?.sort((a, b) => b.price - a.price)
         }
         return data?.filter((product) => {
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

   return (
      <>
         {allSearchParams.filter(
            (item) =>
               item.name !== "max price" &&
               item.name !== "min price" &&
               item.name !== "ascending"
         ).length > 0 && (
            <p className="text-neutral-900 font-medium">Applied Filters:</p>
         )}

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
         <div className="text-neutral-500 justify-end flex items-center w-full py-4">
            {/* <p>Showing 1-9 of {filteredData?.length} results.</p> */}

            <div>
               <div className="relative inline-block text-left">
                  <button
                     type="button"
                     className="uppercase flex item-center text-sm  text-neutral-900 "
                     id="menu-button"
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                     Sort by
                     <Icons.ChevronDown />
                  </button>
                  {isDropdownOpen && (
                     <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white-900 shadow-lg ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none"
                        role="menu"
                        tabIndex={-1}
                     >
                        <div className="py-1" role="none">
                           <Link
                              href={
                                 searchParams.get("ascending") === "true"
                                    ? "?ascending=false"
                                    : "?ascending=true"
                              }
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              onClick={() => setIsDropdownOpen(false)}
                              tabIndex={-1}
                              id="menu-item-0"
                           >
                              {searchParams.get("ascending") === "true"
                                 ? "Descending"
                                 : "Ascending"}
                           </Link>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8 ">
            {isError && <p>{error.message}</p>}
            {isLoading && (
               <>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "304px",
                        height: "394px",
                     }}
                  >
                     &nbsp;
                  </div>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "304px",
                        height: "394px",
                     }}
                  >
                     &nbsp;
                  </div>
                  <div
                     className=" bg-white-200 animate-pulse"
                     style={{
                        width: "304px",
                        height: "394px",
                     }}
                  >
                     &nbsp;
                  </div>
               </>
            )}

            {filteredData?.map((product: any) => (
               <Card key={product.id} data={product} />
            ))}
         </div>
      </>
   )
}
