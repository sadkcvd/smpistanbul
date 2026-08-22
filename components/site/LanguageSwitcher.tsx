"use client";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;

  const options: { locale: Locale; label: string }[] = [
    { locale: "tr", label: "TR" },
    { locale: "en", label: "EN" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-foreground/15 bg-background p-1",
        className
      )}
      aria-label={t("languageSwitcherAria")}
    >
      {options.map((opt) => {
        const active = current === opt.locale;
        return (
          <button
            key={opt.locale}
            type="button"
            onClick={() => router.replace(pathname, { locale: opt.locale })}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-xs font-bold transition",
              active
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            )}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

