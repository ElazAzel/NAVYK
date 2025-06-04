import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "hover:shadow-md",
        glass: "bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl backdrop-saturate-150 border-white/20 dark:border-gray-800/20",
        elevated: "hover:shadow-lg hover:-translate-y-1",
        outline: "bg-transparent border shadow-none",
        achievement: "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 dark:border-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]",
        reward: "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]",
        info: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50",
        success: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800/50",
        warning: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50",
        danger: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/50",
      },
      animation: {
        none: "",
        hover: "hover:-translate-y-1 hover:shadow-md",
        pulse: "hover:shadow-md [animation:pulse_2s_infinite]",
        bounce: "hover:shadow-md [animation:bounce_2s_infinite]",
      },
      glowing: {
        true: "hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
      glowing: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  // Дополнительные пропсы для геймификации
  level?: number;
  progress?: number;
  locked?: boolean;
  isNew?: boolean;
  isComplete?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, animation, glowing, level, progress, locked, isNew, isComplete, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, animation, glowing }), 
          locked && "opacity-70 grayscale cursor-not-allowed",
          className)}
        {...props}
      >
        {/* Индикатор нового элемента */}
        {isNew && (
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-md shadow-sm">
            Новое
          </div>
        )}
        
        {/* Индикатор завершенного элемента */}
        {isComplete && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Индикатор блокировки */}
        {locked && (
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 rounded-xl backdrop-blur-sm flex items-center justify-center">
            <div className="text-3xl bg-white/80 dark:bg-black/80 p-3 rounded-full shadow-md">
              🔒
            </div>
          </div>
        )}
        
        {/* Индикатор уровня */}
        {level && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
            {level}
          </div>
        )}
        
        {/* Индикатор прогресса */}
        {(progress !== undefined && progress >= 0 && progress <= 100) && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-muted rounded-b-xl overflow-hidden">
            <div 
              className="h-full bg-primary progress-animation rounded-bl-xl" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {props.children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 