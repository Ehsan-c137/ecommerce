"use client"

import { useState } from "react"
import { Icons } from "@/components/Icons/icons"

interface IAccordion {
   children: React.ReactNode
   isLast?: boolean
   heading: string
   isLayout?: boolean
}
export default function Accordion({
   children,
   heading,
   isLayout = false,
}: IAccordion) {
   const [open, setIsOpen] = useState(false)

   const handleOpen = () => {
      setIsOpen(!open)
   }

   return (
      <>
         <div className="pt-2 focus:outline-none" onClick={handleOpen}>
            <div
               role="button"
               className={`flex items-center justify-between px-3 cursor-pointer ${
                  isLayout ? "h-20" : "h-12"
               }`}
            >
               <p className="truncate text-body text-lg">{heading}</p>
               <div className="font-light">
                  {isLayout && <div>{open ? "minus" : "plus"}</div>}
                  {!isLayout && (
                     <div
                        className={`${
                           open ? "rotate-180" : "rotate-0"
                        } duration-300`}
                     >
                        <div className="text-black">
                           <Icons.ChevronDown />
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div
               className={`overflow-hidden transition-[max-height] duration-300 px-3 ${
                  !isLayout ? "text-left" : ""
               }`}
               onClick={(e) => e.stopPropagation()}
               style={{
                  paddingBottom: isLayout ? "8px" : "0px",
                  marginTop: isLayout ? "-8px" : "0px",
                  maxHeight: open ? "25rem" : "0rem",
               }}
            >
               {children}
            </div>
         </div>
      </>
   )
}
