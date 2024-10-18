"use client";
import DoubleRangePicker from "@/components/DubleRangePicker/DoubleRangePicker";
import { Icons } from "@/components/Icons/icons";
import Products from "./Products";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getAllCategory from "@/services/store/category/getAllCategory";
import useGetAllSearchParams from "@/utils/useGetAllSearchParams";

export default function Filters() {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   const AllSearchParams = useGetAllSearchParams();
   const groupped = Object.groupBy(AllSearchParams, (item) => item.name);

   const AllSearchParamsObj = {};
   Object.entries(groupped).forEach(([key, value]) => {
      AllSearchParamsObj[key] = value.map((item) => item.value);
   });

   const sizes = ["S", "M", "L", "XL", "XXL"];
   const colors = ["yellow", "red", "blue"];
   const { data: categories, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: () => getAllCategory(),
   });

   const handleQueryParams = (name: string, value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const currentQuery = current.getAll(name);

      if (currentQuery.includes(value)) {
         current.delete(name, value);
      } else {
         current.append(name, value);
      }

      const search = current.toString();

      router.push(`${pathname}${search ? `?${search}` : ""}`);
   };

   return (
      <>
         <div className="hidden sm:flex flex-col gap-6 border border-neutral-100 rounded-md w-[248px] sticky top-[--header-height] pb-14 left-0 h-fit">
            <div className="flex flex-col gap-2 px-4 pt-6 ">
               <p className="text-neutral-900 font-medium">Categories</p>
               <div>
                  <div className="flex flex-col text-nowrap">
                     {isLoading && (
                        <div className="w-full bg-white-200 animate-pulse h-10 rounded-md"></div>
                     )}
                     {categories?.map((data) => {
                        const item = data.name;
                        const isChecked = searchParams
                           .getAll("category")
                           ?.includes(item);

                        return (
                           <div
                              className="flex items-center py-3 px-1 border-b border-neutral-200"
                              key={item}
                           >
                              <input
                                 id={item + "-checkbox"}
                                 type="checkbox"
                                 value={item}
                                 checked={isChecked}
                                 onChange={(e) => {
                                    handleQueryParams(
                                       "category",
                                       e.target.value
                                    );
                                 }}
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                 htmlFor={item + "-checkbox"}
                                 className="ms-2 text-sm font-medium text-neutral-700  w-full cursor-pointer"
                              >
                                 {item[0].toUpperCase() + item.slice(1)}
                              </label>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Color</p>
               <div className="flex items-center gap-3">
                  {colors.map((item) => {
                     const isChecked = searchParams
                        .getAll("color")
                        ?.includes(item);
                     return (
                        <div key={item} className="flex items-center">
                           <label
                              style={{
                                 border: "1px solid transparent",
                                 borderColor: isChecked
                                    ? "black"
                                    : "transparent",
                              }}
                              htmlFor={`${item}--color`}
                              className={`w-7 h-7 rounded-full transition p-[3px] bg-clip-content bg-red-r200 borderp-[3px]  cursor-pointer`}
                           ></label>
                           <input
                              type="checkbox"
                              value={item}
                              id={`${item}--color`}
                              className="hidden"
                              checked={isChecked}
                              onChange={(e) => {
                                 handleQueryParams("color", e.target.value);
                              }}
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Color</p>
               <div className="flex items-center flex-wrap gap-3 text-sm">
                  {sizes.map((item) => {
                     const isChecked = searchParams
                        .getAll("size")
                        ?.includes(item);

                     return (
                        <div key={item} className="flex items-center">
                           <label
                              style={{
                                 borderColor: isChecked
                                    ? "black"
                                    : "transparent",
                              }}
                              htmlFor={`${item}--size`}
                              className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer border border-neutral-100 transition"
                           >
                              {item}
                           </label>
                           <input
                              type="checkbox"
                              value={item}
                              id={`${item}--size`}
                              className="hidden"
                              checked={isChecked}
                              onChange={(e) => {
                                 handleQueryParams("size", e.target.value);
                              }}
                           />
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
               <p className="text-neutral-900 font-medium">Price</p>
               <DoubleRangePicker
                  min={100}
                  max={1000}
                  onChange={(e: { min: number; max: number }): void => {
                     // setPriceRange({ min: e.min, max: e.max });
                     console.log("from range picker", e);
                  }}
               />
            </div>
         </div>
         <div className="flex flex-col gap-3 w-full">
            {AllSearchParams.length > 0 && (
               <p className="text-neutral-900 font-medium">Applied Filters:</p>
            )}

            <div className="flex flex-wrap gap-3">
               {Object.entries(AllSearchParamsObj).map(([key, value]) => {
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
               <p>Showing 1-9 of 36 results.</p>

               <p>SORT BY</p>
            </div>
            <Products />
         </div>
      </>
   );
}
