"use client"

import { useState, useRef } from "react"
import { Icons } from "../Icons/icons"
import clsx from "clsx"
import Drawer from "@/components/UI/Drawer/Drawer"

const SearchInput = ({ ...props }) => {
   const { className, ...otherProps } = props

   const [isOpen, setIsOpen] = useState(false)
   const [searchText, setSearchText] = useState("")
   const ref = useRef<HTMLInputElement | null>(null)

   const handleOpen = () => {
      setIsOpen(true)
      ref.current?.focus()
   }

   const clearInput = () => {
      setSearchText("")
      // ref.current?.focus()
   }

   return (
      <>
         <button onClick={handleOpen}>
            <Icons.Search />
         </button>
         <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col" onBlur={(e) => e.stopPropagation()}>
               <div className="py-1 px-2 h-[40px] flex items-center bg-transparent border-b text-titleActive focus-within:border-b-titleActive transition">
                  <input
                     ref={(el) => {
                        el?.focus()
                     }}
                     value={searchText}
                     placeholder="Search..."
                     onChange={(e) => setSearchText(e.target.value)}
                     onBlur={(e) => e.stopPropagation()}
                     className={clsx(
                        `flex pr-1 transition-colors bg-transparent w-full outline-none ${className}`
                     )}
                     {...otherProps}
                  />
                  <div className="flex gap-2 items-center">
                     <button
                        onClick={clearInput}
                        className={clsx(
                           "items-center justify-center p-2 w-[28px] h-[28x] bg-[#c4c4c42c] rounded-full",
                           {
                              hidden: !searchText,
                              flex: searchText.length > 1,
                           }
                        )}
                     >
                        <Icons.Close />
                     </button>
                     <button>
                        <Icons.Search />
                     </button>
                  </div>
               </div>
            </div>
         </Drawer>
      </>
   )
}
export default SearchInput
