"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface IProps {
   children: React.ReactNode
   selector: string
   show: boolean
}
export default function CreatePortal({ children, selector, show }: IProps) {
   const [defferedShow, setDefferedShow] = useState<boolean>()
   const ref = useRef<Element | null>(null)

   useEffect(() => {
      ref.current = document.getElementById(selector)
      const id = setInterval(() => {
         setDefferedShow(show)
      }, 100)

      return () => {
         clearInterval(id)
      }
   }, [selector, show])

   return ref.current && defferedShow
      ? createPortal(children, ref.current)
      : null
}
