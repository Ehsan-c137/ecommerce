import api from "@/services/index";

export async function getCart() {
   try {
      const response = await api.get("/store/temporary_basket");
      return response.data;
   } catch (error) {
      return error;
   }
}
