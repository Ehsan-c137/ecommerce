import { Icons } from "@/components/Icons/icons"
import Image from "next/image"
import { useState } from "react"

interface IProps {
   handleCart: (
      id: string,
      count: number,
      colors: string,
      sizes: string
   ) => void
   item: {
      data: {
         id: string
         main_image: string
         name: string
         price: number | string
         remaining: number
      }
      count: number
      colors: string
      sizes: string
   }
}
export default function Item({ item, handleCart }: IProps) {
   const [count, setCount] = useState(item.count)
   const { remaining } = item.data
   const handleDeleteFromCart = () => {
      handleCart(item.data.id, 0, item.colors, item.sizes)
   }

   return (
      <div className="flex  items-center gap-8">
         <div className="w-20 h-20 bg-white-100 flex items-center justify-center relative">
            <div className="absolute top-0 right-0 bg-white-200 md:hidden">
               <Icons.X />
            </div>
            <Image
               src={item.data.main_image}
               alt="product"
               width={60}
               height={60}
               objectFit="cover"
            />
         </div>
         <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-row flex-wrap md:flex-row items-center gap-8">
               <p className="text-neutral-900 w-40">{item.data.name}</p>
               <p className="text-neutral-500">
                  Color: {item.colors} — Size: {item.sizes}
               </p>
            </div>
            <div className="flex items-center gap-8">
               <p className="text-neutral-900 font-medium text-base text-nowrap">
                  $ {item?.data.price}
               </p>
               <div className="flex items-center border border-neutral-100 rounded-md">
                  <button
                     className="h-10 w-10 flex items-center justify-center cursor-pointer"
                     onClick={() => {
                        setCount(count - 1)
                        handleCart(
                           item.data.id,
                           count - 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={count == 1}
                  >
                     <Icons.Minus />
                  </button>

                  <p className="h-10 w-10 text-center  flex justify-center items-center">
                     {count}
                  </p>
                  <button
                     className="h-10 w-10 flex items-center justify-center cursor-pointer"
                     onClick={() => {
                        setCount(count + 1)
                        handleCart(
                           item.data.id,
                           count + 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={count == remaining}
                  >
                     <Icons.Plus />
                  </button>
               </div>
            </div>
         </div>
         <div
            className="h-10 w-10 cursor-pointer items-center justify-center bg-white-100 rounded-md hidden md:flex"
            onClick={handleDeleteFromCart}
         >
            <Icons.X />
         </div>
      </div>
   )
}
