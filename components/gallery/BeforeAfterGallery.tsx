"use client";
import Image from "next/image";
import { beforeAfterGallery } from "@/lib/gallery";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { useTranslations } from "next-intl";

export function BeforeAfterGallery() {
  const t = useTranslations("Gallery");
  const primary = beforeAfterGallery[0];

  return (
    <section className="py-12" aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold tracking-widest text-[var(--brand-accent)]">
            {t("kicker")}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8">
          <BeforeAfterSlider
            label={primary.title}
            before={primary.beforeImage}
            after={primary.afterImage}
            initialPercent={52}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {beforeAfterGallery.slice(1).map((g) => (
            <div
              key={g.id}
              className="rounded-2xl border border-foreground/10 bg-background p-4"
            >
              <div className="text-sm font-black text-foreground">{g.title}</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-foreground/5">
                  <Image
                    src={g.beforeImage.src}
                    alt={g.beforeImage.alt}
                    fill
                    className="object-cover"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-foreground/5">
                  <Image
                    src={g.afterImage.src}
                    alt={g.afterImage.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-semibold text-foreground/60">
                <span>{t("before")}</span>
                <span>{t("after")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

