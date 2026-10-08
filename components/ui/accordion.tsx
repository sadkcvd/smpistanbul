"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = ({
  className,
  ...props
}: AccordionPrimitive.AccordionSingleProps) => (
  <AccordionPrimitive.Root
    className={cn("w-full", className)}
    {...props}
  />
);

export const AccordionItem = ({
  className,
  ...props
}: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item
    className={cn(
      "border-b border-(--border) data-[state=open]:border-(--border-strong)",
      className
    )}
    {...props}
  />
);

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-foreground/95 outline-none",
        className
      )}
      {...props}
    >
      <span className="leading-6">{children}</span>
      <ChevronDown
        className="h-5 w-5 shrink-0 text-foreground/70 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-(--brand-accent)"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-5 pt-0 text-sm leading-6 text-foreground/80", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
);

