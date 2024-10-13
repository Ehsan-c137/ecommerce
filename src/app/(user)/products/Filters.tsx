"use client";
import DoubleRangePicker from "@/components/DubleRangePicker/DoubleRangePicker";

export default function Filters() {
   return (
      <div className="hidden sm:flex flex-col gap-10 border border-neutral-100 rounded-md w-[248px] sticky top-[--header-height] pb-4 left-0 h-fit">
         <div className="flex flex-col gap-4 px-4 pt-6 pb-8">
            <p className="text-neutral-900 font-medium">Categories</p>
            <div>
               <div className="flex items-center text-nowrap border-b border-neutral-200 py-3">
                  <input
                     id="checked-checkbox"
                     type="checkbox"
                     value=""
                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                     htmlFor="checked-checkbox"
                     className="ms-2 text-sm font-medium text-neutral-600"
                  >
                     Perfume
                  </label>
               </div>
               <div className="flex items-center text-nowrap border-b border-neutral-200 py-3">
                  <input
                     id="checked-checkbox"
                     type="checkbox"
                     value=""
                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                     htmlFor="checked-checkbox"
                     className="ms-2 text-sm font-medium text-neutral-600"
                  >
                     Shoe
                  </label>
               </div>
            </div>
         </div>
         <div className="flex flex-col gap-4 px-4 pt-6 pb-8">
            <p className="text-neutral-900 font-medium">Color</p>
         </div>
         <div className="flex flex-col gap-4 px-4 pt-6 pb-8">
            <DoubleRangePicker
               min={100}
               max={1000}
               onChange={() => {
                  console.log("hello");
               }}
            />
         </div>
      </div>
   );
}
