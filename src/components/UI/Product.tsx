import Image from "next/image"
export default function Product() {
   return (
      <div className={`w-[165px] text-center`}>
         <Image src={"/image-p.png"} width={"165"} height={200} alt="image" />
         <p className="text-body body-s">21WN reversible angora cardigan</p>
         <p className="text-primary text-md">$120</p>
      </div>
   )
}
