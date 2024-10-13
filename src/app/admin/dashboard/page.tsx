export default function Page() {
   return (
      <div className="flex flex-col gap-10">
         <div className="flex gap-10">
            <div className="w-[328px] h-[187px] flex flex-col justify-between bg-white-900 rounded-lg py-4 px-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                     <h5 className="font-nomral text-neutral-900">
                        Total Sales
                     </h5>
                     <p className="text-label font-medium text-neutral-500 uppercase">
                        This month
                     </p>
                  </div>
                  <h3 className="text-bold text-neutral-900">$4,235</h3>
               </div>
               <h1>chart</h1>
            </div>
            <div className="w-[328px] h-[187px] flex flex-col justify-between bg-white-900 rounded-lg py-4 px-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                     <h5 className="font-nomral text-neutral-900">Customers</h5>
                     <p className="text-label font-medium text-neutral-500 uppercase">
                        This month
                     </p>
                  </div>
                  <h3 className="text-bold text-neutral-900">$4,235</h3>
               </div>
               <h1>chart</h1>
            </div>
            <div className="w-[328px] h-[187px] flex flex-col justify-between bg-white-900 rounded-lg py-4 px-6">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                     <h5 className="font-nomral text-neutral-900">Orders</h5>
                     <p className="text-label font-medium text-neutral-500 uppercase">
                        Monthly golas: 1000
                     </p>
                  </div>
                  <h3 className="text-bold text-neutral-900">$4,235</h3>
               </div>
               <h1>chart</h1>
            </div>
         </div>
         <div className="flex gap-10">
            <div className="flex flex-col bg-white-900 rounded-lg w-[328px]">
               <div className="border-b border-neutral-200 py-4 px-6 flex flex-col gap-2">
                  <h5 className="text-neutral-900">Best Selling</h5>
                  <p className="text-label font-medium text-neutral-500 uppercase">
                     This month
                  </p>
               </div>

               <div className="py-4 px-6">
                  <span className="flex items-center gap-4">
                     <h3>$2,235</h3>
                     <p className="text-neutral-500  text-nowrap">
                        -- Total sales
                     </p>
                  </span>
               </div>
            </div>
            <div className="flex flex-col bg-white-900 rounded-lg">
               <div className="flex items-center gap-4 py-6 px-4 flex-grow">
                  <h5 className="font-semibold text-neutral-900">
                     Recent Orders
                  </h5>
                  <button className="text-sm rounded-full bg-neutral-100 text-neutral-500 px-4 py-1">
                     View All
                  </button>
               </div>
               <div className="px-4 pb-4 w-full">
                  <table className="table-fixed rounded-lg w-full">
                     <thead>
                        <tr className="border-t border-b border-neutral-200 text-neutral-500">
                           <th className="text-start py-2">Item</th>
                           <th className="text-start">Date</th>
                           <th className="text-start">Total</th>
                           <th className="text-start">Status</th>
                        </tr>
                     </thead>
                     <tbody className="mt-2">
                        <tr className="py-4 text-neutral-500">
                           <td className="py-2">TMens Black T-Shirts</td>
                           <td>20 Mar, 2023</td>
                           <td>$75.00</td>
                           <td>Processing</td>
                        </tr>
                        <tr>
                           <td>Witchy Woman</td>
                           <td>The Eagles</td>
                           <td>1972</td>
                        </tr>
                        <tr>
                           <td>Shining Star</td>
                           <td>Earth, Wind, and Fire</td>
                           <td>1975</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
