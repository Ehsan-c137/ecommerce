"use client"

import { Icons } from "@/components/Icons/icons"
import Input from "@/components/UI/Input"
import { useState } from "react"
export default function Page() {
   const [isAdding, setIsAdding] = useState(false)

   const handleClick = () => setIsAdding(!isAdding)
   return (
      <div className="container flex flex-col md:flex-row gap-4 pt-4">
         <div className="w-full text-center justify-center items-center flex flex-col gap-2">
            <p className="text-titleActive uppercase">ADD Shipping address</p>
            <Icons.Border />
         </div>
         <div className="flex flex-col gap-4 px-4">
            <div className="flex gap-2">
               <Input type="text" placeholder="First name" />
               <Input type="text" placeholder="Last name" />
            </div>
            <div className="flex gap-2">
               <Input type="text" placeholder="Address" />
               <Input type="text" placeholder="City" />
            </div>
            <Input type="text" placeholder="Phone number" />
         </div>
         <button
            className="fixed bottom-0 w-full text-offWhite flex justify-center items-center gap-6 bg-black h-[56px] uppercase"
            onClick={handleClick}
         >
            {!isAdding ? "Add Address" : <span className="loader"></span>}
         </button>
      </div>
   )
}
