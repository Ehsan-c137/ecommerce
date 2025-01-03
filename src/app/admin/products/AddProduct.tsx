"use client"

import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import signin from "@/services/user/signin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/Icons/icons"
import toast from "react-hot-toast"

const SigninSchema = z.object({
   title: z
      .string()
      .min(3, { message: "title must be at least 3 characters long" }),
   price: z.number().min(1, { message: "price must bte at least 1" }),
   category: z.string().min(1, { message: "category is required" }),
   slug: z.string().min(1, { message: "slug is required" }),
   sku: z.string().min(1, { message: "SKU is required" }),
   availableQuantity: z
      .number()
      .min(1, { message: "Available Quantity is required" }),
   stock_status: z.string().min(1, { message: "stock status is required" }),
   available_quantity: z.number().min(0, { message: "quantity is required" }),
   description: z.string(),
})

type TSigninSchema = z.infer<typeof SigninSchema>

export default function AddProduct() {
   const {
      register,
      formState: { errors, isValid },
   } = useForm<TSigninSchema>({
      resolver: zodResolver(SigninSchema),
      mode: "onChange",
   })

   // const colors = ["yellow", "red", "blue"];

   // const sizes = ["s", "m", "xl", "xxl", "xxl"];

   const queryClient = useQueryClient()
   const router = useRouter()

   const signinMutation = useMutation({
      mutationFn: signin,
      onSuccess: (data) => {
         // toast

         if (data?.message?.includes("already exists")) {
            toast.error("user already exist")
         }
         queryClient.invalidateQueries({ queryKey: ["profile"] })
         router.push("/")
         console.log(data)
      },
      onError: (error) => {
         console.log("error")
         console.log(error.message)
      },
   })

   const handleSignin = (e: React.FormEvent) => {
      e.preventDefault()
      // signinMutation.mutate({
      //    username: getValues("username_login"),
      //    password: getValues("password_login"),
      // });
   }

   return (
      <div className="w-full flex flex-col gap-6 justify-center">
         <h4 className="font-medium text-neutral-900 py-6 border-b border-white-200 px-10">
            Add Product
         </h4>
         <form action="" className="flex gap-20 px-6 lg:px-10">
            <div className="flex flex-col">
               <div className="flex flex-col">
                  <label
                     htmlFor="title"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Title
                  </label>
                  <input
                     autoComplete="true"
                     {...register("title")}
                     type="text"
                     id="title"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.title?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="price"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Price
                  </label>
                  <input
                     autoComplete="true"
                     {...register("price")}
                     type="number"
                     required
                     id="price"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.price?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="price"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Category
                  </label>
                  <input
                     autoComplete="true"
                     {...register("category")}
                     type="number"
                     required
                     id="category"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.category?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="title"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Slug
                  </label>
                  <input
                     autoComplete="true"
                     {...register("slug")}
                     type="text"
                     id="slug"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.slug?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="title"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     SKU
                  </label>
                  <input
                     autoComplete="true"
                     {...register("sku")}
                     type="text"
                     id="sku"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.sku?.message}
                  </p>
               </div>
               <button
                  className="btn w-full flex items-center justify-center gap-4 mt-4"
                  disabled={!isValid || signinMutation.isPending}
                  onClick={handleSignin}
               >
                  Save products
                  {signinMutation.isPending && <span className="loader"></span>}
               </button>
            </div>
            <div>
               <div className="flex flex-col">
                  <label
                     htmlFor="title"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Stock status
                  </label>
                  <input
                     autoComplete="true"
                     {...register("stock_status")}
                     type="text"
                     id="sku"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.sku?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="title"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Available quantity
                  </label>
                  <input
                     autoComplete="true"
                     {...register("available_quantity")}
                     type="text"
                     id="available_quantity"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.available_quantity?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="description"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Description
                  </label>
                  <input
                     autoComplete="true"
                     {...register("description")}
                     type="text"
                     id="description"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.description?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="image"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Images
                  </label>
                  <label
                     htmlFor="image"
                     className="cursor-pointer flex items-center gap-2 text-neutral-600 font-medium text-sm border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  >
                     <Icons.Upload /> Choose product images
                  </label>
                  <input
                     autoComplete="true"
                     {...register("image")}
                     type="file"
                     id="image"
                     placeholder="Choose product images"
                     name="image"
                     accept="image/png, image/jpeg"
                     className="hidden"
                     multiple
                  />

                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.description?.message}
                  </p>
               </div>
               <div className="flex gap-2">
                  <div>
                     <input
                        type="radio"
                        id="addproduct_red"
                        name="colors"
                        value="red"
                     />
                     <label htmlFor="addproduct_red">red</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        id="addproduct_blue"
                        name="colors"
                        value="blue"
                     />
                     <label htmlFor="addproduct_blue">blue</label>
                  </div>

                  <div>
                     <input
                        type="radio"
                        id="addproduct_yellow"
                        name="colors"
                        value="yellow"
                     />
                     <label htmlFor="addproduct_yellow">yellow</label>
                  </div>
               </div>
            </div>
         </form>
         <p className="text-neutral-500">
            Don&apos;t have an account? <Link href="/signup"> Sign up </Link>
         </p>
      </div>
   )
}
