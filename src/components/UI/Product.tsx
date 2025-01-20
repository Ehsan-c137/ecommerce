import Image from "next/image"
export default function Product({ item }) {
   return (
      <div className={`w-[165px] text-center`}>
         <Image
            src={item.main_image}
            width={"165"}
            height={200}
            alt={item.name}
         />
         <p className="text-body body-s">{item.name}</p>
         <p className="text-primary text-md">${item.price}</p>
      </div>
   )
}
