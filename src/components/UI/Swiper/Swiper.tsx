"use client"

import React, { useState, useRef } from "react"
import styles from "./Swiper.module.css"
import clsx from "clsx"
import SwiperItem from "./SwiperItem"
import { useStateRef, getRefValue } from "@/utils/hooks"
import { getTouchEventData } from "@/utils/dom"

interface IIndicatorsProps {
   images: {
      main_image: string
      name: string
      slug: string
   }[]
   activeIndex: number
   onSelect: (index: number) => void
}
const SwiperIndicators = ({
   images,
   activeIndex,
   onSelect,
}: IIndicatorsProps) => {
   return (
      <div className="flex items-center gap-4 pb-2 pt-4">
         {images?.map((_, index) => (
            <li
               data-testid="indicator"
               key={index}
               className={clsx(styles.swiper_indicator, {
                  [styles.swiper_indicator_active]: index === activeIndex,
               })}
               onClick={() => onSelect(index)}
            ></li>
         ))}
      </div>
   )
}

const MIN_SWIPE_Required = 50

interface IProps {
   images: {
      main_image: string
      name: string
      slug: string
      id: number
   }[]
   isLoading: boolean
}

const Swiper = ({ images, isLoading }: IProps) => {
   const containerRef = useRef<HTMLUListElement>(null)
   const containerWidthRef = useRef(0)
   const minOffsetXRef = useRef(0)
   const currentOffsetXRef = useRef(0)
   const startXRef = useRef(0)

   const [currentIndex, setCurrentIndex] = useState(0)
   const [offsetX, setOffsetX, offsetXRef] = useStateRef(0)
   const [isSwiping, setIsSwiping] = useState(false)

   const onTouchMove = (e: TouchEvent | MouseEvent) => {
      const currentX = getTouchEventData(e).clientX
      const diff = getRefValue(startXRef) - currentX
      let newOffsetX = getRefValue(currentOffsetXRef) - diff

      const maxOffsetX = 0
      const minOffsetX = getRefValue(minOffsetXRef)
      console.log({ maxOffsetX, minOffsetX, newOffsetX, currentX, diff })
      if (newOffsetX > maxOffsetX) {
         newOffsetX = maxOffsetX
      }

      if (newOffsetX < minOffsetX) {
         newOffsetX = minOffsetX
      }

      setOffsetX(newOffsetX)
   }

   const onTouchStart = (
      e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>
   ) => {
      setIsSwiping(true)

      currentOffsetXRef.current = getRefValue(offsetXRef)
      startXRef.current = getTouchEventData(e.nativeEvent).clientX

      const containerEl = getRefValue(containerRef)
      const containerWidth = containerEl.offsetWidth

      containerWidthRef.current = containerWidth
      minOffsetXRef.current = containerWidth - containerEl.scrollWidth

      window.addEventListener("touchmove", onTouchMove)
      window.addEventListener("touchend", onTouchEnd)
      window.addEventListener("mouseup", onTouchEnd)
      window.addEventListener("mousemove", onTouchMove)
   }

   const onTouchEnd = () => {
      const currentOffsetX = getRefValue(currentOffsetXRef)
      const containerWidth = getRefValue(containerWidthRef)
      let newOffsetX = getRefValue(offsetXRef)

      const diff = currentOffsetX - newOffsetX

      if (Math.abs(diff) > MIN_SWIPE_Required) {
         if (diff > 0) {
            newOffsetX =
               Math.floor(newOffsetX / containerWidth) * containerWidth
         } else {
            newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth
         }
      } else {
         newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth
      }

      setIsSwiping(false)
      setOffsetX(newOffsetX)
      setCurrentIndex(Math.abs(newOffsetX / containerWidth))

      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("mouseup", onTouchEnd)
      window.removeEventListener("mousemove", onTouchMove)
   }

   const indicatorOnClick = (index: number) => {
      const containerEl = getRefValue(containerRef)
      const containerWidth = containerEl.offsetWidth

      setCurrentIndex(index)
      setOffsetX(-(index * containerWidth))
   }

   return (
      <div className={styles.swiper_container}>
         <ul
            ref={containerRef}
            aria-label="swiper-container"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onTouchStart}
            onMouseUp={onTouchEnd}
            style={{
               transform: `translateX(${offsetX}px)`,
            }}
            className={clsx(styles.swiper_list, {
               "animate-pulse bg-inputBackground": isLoading,
               is_swiping: isSwiping,
            })}
         >
            {images?.map((image, index) => {
               return (
                  <SwiperItem
                     key={image.id}
                     image={image}
                     index={index}
                     activeIndex={currentIndex}
                  />
               )
            })}
         </ul>
         <SwiperIndicators
            images={images}
            activeIndex={currentIndex}
            onSelect={indicatorOnClick}
         />
      </div>
   )
}

export default Swiper
