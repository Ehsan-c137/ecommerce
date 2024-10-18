"use client";

import Card from "@/components/Card/Card";
import products from "@/services/store/products";
import useGetAllSearchParams from "@/utils/useGetAllSearchParams";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "@/utils/constant";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function Products() {
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   });

   const searchParams = useSearchParams();
   const allSearchParams = useGetAllSearchParams();

   const checkParams = (array: string[], items: []) => {
      return items?.some((item) => array?.includes(item));
   };

   const filterProduct = useCallback(
      (data) => {
         return data?.filter((product) => {
            const productColors = product.options?.colors;
            const productSizes = product.options?.sizes;
            const productCategory = product.category;

            const isThereColor = checkParams(
               searchParams.getAll("color"),
               productColors
            );
            const isThereSize = checkParams(
               searchParams.getAll("size"),
               productSizes
            );

            if (allSearchParams.length > 0) {
               if (isThereColor) {
                  return product;
               }
               if (isThereSize) {
                  return product;
               }
               if (
                  searchParams
                     .getAll("category")
                     ?.includes(Categories[productCategory])
               )
                  return product;
            } else {
               return product;
            }
         });
      },
      [allSearchParams, searchParams]
   );

   const filteredData = useMemo(
      () => data && filterProduct(data),
      [data, filterProduct]
   );

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
         {filteredData?.map((product: any) => (
            <Card key={product.id} data={product} />
         ))}
      </div>
   );
}
