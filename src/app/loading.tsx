export default function Loading() {
   return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
         <p className="sr-only">Loading...</p>
         <div className="loader h-[100vh] w-[100vw]"></div>
      </div>
   )
}
