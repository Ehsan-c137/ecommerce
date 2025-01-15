"use client"

import { useEffect, useRef, useState } from "react"
import style from "./HamburgerMenu.module.css"
import clsx from "clsx"
import CreatePortal from "@/components/CreatePortal"
import { Icons } from "@/components/Icons/icons"
import Accordion from "../Accordion/Accordion"
import Link from "next/link"

enum Tabs {
   Women = 1,
   Man = 2,
   Kids = 3,
}

export default function HamburgerMenu() {
   const [isOpen, setIsOpen] = useState(false)
   const [activeTab, setActiveTab] = useState(2)
   const ref = useRef<Element | null>(null)

   const handleCloseDrawer = () => {
      setIsOpen(false)
   }

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
   }, [isOpen])
   return (
      <>
         <div
            className="flex items-center gap-4"
            onClick={() => setIsOpen((prev: boolean) => !prev)}
            onBlur={handleCloseDrawer}
         >
            <div
               className={clsx(style.burgerMenu, {
                  [style.burgerMenuClosed]: !isOpen,
                  [style.burgerMenuOpened]: isOpen,
               })}
            >
               <div className={style.bar}></div>
               <div className={style.bar}></div>
               <div className={style.bar}></div>
            </div>
         </div>
         <CreatePortal show={isOpen} selector="my-portal">
            <div
               onBlur={handleCloseDrawer}
               className={clsx("flex flex-col justify-between", style.drawer, {
                  [style.drawerOpen]: isOpen,
                  [style.drawerClose]: !isOpen,
               })}
            >
               <div>
                  <div className="uppercase transition justify-around items-center border-b grid grid-cols-3 relative">
                     <p
                        className="w-full text-center py-4 cursor-pointer"
                        onClick={() => setActiveTab(1)}
                     >
                        Women
                     </p>
                     <p
                        className="w-full text-center py-4 cursor-pointer"
                        onClick={() => setActiveTab(2)}
                     >
                        man
                     </p>
                     <p
                        className="w-full h-full text-center py-4 cursor-pointer"
                        onClick={() => setActiveTab(3)}
                     >
                        kids
                     </p>

                     <div
                        className={clsx(
                           "active-border w-full col-start-1",
                           style.border,
                           {
                              "col-start-1": activeTab === 1,
                              "col-start-2": activeTab === 2,
                              "col-start-3": activeTab === 3,
                           }
                        )}
                     ></div>
                  </div>
                  <div>
                     {Tabs[activeTab] == "Women" && <WomenContent />}
                     {Tabs[activeTab] == "Man" && <MenContent />}
                     {Tabs[activeTab] == "Kids" && <KidsContent />}
                  </div>
               </div>
               <div className="flex flex-col w-full items-center gap-4">
                  <Icons.Border />
                  <div className="flex gap-6">
                     <Link href="/profile" className="uppercase">
                        Profile
                     </Link>
                     <Link href="/login" className="uppercase">
                        Login
                     </Link>
                  </div>
               </div>
            </div>
         </CreatePortal>
      </>
   )
}

const WomenContent = () => {
   return (
      <>
         <Accordion heading="New">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ut?
         </Accordion>
         <Accordion heading="Apparel">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ut?
         </Accordion>
         <Accordion heading="Accessories">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ut?
         </Accordion>
      </>
   )
}

const MenContent = () => {
   return (
      <>
         <Accordion heading="T-Shirt">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ut?
         </Accordion>
      </>
   )
}

const KidsContent = () => {
   return (
      <>
         <Accordion heading="Shoes">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            ut?
         </Accordion>
      </>
   )
}
