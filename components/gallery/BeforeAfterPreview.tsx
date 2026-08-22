"use client";

import Image from "next/image";
import { beforeAfterGallery } from "@/lib/gallery";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { useTranslations } from "next-intl";

export function BeforeAfterPreview() {
  const t = useTranslations("Home");
  const [primary, secondary] = beforeAfterGallery;

  return (
    <section className="py-12" aria-label={t("gallery.ariaLabel")}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold tracking-widest text-[var(--brand-accent)]">
            {t("gallery.kicker")}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {t("gallery.title")}
          </h2>

          <p className="max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
            {t("gallery.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <BeforeAfterSlider
              label={primary.title}
              before={primary.beforeImage}
              after={primary.afterImage}
              initialPercent={54}
            />
          </div>

          <div className="rounded-2xl border border-foreground/10 bg-background p-5">
            <div className="text-sm font-black text-foreground">
              {secondary.title}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {/* BEFORE */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-foreground/5">
                <Image
                  src={secondary.beforeImage.src}
                  alt={secondary.beforeImage.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 180px"
                />
              </div>

              {/* AFTER */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-foreground/5">
                <Image
                  src={secondary.afterImage.src}
                  alt={secondary.afterImage.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 180px"
                />
              </div>
            </div>

            <div className="mt-3 text-xs font-semibold text-foreground/60">
              {t("gallery.sample")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
