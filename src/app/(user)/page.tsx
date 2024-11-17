import { Icons } from "@/components/Icons/icons"
import Image from "next/image"
import Card from "@/components/UI/Card"

export default function Home() {
   return (
      <main className="flex flex-col gap-8  items-center sm:items-start p-4 mt-[64px]">
         <section className="w-full items-end">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-between lg:justify-center items-end h-full gap-4 lg:gap-0">
               <div className="flex flex-col items-start justify-center  h-full">
                  <h2 className="text-natural-800">Fresh Arrivals Online</h2>
                  <p className="text-neutral-600 mt-2">
                     Discover Our Newest Collection Today.
                  </p>
                  <button className="btn mt-10">
                     <p>View Collection</p>
                     <span className="ml-2">
                        <Icons.ArrowRight className="fill-neutral-100" />
                     </span>
                  </button>
               </div>
               <div className="flex items-center justify-center">
                  <Image
                     src="/Hero-Image.svg"
                     alt="hero image"
                     width={346}
                     height={382}
                  />
               </div>
            </div>
         </section>
         <section className="grid grid-cols-1 items-center justify-items-between  md:grid-cols-2 lg:grid-cols-3 gap-32 container mx-auto py-20">
            <div className="flex flex-col gap-4 items-center lg:items-start">
               <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white-100">
                  <Icons.Truck className="w-7 h-7" />
               </div>
               <h5 className="font-bold">Free Shipping</h5>
               <p>
                  Upgrade your style today and get FREE <br /> shipping on all
                  orders! Don&apos;t miss out.
               </p>
            </div>
            <div className="flex flex-col gap-4  items-center lg:items-start">
               <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white-100">
                  <Icons.StarBadge className="w-7 h-7" />
               </div>
               <h5 className="font-bold">Satisfaction Guarantee</h5>
               <p>
                  Shop confidently with our Satisfaction <br /> Guarantee: Love
                  it or get a refund.
               </p>
            </div>
            <div className="flex flex-col gap-4  items-center lg:items-start text-center">
               <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white-100">
                  <Icons.ShieldCheck />
               </div>
               <h5 className="font-bold">Secure Payment</h5>
               <p>
                  Your security is our priority. Your payments are secure with
                  us.
               </p>
            </div>
         </section>
         <section className="flex flex-col justify-center items-center w-full gap-14 container mx-auto">
            <div className="flex flex-col items-center gap-4">
               <p className="text-neutral-300 text-label">SHOP NOW</p>
               <h3 className="text-neutral-900">Best Selling</h3>
            </div>
            <div className="flex items-center w-full justify-between gap-6">
               <Card />
               {/* <Card />
               <Card />
               <Card /> */}
            </div>
         </section>
         <section className="bg-white-100 w-full p-4 pt-0 lg:p-0">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 justify-between items-center">
               <div className="flex flex-col gap-8 items-start">
                  <h3 className="text-neutral-900">
                     Browse Our Fashion Paradise!
                  </h3>
                  <p className="text-neutral-500">
                     Step into a world of style and explore our diverse
                     collection of clothing categories.
                  </p>
                  <button className="btn">
                     <p>Start Browsing</p>
                     <span className="ml-2">
                        <Icons.ArrowRight className="fill-neutral-100" />
                     </span>
                  </button>
               </div>
               <div className="flex justify-center -order-1 lg:order-1">
                  <Image
                     src={"/tshirt.png"}
                     alt="clothes"
                     width={237}
                     height={312}
                  />
               </div>
            </div>
         </section>
         <section className="flex flex-col gap-12 justify-center items-center w-full container mx-auto">
            <div className="flex gap-[10px] items-center">
               <div>
                  <input
                     id="featured"
                     type="radio"
                     className="appearance-none peer"
                     name="featured"
                  />
                  <label
                     htmlFor="featured"
                     className="cursor-pointer transition-colors font-medium text-sm px-4 py-1 rounded-full border peer-checked:border-neutral-500  border-[rgba(0,0,0,0)]"
                  >
                     Featured
                  </label>
               </div>
               <div>
                  <input
                     id="latest"
                     type="radio"
                     className="appearance-none peer"
                     name="featured"
                  />
                  <label
                     htmlFor="latest"
                     className="cursor-pointer transition-colors font-medium text-sm px-4 py-1 rounded-full border peer-checked:border-neutral-500  border-[rgba(0,0,0,0)]"
                  >
                     Latest
                  </label>
               </div>
            </div>
            <div className="flex justify-between w-full">
               {/* <div className="hidden peer-[.is-check-2]:checked:flex">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Earum, laboriosam!
               </div> */}
               <Card />
               {/* <Card />
               <Card />
               <Card /> */}
            </div>
         </section>
         <section className="w-full bg-white-100 py-20">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-10 p-4 lg:p-0">
               <div className="flex flex-col gap-6">
                  <h3 className="text-neutral-900">Join Our Newsletter</h3>
                  <p className="text-neutral-500">
                     We love to surprise our subscribers with occasional gifts.
                  </p>
               </div>
               <div className="flex flex-col justify-center lg:flex-row lg:items-center items-start gap-4 h-11">
                  <input
                     type="email"
                     placeholder="Your email Address"
                     className="text-sm p-3 lg:py-3 text-neutral-300 rounded-md pl-2 pr-8 outline-none border border-transparent focus-within:border-neutral-900 transition bg-white-100"
                  />
                  <button className="btn h-full">Subsribe</button>
               </div>
            </div>
         </section>
      </main>
   )
}
