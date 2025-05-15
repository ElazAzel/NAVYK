import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        outline:
          "text-foreground",
        success:
          "border-transparent bg-green-500 text-white",
        warning:
          "border-transparent bg-amber-500 text-white",
        info:
          "border-transparent bg-blue-500 text-white",
        ghost:
          "border-transparent bg-muted text-muted-foreground",
        premium:
          "border-transparent bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow",
        level:
          "border-transparent bg-primary/20 text-primary font-bold",
        achievement:
          "border-transparent bg-gradient-to-r from-primary to-secondary text-white shadow",
      },
      size: {
        default: "h-6 px-2.5 py-0.5 text-xs",
        sm: "h-5 px-1.5 py-0 text-[10px]",
        lg: "h-7 px-3 py-1 text-sm",
      },
      animated: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: false,
    },
  }
)

const BadgeComponent = motion.div

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof badgeVariants>["variant"]
  size?: VariantProps<typeof badgeVariants>["size"]
  animated?: boolean
  isNew?: boolean
}

export function Badge({
  className,
  variant,
  size,
  animated,
  isNew,
  ...props
}: BadgeProps) {
  return React.createElement(
    BadgeComponent,
    {
      className: cn(
        badgeVariants({ variant, size, animated }),
        isNew && "relative after:content-[''] after:absolute after:-right-1 after:-top-1 after:h-2 after:w-2 after:rounded-full after:bg-red-500 after:ring-2 after:ring-white dark:after:ring-gray-950",
        className
      ),
      ...props
    }
  )
}

export { badgeVariants }