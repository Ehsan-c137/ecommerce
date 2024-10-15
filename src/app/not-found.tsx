import Link from "next/link";

export default function NotFound() {
   return (
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
         <h1>404</h1>
         <Link href={"/"}>Go To landing</Link>
      </div>
   );
}
