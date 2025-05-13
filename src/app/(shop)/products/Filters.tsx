"use client"

import Products from "./Products"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import {
   PriceFilter,
   ColorFilter,
   SizeFilter,
} from "@/components/common/Filter"
import Drawer from "@/components/UI/Drawer/Drawer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import useGetAllProducts from "@/services/store/product/products"

const toPathname = (pathname: string | null, search: string | null) =>
   `${pathname}${search ? `?${search}` : ""}`

export default function Filters() {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()

   const { data: allProducts, isLoading: productsLoading } = useGetAllProducts(
      1,
      2
   )

   const colors = allProducts
      ?.flatMap((product: TProduct) => product.options.colors)
      .map((item: string) => item?.toLowerCase())
      .filter(
         (color: string, index: number, self: string[]) =>
            self.indexOf(color) === index
      )

   const sizes = allProducts
      ?.flatMap((product: TProduct) => product.options.sizes)
      .map((item: string) => item?.toLowerCase())
      .filter(
         (color: string, index: number, self: string[]) =>
            self.indexOf(color) === index
      )

   const minPrice = allProducts?.reduce(
      (min: number, item: { price: number }) => Math.min(min, item.price),
      allProducts[0]?.price
   )

   const maxPrice = allProducts?.reduce(
      (max: number, item: { price: number }) => Math.max(max, item.price),
      allProducts[0]?.price
   )

   const handleQueryParams = useCallback(
      (name: string, value: string) => {
         if (!searchParams) return
         const current = new URLSearchParams(Array.from(searchParams.entries()))
         const currentQuery = current.getAll(name)

         if (!value) {
            current.delete(name)
         }

         if (currentQuery.includes(value)) {
            current.delete(name, value)
         } else {
            current.append(name, value)
         }

         const search = current.toString()
         const query = search ? `?${search}` : ""
         router.push(`${pathname}${query}`)
      },
      [router, searchParams, pathname]
   )

   const handleSetMinPrice = (min: number) => {
      if (!searchParams) return
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      if (min > minPrice) {
         current.set("min price", `${min}`)
         const search = current.toString()
         router.push(toPathname(pathname, search))
         return
      }
      current.delete("min price")
      const search = current.toString()
      router.push(toPathname(pathname, search))
   }

   const handleSetMaxPrice = (max: number) => {
      if (!searchParams) return
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      if (max == maxPrice) {
         current.delete("max price")
         const search = current.toString()
         router.push(toPathname(pathname, search))
         return
      }
      if (max <= maxPrice) {
         current.set("max price", `${max}`)
         const search = current.toString()
         router.push(toPathname(pathname, search))
         return
      }
      current.delete("max price")
      const search = current.toString()
      router.push(toPathname(pathname, search))
   }

   useGSAP(() => {
      gsap.from(".filter-section", {
         x: -100,
         opacity: 0,
         ease: "power3.out",
      })
      gsap.to(".filter-section", {
         opacity: 1,
         duration: 0.5,
         ease: "power3.out",
      })
   }, [])

   if (!searchParams) {
      return null
   }

   return (
      <>
         <div className="hidden filter-section sm:flex flex-col gap-6 border border-neutral-100 rounded-sm w-[228px] py-4 sticky top-[--header-height] left-0 h-fit">
            <ColorFilter
               colors={colors}
               searchParams={searchParams}
               onSelect={handleQueryParams}
               isLoading={productsLoading}
            />

            <SizeFilter
               sizes={sizes}
               searchParams={searchParams}
               onSelect={handleQueryParams}
               isLoading={productsLoading}
            />

            <PriceFilter
               minPrice={minPrice}
               maxPrice={maxPrice}
               isLoading={productsLoading}
               handleSetMinPrice={handleSetMinPrice}
               handleSetMaxPrice={handleSetMaxPrice}
            />
         </div>

         <div className="flex flex-col gap-1 w-full">
            <Products
               minPrice={searchParams.get("min price") ?? minPrice}
               maxPrice={searchParams.get("max price") ?? maxPrice}
            />
         </div>

         <Drawer
            isOpen={searchParams.get("filter-drawer") === "true"}
            setIsOpen={() => handleQueryParams("filter-drawer", "true")}
         >
            <div className="flex flex-col gap-6 px-4 overflow-y-auto">
               <ColorFilter
                  colors={colors}
                  searchParams={searchParams}
                  isLoading={productsLoading}
                  onSelect={handleQueryParams}
               />

               <SizeFilter
                  sizes={sizes}
                  searchParams={searchParams}
                  onSelect={handleQueryParams}
                  isLoading={productsLoading}
               />

               <PriceFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  isLoading={productsLoading}
                  handleSetMinPrice={handleSetMinPrice}
                  handleSetMaxPrice={handleSetMaxPrice}
               />
            </div>
         </Drawer>
      </>
   )
}
