"use client"

import Image from "next/image"
import { Icons } from "@/components/Icons/icons"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import getSingleProduct from "@/services/store/product/singleProduct"
import { useRouter, useSearchParams } from "next/navigation"
import { IPutCart, putCart, getCart } from "@/services/store/cart/Cart"
import toast from "react-hot-toast"
import Reviews from "./singleproduct/Reviews"
import Details from "./singleproduct/Details"
import clsx from "clsx"
import Footer from "@/components/layout/Footer/Footer"
import NotFound from "@/app/not-found"
import Colors from "@/components/SingleProduct/Colors"
import Sizes from "@/components/SingleProduct/Sizes"

export default function SingleProduct({
   slug,
   isAuthenticated,
}: {
   slug: string
   isAuthenticated: boolean
}) {
   const [isImageLoaded, setIsImageLoaded] = useState(false)
   const searchParams = useSearchParams()
   const router = useRouter()
   const queryClient = useQueryClient()

   const [section, setSection] = useState<"details" | "reviews">("details")

   const { data, isLoading } = useQuery({
      queryKey: ["single product", slug],
      queryFn: () => getSingleProduct(slug),
   })

   const mutation = useMutation({
      mutationFn: (data: IPutCart[]) => putCart(data),
      onSuccess: (data) => {
         console.log("added to cart", data)
         toast.success("added to cart")
         queryClient.invalidateQueries({
            queryKey: ["cart"],
         })
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

   const oldCartData = cart?.data ?? []

   const duplicateProuduct = oldCartData?.findIndex(
      (item: { colors: string; sizes: string }) =>
         item.colors === searchParams.get("color") &&
         item.sizes === searchParams.get("size")
   )

   const dataInCart = oldCartData?.[duplicateProuduct]
   console.log(dataInCart, "data in cart")
   const handleCart = () => {
      if (!isAuthenticated) {
         const currentPath = window.location.pathname + window.location.search
         router.push(`/login?callbackUrl=${currentPath}`)
         return
      }

      console.log(duplicateProuduct)

      if (duplicateProuduct === -1 || duplicateProuduct === undefined) {
         console.log("not found")
         mutation.mutate([
            ...oldCartData,
            {
               data,
               count: 1,
               colors: searchParams.get("color")!,
               sizes: searchParams.get("size")!,
            },
         ])
      } else {
         console.log("found in cart")
         const oldProduct = oldCartData?.[duplicateProuduct]
         oldProduct.count += 1
         mutation.mutate(
            oldCartData.splice(oldCartData[duplicateProuduct], 1, oldProduct)
         )
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] })
   }

   const isItOkToOrder =
      searchParams.getAll("color").length > 0 &&
      searchParams.getAll("size").length > 0

   if (data?.status == 404) {
      return <NotFound />
   }
   return (
      <>
         <div className="flex flex-col mt-1 container mx-auto">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:gap-[120px] gap-4 flex-1 px-4">
               <div
                  className={clsx(
                     "w-full h-[464px] bg-white-100 flex items-center justify-center min-h-[460px] lg:h-[600px]",
                     {
                        "animate-pulse bg-background": isLoading,
                     }
                  )}
               >
                  {!isLoading && (
                     <Image
                        src={data?.main_image + "?imwidth=620"}
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
                  )}
               </div>
               <div className="flex flex-col gap-4 flex-1 max-w-[438px]">
                  <div className="flex items-center justify-between h-[24px]">
                     <h3
                        className={clsx("font-bold text-titleActive", {
                           "bg-inputBackground animate-pulse": isLoading,
                        })}
                     >
                        {data?.name}
                     </h3>
                     <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={copyToClipboard}
                     >
                        <Icons.Share />
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <div className="flex items-center justify-between gap-4 h-[24px]">
                        <h4 className="text-secondary">
                           {!isLoading ? (
                              `$ ${data?.price} `
                           ) : (
                              <div className="w-[54px] bg-inputBackground animate-pulse"></div>
                           )}
                        </h4>
                        <div className="flex items-center gap-2">
                           {isHaveRating && (
                              <div className="flex items-center rounded-full bg-neutral-100 h-7 px-4">
                                 <Icons.Star />
                                 <p className="text-neutral-400">
                                    4.2 -- 54 Review
                                 </p>
                              </div>
                           )}
                           {!isLoading ? (
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
                           ) : (
                              <div className="w-[64px] h-[24px] bg-inputBackground animate-pulse"></div>
                           )}
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
                        <Colors
                           colors={colors}
                           handleQueryParams={handleQueryParams}
                           searchParams={searchParams}
                        />
                        <Sizes
                           sizes={sizes}
                           handleQueryParams={handleQueryParams}
                           searchParams={searchParams}
                        />
                     </div>
                  </div>
               </div>
            </section>
            <div className="w-full bg-black flex justify-between items-center px-4 gap-4 mt-4 cursor-pointer h-[56px]">
               <div className="flex items-center gap-4">
                  <button
                     className="flex items-center gap-2 py-2 text-center rounded-md text-white-100 uppercase"
                     style={{
                        opacity: !isRemaining || mutation.isPending ? 0.5 : 1,
                        cursor: !isRemaining ? "not-allowed" : "pointer",
                     }}
                     onClick={handleCart}
                     disabled={!isItOkToOrder || mutation.isPending}
                  >
                     {mutation.isPending ? (
                        <span className="loader"></span>
                     ) : (
                        <Icons.PlusWhite />
                     )}
                     <p>Add</p>
                  </button>
               </div>
               <div
                  className="flex items-center justify-center w-[43px]"
                  onClick={handleFavorite}
               >
                  {isFavorite ? (
                     <Icons.Heart stroke="red" fill="red" />
                  ) : (
                     <Icons.Heart />
                  )}
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
            {/* <section className="text-center flex flex-col items-center mt-4">
               <div className="flex flex-col items-center gap-2 py-4">
                  <p className="uppercase text-titleActive">
                     You may also like
                  </p>
                  <Icons.Border />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Product />
               <Product />
               <Product />
               <Product />
               </div>
            </section> */}
            <Footer />
         </div>
      </>
   )
}
