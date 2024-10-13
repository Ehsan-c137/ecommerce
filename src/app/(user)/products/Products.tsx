"use client";

import Card from "@/components/Card/Card";
import products from "@/services/store/products";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
   const { data } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(),
   });

   console.log(data);

   return (
      <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
      </div>
   );
}
