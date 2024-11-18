"use client"

import { useState } from "react"

import Item from "./item"
export default function Orders() {
   const [isEmpty, setIsEmpty] = useState(false)
   return (
      <div
         className={`flex flex-col gap-4 w-full  min-h-[344px] ${
            isEmpty
               ? "justify-center items-center"
               : "items-start justify-center"
         }`}
      >
         {/* <div className="flex flex-col items-center justify-center gap-4">
            <svg
               width="65"
               height="64"
               viewBox="0 0 65 64"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M59.1668 32H43.1668L37.8335 40H27.1668L21.8335 32H5.8335"
                  stroke="#5C5F6A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
               <path
                  d="M15.0335 13.6267L5.8335 32V48C5.8335 49.4145 6.3954 50.771 7.39559 51.7712C8.39579 52.7714 9.75234 53.3333 11.1668 53.3333H53.8335C55.248 53.3333 56.6045 52.7714 57.6047 51.7712C58.6049 50.771 59.1668 49.4145 59.1668 48V32L49.9668 13.6267C49.5253 12.7381 48.8446 11.9903 48.0014 11.4674C47.1581 10.9445 46.1857 10.6672 45.1935 10.6667H19.8068C18.8146 10.6672 17.8422 10.9445 16.9989 11.4674C16.1557 11.9903 15.475 12.7381 15.0335 13.6267Z"
                  stroke="#5C5F6A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>

            <p className="text-neutral-500 font-medium ">
               Your order history is waiting to be filled.
            </p>
            <button className="btn">Start Shopping</button>
         </div> */}
         <h5 className="text-neutral-900 font-semibold mb-4">Orders</h5>
         {Array.from({ length: 10 }).map((_, index) => (
            <Item key={index} />
         ))}
      </div>
   )
}
