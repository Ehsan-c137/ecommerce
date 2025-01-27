"use client"
import { useQuery } from "@tanstack/react-query"
import {
   getProductByCategoryId,
   getAllCategory,
} from "@/services/store/category/category"
import { useState } from "react"
import Product from "../UI/Product"
import clsx from "clsx"

export default function NewArrival() {
   const [activeCategory, setActiveCategory] = useState(1)

   const { data: allCategory } = useQuery({
      queryKey: ["all-category"],
      queryFn: () => getAllCategory(),
   })

   const { data, isLoading } = useQuery({
      queryKey: ["product", activeCategory],
      queryFn: () => getProductByCategoryId(activeCategory),
   })

   const categories = allCategory?.slice(0, 4)

   return (
      <>
         <div className="px-3 pb-4 flex w-full justify-between truncate gap-2 h-[40px]">
            {categories?.map((item: TCategory) => (
               <button
                  key={item.name}
                  className={clsx("text-titleActive", {
                     "active-section": item.id === activeCategory,
                  })}
                  onClick={() => setActiveCategory(item.id)}
               >
                  {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
               </button>
            ))}
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {isLoading &&
               Array.from({ length: 4 }).map((_, i) => (
                  <div
                     key={i}
                     className="w-[165px] h-[280px] bg-inputBackground animate-pulse"
                  ></div>
               ))}
            {data?.slice(0, 4)?.map((item: TProduct) => (
               <Product key={item.id} item={item} />
            ))}
         </div>
      </>
   )
}
