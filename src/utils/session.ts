"use server"

import { cookies } from "next/headers"

export async function getSession() {
   const cookieStore = cookies()
   const session = cookieStore.get("session")

   if (!session?.value) {
      return {
         isAuthenticated: false,
      }
   }

   try {
      return {
         isAuthenticated: true,
      }
   } catch (error) {
      cookieStore.delete("session")
      return {
         isAuthenticated: false,
      }
   }
}

export async function deleteSession() {
   cookies().delete("session")
}

export async function setSession(session: string) {
   cookies().set("session", session)
}
