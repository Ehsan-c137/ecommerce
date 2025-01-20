"use client"
import { useQuery } from "@tanstack/react-query"
import {
   getProductByCategoryId,
   getAllCategory,
} from "@/services/store/category/category"
import { useState } from "react"
import Product from "./UI/Product"
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

   console.log(data)
   return (
      <>
         <div className="px-3 pb-4 flex w-full justify-between truncate gap-2">
            {categories?.map((item) => (
               <button
                  key={item.name}
                  className={clsx({
                     "active-section": item.id === activeCategory,
                  })}
                  onClick={() => setActiveCategory(item.id)}
               >
                  {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
               </button>
            ))}
         </div>
         <div className="grid grid-cols-2 gap-4">
            {isLoading &&
               Array.from({ length: 4 }).map((_, i) => (
                  <div
                     key={i}
                     className="w-[165px] h-[200px] bg-label animate-pulse"
                  ></div>
               ))}
            {data?.slice(0, 4)?.map((item) => (
               <Product key={item.id} item={item} />
            ))}
         </div>
      </>
   )
}
