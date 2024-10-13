"use client";
import { Icons } from "@/components/Icons/icons";
import { useState } from "react";
import AddProduct from "./AddProduct";

export default function Products() {
   const [isAddProduct, setIsAddProduct] = useState(true);
   return (
      <div className="flex flex-col bg-white-900 rounded-lg">
         {isAddProduct && <AddProduct />}
         {!isAddProduct && (
            <>
               <div className="flex justify-between items-center px-6 py-5">
                  <h5 className="text-neutral-900 font-bold">Products</h5>
                  <div className="flex items-center gap-4">
                     <button className="font-bold btn">Add Product</button>
                     <div className="hidden lg:flex border rounded-md border-neutral-300 bg-white-900 focus-within:border-neutral-700 gap-2 px-2 py-2 transition">
                        <Icons.Search />
                        <input
                           type="text"
                           placeholder="Search products"
                           className="outline-none text-sm"
                        />
                     </div>
                  </div>
               </div>
               <table className="table-fixed rounded-lg w-full px-6">
                  <thead>
                     <tr className="border-t border-b border-neutral-200 text-neutral-500 px-6">
                        <th className="text-start py-2 px-6">Item</th>
                        <th className="text-start py-2 px-6">Date</th>
                        <th className="text-start py-2 px-6">Total</th>
                        <th className="text-start py-2 px-6">Status</th>
                     </tr>
                  </thead>
                  <tbody className="mt-2 py-4">
                     <tr className="py-4 text-neutral-500 px-6">
                        <td className="py-2 px-6">TMens Black T-Shirts</td>
                        <td className="py-2 px-6">20 Mar, 2023</td>
                        <td className="py-2 px-6">$75.00</td>
                        <td className="py-2 px-6">Processing</td>
                     </tr>
                  </tbody>
               </table>
            </>
         )}
      </div>
   );
}
