"use client"

import { useState } from "react"
import style from "./Drawer.module.css"
import clsx from "clsx"

export default function Drawer() {
   const [isOpen, setIsOpen] = useState(false)
   return (
      <div
         className="flex gap-4"
         onClick={() => setIsOpen((prev: boolean) => !prev)}
         onBlur={() => setIsOpen(false)}
         style={{
            zIndex: 10,
         }}
      >
         <div
            className={clsx(style.burgerMenu, {
               [style.burgerMenuClosed]: !isOpen,
            })}
         >
            <div className={style.bar}></div>
            <div className={style.bar}></div>
            <div className={style.bar}></div>
         </div>
      </div>
   )
}
