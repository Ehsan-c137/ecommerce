import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Item from "./Item";
import Link from "next/link";

export default function Cart() {
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
                  <Item />
                  <Item />
               </div>
            </div>
            <div className="flex flex-col border border-neutral-100 rounded-md px-6 py-8 w-[300px] max-w-[340px]">
               <h5 className="text-neutral-900 font-normal mb-10">
                  Order Summary
               </h5>
               <div className="flex flex-col font-medium gap-4">
                  <div className="flex items-center justify-between">
                     <p className="text-neutral-500">Subtotal</p>
                     <p className="text-neutral-900 text-nowrap">$ 90.00</p>
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
                     <p className="text-neutral-900">$ 100.00</p>
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
   );
}
