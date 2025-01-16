import { Icons } from "@/components/Icons/icons"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

interface IProps {
   handleCart: (
      id: number,
      count: number,
      colors: string,
      sizes: string
   ) => void
   isLoading: boolean
   item: {
      data: TProduct
      count: number
      colors: string
      sizes: string
   }
}
export default function Item({ item, handleCart, isLoading }: IProps) {
   // const [count, setCount] = useState(item.count)
   const { remaining } = item.data
   const handleDeleteFromCart = () => {
      handleCart(item.data.id, 0, item.colors, item.sizes)
   }

   return (
      <div className="flex gap-4 items-center">
         <div
            className="w-[134px] h-[134px] bg-white-100 flex items-center justify-center relative max-w-auto"
            style={{
               maxWidth: "auto",
            }}
         >
            <div
               className="absolute top-0 right-0 bg-white-200 md:hidden"
               onClick={handleDeleteFromCart}
            >
               <Icons.X />
            </div>
            <Image
               src={item.data.main_image}
               alt={item.data.name}
               width={100}
               height={134}
               style={{
                  maxWidth: "134px"!,
                  maxHeight: "100%",
                  objectFit: "cover",
               }}
            />
         </div>
         <div className="flex flex-col md:flex-row gap-2 py-1 h-[134px] overflow-x-hidden">
            <div className="flex flex-row flex-wrap md:flex-row items-center gap-2">
               <Link
                  href={`products/${item.data?.slug}`}
                  className="text-titleActive truncate"
               >
                  {item.data.name}
               </Link>
               <p className="text-label">
                  Color: {item.colors} — Size: {item.sizes}
               </p>
            </div>
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                  <button
                     className="h-[24px] w-[24px] border rounded-full flex items-center justify-center p-1"
                     onClick={() => {
                        handleCart(
                           item.data.id,
                           item.count - 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={item.count == 1}
                  >
                     <Icons.Minus />
                  </button>

                  <p
                     className={clsx(
                        "h-[24px] w-[24px] text-center flex justify-center items-center",
                        {
                           "opacity-55": isLoading,
                        }
                     )}
                  >
                     {item.count}
                  </p>
                  <button
                     className="h-[24px] w-[24px] border rounded-full flex items-center justify-center p-1"
                     onClick={() => {
                        handleCart(
                           item.data.id,
                           item.count + 1,
                           item.colors,
                           item.sizes
                        )
                     }}
                     disabled={item.count == remaining}
                  >
                     <Icons.Plus />
                  </button>
               </div>
            </div>
            <p className="text-secondary font-medium text-base text-nowrap ">
               $ {item?.data.price}
            </p>
         </div>
         <div
            className="h-10 w-10 cursor-pointer items-center justify-center bg-white-100 rounded-md hidden md:flex"
            onClick={handleDeleteFromCart}
         >
            <Icons.X />
         </div>
      </div>
   )
}
