"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import signup from "@/services/user/signup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const SignupSchema = z
   .object({
      email: z.string().email("Invalid Email format"),
      username: z
         .string()
         .min(4, { message: "Password must be at least 4 characters long" }),
      password: z
         .string()
         .min(8, { message: "Password must be at least 8 characters long" })
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            {
               message:
                  "Password must contain at least one capital letter, one number and one special character",
            }
         ),
      confirmPassword: z.string().min(3),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

export type TSignupSchema = z.infer<typeof SignupSchema>;

export default function Signup() {
   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TSignupSchema>({
      resolver: zodResolver(SignupSchema),
      mode: "onChange",
   });

   const signupMutation = useMutation({
      mutationFn: signup,
      onSuccess: (data) => {
         // toast
         if (data?.message?.includes("already exists")) {
            toast.error("user already exist");
         }
         console.log(data);
      },
      onError: (error) => {
         console.log("error");
         console.log(error.message);
      },
   });

   const handleSignup = (e: React.FormEvent) => {
      e.preventDefault();
      signupMutation.mutate({
         email: getValues("email"),
         password: getValues("password"),
         username: getValues("username"),
      });
   };

   return (
      <div className="container mx-auto w-full flex flex-col items-center justify-center min-h-[80vh]">
         <form className="flex flex-col  gap-4 w-[320px]">
            <div className="flex flex-col">
               <label
                  htmlFor="username"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Username
               </label>
               <input
                  {...register("username")}
                  type="text"
                  id="username"
                  className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.username?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="email"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Email
               </label>
               <input
                  {...register("email")}
                  type="text"
                  id="email"
                  className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.email?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password"
                  className="text-neutral-600 font-medium text-sm "
               >
                  Password
               </label>
               <input
                  {...register("password")}
                  type="text"
                  id="password"
                  className="border border-neutral-100 focus-within:border-neutral-900 px-4 py-2 outline-none transition-colors rounded-md"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.password?.message}
               </p>
            </div>

            <button
               className="btn w-full flex items-center justify-center"
               disabled={isValid || signupMutation.isPending}
               onClick={handleSignup}
            >
               Create account
               {signupMutation.isPending && <span className="loader"></span>}
            </button>
         </form>
         <p className="text-neutral-500 mt-6">
            Already have an account? <Link href="/login"> Log in </Link>
         </p>
      </div>
   );
}
