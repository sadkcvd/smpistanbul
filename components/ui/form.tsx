"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type FieldValues,
  type ControllerProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export function Form({
  form,
  children,
  onSubmit,
  ...props
}: React.PropsWithChildren<{
  form: any;
  onSubmit: (values: FieldValues) => unknown;
} & React.ComponentProps<"form">>) {
  return (
    <FormProvider {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

type FormFieldProps = ControllerProps<FieldValues>;

export function FormField({ ...props }: FormFieldProps) {
  const { control } = useFormContext<FieldValues>();
  return (
    <Controller
      control={control}
      {...props}
    />
  );
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label className={cn(className)} {...props} />;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}

export function FormMessage({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <p
      className={cn(
        "text-sm font-semibold text-[var(--brand-accent)]",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {children}
    </p>
  );
}

