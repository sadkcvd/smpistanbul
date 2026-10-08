import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-(--primary) text-background shadow-sm shadow-black/10 hover:opacity-90 focus-visible:ring-(--primary)/40",
        secondary:
          "bg-(--surface) text-(--secondary-gold) ring-1 ring-inset ring-(--secondary-gold)/45 hover:bg-(--secondary-gold)/10 focus-visible:ring-(--secondary-gold)/45",
        accent:
          "bg-(--cta-gold) text-(--text-on-cta) shadow-sm shadow-black/10 hover:bg-(--cta-gold-hover) focus-visible:ring-(--cta-gold)/45 ring-1 ring-inset ring-(--border)",
        wp:
          "bg-(--cta-wp) text-[#062312] hover:bg-(--cta-wp-hover) focus-visible:ring-(--cta-wp)/45 ring-1 ring-inset ring-black/10",
        outline:
          "bg-transparent text-(--primary) ring-1 ring-inset ring-(--border) hover:bg-foreground/5 focus-visible:ring-(--border-strong)",
        ghost:
          "bg-transparent text-(--primary) hover:bg-foreground/5 focus-visible:ring-(--border-strong)",
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

