import Image from "next/image";

interface IProps {
   name?: string;
   price?: string | number;
   isInStock?: boolean;
}

export default function Card({ name, price, isInStock }: IProps) {
   return (
      <div className="rounded-[4px]  flex flex-col gap-6">
         <div className="w-[248px] h-[312px] bg-neutral-100">
            <Image src={"/tshirt.png"} alt="clothes" width={237} height={312} />
         </div>
         <div className="flex flex-col gap-3">
            <p className="font-medium text-neutral-900">
               {name ?? "Classic Monochrome Tees"}
            </p>
            <div className="flex items-center gap-2">
               <p className="px-4 py-[2px] border border-neutral-100 rounded-full">
                  IN STOCK
               </p>
               <p className="text-neutral-600">$35.00</p>
            </div>
         </div>
      </div>
   );
}
