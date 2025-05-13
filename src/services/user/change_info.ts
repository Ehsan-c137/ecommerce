"use server"

import api from "@/services/index"
import { AxiosError } from "axios"
import { cookies } from "next/headers"

export async function getUserInfo() {
   try {
      const response = await api.put(
         "user/change_user_info/",
         {},
         {
            headers: {
               Authorization: `Token ${cookies().get("session")?.value}`,
            },
         }
      )

      return response.data
   } catch (error) {
      if (error instanceof AxiosError) {
         return error.response?.data
      }
      return error
   }
}

export async function changePassword() {
   const body = {}
   try {
      const response = await api.put("user/change_password/", body, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })

      return response.data
   } catch (error) {
      return error
   }
}
