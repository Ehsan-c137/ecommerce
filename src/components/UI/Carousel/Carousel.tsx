"use client"

import { useEffect, useState } from "react"
import style from "./Carousel.module.css"
import Image from "next/image"
import { Icons } from "../../Icons/icons"
import clsx from "clsx"
import { useQuery } from "@tanstack/react-query"
import getProduct from "@/services/store/product/products"
import Link from "next/link"

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
         {images?.map((_, index) => (
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
   withButton?: boolean
}

const Carousel = ({ withButton = false }: IProps) => {
   const { data, isLoading } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => getProduct(1, 1),
   })
   const images = data?.slice(0, 3)

   const [activeIndex, setActiveIndex] = useState(0)
   const nextSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === images?.length - 1 ? 0 : prevIndex + 1
      )
   }
   const prevSlide = () => {
      setActiveIndex((prevIndex) =>
         prevIndex === 0 ? images?.length - 1 : prevIndex - 1
      )
   }

   useEffect(() => {
      const timer = setInterval(() => {
         setActiveIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1))
      }, 5000)

      return () => {
         clearInterval(timer)
      }
   }, [activeIndex, images?.length])

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

            <div
               className={clsx(
                  "overflow-hidden flex relative w-[254px] h-[345px]",
                  { "animate-pulse bg-inputBackground": isLoading }
               )}
            >
               {images?.map((image: TProduct, index: number) => {
                  return (
                     <div key={image.id} className="flex flex-col gap-4">
                        <Link
                           href={`product/${image.slug}`}
                           className="items-center flex absolute left-0 bottom-[10%] transition overflow-hidden"
                           style={{
                              backgroundPosition: "top",
                              objectPosition: "top",
                           }}
                        >
                           <Image
                              src={image.main_image + "?imwidth=320"}
                              alt={`Slide ${index} ${image.name}`}
                              className={clsx(
                                 "opacity-0 transition -translate-x-4 duration-500",
                                 {
                                    "active opacity-100 transition translate-x-0":
                                       index === activeIndex,
                                 }
                              )}
                              style={{
                                 objectFit: "cover",
                              }}
                              unoptimized
                              width={254}
                              height={311}
                           />
                        </Link>

                        <p
                           className={clsx(
                              "opacity-0 transition -translate-x-4 duration-500 bottom-0 absolute text-start delay-200 truncate text-titleActive",
                              {
                                 "active opacity-100 transition translate-x-0":
                                    index === activeIndex,
                              }
                           )}
                        >
                           {image.name}
                        </p>
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
