export default function Reviews() {
   return (
      <div className="flex flex-col items-start gap-6 min-w-[360px] lg:w-[727px] max-w-[727px]">
         {isHavecomments && (
            <div>
               <h5 className="font-semibold mb-4">reviews</h5>
               <div className="flex items-center gap-3">
                  <h2 className="text-neutral-900">4.2</h2>
                  <p className="text-neutral-400">— 54 Reviews</p>
               </div>
            </div>
         )}

         <button className="text-sm flex items-start font-medium border px-4 py-2 rounded-md border-neutral-900">
            {isHavecomments ? " Write a review" : "Write first review"}
         </button>
         {isHavecomments && (
            <div className="flex flex-col gap-3 w-full">
               <div className="flex justify-end w-full">
                  <button className="flex items-center gap-2 uppercase text-sm text-neutral-500">
                     Sort by <Icons.ChevronDown />
                  </button>
               </div>
               <span className="h-[1px] border-b-neutral-200 bg-neutral-200 w-full"></span>
            </div>
         )}
      </div>
   )
}
