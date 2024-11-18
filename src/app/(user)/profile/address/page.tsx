"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createAddress, getAllAddress } from "@/services/store/address"

const AddressSchema = z.object({
   streetAdderss: z
      .string()
      .min(3, { message: "user name must be at least 3 characters long" }),
   phone: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
   city: z
      .string()
      .min(8, { message: "address must be at least 8 characters long" }),
})

type TAddressSchema = z.infer<typeof AddressSchema>

export default function Address() {
   const { data, isLoading } = useQuery({
      queryKey: ["address"],
      queryFn: () => getAllAddress(),
   })
   const oldAddress = data?.[0]

   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TAddressSchema>({
      defaultValues: {
         streetAdderss: oldAddress?.address,
         phone: oldAddress?.phone,
         city: oldAddress?.name,
      },
      resolver: zodResolver(AddressSchema),
      mode: "onChange",
   })

   const handleSubmitMutation = useMutation({
      mutationFn: (data: TAddressSchema) =>
         createAddress({
            name: data.streetAdderss,
            phone: data.phone,
            address: data.city,
         }),
      onSuccess: () => {
         console.log("success")
      },
   })

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      handleSubmitMutation.mutate(getValues())
   }

   return (
      <div className="flex flex-col gap-4">
         <h5 className="text-neutral-900 font-semibold mb-4">
            Shipping Address
         </h5>
         {isLoading ? (
            "loading..."
         ) : (
            <form className="flex flex-wrap items-start gap-4 max-w-[350px]">
               <div className="flex flex-col">
                  <label
                     htmlFor="streetAdderss"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Street Address
                  </label>
                  <input
                     autoComplete="true"
                     {...register("streetAdderss")}
                     type="text"
                     id="streetAdderss"
                     className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.streetAdderss?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="city"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     City
                  </label>
                  <input
                     autoComplete="true"
                     {...register("city")}
                     type="text"
                     id="city"
                     className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.city?.message}
                  </p>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="phone"
                     className="text-neutral-600 font-medium text-sm"
                  >
                     Phonenumber
                  </label>
                  <input
                     autoComplete="true"
                     {...register("phone")}
                     type="text"
                     id="phone"
                     className=" border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
                  />
                  <p className="text-red-r500 mt-2 text-wrap">
                     {errors.phone?.message}
                  </p>
               </div>

               <button
                  className="btn w-full flex items-center justify-center gap-4"
                  disabled={!isValid || handleSubmitMutation.isPending}
                  onClick={handleSubmit}
               >
                  Save changes
                  {/* {signinMutation.isPending && <span className="loader"></span>} */}
               </button>
            </form>
         )}
      </div>
   )
}
