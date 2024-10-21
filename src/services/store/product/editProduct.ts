import api from "@/services/index";

export default async function getSingleProduct(slug: string, body) {
   try {
      const response = await api.put(`/store/product/slug/${slug}`, body);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}
