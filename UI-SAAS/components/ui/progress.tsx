"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string
    animated?: boolean
  }
>(({ className, value, indicatorClassName, animated = true, ...props }, ref) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value || 0)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [value])

  const IndicatorComponent = animated ? motion.div : "div"
  const animationProps = animated
    ? {
        initial: { width: 0 },
        animate: { width: `${progress}%` },
        transition: { duration: 1, ease: "easeOut" }
      }
    : { style: { width: `${progress}%` } }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/10",
        className
      )}
      {...props}
    >
      <IndicatorComponent
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          animated && "progress-animation",
          indicatorClassName
        )}
        {...animationProps}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } 