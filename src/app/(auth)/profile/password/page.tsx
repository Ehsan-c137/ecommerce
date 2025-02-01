"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { changePassword } from "@/services/user/change_info"
import { useMutation } from "@tanstack/react-query"

const AddressSchema = z.object({
   name: z
      .string()
      .min(3, { message: "user name must be at least 3 characters long" }),
   oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
   newPassword: z
      .string()
      .min(8, { message: "address must be at least 8 characters long" }),
   confirmPassword: z.string().min(3),
})

type TAddressSchema = z.infer<typeof AddressSchema>

export default function Address() {
   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TAddressSchema>({
      resolver: zodResolver(AddressSchema),
      mode: "onChange",
   })

   const changePasswordMutation = useMutation({
      mutationFn: (data: {
         username: string
         oldPassword: string
         newPassword: string
      }) => {
         console.log(data)
         return changePassword()
      },
      onSuccess: () => {
         console.log("changed")
      },
   })

   const username = "asdf"

   const handleChangePassword = () => {
      changePasswordMutation.mutate({
         username: username,
         oldPassword: getValues("oldPassword"),
         newPassword: getValues("newPassword"),
      })
   }

   return (
      <div className="flex flex-col gap-4">
         <h5 className="text-neutral-900 font-semibold mb-4">
            Change Password
         </h5>
         <form
            action=""
            className="flex flex-wrap items-start gap-4 max-w-[350px]"
         >
            <div className="flex flex-col">
               <label
                  htmlFor="password_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Old Password
               </label>
               <input
                  autoComplete="true"
                  {...register("oldPassword")}
                  type="text"
                  id="oldPassword"
                  className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.oldPassword?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  confirm password
               </label>
               <input
                  autoComplete="true"
                  {...register("confirmPassword")}
                  type="text"
                  id="confirmPassword"
                  className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.confirmPassword?.message}
               </p>
            </div>

            <button
               className="btn w-full flex items-center justify-center gap-4"
               disabled={!isValid || changePasswordMutation.isPending}
               onClick={handleChangePassword}
            >
               Change password
               {changePasswordMutation.isPending && (
                  <span className="loader"></span>
               )}
            </button>
         </form>
      </div>
   )
}
