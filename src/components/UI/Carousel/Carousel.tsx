"use client"

import { useEffect, useState } from "react"
import style from "./Carousel.module.css"
import Image from "next/image"
import { Icons } from "../../Icons/icons"
import clsx from "clsx"

interface IIndicatorsProps {
   images: string[]
   activeIndex: number
   onClick: (index: number) => void
}
const CarouselIndicators = ({
   images,
   activeIndex,
   onClick,
}: IIndicatorsProps) => {
   return (
      <div className="flex items-center gap-4 pb-2 pt-4">
         {images.map((_, index) => (
            <span
               key={index}
               className={clsx(style.carousel__indicator, {
                  [style.carousel__indicator__active]: index === activeIndex,
               })}
               onClick={() => onClick(index)}
            ></span>
         ))}
      </div>
   )
}

interface IProps {
   images: string[]
   withButton?: boolean
}

const Carousel = ({ images, withButton = false }: IProps) => {
   const [activeIndex, setActiveIndex] = useState(0)
   const nextSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
   }
   const prevSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
   }

   useEffect(() => {
      const timer = setInterval(() => {
         setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }, 5000)

      return () => {
         clearInterval(timer)
      }
   }, [activeIndex, images.length])

   return (
      <div className="carousel flex flex-col items-center max-w-[600px] px-4">
         <div className="flex gap-4">
            {withButton && (
               <button
                  onClick={prevSlide}
                  className="carousel__btn carousel__btn--prev"
               >
                  <Icons.ArrowLeft />
               </button>
            )}

            <div className="overflow-hidden flex relative w-[254px] h-[311px]">
               {images.map((image: string, index: number) => {
                  return (
                     <div
                        className="items-center flex absolute left-0 bottom-0 transition overflow-hidden"
                        key={image}
                     >
                        <Image
                           src={image}
                           alt={`Slide ${index}`}
                           className={clsx(
                              "carousel__img opacity-0 transition -translate-x-4 duration-500",
                              {
                                 "active opacity-100 transition translate-x-0":
                                    index === activeIndex,
                              }
                           )}
                           style={{
                              objectFit: "cover",
                              objectPosition: "top",
                           }}
                           unoptimized
                           width={254}
                           height={311}
                        />
                     </div>
                  )
               })}
            </div>
            {withButton && (
               <button
                  onClick={nextSlide}
                  className="carousel__btn carousel__btn--next"
               >
                  <Icons.ArrowRight />
               </button>
            )}
         </div>
         <CarouselIndicators
            images={images}
            activeIndex={activeIndex}
            onClick={setActiveIndex}
         />
      </div>
   )
}
export default Carousel
