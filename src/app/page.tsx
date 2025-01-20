import { Icons } from "@/components/Icons/icons"
import { Bodoni_Moda } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/Footer/Footer"
import Product from "@/components/UI/Product"
import Carousel from "@/components/UI/Carousel/Carousel"
import ScrollToTop from "@/components/UI/ScrollToTop/ScrollToTop"
import Header from "@/components/Header/Header"

const bodoniModa = Bodoni_Moda({
   subsets: ["latin"],
   display: "swap",
   style: "italic",
   adjustFontFallback: false,
})

export default async function Home() {
   return (
      <div className="background">
         <Header />
         <ScrollToTop />
         <main className="flex flex-col mx-auto items-center sm:items-start">
            <section className="w-full items-end relative h-[600px]">
               <Image
                  src="/mobile/hero-section.jpg"
                  alt="spring season"
                  priority={true}
                  width={0}
                  height={600}
                  sizes="100vw"
                  unoptimized={true}
                  style={{
                     width: "100%",
                     height: "600px",
                     objectFit: "contain",
                     objectPosition: "top",
                  }}
               />
               <p
                  className={`font-bold italic text-body absolute left-1/2 -translate-x-1/2 text-nowrap bottom-[40%] ${bodoniModa.className} uppercase text-[30px] bg-blend-multiply opacity-70 leading-tight`}
               >
                  <span className="ml-5">Fashion </span>
                  <br /> & Accessories
               </p>
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
               <div className="w-full flex items-center justify-around px-2">
                  <button>All</button>
                  <button>Apparel</button>
                  <button>Dress</button>
                  <button>Tshirt</button>
                  <button>Bag</button>
               </div>
               <div className="flex flex-wrap justify-center gap-4">
                  <Product />
                  <Product />
                  <Product />
                  <Product />
               </div>
               <div className="flex items-center gap-2 py-4">
                  <p className="text-titleActive body-1">Explore More</p>
                  <Icons.ArrowRight />
               </div>
            </section>
            <section className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 container mx-auto my-4">
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
            <section className="flex flex-col md:flex-row justify-center items-center gap-4 container mx-auto w-full mt-10">
               <p className="text-titleActive uppercase title">Collections</p>
               <div className="w-full relative">
                  <Image
                     src="/mobile/october.jpg"
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
            <section className="p-10 relative">
               <Image
                  src="/mobile/autumn_collection.jpg"
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
            <section className="flex flex-col md:flex-row flex-wrap items-center gap-4 text-center justify-center w-full pt-0 mx-auto container mt-10">
               <h3 className="uppercase text-titleActive">Just for you</h3>
               <Icons.Border />

               <Carousel />
            </section>
            <section className="flex flex-col md:flex-row w-full justify-center mx-auto container my-10 rounded-md"></section>
         </main>
         <Footer />
      </div>
   )
}
