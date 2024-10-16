"use client";

import Image from "next/image";
import { Icons } from "@/components/Icons/icons";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import getSingleProduct from "@/services/store/singleProduct";

export default function Product({ params }: { params: { slug: string } }) {
   const [section, setSection] = useState<"details" | "reviews">("details");
   const slug = params.slug;

   const { data } = useQuery({
      queryKey: ["single product", slug],
      queryFn: () => getSingleProduct(slug),
   });

   return (
      <div className="flex flex-col container mx-auto">
         <div className="py-6">
            <Breadcrumb />
         </div>
         <section className="grid grid-cols-1 md:grid-cols-2 lg:gap-[120px] flex-1">
            <div className="w-[574px] h-[574px] bg-white-100 flex items-center justify-center ">
               <Image
                  src={data?.main_image}
                  alt="profile"
                  width="255"
                  height="0"
                  objectFit="cover"
                  style={{
                     height: "auto",
                  }}
               />
            </div>
            <div className="flex flex-col gap-2 flex-1 max-w-[438px]">
               <div className="flex items-center justify-between">
                  <h3 className="font-bold">{data?.name}</h3>
                  <Icons.Share />
               </div>
               <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-full bg-neutral-100 h-7 px-4">
                           <Icons.Star />
                           <p className="text-neutral-400">4.2 -- 54 Review</p>
                        </div>
                        <p className="btn-outline">IN STOCK</p>
                     </div>
                     <h4 className="font-bold text-neutral-900">
                        ${data?.price}
                     </h4>
                  </div>
                  <div className="flex flex-col gap-2">
                     <p className="label font-medium text-xs text-neutral-500 uppercase">
                        available colors
                     </p>
                     <div className="flex items-center  gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-r200 border border-neutral-900 p-[3px] bg-clip-content cursor-pointer"></div>
                        <div className="w-7 h-7 rounded-full bg-primary-600 border border-neutral-900 p-[3px] bg-clip-content cursor-pointer"></div>
                        <div className="w-7 h-7 rounded-full bg-green-g900 border border-neutral-900 p-[3px] bg-clip-content cursor-pointer"></div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <p className="label font-medium text-xs text-neutral-500 uppercase">
                        select size
                     </p>
                     <div className="flex items-center gap-2">
                        <p className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer font-medium">
                           S
                        </p>
                        <p className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer font-medium">
                           M
                        </p>
                        <p className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer font-medium">
                           XL
                        </p>
                     </div>
                  </div>
                  <div className="flex flex-col gap-8">
                     <div className="flex flex-col gap-2">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           quantity
                        </p>
                        <div className="w-[164px] h-[44px] flex justify-between items-center border border-white-200 rounded-md">
                           <div className="flex items-center justify-center  cursor-pointer w-full">
                              <Icons.Minus />
                           </div>
                           <p className="w-full text-center">5</p>
                           <div className="flex items-center justify-center cursor-pointer w-full">
                              <Icons.Plus />
                           </div>
                        </div>
                     </div>
                     <div className="flex gap-4 cursor-pointer">
                        <button className="px-24 py-2 bg-neutral-900 text-center rounded-md text-white-100">
                           Add to cart
                        </button>
                        <div className="border border-neutral-200 rounded-md flex items-center justify-center w-[43px]">
                           <Icons.Heart />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="flex items-center justify-start gap-10 min-h-64">
            <div className="flex flex-col gap-4">
               <button
                  className={`flex transition rounded-lg w-40 font-medium gap-2 items-center text-neutral-900 py-2 px-4 ${
                     section === "details" && "bg-white-100"
                  }`}
                  onClick={() => setSection("details")}
               >
                  <Icons.More />
                  Details
               </button>
               <button
                  className={`flex gap-2 rounded-lg w-40 transition items-center font-medium text-neutral-900  py-2 px-4 ${
                     section === "reviews" && "bg-white-100"
                  }`}
                  onClick={() => setSection("reviews")}
               >
                  <Icons.Star />
                  Reviews
               </button>
            </div>
            <div className="max-w-[725px]">
               {section == "details" && (
                  <>
                     <h5 className="font-semibold mb-4">Detail</h5>
                     <p className="text-neutral-500">
                        Elevate your everyday style with our Men's Black
                        T-Shirts, the ultimate wardrobe essential for modern
                        men. Crafted with meticulous attention to detail and
                        designed for comfort, these versatile black tees are a
                        must-have addition to your collection. The classic black
                        color never goes out of style. Whether you're dressing
                        up for a special occasion or keeping it casual, these
                        black t-shirts are the perfect choice, effortlessly
                        complementing any outfit.
                     </p>
                  </>
               )}
               {section == "reviews" && (
                  <div className="flex flex-col items-start gap-6 min-w-[360px] lg:w-[727px] max-w-[727px]">
                     <div>
                        <h5 className="font-semibold mb-4">reviews</h5>
                        <div className="flex items-center gap-3">
                           <h2 className="text-neutral-900">4.2</h2>
                           <p className="text-neutral-400">— 54 Reviews</p>
                        </div>
                     </div>
                     <button className="text-sm flex items-start font-medium border px-4 py-2 rounded-md border-neutral-900">
                        Write a review
                     </button>
                     <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-end w-full">
                           <button className="flex items-center gap-2 uppercase text-sm text-neutral-500">
                              Sort by <Icons.ChevronDown />
                           </button>
                        </div>
                        <span className="h-[1px] border-b-neutral-200 bg-neutral-200 w-full"></span>
                     </div>
                  </div>
               )}
            </div>
         </section>
      </div>
   );
}
