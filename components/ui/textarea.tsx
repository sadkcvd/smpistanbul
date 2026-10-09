import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-(--brand-accent)/40 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

