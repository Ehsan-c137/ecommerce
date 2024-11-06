import api from "@/services/index";

export default async function getSingleProduct(slug: string) {
   try {
      const response = await api.get(`/store/product/slug/${slug}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}
