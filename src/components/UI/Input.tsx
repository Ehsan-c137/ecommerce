export default function Input({ ...props }) {
   return (
      <div>
         <input
            style={{
               outline: "none",
            }}
            {...props}
            className={`flex text-[#979797] pb-1 border-b focus-within:border-[black] transition-colors bg-transparent w-full ${props.className}`}
         />
      </div>
   )
}
