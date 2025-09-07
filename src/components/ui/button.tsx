import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Ação principal padrão (sólido azul)
        primary: "bg-[#2B6FA5] text-white hover:bg-[#2B6FA5]/90",
        // Reservado para pouquíssimos CTAs de alta intenção
        "accent-gradient": "bg-gradient-to-r from-[#2B6FA5] to-[#85BA62] text-white hover:from-[#2B6FA5]/90 hover:to-[#85BA62]/90",
        // Alternativa positiva, menos ênfase que primary
        secondary: "bg-[#85BA62] text-white hover:bg-[#85BA62]/90",
        // Ação secundária
        outline: "border border-[rgba(43,111,165,0.40)] text-[#0E1116] hover:border-[rgba(43,111,165,0.60)] hover:bg-[rgba(43,111,165,0.05)]",
        // Ação leve/inline
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        // Link style
        link: "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
        // Compatibilidade com sistema antigo
        default: "bg-[#2B6FA5] text-white hover:bg-[#2B6FA5]/90",
        destructive: "bg-[#DC2626] text-white hover:bg-[#DC2626]/90",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-lg px-8",
        icon: "h-9 w-9 rounded-xl",
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
