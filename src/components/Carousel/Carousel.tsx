"use client"

import { useEffect, useState } from "react"
import "./Carousel.css"
import Image from "next/image"
import { Icons } from "../Icons/icons"

// const CarouselIndicators = ({ images, activeIndex, onClick }) => {
//    return (
//       <div className="carousel__indicators">
//          {images.map((_, index) => (
//             <span
//                key={index}
//                className={`carousel__indicator ${
//                   index === activeIndex ? "active" : ""
//                }`}
//                onClick={() => onClick(index)}
//             />
//          ))}
//       </div>
//    )
// }
const Carousel = ({ images }: { images: [] }) => {
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
      }, 3000)

      return () => {
         clearInterval(timer)
      }
   }, [activeIndex, images.length])

   return (
      <div className="carousel flex items-center max-w-[600px]">
         <button
            onClick={prevSlide}
            className="carousel__btn carousel__btn--prev"
         >
            <Icons.ArrowLeft />
         </button>
         <div className="overflow-hidden">
            <div
               style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transitionDuration: "500ms",
               }}
               className=" w-full items-center flex [transition-timing-function:cubic-bezier(0.61,1,0.88,1)]"
            >
               {images.map((image: string, index: number) => {
                  return (
                     <Image
                        key={image}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`carousel__img ${
                           index === activeIndex ? "active" : ""
                        }`}
                        sizes="100vw"
                        style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "cover",
                        }}
                        width={0}
                        height={0}
                     />
                  )
               })}
            </div>
         </div>
         <button
            onClick={nextSlide}
            className="carousel__btn carousel__btn--next"
         >
            <Icons.ArrowRight />
         </button>
      </div>
   )
}
export default Carousel
