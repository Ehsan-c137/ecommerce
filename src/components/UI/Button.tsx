import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const button = cva("button", {
   variants: {
      intent: {
         primary: ["bg-black", "text-offWhite", "border-transparent"],
         outline: [
            "bg-transparent",
            "border border-[#DEDEDE]",
            "text-titleActive",
            "hover:border-black",
         ],
      },
      size: {
         small: ["text-sm", "py-1", "px-2"],
         medium: ["text-base", "py-2", "px-4"],
      },
   },
   compoundVariants: [
      { intent: "primary", size: "medium", class: "uppercase" },
   ],
   defaultVariants: {
      intent: "primary",
      size: "medium",
   },
})

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
   className,
   intent,
   size,
   ...props
}) => <button className={button({ intent, size, className })} {...props} />
