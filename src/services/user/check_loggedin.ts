"use server"

import { cookies } from "next/headers"

export default async function checkLoggedin() {
   const cookie = cookies().get("session")

   if (!cookie?.value) {
      return {
         isLoggedIn: false,
         error: "NO session found",
      }
   }

   try {
      return {
         isLoggedIn: true,
         error: null,
      }
   } catch (error) {
      return {
         isLoggedIn: false,
         error: "Invalid session",
      }
   }
}
