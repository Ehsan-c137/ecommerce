"use client"

import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import signin from "@/services/user/signin"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Input from "@/components/UI/Input"
import { Icons } from "@/components/Icons/icons"

const SigninSchema = z.object({
   username_login: z
      .string()
      .min(3, { message: "user name must be at least 3 characters long" }),
   password_login: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
})

type TSigninSchema = z.infer<typeof SigninSchema>

export default function Login() {
   const {
      register,
      getValues,
      formState: { errors, isValid },
   } = useForm<TSigninSchema>({
      resolver: zodResolver(SigninSchema),
      mode: "onChange",
   })

   const queryClient = useQueryClient()
   const router = useRouter()

   const signinMutation = useMutation({
      mutationFn: (data: { username: string; password: string }) =>
         signin(data),
      onSuccess: (data) => {
         // toast

         if (data?.message?.includes("already exists")) {
            toast.error("user already exist")
            return
         }
         if (data?.status == "failed") {
            toast.error("enter valid username and password")
            return
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
      signinMutation.mutate({
         username: getValues("username_login"),
         password: getValues("password_login"),
      })
   }

   return (
      <div className="container mx-auto w-full flex flex-col gap-6 items-center justify-center min-h-[80vh]">
         <form action="" className="flex flex-col items-start gap-4 w-[250px]">
            <div className="flex flex-col">
               <label
                  htmlFor="username_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Username
               </label>
               <Input
                  autoComplete="true"
                  {...register("username_login")}
                  type="text"
                  id="username_login"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.username_login?.message}
               </p>
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password_login"
                  className="text-neutral-600 font-medium text-sm"
               >
                  Password
               </label>
               <Input
                  autoComplete="true"
                  {...register("password_login")}
                  type="text"
                  id="password_login"
               />
               <p className="text-red-r500 mt-2 text-wrap">
                  {errors.password_login?.message}
               </p>
            </div>
            <div className="flex justify-end">
               <p className="text-label">Forget Password?</p>
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
         <Icons.Border />
         <p className="text-neutral-500">
            Don&apos;t have an account? <Link href="/signup"> Sign up </Link>
         </p>
      </div>
   )
}
