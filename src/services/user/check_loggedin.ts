"use server"

import { cookies } from "next/headers"

export default async function checkLoggedin() {
   const cookie = cookies().get("session")

   return cookie?.value !== undefined
}
