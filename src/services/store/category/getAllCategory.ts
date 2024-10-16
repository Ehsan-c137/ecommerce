import api from "@/services/index";

export default async function getAllCategory() {
   try {
      const response = await api.get("/store/category");
      return response.data;
   } catch (error) {
      return error;
   }
}
