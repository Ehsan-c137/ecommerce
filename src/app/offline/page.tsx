import { Icons } from "@/components/Icons/icons"

export default function OfflinePage() {
   return (
      <div className="w-[100vw] h-[100vh] flex flex-col p-8 text-center items-center justify-around">
         <p className="font-bold title">YOU ARE OFFLINE </p>
         <div className="flex flex-col items-center gap-10">
            <p>
               <Icons.Dress />
            </p>
         </div>
      </div>
   )
}
