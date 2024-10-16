import Image from "next/image";
import Link from "next/link";

interface IProps {
   name?: string;
   price?: string | number;
   isInStock?: boolean;
}

export default function Card({ data }) {
   return (
      <Link
         href={`products/${data?.slug?.toLowerCase()}`}
         className="rounded-[4px]  flex flex-col gap-6"
      >
         <div className="flex items-center justify-center w-[248px] h-[312px] bg-neutral-100">
            <Image
               src={data?.main_image}
               alt={data?.name}
               width={230}
               unoptimized
               objectFit="contain"
               height={312}
               className="object-contain"
            />
         </div>
         <div className="flex flex-col gap-3">
            <p className="font-medium text-neutral-900">{data?.name}</p>
            <div className="flex items-center gap-2">
               <p className="px-4 py-[2px] border border-neutral-100 rounded-full">
                  IN STOCK
               </p>
               <p className="text-neutral-600">${data?.price}</p>
            </div>
         </div>
      </Link>
   );
}
