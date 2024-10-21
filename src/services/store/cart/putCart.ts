import api from "@/services/index";

interface Data {
   product_slug: string;
   count: number;
   colors: string[];
   sizes: string[];
}
export default async function putCart(data: Data) {
   try {
      const response = await api.put("/store/temporary_basket/", data);
      return response.data;
   } catch (error) {
      return error;
   }
}
