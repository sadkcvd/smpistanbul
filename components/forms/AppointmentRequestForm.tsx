"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentRequestSchema, type AppointmentRequest } from "@/lib/validation/appointment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IMaskInput } from "react-imask";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "next-intl";

const hairLossTypes = [
  { value: "erkek-tipi-kellik", label: "Erkek tipi kellik" },
  { value: "sac-seyrelmesi", label: "Saç seyrelmesi" },
  { value: "sac-cizgisi-duzeltme", label: "Saç çizgisi düzeltme" },
  { value: "iz-kapama", label: "İz kapama" },
  { value: "diğer", label: "Diğer" },
] as const;

function todayISODate() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
}

function ErrorSlot({ message }: { message?: string }) {
  return (
    <p className="min-h-5 text-xs font-semibold leading-5 text-[var(--brand-accent)]">
      {message ?? "\u00A0"}
    </p>
  );
}

export function AppointmentRequestForm({
  id,
  className,
  submitLabel,
  heading,
  helperText,
  namespace = "Contact",
}: {
  id?: string;
  className?: string;
  submitLabel?: string;
  heading?: string;
  helperText?: string;
  namespace?: "Home" | "Contact";
}) {
  const t = useTranslations(namespace);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<AppointmentRequest>({
    resolver: zodResolver(appointmentRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "İstanbul",
      hairLossType: "",
      preferredAppointmentDate: "",
      message: "",
    },
  });

  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function onSubmit(values: AppointmentRequest) {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Helpful for ops; schema ignores unknown keys.
          sourceUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        setErrorMessage(text || t("form.genericError"));
        return;
      }

      reset();
      setSuccessMessage(t("form.successMessage"));
    } catch {
      setErrorMessage(t("form.networkError"));
    }
  }

  return (
    <section id={id} className={className}>
      <div className="rounded-2xl border border-foreground/10 bg-background p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl font-black tracking-tight text-foreground">
            {heading}
          </h2>
          <p className="mt-1 text-sm font-semibold text-foreground/70">
            {helperText}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("form.name")}</Label>
              <Input id="name" placeholder="Örn. Ahmet Yılmaz" {...register("name")} />
              <ErrorSlot message={errors.name?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">{t("form.phone")}</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    id="phone"
                    mask="+{90} (500) 000 00 00"
                    definitions={{
                      0: /[0-9]/,
                    }}
                    inputMode="tel"
                    value={field.value ?? ""}
                    unmask={false}
                    overwrite={true}
                    placeholder="+90 (5XX) XXX XX XX"
                    className="flex h-11 w-full rounded-xl border border-foreground/15 bg-background px-4 text-sm text-foreground placeholder:text-foreground/40 shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60"
                    onAccept={(value) => {
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <ErrorSlot message={errors.phone?.message} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="city">{t("form.city")}</Label>
              <Input id="city" placeholder="İstanbul" {...register("city")} />
              <ErrorSlot message={errors.city?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hairLossType">{t("form.hairLossType")}</Label>
              <select
                id="hairLossType"
                className="flex h-11 w-full rounded-xl border border-foreground/15 bg-background px-4 text-sm text-foreground shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("hairLossType")}
              >
                <option value="" disabled>
                  {t("form.select")}
                </option>
                {hairLossTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {(
                      {
                        "erkek-tipi-kellik": t("form.hairLossOptions.pattern"),
                        "sac-seyrelmesi": t("form.hairLossOptions.thinning"),
                        "sac-cizgisi-duzeltme": t("form.hairLossOptions.hairline"),
                        "iz-kapama": t("form.hairLossOptions.scar"),
                        "diğer": t("form.hairLossOptions.other"),
                      } as Record<string, string>
                    )[option.value] ?? option.label}
                  </option>
                ))}
              </select>
              <ErrorSlot message={errors.hairLossType?.message} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="preferredAppointmentDate">{t("form.date")}</Label>
            <Input
              id="preferredAppointmentDate"
              type="date"
              min={todayISODate()}
              onFocus={(e) => {
                // Open native datepicker immediately on supported mobile browsers.
                (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
              }}
              {...register("preferredAppointmentDate")}
            />
            <ErrorSlot message={errors.preferredAppointmentDate?.message} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">{t("form.message")}</Label>
            <Textarea
              id="message"
              placeholder={t("form.messagePlaceholder")}
              {...register("message")}
            />
            <ErrorSlot message={errors.message?.message} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs font-semibold text-foreground/60">
              {t("form.contact")}: {siteConfig.phoneDisplay}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto text-[var(--text-on-cta)]"
              variant="accent"
            >
              {isSubmitting ? t("form.sending") : submitLabel ?? t("form.submit")}
            </Button>
          </div>

          {successMessage ? (
            <div
              className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4"
              role="status"
              aria-live="polite"
            >
              <div className="text-sm font-bold text-foreground">
                {successMessage}
              </div>
              <div className="mt-1 text-xs font-semibold text-foreground/70">
                {t("form.successBody")}
              </div>
            </div>
          ) : null}

          {errorMessage ? (
            <div
              className="rounded-2xl border border-[var(--brand-accent)]/20 bg-[var(--brand-accent)]/5 p-4"
              role="alert"
              aria-live="polite"
            >
              <div className="text-sm font-bold text-[var(--brand-accent)]">
                {t("form.errorTitle")}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground/80">
                {errorMessage}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

