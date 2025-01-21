import api from "@/services/index"
import { AxiosError } from "axios"

export default async function getSingleProduct(slug: string) {
   try {
      const response = await api.get(`/store/product/slug/${slug}`)

      return response.data
   } catch (error) {
      if (error instanceof AxiosError) {
         return error.response
      }
      return error
   }
}
