"use server"

import api from "@/services/index"
import { cookies } from "next/headers"

export interface IPutCart {
   product_slug: string
   count: number
   colors: string
   sizes: string
}
export async function putCart(data: IPutCart[]) {
   try {
      const response = await api.put(
         "/store/temporary_basket",
         {
            data: data,
         },
         {
            headers: {
               Authorization: `Token ${cookies().get("session")?.value}`,
            },
         }
      )

      return response.data
   } catch (error) {
      return error
   }
}

export async function getCart() {
   try {
      const response = await api.get("/store/temporary_basket", {
         headers: {
            Authorization: `Token ${cookies().get("session")?.value}`,
         },
      })
      return response.data
   } catch (error) {
      return error
   }
}
