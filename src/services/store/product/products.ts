import api from "@/services/index"
import { useQuery } from "@tanstack/react-query"

async function products(limit: number | string, page: number) {
   try {
      const response = await api.get(
         `/store/product?limit=${limit}&page=${page}`
      )
      return response.data
   } catch (error) {
      return error
   }
}

export default function useGetAllProducts(
   limit: number | string,
   page: number
) {
   return useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(limit, page),
   })
}
