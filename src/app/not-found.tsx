import Link from "next/link"

export default function NotFound() {
   return (
      <div className="w-[100vw] h-[100vh] flex items-center gap-4 justify-center">
         <p className="font-bold ">404</p>
         <p>|</p>
         <Link href={"/"} className="hover:underline transition">
            HOME
         </Link>
      </div>
   )
}
