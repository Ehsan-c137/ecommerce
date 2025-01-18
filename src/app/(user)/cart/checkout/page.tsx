"use client"

import { Icons } from "@/components/Icons/icons"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getCart } from "@/services/store/cart/Cart"
import { IPutCart, putCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"
import Item from "../Item"
import Link from "next/link"
import clsx from "clsx"
import style from "../cart.module.css"

export default function Checkout() {
   const { data: cart, isLoading } = useQuery({
      queryKey: ["cart"],
      queryFn: () => getCart(),
   })

   const mutation = useMutation({
      mutationFn: (data: IPutCart[]) => putCart(data),
      onError: (error) => {
         console.log("error", error)
         toast.error("something went wrong")
      },
   })

   const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({
         queryKey: ["cart"],
      })
   }

   const subtotal = cart?.data?.reduce(
      (
         acc: number,
         item: { count: number; data: { price: number | string } }
      ) => {
         return item.count * Number(item.data?.price) + acc
      },
      0
   )

   return (
      <>
         <div className="flex flex-col items-center gap-4">
            <div className="w-full justify-around items-center flex">
               <div className="justify-center flex-col items-center flex gap-1 w-full relative">
                  <Icons.Border />
               </div>
            </div>
            {isLoading ? (
               <div className="w-full flex justify-center items-center min-h-[300px]">
                  <span className="loader-black"></span>
               </div>
            ) : (
               <div className="flex flex-col gap-2 px-4 h-full overflow-auto">
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
                        />
                     )
                  )}
               </div>
            )}
         </div>
         {!isLoading && (
            <div
               className={clsx("fixed bottom-[56px] w-full px-4 opacity-0", {
                  [style.show_info]: !isLoading,
               })}
            >
               <div className="flex gap-2 justify-between py-2 px-1 border-t">
                  <div className="flex gap-2">
                     <Icons.Delivery />
                     <p className="text-body body-m">Delivery</p>
                  </div>
                  <p className="text-label body-m">Free</p>
               </div>
               <div className="flex gap-2 py-2 border-t px-1">
                  <Icons.Voucher />
                  <p className="text-body body-m">Add promo code</p>
               </div>
               <div className="border-t flex justify-between gap-4 py-4 px-1">
                  <p className="subtitle uppercase">EST. Total</p>
                  <p className="text-secondary subtitle tracking-[3px]">
                     ${subtotal}
                  </p>
               </div>
            </div>
         )}
         <Link
            href={"/cart/checkout"}
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
               <Link
                  href="/cart/checkout/shipping"
                  className="flex items-center gap-4"
               >
                  <Icons.ShoppingBagWhite />
                  <p className="text-[18px] uppercase">checkout</p>
               </Link>
            )}
         </Link>
      </>
   )
}
