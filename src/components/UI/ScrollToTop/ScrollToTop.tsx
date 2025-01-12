"use client"
import { useEffect, useState } from "react"
import { Icons } from "../../Icons/icons"
import clsx from "clsx"
import style from "./ScrollToTop.module.css"

export default function ScrollToTop() {
   const [isScrolled, setIsScrolled] = useState(false)
   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (window.scrollY > 300) {
            setIsScrolled(true)
         } else {
            setIsScrolled(false)
         }
      })
   })
   return (
      <button
         onClick={scrollToTop}
         style={{
            backgroundColor: "rgba(49, 49, 49, 0.105)",
         }}
         className={clsx(
            "fixed z-50 w-[30px] h-[30px] justify-center items-center bottom-2 right-2 bg-[#00000] bg-opacity-75 text-white p-2 rounded-full hover:bg-neutral-800 transition duration-300 ease-in-out opacity-0",
            {
               flex: isScrolled,
               [style.show_button]: isScrolled,
            }
         )}
      >
         <Icons.ChevronUp />
      </button>
   )
}
