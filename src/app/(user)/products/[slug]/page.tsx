import api from "@/services/index"
import SingleProduct from "./singleProduct"
import type { Metadata } from "next"

type Props = {
   params: Promise<{ slug: string }>
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
   const products = await api.get("/store/product")

   return products.data.map((product: { slug: string }) => {
      return {
         slug: product.slug,
      }
   })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   // read route params
   const id = (await params).slug

   // fetch data
   const product = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/product/slug/${id}`
   ).then((res) => res.json())

   return {
      title: product?.name,
   }
}

export default async function Page({ params }: Props) {
   const slug = (await params).slug.toLowerCase()

   return <SingleProduct slug={slug} />
}
