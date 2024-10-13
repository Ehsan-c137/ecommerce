import api from "@/services/index";

export default async function product() {
   try {
      const response = await api.get("/store/product/");
      return response.data;
   } catch (error) {
      return error;
   }
}
