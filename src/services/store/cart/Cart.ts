import api from "@/services/index"
import { useQuery } from "@tanstack/react-query"
// import { cookies } from "next/headers"

export interface IPutCart {
   product_slug: string
   count: number
   colors: string
   sizes: string
}
export async function putCart(data: IPutCart[]) {
   try {
      const response = await api.put("/store/temporary_basket", {
         data: data,
      })

      return response.data
   } catch (error) {
      return error
   }
}

export async function getCart() {
   try {
      const response = await api.get("/store/temporary_basket")
      return response.data
   } catch (error) {
      return error
   }
}

export function useGetCart() {
   return useQuery({
      queryKey: ["cart"],
      queryFn: () => getCart(),
      staleTime: 0,
      gcTime: 0,
   })
}
