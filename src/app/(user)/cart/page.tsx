"use client"

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import Item from "./Item"
import Link from "next/link"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"

import { IPutCart, putCart } from "@/services/store/cart/Cart"
import { Span } from "next/dist/trace"

export default function Cart() {
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

   const handleCart = (id, count, colors, sizes) => {
      const newDataCart = cart
      const findIndex = newDataCart?.data?.findIndex(
         (item) =>
            item.data.id == id && item.colors == colors && item.sizes == sizes
      )

      newDataCart.data[findIndex].count = count

      mutation.mutate(newDataCart.data)
   }

   return (
      <>
         <div className="flex flex-col pt-12 gap-10">
            {isLoading && (
               <div className="animate-pulse w-full h-40 bg-neutral-200"></div>
            )}
            {cart?.data?.length === 0 && "Your cart is empty"}
            {cart?.data?.map((item) => (
               <Item
                  key={item.colors + item.sizes}
                  item={item}
                  handleCart={handleCart}
               />
            ))}
         </div>
      </>
   )
}
