"use client"

import { useCallback, useEffect, useRef } from "react"
import style from "./Drawer.module.css"
import clsx from "clsx"
import CreatePortal from "@/components/CreatePortal"

export default function Drawer({
   children,
   isOpen,
   setIsOpen,
}: {
   children: React.ReactNode
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
}) {
   // const [isOpen, setIsOpen] = useState(false)
   const ref = useRef<Element | null>(null)

   const handleCloseDrawer = useCallback(() => setIsOpen(false), [setIsOpen])

   useEffect(() => {
      ref.current = document.querySelector(".background")
      if (isOpen) {
         ref.current?.classList.add("backdrop")
         document.body.style.height = "100vh"
         document.body.style.overflow = "hidden"
         ref.current?.addEventListener("click", handleCloseDrawer)
      } else {
         ref.current?.classList.remove("backdrop")
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
                  [style.drawerOpen]: isOpen,
                  [style.drawerClose]: !isOpen,
               })}
            >
               {children}
            </div>
         </CreatePortal>
      </>
   )
}
