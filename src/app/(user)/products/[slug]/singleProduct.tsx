"use client"

import Image from "next/image"
import { Icons } from "@/components/Icons/icons"
import { useState } from "react"
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { useQuery, useMutation } from "@tanstack/react-query"
import getSingleProduct from "@/services/store/product/singleProduct"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useHandleQueryParam from "@/utils/useHandleQueryParams"
import { IPutCart, putCart, getCart } from "@/services/store/cart/Cart"
import product from "@/services/store/product/products"
import { Colors } from "@/utils/constant"
import toast from "react-hot-toast"
import checkLoggedin from "@/services/user/check_loggedin"

export default function SingleProduct({ slug }: { slug: string }) {
   const searchParams = useSearchParams()
   const router = useRouter()
   const pathname = usePathname()

   const { data: isLogged } = useQuery({
      queryKey: ["isLogged"],
      queryFn: () => checkLoggedin(),
   })

   const [section, setSection] = useState<"details" | "reviews">("details")
   const [productCount, setProductCount] = useState(1)

   const { data } = useQuery({
      queryKey: ["single product", slug],
      queryFn: () => getSingleProduct(slug),
   })

   const mutation = useMutation({
      mutationFn: (data: IPutCart[]) => putCart(data),
      onSuccess: (data) => {
         console.log("added to cart", data)
         toast.success("added to cart")
      },
      onError: (error) => {
         console.log("error", error)
         toast.error("something went wrong")
      },
   })

   const { data: cart } = useQuery({
      queryKey: ["cart"],
      queryFn: () => getCart(),
   })

   const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.toString())
   }

   const isRemaining = data?.remaining > 0
   const isHaveRating = data?.rate > 0
   const isHavecomments = data?.comments.length > 0
   const isFavorite = JSON.parse(
      localStorage.getItem("favorite") as string
   )?.includes(slug)

   const sizes = data?.options?.sizes
   const colors = data?.options?.colors

   // const handleQueryParams = useHandleQueryParam()
   const handleQueryParams = function (key, value) {
      const url = new URL(window.location.href)
      url.searchParams.set(key, value)
      router.push(url.toString())
   }

   const handleFavorite = () => {
      const oldFavorite =
         JSON.parse(localStorage.getItem("favorite") as string) || []
      if (oldFavorite.includes(slug)) {
         oldFavorite.splice(oldFavorite.indexOf(slug), 1)
         localStorage.setItem("favorite", JSON.stringify(oldFavorite))
         router.refresh()
      } else {
         oldFavorite.push(slug)
         localStorage.setItem("favorite", JSON.stringify(oldFavorite))
         router.refresh()
      }
   }

   const oldCartData = cart?.data

   const handleCart = () => {
      if (!isLogged) {
         router.push("/login")
         return
      }
      const duplicateProuduct = oldCartData?.findIndex(
         (item) =>
            item.colors === searchParams.get("color") &&
            item.sizes === searchParams.get("size")
      )

      console.log(duplicateProuduct)

      if (duplicateProuduct === -1 || duplicateProuduct === undefined) {
         console.log("not found")
         mutation.mutate([
            ...oldCartData,
            {
               data,
               count: productCount,
               colors: searchParams.get("color")!,
               sizes: searchParams.get("size")!,
            },
         ])
      } else {
         console.log("found in cart")
         const oldProduct = oldCartData?.[duplicateProuduct]
         oldProduct.count += productCount
         mutation.mutate(
            oldCartData.splice(oldCartData[duplicateProuduct], 1, oldProduct)
         )
      }
   }

   const isItOkToOrder =
      searchParams.getAll("color").length > 0 &&
      searchParams.getAll("size").length > 0

   return (
      <div className="flex flex-col container mx-auto">
         <div className="py-6">
            <Breadcrumb />
         </div>
         <section className="grid grid-cols-1 md:grid-cols-2 lg:gap-[120px] flex-1">
            <div className="w-full h-full bg-white-100 flex items-center justify-center ">
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
                  <div
                     className="flex items-center justify-center cursor-pointer"
                     onClick={copyToClipboard}
                  >
                     <Icons.Share />
                  </div>
               </div>
               <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        {isHaveRating && (
                           <div className="flex items-center rounded-full bg-neutral-100 h-7 px-4">
                              <Icons.Star />
                              <p className="text-neutral-400">
                                 4.2 -- 54 Review
                              </p>
                           </div>
                        )}
                        <p
                           className="btn-outline"
                           style={{
                              textDecoration: !isRemaining
                                 ? "line-through"
                                 : "none",
                           }}
                        >
                           IN STOCK
                        </p>
                     </div>
                     <h4 className="font-bold text-neutral-900">
                        ${data?.price}
                     </h4>
                  </div>
                  <div
                     style={{
                        opacity: !isRemaining ? 0.5 : 1,
                        cursor: !isRemaining
                           ? "not-allowed !important"
                           : "auto",
                     }}
                     className="flex flex-col gap-8"
                  >
                     <div className="flex flex-col gap-2">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           available colors
                        </p>
                        <div className="flex items-center  gap-2">
                           {colors?.map((color: string) => {
                              const isChecked = searchParams
                                 .getAll("color")
                                 ?.includes(color)

                              return (
                                 <div key={color} className="flex items-center">
                                    <label
                                       style={{
                                          border: "1px solid transparent",
                                          backgroundColor: Colors[color],
                                          borderColor: isChecked
                                             ? "black"
                                             : "transparent",
                                       }}
                                       htmlFor={`${color}--color-single`}
                                       className={`w-7 h-7 rounded-full transition p-[3px] bg-clip-content bg-red-r200 borderp-[3px]  cursor-pointer`}
                                    ></label>
                                    <input
                                       type="radio"
                                       value={color}
                                       id={`${color}--color-single`}
                                       className="hidden"
                                       checked={isChecked}
                                       onChange={(e) => {
                                          handleQueryParams(
                                             "color",
                                             e.target.value
                                          )
                                       }}
                                    />
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           select size
                        </p>
                        <div className="flex items-center gap-2">
                           {sizes?.map((item) => {
                              const isChecked = searchParams
                                 .getAll("size")
                                 ?.includes(item)

                              return (
                                 <div key={item} className="flex items-center">
                                    <label
                                       style={{
                                          borderColor: isChecked
                                             ? "black"
                                             : "#e6e7e8",
                                       }}
                                       htmlFor={`${item}--size`}
                                       className="flex items-center text-sm uppercase justify-center w-10 h-10 rounded-md cursor-pointer border border-neutral-100 transition"
                                    >
                                       {item}
                                    </label>
                                    <input
                                       type="checkbox"
                                       value={item}
                                       id={`${item}--size`}
                                       className="hidden"
                                       checked={isChecked}
                                       onChange={(e) => {
                                          handleQueryParams(
                                             "size",
                                             e.target.value
                                          )
                                       }}
                                    />
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           quantity
                        </p>
                        <div className="w-[164px] h-[44px] flex justify-between items-center border border-white-200 rounded-md">
                           <button
                              className="flex items-center justify-center  cursor-pointer w-full"
                              disabled={productCount == 1}
                              style={{
                                 opacity: productCount === 1 ? "0.4" : 1,
                              }}
                              onClick={() =>
                                 setProductCount((prev) => prev - 1)
                              }
                           >
                              <Icons.Minus />
                           </button>
                           <p className="w-full text-center">{productCount}</p>
                           <button
                              className="flex items-center justify-center  w-full"
                              disabled={data?.remaining == productCount}
                              style={{
                                 opacity:
                                    data?.remaining == productCount ? 0.4 : 1,
                              }}
                              onClick={() => {
                                 setProductCount((prev) => prev + 1)
                              }}
                           >
                              <Icons.Plus />
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-8">
                     <div className="flex gap-4 cursor-pointer">
                        <button
                           className="px-24 py-2 bg-neutral-900 text-center rounded-md text-white-100"
                           style={{
                              opacity: !isRemaining ? 0.5 : 1,
                              cursor: !isRemaining ? "not-allowed" : "pointer",
                           }}
                           onClick={handleCart}
                           disabled={!isItOkToOrder}
                        >
                           Add to cart
                           {mutation.isPending && (
                              <span className="loader"></span>
                           )}
                        </button>
                        <div
                           className="border border-neutral-200 rounded-md flex items-center justify-center w-[43px]"
                           onClick={handleFavorite}
                        >
                           {isFavorite ? <Icons.HeartRed /> : <Icons.Heart />}
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
                        Elevate your everyday style with our Men&apos;s Black
                        T-Shirts, the ultimate wardrobe essential for modern
                        men. Crafted with meticulous attention to detail and
                        designed for comfort, these versatile black tees are a
                        must-have addition to your collection. The classic black
                        color never goes out of style. Whether you&apos;re
                        dressing up for a special occasion or keeping it casual,
                        these black t-shirts are the perfect choice,
                        effortlessly complementing any outfit.
                     </p>
                  </>
               )}
               {section == "reviews" && (
                  <div className="flex flex-col items-start gap-6 min-w-[360px] lg:w-[727px] max-w-[727px]">
                     {isHavecomments && (
                        <div>
                           <h5 className="font-semibold mb-4">reviews</h5>
                           <div className="flex items-center gap-3">
                              <h2 className="text-neutral-900">4.2</h2>
                              <p className="text-neutral-400">— 54 Reviews</p>
                           </div>
                        </div>
                     )}

                     <button className="text-sm flex items-start font-medium border px-4 py-2 rounded-md border-neutral-900">
                        {isHavecomments
                           ? " Write a review"
                           : "Write first review"}
                     </button>
                     {isHavecomments && (
                        <div className="flex flex-col gap-3 w-full">
                           <div className="flex justify-end w-full">
                              <button className="flex items-center gap-2 uppercase text-sm text-neutral-500">
                                 Sort by <Icons.ChevronDown />
                              </button>
                           </div>
                           <span className="h-[1px] border-b-neutral-200 bg-neutral-200 w-full"></span>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </section>
      </div>
   )
}
