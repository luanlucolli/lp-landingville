import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[hsl(var(--brand-primary))] text-white hover:brightness-110 active:brightness-95 focus-visible:ring-[hsl(var(--brand-primary))]/40 ring-offset-white dark:ring-offset-slate-900",
        secondary: "border border-[hsl(var(--brand-primary))] text-[hsl(var(--brand-primary))] bg-transparent hover:bg-[hsl(var(--brand-primary))]/10 active:bg-[hsl(var(--brand-primary))]/15",
        tertiary: "text-[hsl(var(--neutral-700))] dark:text-white hover:bg-white/40 dark:hover:bg-white/10",
        accent: "bg-[hsl(var(--brand-accent))] text-white hover:brightness-110 active:brightness-95 focus-visible:ring-[hsl(var(--brand-accent))]/40 ring-offset-white dark:ring-offset-slate-900",
        danger: "bg-[hsl(var(--danger))] text-white hover:brightness-110 active:brightness-95 focus-visible:ring-[hsl(var(--danger))]/40 ring-offset-white dark:ring-offset-slate-900",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
