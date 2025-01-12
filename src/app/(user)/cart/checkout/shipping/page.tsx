"use client"
import { Icons } from "@/components/Icons/icons"
import Drawer from "@/components/UI/Drawer/Drawer"
import { useState } from "react"

type TPaymentMethod = "cash" | "credit card" | "debit card"

type TDrawer = "shipping" | "payment"

export default function Shipping() {
   const [isOpen, setIsOpen] = useState(false)
   const [openedDrawer, setOpenedDrawer] = useState<TDrawer>("shipping")

   const [shippingMethod, setShippingMethod] = useState({
      name: "Pickup at store",
      price: "free",
   })

   const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>("cash")

   const handleToggleDrawer = (drawer: TDrawer) => {
      setIsOpen((prev) => !prev)
      setOpenedDrawer(drawer)
   }

   return (
      <>
         <div className="flex flex-col gap-6 px-4">
            <div>
               <p className="title text-titleActive uppercase text-center">
                  Checkout
               </p>
               <div className="text-center w-full flex justify-center">
                  <Icons.Border />
               </div>
            </div>
            <div>
               <p className="text-placeholder body-m uppercase">
                  Shipping address
               </p>
               <div className="flex justify-between items-center rounded-full w-full mt-2 bg-inputBackground h-[48px] px-6">
                  <p className="text-label">Add shipping address</p>
                  <Icons.Plus />
               </div>
            </div>
            <div onClick={() => handleToggleDrawer("shipping")}>
               <p className="text-placeholder body-m uppercase">
                  Shipping method
               </p>
               <div className="flex justify-between items-center rounded-full w-full bg-inputBackground h-[48px] px-6 mt-2">
                  <p className="text-label">{shippingMethod.name}</p>
                  <div className="flex items-center gap-4">
                     <p className="uppercase body-m">{shippingMethod.price}</p>
                     <Icons.ChevronDown />
                  </div>
               </div>
            </div>
            <div onClick={() => handleToggleDrawer("payment")}>
               <p className="text-placeholder body-m uppercase">
                  payment method
               </p>
               <div className="flex justify-between items-center rounded-full w-full bg-inputBackground h-[48px] px-6 mt-2">
                  <p className="text-label">Payment method</p>
                  <div className="gap-2 flex items-center">
                     <p className="uppercase body-m">{paymentMethod}</p>
                     <Icons.ChevronDown />
                  </div>
               </div>
            </div>
         </div>
         <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            {openedDrawer === "shipping" && (
               <div className="flex flex-col gap-6">
                  <p className="text-placeholder body-m uppercase">
                     Shipping method
                  </p>
                  <div className="flex flex-col gap-4">
                     <div
                        className="flex items-center justify-between gap-2"
                        onClick={() => {
                           setShippingMethod({
                              name: "Pickup at store",
                              price: "free",
                           })
                           setIsOpen(false)
                        }}
                     >
                        <p>Pickup at store</p>
                        <p className="uppercase text-label body-s">free</p>
                     </div>
                     <div
                        className="flex items-center justify-between gap-2"
                        onClick={() => {
                           setShippingMethod({
                              name: "Delivery via courier",
                              price: "$10",
                           })
                           setIsOpen(false)
                        }}
                     >
                        <p>Delivery via courier</p>
                        <p className="uppercase text-label body-m">$10</p>
                     </div>
                  </div>
               </div>
            )}
            {openedDrawer === "payment" && (
               <div className="flex flex-col gap-6">
                  <p className="text-placeholder body-m uppercase">
                     Payment method
                  </p>
                  <div className="flex flex-col gap-4">
                     <div
                        className="flex items-center justify-between gap-2"
                        onClick={() => {
                           setPaymentMethod("cash")
                           setIsOpen(false)
                        }}
                     >
                        <p className="uppercase text-label body-m">cash</p>
                     </div>
                     <div
                        className="flex items-center justify-between gap-2"
                        onClick={() => {
                           setPaymentMethod("debit card")
                           setIsOpen(false)
                        }}
                     >
                        <p className="uppercase text-label body-m">
                           debit card
                        </p>
                     </div>
                     <div
                        className="flex items-center justify-between gap-2"
                        onClick={() => {
                           setPaymentMethod("credit card")
                           setIsOpen(false)
                        }}
                     >
                        <p className="uppercase text-label body-m">
                           credit card
                        </p>
                     </div>
                  </div>
               </div>
            )}
         </Drawer>
      </>
   )
}
