import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { Icons } from "@/components/Icons/icons"
import Link from "next/link"

export default function NotFound() {
   return (
      <>
         <Header />
         <div className="w-[100vw] h-[100vh] flex flex-col p-8 text-center items-center justify-around">
            <p className="font-bold title">PAGE NOT FOUND </p>
            <div className="flex flex-col items-center gap-10">
               <p>
                  <Icons.Dress />
               </p>
               <p
                  style={{
                     fontSize: "16px",
                  }}
               >
                  We can't find the page you looking for, it will return to the
               </p>

               <Link
                  href={"/"}
                  className="hover:underline transition bg-black text-white-100 px-8 py-2 "
               >
                  HOME
               </Link>
            </div>
         </div>
         <Footer />
      </>
   )
}
