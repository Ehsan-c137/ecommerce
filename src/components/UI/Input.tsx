import { forwardRef, ForwardedRef } from "react"

interface InputProps {
   className?: string
   [key: string]: unknown
}

const Input = forwardRef(function myInput(
   props: InputProps,
   ref: ForwardedRef<HTMLInputElement>
) {
   const { className, ...otherProps } = props

   return (
      <div>
         <input
            ref={ref}
            style={{
               outline: "none",
            }}
            {...otherProps}
            className={`flex text-[#979797] pb-1 px-2 border-b focus-within:border-[black] transition-colors bg-transparent w-full ${className}`}
         />
      </div>
   )
})

export default Input
