"use client"

import { Icons } from "@/components/Icons/icons"
import { Bodoni_Moda } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import Carousel from "@/components/UI/Carousel/Carousel"
import NewArrival from "@/components/LandingPage/NewArrivel"
import { useEffect, useRef, useMemo } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const bodoniModa = Bodoni_Moda({
   subsets: ["latin"],
   display: "swap",
   style: "italic",
   adjustFontFallback: false,
})

export default function LandingPage() {
   const callback = (entries: IntersectionObserverEntry[]) => {
      entries?.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add("show-opacity")
         }
      })
   }

   const options = useMemo(() => {
      return {
         root: null,
         rootMargin: "0px",
         threshold: 1.0,
      }
   }, [])

   const itemRef = useRef<HTMLElement[]>([])
   useEffect(() => {
      const targets = itemRef.current
      const observer = new IntersectionObserver(callback, options)
      if (targets) {
         targets?.forEach((item) => {
            observer.observe(item)
         })
      }

      return () => {
         targets?.map((item) => {
            if (item) {
               observer.unobserve(item)
            }
         })
      }
   }, [options])

   useGSAP(() => {
      const tl = gsap.timeline()
      tl.from(".hero-text", {
         duration: 1.8,
         y: 100,
         ease: "power4.out",
         delay: 1,
         skewY: 7,
         stagger: {
            amount: 0.3,
         },
         snap: { y: 0.3 },
         force3D: false,
      })
   }, [])

   return (
      <>
         <main className="flex flex-col mx-auto items-center sm:items-start">
            <section className="w-full flex justify-center items-end relative h-[600px]">
               <Image
                  src="/mobile/hero-section.webp"
                  alt="spring season"
                  priority={true}
                  width={0}
                  height={600}
                  sizes="100vw"
                  unoptimized={true}
                  className="abolute left-0 top-0"
                  style={{
                     width: "100%",
                     height: "600px",
                     objectFit: "contain",
                     objectPosition: "top",
                  }}
               />
               <div
                  className={`font-bold italic text-body absolute bottom-[50%] left-1/2 -translate-x-1/2 text-nowrap ${bodoniModa.className} uppercase text-[30px] bg-blend-multiply opacity-70 leading-tight`}
               >
                  <div className="h-[38px] w-[250px] overflow-y-hidden relative">
                     <p className="hero-text ml-5 absolute">Fashion</p>
                  </div>
                  <div className="h-[42px] w-[250px] overflow-hidden relative">
                     <p className="hero-text absolute">&</p>
                     <p className="hero-text absolute left-[15%]">
                        Accessories
                     </p>
                  </div>
               </div>
               <Link
                  href={"/products"}
                  className="absolute rounded-[30px] px-[30px] py-2 uppercase bg-opacity-70 bg-body bottom-[60px] text-nowrap left-[50%] text-offWhite transform -translate-x-1/2"
               >
                  Explore Collection
               </Link>
            </section>
            <section className="flex flex-col gap-4 justify-around text-center items-center w-full py-5">
               <p className="text-titleActive uppercase">new Arrival</p>
               <Icons.Border />

               <div className="flex flex-wrap justify-center gap-4">
                  <NewArrival />
               </div>
               <Link
                  href={"/products"}
                  className="flex items-center gap-2 py-4"
               >
                  <p className="text-titleActive body-1">Explore More</p>
                  <Icons.ArrowRight />
               </Link>
            </section>
            <section
               className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 container mx-auto my-4 show-item"
               ref={(el) => {
                  if (el) {
                     itemRef.current[0] = el
                  }
               }}
            >
               <Icons.Border />
               <div className="grid grid-cols-3 py-6 place-items-center items-center justify-center gap-6">
                  <Icons.Prada />
                  <Icons.Burberry />
                  <Icons.HugoBossIcon />
                  <Icons.Gucci />
                  <Icons.Cartier />
                  <Icons.TiffanyAndCo />
               </div>
               <Icons.Border />
            </section>
            <section
               className="flex flex-col md:flex-row justify-center items-center gap-4 container mx-auto w-full mt-10  show-item"
               ref={(el) => {
                  if (el) {
                     itemRef.current[1] = el
                  }
               }}
            >
               <p className="text-titleActive uppercase title">Collections</p>
               <div className="w-full relative">
                  <Image
                     src="/mobile/october.webp"
                     alt="10 october collections"
                     className="absoloute left-0 top-0"
                     width={0}
                     height={0}
                     sizes="100vw"
                     unoptimized
                     style={{
                        width: "100%",
                        height: "100%",
                     }}
                  />
                  <div className={`absolute top-[20%] italic right-12`}>
                     <p
                        className={`text-body font-extrabold text-[160px] opacity-30 leading-none -tracking-[0.2em] ${bodoniModa.className}`}
                     >
                        10
                     </p>
                     <p
                        className={`absolute text-offWhite text-[40px] left-[20px] top-[22%] ${bodoniModa.className}`}
                     >
                        October
                     </p>
                     <p className="uppercase body-s text-offWhite  left-[20px] absolute top-[55%] !tracking-[5px]">
                        collection
                     </p>
                  </div>
               </div>
            </section>
            <section
               className="p-10 relative show-item"
               ref={(el) => {
                  if (el) {
                     itemRef.current[2] = el
                  }
               }}
            >
               <Image
                  src="/mobile/autumn_collection.webp"
                  alt="autumn collection"
                  unoptimized
                  sizes="100vw"
                  width={292}
                  height={260}
               />
               <p
                  className={`right-[20%] top-[20%] text-body italic opacity-80 font-bold absolute ${bodoniModa.className} text-4xl`}
               >
                  Autumn
               </p>
               <p className="uppercase body-s text-body  right-[20%] top-[30%] absolute !tracking-[5px]">
                  collection
               </p>
            </section>
            <section
               ref={(el) => {
                  if (el) {
                     itemRef.current[3] = el
                  }
               }}
               className="flex flex-col md:flex-row flex-wrap items-center gap-4 text-center justify-center w-full pt-0 mx-auto container mt-10 show-item"
            >
               <h3 className="uppercase text-titleActive">Just for you</h3>
               <Icons.Border />

               <Carousel />
            </section>
            <section className="flex flex-col md:flex-row w-full justify-center mx-auto container my-10 rounded-md"></section>
         </main>
      </>
   )
}
