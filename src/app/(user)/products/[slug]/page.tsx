import api from "@/services/index";
import SingleProduct from "./singleProduct";

export async function generateStaticParams() {
   const products = await api.get("/store/product");

   return products.data.map((product) => {
      slug: product.slug;
   });
}

export default function Product({ params }: { params: { slug: string } }) {
   const slug = params.slug as string;

   return <SingleProduct slug={slug} />;
}
