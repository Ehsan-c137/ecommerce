"use client"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const SigninSchema = z.object({
   addresName: z
      .string()
      .min(3, { message: "title must be at least 3 characters long" }),
   phone: z.number().min(1, { message: "price must bte at least 1" }),
   name: z.string().min(1, { message: "category is required" }),
})

type TSigninSchema = z.infer<typeof SigninSchema>

export default function Checkout() {
   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TSigninSchema>({
      resolver: zodResolver(SigninSchema),
      mode: "onChange",
   })

   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-col">
            <label
               htmlFor="title"
               className="text-neutral-600 font-medium text-sm"
            >
               name
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
               phone number
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
               Address name
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
      </div>
   )
}
