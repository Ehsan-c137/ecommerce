"use client";

import Card from "@/components/Card/Card";
import products from "@/services/store/product/products";
import useGetAllSearchParams from "@/utils/useGetAllSearchParams";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "@/utils/constant";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useHandleQueryParams from "@/utils/useHandleQueryParams";
import { Icons } from "@/components/Icons/icons";

export default function Products() {
   const searchParams = useSearchParams();
   const allSearchParams = useGetAllSearchParams();
   const groupped = Object.groupBy(allSearchParams, (item) => item.name);
   const allSearchParamsObj = {};
   Object.entries(groupped).forEach(([key, value]) => {
      allSearchParamsObj[key] = value.map((item) => item.value);
   });

   const handleQueryParams = useHandleQueryParams();

   const checkParams = (array: string[], items: []) => {
      return items?.some((item) => array?.includes(item));
   };

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["allproducts"],
      queryFn: () => products(2, 1),
   });

   const minPrice = data?.reduce(
      (min, item) => Math.min(min, item.price),
      data[0]?.price
   );

   const maxPrice = data?.reduce(
      (max, item) => Math.max(max, item.price),
      data[0]?.price
   );

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

            const minPrice = searchParams.get("min-price");
            const maxPrice = searchParams.get("max-price");

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
               if (product.price > minPrice && product.price <= maxPrice) {
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
      <>
         {allSearchParams.length > 0 && (
            <p className="text-neutral-900 font-medium">Applied Filters:</p>
         )}

         <div className="flex flex-wrap gap-3">
            {Object.entries(allSearchParamsObj).map(([key, value]) => {
               return (
                  <div key={key} className="flex items-center gap-2">
                     <p className="font-medium">
                        {key[0].toUpperCase() + key.slice(1)}:
                     </p>
                     {value.map((item) => {
                        return (
                           <button
                              className="btn-outline text-label flex justify-between items-center gap-2 transition"
                              key={item}
                           >
                              {item[0]?.toUpperCase() + item?.slice(1)}
                              <div
                                 onClick={() => {
                                    handleQueryParams(key, item);
                                 }}
                              >
                                 <Icons.X />
                              </div>
                           </button>
                        );
                     })}
                  </div>
               );
            })}
         </div>
         <div className="text-neutral-500 justify-between flex items-center w-full py-4">
            <p>Showing 1-9 of {filteredData?.length} results.</p>

            <p>SORT BY</p>
         </div>

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
      </>
   );
}
