"use client"

import Item from "./Item"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { IPutCart, putCart } from "@/services/store/cart/Cart"

export default function Cart() {
   const { data: cart, isLoading } = useQuery({
      queryKey: ["cart"],
      queryFn: () => getCart(),
   })

   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: (data: IPutCart[]) => putCart(data),
      onError: (error) => {
         console.log("error", error)
         toast.error("something went wrong")
      },
   })

   const handleCart = (
      id: string,
      count: number,
      colors: string,
      sizes: string
   ) => {
      const newDataCart = cart
      const findIndex = newDataCart?.data?.findIndex(
         (item: {
            data: {
               id: string
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

   return (
      <>
         <div className="flex flex-col pt-12 gap-10">
            {isLoading && (
               <div className="animate-pulse w-full h-40 bg-neutral-200"></div>
            )}
            {cart?.data?.length === 0 && "Your cart is empty"}
            {cart?.data?.map(
               (item: {
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
               }) => (
                  <Item
                     key={item.colors + item.sizes}
                     item={item}
                     handleCart={handleCart}
                  />
               )
            )}
         </div>
      </>
   )
}
