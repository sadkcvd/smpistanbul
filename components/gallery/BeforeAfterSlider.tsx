"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export type SliderImage = {
  src: string;
  alt: string;
};

export function BeforeAfterSlider({
  before,
  after,
  label,
  initialPercent = 50,
}: {
  before: SliderImage;
  after: SliderImage;
  label?: string;
  initialPercent?: number;
}) {
  const t = useTranslations("Gallery");
  const [percent, setPercent] = React.useState(initialPercent);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const setFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = Math.min(
      Math.max(clientX - rect.left, 0),
      rect.width
    );

    const pct = (x / rect.width) * 100;
    setPercent(pct);
  }, []);

  return (
    <section aria-label={label ?? t("slider.ariaLabel")}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          setFromClientX(e.clientX);
        }}
      >
        <div className="relative aspect-[16/11]">
          {/* BEFORE — LCP */}
          <Image
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 702px"
          />

          {/* AFTER */}
          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - percent}% 0 0)`,
            }}
            aria-hidden="true"
          >
            <Image
              src={after.src}
              alt=""
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 702px"
            />
          </motion.div>

          {/* Handle */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ left: `${percent}%` }}
          >
            <div className="absolute bottom-0 top-0 w-[2px] -translate-x-1/2 bg-foreground/50" />

            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-background shadow-sm">
                <span className="text-xs font-extrabold text-foreground/80">
                  {t("slider.drag")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-5">
          <label
            className="sr-only"
            htmlFor="slider-percent"
          >
            {t("slider.percentageLabel")}
          </label>

          <input
            id="slider-percent"
            type="range"
            min={0}
            max={100}
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            className="w-full cursor-ew-resize accent-[var(--brand-accent)]"
          />

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-foreground/60">
            <span>{t("before")}</span>
            <span>{t("after")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
