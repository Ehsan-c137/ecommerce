"use client"

import { Icons } from "@/components/Icons/icons"
import { Bodoni_Moda } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import Swiper from "@/components/UI/Swiper/Swiper"
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
      const mm = gsap.matchMedia()
      const tl = gsap.timeline()
      tl.to(".hero-text", {
         opacity: 1,
      })
      tl.from(".hero-text", {
         duration: 1.8,
         y: 100,
         ease: "power4.out",
         delay: 0.5,
         skewY: 7,
         stagger: {
            amount: 0.3,
         },
         snap: { y: 0.3 },
         force3D: false,
      })

      mm.add("(min-width: 769px)", () => {
         const tl = gsap.timeline()
         gsap.to(".hero-item-desktop", {
            opacity: 1,
            delay: 0.5,
         })
         tl.from(".hero-item-desktop", {
            opacity: 0,
            ease: "power4.out",
            delay: 0.5,
            x: (index) => [-100, 100][index],
            y: (index) => (index === 1 ? 100 : 0),
            force3D: false,
         })
      })
   }, [])

   return (
      <>
         <main className="flex flex-col mx-auto items-center sm:items-start mt-[54px] md:mt-0">
            <section className="w-full md:hidden flex justify-center items-end relative h-[600px]">
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
                     <p className="hero-text ml-5 absolute opacity-0">
                        Fashion
                     </p>
                  </div>
                  <div className="h-[42px] w-[250px] overflow-hidden relative">
                     <p className="hero-text absolute opacity-0">&</p>
                     <p className="hero-text absolute left-[15%] opacity-0">
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
            <section className="hidden md:flex relative overflow-hidden h-[100vh] md:w-full">
               <div className="absolute top-20 left-20 z-10 max-w-[500px] max-h-[600px]">
                  <Image
                     src="/hero-desktop-1.webp"
                     alt="spring season"
                     priority={true}
                     width={0}
                     height={0}
                     className="hero-item-desktop opacity-0"
                     style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                     }}
                     sizes="100vw"
                     unoptimized={true}
                  />
               </div>

               <Image
                  src="/hero-desktop-2.webp"
                  alt="spring season"
                  priority={true}
                  width={0}
                  height={0}
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                  }}
                  sizes="100vw"
                  unoptimized={true}
               />
               <div className="absolute  top-20 right-20 z-10 max-w-[500px] h-[750px]">
                  <Image
                     src="/hero-desktop-3.webp"
                     alt="accessories"
                     priority={true}
                     width={0}
                     height={0}
                     className="hero-item-desktop opacity-0 "
                     style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                     }}
                     sizes="100vw"
                     unoptimized={true}
                  />
               </div>
               <div
                  className={`font-bold italic text-body absolute top-[25%] left-1/2 -translate-x-1/2 text-nowrap ${bodoniModa.className} uppercase text-[30px] bg-blend-multiply opacity-70 leading-tight`}
               >
                  <div className="h-[38px] w-[250px] overflow-y-hidden relative">
                     <p className="hero-text ml-5 absolute opacity-0">
                        Fashion
                     </p>
                  </div>
                  <div className="h-[42px] w-[250px] overflow-hidden relative">
                     <p className="hero-text absolute opacity-0">&</p>
                     <p className="hero-text absolute left-[15%] opacity-0">
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
            <section className="flex flex-col gap-4 justify-around text-center items-center w-full py-5 check-bg">
               <p className="text-titleActive uppercase">new Arrival</p>
               <Icons.Border />

               <div className="flex flex-wrap justify-center gap-4">
                  <NewArrival />
               </div>
               <Link
                  href={"/products"}
                  className="flex items-center gap-2 py-4 group"
               >
                  <p className="text-titleActive body-1 ">Explore More</p>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                     <Icons.ArrowRight />
                  </span>
               </Link>
            </section>
            <section
               className="grid grid-cols-1 items-center justify-items-center container mx-auto my-4 show-item"
               ref={(el) => {
                  if (el) {
                     itemRef.current[0] = el
                  }
               }}
            >
               <Icons.Border />
               <div className="grid grid-cols-3 md:grid-cols-6 py-6 place-items-center items-center justify-center gap-6">
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
               className="flex flex-col justify-center items-center gap-4 container mx-auto w-full mt-10 show-item"
               ref={(el) => {
                  if (el) {
                     itemRef.current[1] = el
                  }
               }}
            >
               <p className="text-titleActive uppercase title">Collections</p>
               <div className="w-full relative md:flex md:justify-center md:w-[500px] md:h-[600px]">
                  <Image
                     src="/mobile/october.webp"
                     alt="10 october collections"
                     className="absoloute left-0 top-0 md:hidden"
                     width={0}
                     height={0}
                     sizes="100vw"
                     unoptimized
                     style={{
                        width: "100%",
                        height: "100%",
                     }}
                  />
                  <Image
                     src="/october.webp"
                     alt="10 october collections"
                     className="left-0 top-0 hidden md:flex"
                     width={500}
                     height={600}
                     sizes="100vw"
                     unoptimized
                     style={{
                        width: "500px",
                        height: "600px",
                        objectFit: "cover",
                     }}
                  />

                  <div
                     className={`absolute top-[20%] italic right-12 md:top-[70%] md:right-[50%] md:translate-x-[40%]`}
                  >
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
               className="p-10 relative lg:static show-item lg:flex lg:justify-center w-full autumn_background"
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
                  className="md:hidden"
                  sizes="100vw"
                  width={292}
                  height={260}
               />
               <Image
                  src="/autumn-collection-2.webp"
                  alt="10 october collections"
                  className="hidden md:flex left-0 top-0"
                  width={480}
                  height={600}
                  sizes="100vw"
                  unoptimized
                  style={{
                     width: "480px",
                     height: "600px",
                     objectFit: "cover",
                  }}
               />
               <Image
                  src="/autumn-collection-3.webp"
                  alt="10 october collections"
                  className="hidden md:flex left-0 top-0"
                  width={480}
                  height={600}
                  sizes="100vw"
                  unoptimized
                  style={{
                     width: "480px",
                     height: "600px",
                     objectFit: "contain",
                  }}
               />
               <p
                  className={`right-[20%] top-[20%] md:top-[70%] md:right-[50%] md:translate-x-[50%] text-body italic opacity-80 font-bold absolute ${bodoniModa.className} text-4xl`}
               >
                  Autumn
               </p>
               <p className="uppercase body-s text-body  right-[20%] top-[30%] md:top-[65%] md:right-[50%] md:translate-x-[50%] absolute !tracking-[5px]">
                  collection
               </p>
            </section>
            <section
               ref={(el) => {
                  if (el) {
                     itemRef.current[3] = el
                  }
               }}
               className="flex flex-col flex-wrap items-center gap-4 text-center justify-center w-full pt-0 mx-auto container mt-10 show-item"
            >
               <h3 className="uppercase text-titleActive">Just for you</h3>
               <Icons.Border />

               <Swiper />
            </section>
         </main>
      </>
   )
}
