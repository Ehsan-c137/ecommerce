import Image from "next/image"

export default function OrderItem() {
   return (
      <div className="flex justify-between gap-4 lg:w-[618px]">
         <div className="flex gap-4 items-center">
            <div className="flex items-center justify-center w-[80px] h-[80px] bg-neutral-100 rounded">
               <Image
                  src="/images/shoe.jpg"
                  alt="shoe"
                  width={100}
                  height={100}
               />
            </div>
            <div className="flex flex-col gap-1">
               <p className="text-neutral-900 font-semibold ">
                  Raw Black T-Shirt Lineup
               </p>
               <p className="label text-neutral-500">
                  Ordered on: 27 July 2023
               </p>
               <p className="label text-neutral-900 font-medium">$70</p>
            </div>
         </div>
         <div className="flex gap-8 items-center">
            <p className="border-b text-neutral-900">Processing</p>
            <button className="btn_outline">View Item</button>
         </div>
      </div>
   )
}
