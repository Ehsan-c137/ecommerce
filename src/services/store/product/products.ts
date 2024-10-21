import api from "@/services/index";

export default async function product(limit, page) {
   try {
      const response = await api.get(
         `/store/product?limit=${limit}&page=${page}`
      );
      return response.data;
   } catch (error) {
      return error;
   }
}
