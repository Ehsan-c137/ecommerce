"use client"

import { useCallback, useEffect, useRef } from "react"
import clsx from "clsx"
import CreatePortal from "@/components/common/CreatePortal"
import style from "./Drawer.module.css"

export default function Drawer({
   children,
   isOpen,
   setIsOpen,
}: {
   children: React.ReactNode
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
}) {
   const ref = useRef<Element | null>(null)
   const handleCloseDrawer = useCallback(() => {
      setIsOpen(false)
   }, [setIsOpen])

   useEffect(() => {
      ref.current = document.querySelector(".background")

      if (isOpen) {
         document.body.style.height = "100vh"
         document.body.style.overflow = "hidden"
         ref.current?.addEventListener("click", handleCloseDrawer)
      } else {
         document.body.style.height = "auto"
         document.body.style.overflow = "auto"
         ref.current?.removeEventListener("click", handleCloseDrawer)
      }
   }, [isOpen, handleCloseDrawer])

   return (
      <>
         <CreatePortal show={isOpen} selector="my-portal">
            <div
               onBlur={handleCloseDrawer}
               className={clsx("flex flex-col justify-between", style.drawer, {
                  [style.drawer_open]: isOpen,
                  [style.drawer_close]: !isOpen,
               })}
            >
               {children}
            </div>
         </CreatePortal>
      </>
   )
}
