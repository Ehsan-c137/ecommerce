"use client"
import { useGetCart } from "@/services/store/cart/Cart"
import { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import { Flip } from "gsap/Flip"

export default function CartLayout({ children }: { children: ReactNode }) {
   const pathname = usePathname()
   const router = useRouter()
   const { data: cart, isLoading } = useGetCart()
   gsap.registerPlugin(Flip)

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
         <div className="container flex flex-col md:flex-row gap-4 justify-between pt-4 pathContainer">
            <div>{children}</div>
            {cart?.data?.length > 0 && (
               <div className="hidden lg:flex flex-col border border-neutral-100 rounded-md px-6 py-8 w-[300px] max-w-[340px]">
                  <h5 className="text-neutral-900 font-normal mb-10">
                     {pathname === "/cart" && "Order Summary"}
                     {pathname === "/cart/checkout" && "Your Order"}
                  </h5>
                  {pathname === "/cart/checkout" && (
                     <div>
                        <button
                           onClick={() => {
                              router.push("/cart")
                           }}
                           className="btn-outline"
                        >
                           Edit Cart
                        </button>
                     </div>
                  )}
                  <div className="flex flex-col font-medium gap-4">
                     <div className="flex items-center justify-between">
                        <p className="text-neutral-500">Subtotal</p>

                        {isLoading ? (
                           <div
                              className="w-[34px] h-[20px] animate-pulse bg-white-200 rounded-md"
                              role="status"
                           >
                              <div className="sr-only">loading</div>
                           </div>
                        ) : (
                           <p className="text-neutral-900 text-nowrap">
                              ${subtotal}
                           </p>
                        )}
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

                        {isLoading ? (
                           <div
                              className="w-[34px] h-[20px] animate-pulse bg-white-200 rounded-md"
                              role="status"
                           >
                              <div className="sr-only">loading</div>
                           </div>
                        ) : (
                           <p className="text-neutral-900">
                              ${(subtotal + 3).toFixed(2)}
                           </p>
                        )}
                     </div>
                     <Link
                        href={"/cart/checkout"}
                        className="btn text-center justify-center mt-"
                     >
                        {pathname === "/cart" && "Checkout"}
                        {pathname === "/cart/checkout" && "Place Order"}
                     </Link>
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
            )}
         </div>
      </>
   )
}
