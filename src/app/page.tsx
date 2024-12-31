import { Icons } from "@/components/Icons/icons"
import Image from "next/image"
import Card from "@/components/UI/Card"
import Link from "next/link"
import checkLoggedin from "@/services/user/check_loggedin"
import Profile from "@/components/Header/Profile"
import Carousel from "@/components/Carousel/Carousel"
import Footer from "@/components/Footer/Footer"

export default async function Home() {
   const isLogged = await checkLoggedin()
   return (
      <main className="flex flex-col mx-auto items-center sm:items-start bg-[#F3F3F3]">
         <div className="w-full flex items-center justify-center text-center h-[44px] bg-[#FC7A1D] font-bold uppercase">
            Summer sale up to 50% off
         </div>
         <section className="w-full items-end relative">
            <header className="absolute w-full h-21 top-0 z-10 bg-transparent text-white-100 px-4">
               <div className="flex items-center justify-between h-[84px] 3xl:container mx-auto">
                  <Link href={"/"} className="flex items-center gap-4">
                     <Icons.Logo />
                     <h2 className="text-neutral-900 hidden lg:flex">
                        {/* Ecommerce */}
                     </h2>
                  </Link>
                  <nav>
                     <ul className="hidden lg:flex justify-between gap-8 text-neutral-500">
                        <li className="hover:text-neutral-900 transition-colors">
                           <Link href={"/"}>Home</Link>
                        </li>
                        <li className="hover:text-neutral-900 transition-colors">
                           <Link href={"/categories"}>Categories</Link>
                        </li>
                        <li className="hover:text-neutral-900 transition-colors">
                           <Link href={"/products"}>Products</Link>
                        </li>
                        <li className="hover:text-neutral-900 transition-colors">
                           <Link href={"/about"}>About</Link>
                        </li>
                        <li>
                           <Link
                              className="hover:text-neutral-900 transition-colors"
                              href={"/contact"}
                           >
                              Contact
                           </Link>
                        </li>
                     </ul>
                  </nav>
                  <div className="flex items-center gap-8 justify-between">
                     {isLogged ? (
                        <Profile />
                     ) : (
                        <Link className="btn" href={"/login"}>
                           Login
                        </Link>
                     )}
                  </div>
               </div>
            </header>
            <Image
               src="/hero-image.jpg"
               alt="shop"
               width={0}
               height={0}
               sizes="100vw"
               style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                  objectPosition: "bottom",
               }}
            />
            <p className="font-bold text-neutral-500 absolute left-20 bottom-20 text-2xl">
               Spring Season
            </p>
            <Link className="absolute right-20 bottom-20" href={"/product"}>
               View Collecion
            </Link>
         </section>
         <section className="flex justify-around items-center w-full py-10 bg-[#FC7A1D]">
            <Icons.NumeroIcon />
            <Icons.KinfolkIcon />
            <Icons.FashionBeansIcon />
            <Icons.HyperbeastLogo />
         </section>
         <section className="grid grid-cols-1 items-center justify-items-between md:grid-cols-2 container mx-auto">
            <div className="flex justify-end items-center">
               <Carousel
                  images={[
                     "https://placehold.co/600x400/121112/FFFFFF.png",
                     "https://placehold.co/600x400/123412/FFFFFF.png",
                     "https://placehold.co/600x400/122222/FFFFFF.png",
                  ]}
               />
            </div>
            <div className="relative max-w-[590px]">
               <Image
                  src={"/image-1.jpg"}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     objectPosition: "center",
                  }}
               />
               <Link
                  className="absolute bottom-10 left-10 bg-neutral-900 text-white-100 text-sm px-4 py-2 rounded-md"
                  href={"/products"}
               >
                  Shop shirt
               </Link>
            </div>
         </section>
         <section className="flex flex-wrap justify-center md:grid-cols-2 gap-4 container mx-auto w-full mt-10">
            <div className="max-w-[596px] h-[600px] bg-white-200 rounded-md flex justify-center items-center relative">
               <Image
                  src={"/hero-image-2.png"}
                  alt="image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     objectPosition: "center",
                  }}
               />
               <Link
                  className="absolute bottom-10 left-10 bg-neutral-900 text-white-100 text-sm px-4 py-2 rounded-md"
                  href={"/products"}
               >
                  Shop Sweaters
               </Link>
            </div>
            <div className="bg-[#FC7A1D] p-10 max-w-[596px] h-[596px] text-neutral-900 flex flex-col justify-between rounded-lg w-full">
               <p className="font-bold text-3xl">
                  “ First Light promises <br /> quality, timeless designs <br />
                  and with our mission it is <br /> truly a buy it for life
                  purchase. “
               </p>
               <p>— Guera Latissa, Creative Director</p>
            </div>
         </section>
         <section className="flex flex-wrap justify-center w-full pt-0 mx-auto container mt-10">
            <div className="bg-['#FC7A1D'] relative h-[600px] lg:w-[586px] flex">
               <Image
                  src={"/womens.jpg"}
                  alt="womens"
                  sizes="100vw"
                  width={0}
                  height={0}
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     objectPosition: "center",
                     borderTopLeftRadius: "6px",
                     borderBottomLeftRadius: "6px",
                  }}
               />
               <Link
                  href={"/products"}
                  className="flex items-center gap-2 absolute left-8 bottom-8"
               >
                  WOMEN
                  <Icons.ArrowTopRight />
               </Link>
            </div>
            <div className="bg-['#FC7A1D'] relative  h-[600px] lg:w-[586px]">
               <Image
                  src={"/mens.jpg"}
                  alt="mens"
                  sizes="100vw"
                  width={0}
                  height={0}
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                     objectPosition: "center",
                     borderTopRightRadius: "6px",
                     borderBottomRightRadius: "6px",
                  }}
               />
               <Link
                  href={"/products"}
                  className="flex items-center gap-2 absolute left-8 bottom-8"
               >
                  MEN
                  <Icons.ArrowTopRight />
               </Link>
            </div>
         </section>
         <section className="flex flex-wrap w-full justify-center mx-auto container my-10 rounded-md">
            <div className="lg:w-[580px]">
               <Image
                  src="/visit-our.jpg"
                  alt="visit our popup shop"
                  sizes="100vw"
                  width={0}
                  height={0}
                  style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                  }}
               />
            </div>
            <div className=" flex flex-col justify-between gap-8 p-16 font-semibold lg:w-[590px] bg-white-900">
               <div className="flex flex-col gap-8">
                  <h3>Visit our popup shop</h3>
                  <p>
                     Willemsparkweg 63 <br /> 1071 GS Amsterdam <br /> The
                     Netherlands
                  </p>
               </div>
               <div className="grid grid-cols-2 w-[308px] gap-6">
                  <p>Monday</p>
                  <p>12.00 - 19.00</p>
                  <p>Tuesday</p>
                  <p>10.00 - 19.00</p>
                  <p>WednesDay</p>
                  <p>10.00 - 19.00</p>
                  <p>Thursday</p>
                  <p>10.00 - 21.00</p>
                  <p>Friday</p>
                  <p>10.00 - 19.00</p>
                  <p>Saturday</p>
                  <p>10.00 - 18.00</p>
                  <p>Sunday</p>
                  <p>12.00 - 18.00</p>
               </div>
            </div>
         </section>
         <Footer />
      </main>
   )
}
