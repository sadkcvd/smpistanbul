import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[#f5f5f5] hover:bg-black focus-visible:ring-[var(--primary)]/40",
        secondary:
          "bg-white text-[var(--secondary-gold)] ring-1 ring-inset ring-[var(--secondary-gold)]/45 hover:bg-[var(--secondary-gold)]/10 focus-visible:ring-[var(--secondary-gold)]/45",
        accent:
          "bg-[var(--cta-gold)] text-[#062312] hover:bg-[var(--cta-gold-hover)] focus-visible:ring-[var(--cta-gold)]/45 ring-1 ring-inset ring-black/10",
          wp: 
          "bg-[var(--cta-wp)] text-[#062312] hover:bg-[var(--cta-wp-hover)] focus-visible:ring-[var(--cta-wp)]/45 ring-1 ring-inset ring-black/10",
        outline:
          "bg-transparent dark:text-[var(--primary)] light:text-[var(--primary)] ring-1 ring-inset light:ring-black/10 dark:ring-white/10 hover:bg-black/5 focus-visible:ring-black/35",
        ghost:
          "bg-transparent text-[var(--primary)] hover:bg-black/5 focus-visible:ring-black/35",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  type,
  asChild,
  ...props
}: ButtonProps) {
  const Comp: React.ElementType = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      // `type` should only exist for a real <button>
      {...(asChild ? {} : { type: type ?? "button" })}
      {...props}
    />
  );
}

