"use client"

import Item from "./Item"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IPutCart, putCart, useGetCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"
import Link from "next/link"
import { Icons } from "@/components/Icons/icons"
import style from "./cart.module.css"
import clsx from "clsx"
import { useEffect, useRef } from "react"

export default function Cart() {
   const pathnameRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      if (pathnameRef.current) {
         pathnameRef.current.style.transform = "translateX(0)"
      }
   }, [])

   const { data: cart, isLoading } = useGetCart()
   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: (data: IPutCart[]) => putCart(data),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["cart"],
         })
      },
      onError: (error) => {
         console.log("error", error)
         toast.error("something went wrong")
      },
   })

   const handleCart = (
      id: number,
      count: number,
      colors: string,
      sizes: string
   ) => {
      const newDataCart = cart
      const findIndex = newDataCart?.data?.findIndex(
         (item: {
            data: {
               id: number
            }
            colors: string
            sizes: string
         }) =>
            item.data.id == id && item.colors == colors && item.sizes == sizes
      )
      if (count === 0) {
         newDataCart.data.splice(findIndex, 1)
      } else {
         newDataCart.data[findIndex].count = count
      }

      mutation.mutate(newDataCart.data)
   }

   const isCartEmpty = !cart?.data?.length

   return (
      <div className="h-full">
         <div className="flex flex-col gap-4 px-4 h-full pb-[224px]">
            <div
               ref={pathnameRef}
               className={clsx(
                  "text-titleActive uppercase px-4 flex items-center justify-center gap-2 -translate-x-4 transition-transform"
               )}
            >
               Cart
            </div>
            <div className="w-full justify-around items-center flex">
               <div className="justify-center flex-col items-center flex gap-1 w-full relative">
                  <Icons.Border />
               </div>
            </div>
            {isLoading ? (
               <div className="w-full flex justify-center items-center h-[300px]">
                  <span className="loader-black"></span>
               </div>
            ) : (
               <div className="flex flex-col gap-6 h-full overflow-y-hidden">
                  {cart?.data?.map(
                     (item: {
                        data: TProduct
                        count: number
                        colors: string
                        sizes: string
                     }) => (
                        <Item
                           key={item.colors + item.sizes}
                           item={item}
                           handleCart={handleCart}
                           isLoading={mutation.isPending}
                        />
                     )
                  )}

                  {isCartEmpty && (
                     <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                        <p className="text-placeholder">
                           You have no items in your Shopping Bag.
                        </p>
                     </div>
                  )}
               </div>
            )}
         </div>
         {!isCartEmpty && (
            <div
               className={clsx(
                  "fixed bottom-[56px] pb-4 w-full px-4 opacity-0 noisy-background",
                  {
                     [style.show_info]: !isLoading,
                  }
               )}
            >
               <div className="border-t flex flex-col gap-4 py-4 px-2">
                  <div className="flex justify-between">
                     <p className="subtitle uppercase">Sub Total</p>
                     <p className="text-secondary subtitle tracking-[3px]">
                        {/* ${subtotal} */}
                     </p>
                  </div>
                  <p className="body-m text-placeholder">
                     *shipping charges, taxes and discount codes are calculated
                     at the time of accounting.
                  </p>
               </div>
            </div>
         )}
         <Link
            href={isCartEmpty ? "/products" : "/cart/checkout"}
            className={clsx(
               "fixed -bottom-[60px] w-full text-offWhite flex justify-center items-center gap-6 bg-black h-[56px]",
               {
                  [style.show_button]: !isLoading,
               }
            )}
         >
            {isLoading ? (
               <span className="loader"></span>
            ) : (
               <>
                  <Icons.ShoppingBagWhite />
                  <p className="text-[18px] uppercase">
                     {isCartEmpty ? "Continue shopping" : `Buy now`}
                  </p>
               </>
            )}
         </Link>
      </div>
   )
}
