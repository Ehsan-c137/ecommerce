import { Icons } from "@/components/Icons/icons"

export default function Details() {
   return (
      <div className="px-4 flex flex-col gap-6">
         <div className="flex flex-col gap-2">
            <p className="subtitle uppercase">Materials</p>
            <p className="text-label">
               We work with monitoring programmes to ensure compliance with
               safety, health and quality standards for our products.
            </p>
         </div>
         <div className="flex flex-col gap-2">
            <p className="subtitle uppercase">Care</p>
            <p className="text-label">
               To keep your jackets and coats clean, you only need to freshen
               them up and go over them with a cloth or a clothes brush. If you
               need to dry clean a garment, look for a dry cleaner that uses
               technologies that are respectful of the environment.
            </p>
         </div>
         <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <Icons.DoNotBleach />
               <p className="body-m text-label">Do not use bleach</p>
            </div>
            <div className="flex items-center gap-2">
               <Icons.DoNotTumble />
               <p className="body-m text-label">Do not tumble dry</p>
            </div>
            <div className="flex items-center gap-2">
               <Icons.Iron />
               <p className="body-m text-label">
                  Iron at a maximum of 110ºC/230ºF
               </p>
            </div>
         </div>
      </div>
   )
}
