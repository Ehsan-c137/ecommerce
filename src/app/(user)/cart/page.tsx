"use client"

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import Item from "./Item"
import Link from "next/link"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"

import { IPutCart, putCart } from "@/services/store/cart/Cart"

export default function Cart() {
   const { data: cart } = useQuery({
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

   const total = cart?.data?.reduce((acc, item) => {
      return item.count * Number(item.data?.price) + acc
   }, 0)

   return (
      <>
         <div className="bg-white-100 h-40 flex items-center ">
            <div className="container mx-auto flex flex-col gap-1 px-4 lg:px-0 ">
               <h3 className="text-neutral-900">Cart</h3>
               <Breadcrumb />
            </div>
         </div>
         <div className="container flex flex-col md:flex-row gap-12 justify-between pt-10 px-4 lg:px-0">
            <div>
               <h5 className="text-neutral-900 border-b pb-4 border-white-200">
                  Your cart
               </h5>
               <div className="flex flex-col pt-12 gap-10">
                  {cart?.data?.length === 0 && "Your cart is empty"}
                  {cart?.data?.map((item) => (
                     <Item
                        key={item.colors + item.sizes}
                        item={item}
                        handleCart={handleCart}
                     />
                  ))}
               </div>
            </div>
            <div className="flex flex-col border border-neutral-100 rounded-md px-6 py-8 w-[300px] max-w-[340px]">
               <h5 className="text-neutral-900 font-normal mb-10">
                  Order Summary
               </h5>
               <div className="flex flex-col font-medium gap-4">
                  <div className="flex items-center justify-between">
                     <p className="text-neutral-500">Subtotal</p>
                     <p className="text-neutral-900 text-nowrap">$ {total}</p>
                  </div>
                  <div className="flex justify-between items-start">
                     <p className="text-neutral-500">Shipping: </p>
                     <p className="text-neutral-900">Free</p>
                  </div>
                  <div className="flex justify-between items-start">
                     <p className="text-neutral-500">Tax</p>
                     <p className="text-neutral-900">$ 3.00</p>
                  </div>
               </div>
               <div className="w-full h-[1px] bg-neutral-100 my-6"></div>
               <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                     <p className="text-neutral-500">Total</p>
                     <p className="text-neutral-900">$ {total + 3}</p>
                  </div>
                  <button className="btn text-center justify-center mt-">
                     Checkout
                  </button>
                  <div className="flex justify-center">
                     <Link
                        href={"/products"}
                        className="text-neutral-900 text-xs border-b text-center  border-neutral-900 font-medium"
                     >
                        Continue Shopping
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
