"use client"

import Image from "next/image"
import { Icons } from "@/components/Icons/icons"
import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import getSingleProduct from "@/services/store/product/singleProduct"
import { useRouter, useSearchParams } from "next/navigation"
import { IPutCart, putCart, getCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"
import checkLoggedin from "@/services/user/check_loggedin"
import Reviews from "./singleproduct/Reviews"
import Details from "./singleproduct/Details"
import clsx from "clsx"
import Product from "@/components/UI/Product"
import Footer from "@/components/Footer/Footer"

export default function SingleProduct({ slug }: { slug: string }) {
   const [isImageLoaded, setIsImageLoaded] = useState(false)
   const searchParams = useSearchParams()
   const router = useRouter()

   const { data: isLogged } = useQuery({
      queryKey: ["isLogged"],
      queryFn: () => checkLoggedin(),
   })

   const [section, setSection] = useState<"details" | "reviews">("details")
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [productCount, setProductCount] = useState(1)

   const { data, isLoading } = useQuery({
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
      navigator.clipboard
         .writeText(window.location.toString())
         .then(() => {
            toast.success("copied to clipboard")
         })
         .catch(() => {
            toast.error("something went wrong")
         })
   }

   const isRemaining = data?.remaining > 0
   const isHaveRating = data?.rate > 0
   // const isHavecomments = data?.comments.length > 0
   const isFavorite = JSON.parse(
      localStorage.getItem("favorite") as string
   )?.includes(slug)

   const sizes = data?.options?.sizes
   const colors = data?.options?.colors

   // const handleQueryParams = useHandleQueryParam()
   const handleQueryParams = function (key: string, value: string) {
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

   const duplicateProuduct = oldCartData?.findIndex(
      (item: { colors: string; sizes: string }) =>
         item.colors === searchParams.get("color") &&
         item.sizes === searchParams.get("size")
   )

   const dataInCart = oldCartData?.[duplicateProuduct]
   console.log(dataInCart, "data in cart")
   const handleCart = () => {
      if (!isLogged) {
         router.push("/login")
         return
      }

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
      <div className="flex flex-col pt-4 container mx-auto">
         <section className="grid grid-cols-1 md:grid-cols-2 lg:gap-[120px] gap-4 flex-1 px-4">
            <div
               className={clsx(
                  "w-full h-[464px] bg-white-100 flex items-center justify-center min-h-[460px] ",
                  {
                     "animate-pulse bg-background": isLoading,
                  }
               )}
            >
               <Image
                  src={data?.main_image}
                  alt={data?.name}
                  width="255"
                  height="0"
                  unoptimized
                  className="transition duration-500"
                  style={{
                     height: "100%",
                     width: "100%",
                     objectFit: "cover",
                     opacity: isImageLoaded ? 1 : 0,
                  }}
                  onLoad={() => setIsImageLoaded(true)}
               />
            </div>
            <div className="flex flex-col gap-4 flex-1 max-w-[438px]">
               <div
                  className={clsx("flex items-center justify-between", {
                     "animate-pulse bg-background": isLoading,
                  })}
               >
                  <h3 className="font-bold">{data?.name}</h3>
                  <div
                     className="flex items-center justify-center cursor-pointer"
                     onClick={copyToClipboard}
                  >
                     <Icons.Share />
                  </div>
               </div>
               <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                     <h4 className="text-secondary">${data?.price}</h4>
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
                           className="btn-outline text-xs uppercase"
                           style={{
                              textDecoration: !isRemaining
                                 ? "line-through"
                                 : "none",
                           }}
                        >
                           IN STOCK
                        </p>
                     </div>
                  </div>
                  <div
                     style={{
                        opacity: !isRemaining ? 0.5 : 1,
                        cursor: !isRemaining
                           ? "not-allowed !important"
                           : "auto",
                     }}
                     className="flex gap-9 h-[56px]"
                  >
                     <div className="flex gap-4 items-center">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           color
                        </p>
                        <div className="flex items-center  gap-2">
                           {colors?.map((color: string) => {
                              const isChecked = searchParams
                                 .getAll("color")
                                 ?.includes(color)

                              return (
                                 <div
                                    key={color}
                                    className="flex items-center w-[16px] h-[16px]"
                                 >
                                    <label
                                       style={{
                                          border: "1px solid transparent",
                                          backgroundColor: color,
                                          borderColor: isChecked
                                             ? "black"
                                             : "transparent",
                                       }}
                                       htmlFor={`${color}--color-single`}
                                       className={`w-['24px'] h-["24px"] rounded-full transition p-[3px] bg-clip-content bg-red-r200 borderp-[3px]  cursor-pointer`}
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
                     <div className="flex gap-4 items-center">
                        <p className="label font-medium text-xs text-neutral-500 uppercase">
                           size
                        </p>
                        <div className="flex items-center gap-2">
                           {sizes?.map((item: string) => {
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
                                          backgroundColor: isChecked
                                             ? "black"
                                             : "transparent",
                                          color: isChecked
                                             ? "#e6e7e8"
                                             : "black",
                                       }}
                                       htmlFor={`${item}--size`}
                                       className="flex items-center text-[10px] uppercase justify-center w-[24px] h-[24px] rounded-full text-inputBackground cursor-pointer border border-neutral-100 transition"
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
                  </div>
               </div>
            </div>
         </section>
         <div className="w-full bg-black flex justify-between px-4 gap-4 mt-4 cursor-pointer h-[56px]">
            <button
               className="flex items-center gap-2 py-2 text-center rounded-md text-white-100 uppercase"
               style={{
                  opacity: !isRemaining ? 0.5 : 1,
                  cursor: !isRemaining ? "not-allowed" : "pointer",
               }}
               onClick={handleCart}
               disabled={!isItOkToOrder}
            >
               <Icons.PlusWhite />
               <p>
                  Add
                  {mutation.isPending && <span className="loader"></span>}
               </p>
            </button>
            {/* <button
               className="flex items-center justify-center  cursor-pointer w-full"
               disabled={productCount == 1 && dataInCart?.count == 1}
               style={{
                  opacity: productCount === 1 ? "0.4" : 1,
               }}
               onClick={() => setProductCount((prev) => prev - 1)}
            >
               <Icons.Minus />
            </button>
            <p className="w-full text-center">
               {cartLoading ? (
                  <span className="loader"></span>
               ) : (
                  dataInCart?.count ?? productCount
               )}
            </p>
            <button
               className="flex items-center justify-center  w-full"
               disabled={data?.remaining == productCount}
               style={{
                  opacity: data?.remaining == productCount ? 0.4 : 1,
               }}
               onClick={() => {
                  setProductCount((prev) => prev + 1)
               }}
            >
               <Icons.Plus />
            </button> */}
            <div
               className="flex items-center justify-center w-[43px]"
               onClick={handleFavorite}
            >
               {isFavorite ? <Icons.HeartRed /> : <Icons.Heart />}
            </div>
         </div>
         <section className="flex flex-col items-center justify-start gap-4 min-h-64">
            <div className="flex items-center w-full">
               <button
                  className={clsx(
                     "h-[56px] w-full justify-center first-letter flex transition font-medium gap-2 items-center text-neutral-900 py-2 px-4 border-b border-transparent uppercase",
                     {
                        "!border-black": section === "details",
                     }
                  )}
                  onClick={() => setSection("details")}
               >
                  Details
               </button>
               <button
                  className={clsx(
                     "h-[56px] w-full justify-center first-letter flex transition font-medium gap-2 items-center text-neutral-900 py-2 px-4 border-b border-transparent uppercase",
                     {
                        "!border-black": section === "reviews",
                     }
                  )}
                  onClick={() => setSection("reviews")}
               >
                  Reviews
               </button>
            </div>
            <div className="max-w-[725px] h-fit">
               {section == "details" && <Details />}
               {section == "reviews" && <Reviews />}
            </div>
         </section>
         <section className="text-center flex flex-col items-center mt-4">
            <div className="flex flex-col items-center gap-2 py-4">
               <p className="uppercase">You may also like</p>
               <Icons.Border />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Product />
               <Product />
               <Product />
               <Product />
            </div>
         </section>
         <Footer />
      </div>
   )
}
