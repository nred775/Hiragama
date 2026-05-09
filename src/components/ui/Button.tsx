import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "inline-flex items-center justify-center font-black transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-700 rounded-3xl": variant === "primary",
            "bg-slate-800 text-slate-50 border-2 border-slate-700 shadow-sm hover:border-slate-600 hover:bg-slate-700 rounded-2xl": variant === "secondary",
            "bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:bg-rose-700 rounded-3xl": variant === "danger",
            "bg-emerald-600 text-white shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:bg-emerald-700 rounded-3xl": variant === "success",
            "border-2 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 hover:text-white rounded-2xl": variant === "outline",
            "hover:bg-slate-800 hover:text-slate-100 text-slate-400 rounded-xl": variant === "ghost",
            "h-16 px-8 text-xl": size === "lg",
            "h-12 px-6 py-2 text-base": size === "default",
            "h-9 px-4 text-sm": size === "sm",
            "h-12 w-12 rounded-xl": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
