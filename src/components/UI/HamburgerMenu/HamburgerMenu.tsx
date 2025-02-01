"use client"

import { useEffect, useRef, useState } from "react"
import ham_style from "./HamburgerMenu.module.css"
import clsx from "clsx"
import { Icons } from "@/components/Icons/icons"
import Accordion from "../Accordion/Accordion"
import Link from "next/link"
import logout from "@/services/user/logout"
import { useRouter } from "next/navigation"
import Drawer from "../Drawer/Drawer"
import { getRefValue } from "@/utils/hooks"
import { useAuth } from "@/context/auth"

enum Tabs {
   Women = 1,
   Man = 2,
   Kids = 3,
}

export default function HamburgerMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
   const { setIsAuthenticated } = useAuth()
   const [isOpen, setIsOpen] = useState(false)
   const [activeTab, setActiveTab] = useState(1)
   const router = useRouter()
   const ref = useRef<Element | null>(null)
   const itemRef = useRef<HTMLParagraphElement | null>(null)
   const itemWidthRef = getRefValue(itemRef)
   const handleCloseDrawer = () => {
      setIsOpen(false)
   }

   const handleLogout = async () => {
      await logout()
      setIsAuthenticated(false)
      router.refresh()
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
               className={clsx(ham_style.burgerMenu, {
                  [ham_style.burgerMenuClosed]: !isOpen,
                  [ham_style.burgerMenuOpened]: isOpen,
               })}
            >
               <div className={ham_style.bar}></div>
               <div className={ham_style.bar}></div>
               <div className={ham_style.bar}></div>
            </div>
         </div>
         <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col h-full justify-between">
               <div>
                  <div className="uppercase transition justify-around items-center border-b grid grid-cols-3 relative">
                     <p
                        ref={itemRef}
                        className="w-full text-center py-4 cursor-pointer text-titleActive"
                        onClick={() => setActiveTab(1)}
                     >
                        Women
                     </p>
                     <p
                        className="w-full text-center py-4 cursor-pointer text-titleActive"
                        onClick={() => setActiveTab(2)}
                     >
                        man
                     </p>
                     <p
                        className="w-full h-full text-center py-4 cursor-pointer text-titleActive"
                        onClick={() => setActiveTab(3)}
                     >
                        kids
                     </p>

                     <div
                        style={{
                           transform: `translateX(${
                              itemWidthRef?.offsetWidth * (activeTab - 1)
                           }px)`,
                        }}
                        className={clsx(
                           "active-border w-full transition-transform duration-300",
                           ham_style.border
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
                  <div className="flex gap-6 w-full justify-between">
                     <Link
                        href="/profile"
                        className="uppercase text-titleActive"
                     >
                        Profile
                     </Link>
                     {!isLoggedIn ? (
                        <Link
                           href="/login"
                           className="uppercase text-titleActive"
                        >
                           Login
                        </Link>
                     ) : (
                        <button
                           className="uppercase text-titleActive"
                           onClick={handleLogout}
                        >
                           Logout
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </Drawer>
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
