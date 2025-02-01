import api from "@/services/index"
import SingleProduct from "./singleProduct"
import type { Metadata } from "next"
import { getSession } from "@/utils/session"

type Props = {
   params: { slug: string }
}

export async function generateStaticParams() {
   const products = await api.get("/store/product")

   return products.data.map((product: { slug: string }) => {
      return {
         slug: product.slug.toLowerCase(),
      }
   })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug } = params

   const product = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/product/slug/${slug}`
   ).then((res) => res.json())

   return {
      title: product?.name,
   }
}

export default async function Page({ params }: Props) {
   const slug = params.slug.toLowerCase()
   const { isAuthenticated } = await getSession()
   return <SingleProduct slug={slug} isAuthenticated={isAuthenticated} />
}
