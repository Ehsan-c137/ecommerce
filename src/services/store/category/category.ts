import api from "@/services/index"

export async function getAllCategory() {
   try {
      const response = await api.get("/store/category")
      return response.data
   } catch (error) {
      return error
   }
}

export async function getProductByCategoryId(id: number) {
   try {
      const response = await api.get(`/store/product/category/id/${id}`)
      return response.data
   } catch (error) {
      return error
   }
}
