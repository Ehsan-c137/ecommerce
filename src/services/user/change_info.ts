"use server"

import api from "@/services/index"
import { cookies } from "next/headers"

export async function getUserInfo() {
   try {
      const response = await api.put(
         "user/change_user_info/",
         {},
         {
            headers: {
               Authorization: `Token ${cookies().get("session")?.value}`,
               "Content-Type": "application/json",
            },
         }
      )

      return response.data
   } catch (error) {
      // console.log(error);
      return error
   }
}

export async function changePassword() {
   const body = {}
   try {
      const response = await api.put("user/change_password/", body, {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
            "Content-Type": "application/json",
         },
      })

      return response.data
   } catch (error) {
      // console.log(error);
      return error
   }
}
