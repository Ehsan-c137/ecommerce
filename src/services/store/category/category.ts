import api from "@/services/index"
import { useQuery } from "@tanstack/react-query"

export async function getAllCategory() {
   try {
      const response = await api.get("/store/category")
      return response.data
   } catch (error) {
      return error
   }
}

export function useGetAllCategory() {
   return useQuery({
      queryKey: ["all-category"],
      queryFn: getAllCategory,
   })
}

export async function getProductByCategoryId(id: number) {
   try {
      const response = await api.get(`/store/product/category/id/${id}`)
      return response.data
   } catch (error) {
      return error
   }
}

export function useGetProductByCategoryId(id: number) {
   return useQuery({
      queryKey: ["product-by-category", id],
      queryFn: () => getProductByCategoryId(id),
   })
}
