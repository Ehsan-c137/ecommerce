"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "@/services/user/change_info"

const AddressSchema = z.object({
   firstname: z
      .string()
      .min(3, { message: "user name must be at least 3 characters long" }),
   lastname: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
   phone: z
      .string()
      .min(8, { message: "address must be at least 8 characters long" }),
   email: z
      .string()
      .min(8, { message: "address must be at least 8 characters long" }),
})

type TAddressSchema = z.infer<typeof AddressSchema>

export default function UserInfo() {
   const { data, status, isSuccess, isLoading } = useQuery({
      queryKey: ["profile"],
      queryFn: () => getUserInfo(),
   })

   console.log(data)

   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TAddressSchema>({
      resolver: zodResolver(AddressSchema),
      mode: "onChange",
   })

   return (
      <div className="flex flex-col gap-4">
         <h5 className="text-neutral-900 font-semibold mb-4">Account Detail</h5>
         <form
            action=""
            className="flex flex-wrap items-start gap-4 max-w-[350px]"
         >
            <div className="flex flex-col">
               <label
                  htmlFor="username_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Firstname
               </label>
               <input
                  autoComplete="true"
                  {...register("firstname")}
                  type="text"
                  id="username_login"
                  className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.firstname?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="username_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Lastname
               </label>
               <input
                  autoComplete="true"
                  {...register("lastname")}
                  type="text"
                  id="username_login"
                  className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.phone?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Phonenumber
               </label>
               <input
                  autoComplete="true"
                  {...register("phone")}
                  type="text"
                  id="password_login"
                  className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.phone?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  email
               </label>
               <input
                  autoComplete="true"
                  {...register("phone")}
                  type="text"
                  id="password_login"
                  className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.phone?.message}
               </p>
            </div>

            <button
               className="btn w-full flex items-center justify-center gap-4"
               // disabled={!isValid || signinMutation.isPending}
               // onClick={handleSignin}
            >
               Save changes
               {/* {signinMutation.isPending && <span className="loader"></span>} */}
            </button>
         </form>
      </div>
   )
}
