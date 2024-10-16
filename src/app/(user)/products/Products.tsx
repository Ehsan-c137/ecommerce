"use client";

import Card from "@/components/Card/Card";
import products from "@/services/store/products";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   });

   return (
      <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8 ">
         {isError && <p>{error.message}</p>}
         {isLoading && (
            <>
               <div
                  className=" bg-white-200 animate-pulse"
                  style={{
                     width: "304px",
                     height: "394px",
                  }}
               >
                  &nbsp;
               </div>
               <div
                  className=" bg-white-200 animate-pulse"
                  style={{
                     width: "304px",
                     height: "394px",
                  }}
               >
                  &nbsp;
               </div>
               <div
                  className=" bg-white-200 animate-pulse"
                  style={{
                     width: "304px",
                     height: "394px",
                  }}
               >
                  &nbsp;
               </div>
            </>
         )}
         {data?.map((product: any) => (
            <Card key={product.id} data={product} />
         ))}
      </div>
   );
}
