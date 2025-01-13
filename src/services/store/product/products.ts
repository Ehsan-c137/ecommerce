import api from "@/services/index"

export default async function product(limit: number | string, page: number) {
   try {
      const response = await api.get(
         `/store/product?limit=${limit}&page=${page}`
      )
      return response.data
   } catch (error) {
      return error
   }
}
