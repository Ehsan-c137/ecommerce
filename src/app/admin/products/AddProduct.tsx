"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import signin from "@/services/user/signin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
});

type TSigninSchema = z.infer<typeof SigninSchema>;

export default function AddProduct() {
   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TSigninSchema>({
      resolver: zodResolver(SigninSchema),
      mode: "onChange",
   });

   const queryClient = useQueryClient();
   const router = useRouter();

   const signinMutation = useMutation({
      mutationFn: signin,
      onSuccess: (data) => {
         // toast

         if (data?.message?.includes("already exists")) {
            toast.error("user already exist");
         }
         queryClient.invalidateQueries({ queryKey: ["profile"] });
         router.push("/");
         console.log(data);
      },
      onError: (error) => {
         console.log("error");
         console.log(error.message);
      },
   });

   const handleSignin = (e: React.FormEvent) => {
      e.preventDefault();
      signinMutation.mutate({
         username: getValues("username_login"),
         password: getValues("password_login"),
      });
   };

   return (
      <div className="container mx-auto w-full flex flex-col gap-6 items-center justify-center min-h-[80vh]">
         <form action="" className="flex flex-col items-start gap-4">
            <div className="flex flex-col">
               <label
                  htmlFor="title"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Username
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
                  Password
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

            <button
               className="btn w-full flex items-center justify-center gap-4"
               disabled={!isValid || signinMutation.isPending}
               onClick={handleSignin}
            >
               Login
               {signinMutation.isPending && <span className="loader"></span>}
            </button>
         </form>
         <p className="text-neutral-500">
            Don&apos;t have an account? <Link href="/signup"> Sign up </Link>
         </p>
      </div>
   );
}
