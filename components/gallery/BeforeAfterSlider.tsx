"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { GripVertical } from "lucide-react";
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
  aspectClassName = "aspect-[16/11]",
}: {
  before: SliderImage;
  after: SliderImage;
  label?: string;
  initialPercent?: number;
  aspectClassName?: string;
}) {
  const t = useTranslations("Gallery");
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const motionPercent = useMotionValue(initialPercent);
  const springPercent = useSpring(motionPercent, {
    stiffness: 320,
    damping: 32,
    mass: 0.4,
  });
  const clipPath = useTransform(
    springPercent,
    (p) => `inset(0 ${100 - p}% 0 0)`
  );
  const handleLeft = useTransform(springPercent, (p) => `${p}%`);

  // Kept in sync with the spring for the accessible <input type="range"> only —
  // the image/handle layers subscribe to the MotionValues directly and skip this render.
  const [percent, setPercent] = React.useState(initialPercent);
  useMotionValueEvent(springPercent, "change", (latest) => setPercent(latest));

  const setFromClientX = React.useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);

      const pct = (x / rect.width) * 100;
      motionPercent.set(pct);
    },
    [motionPercent]
  );

  return (
    <section aria-label={label ?? t("slider.ariaLabel")}>
      <div
        ref={containerRef}
        className="relative w-full touch-none select-none overflow-hidden rounded-2xl border border-foreground/10 bg-background"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          setFromClientX(e.clientX);
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className={`relative ${aspectClassName}`}>
          {/* BEFORE — LCP */}
          <Image
            src={before.src}
            alt={before.alt}
            fill
            draggable={false}
            className="object-cover"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 702px"
          />

          {/* AFTER */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath }}
            aria-hidden="true"
          >
            <Image
              src={after.src}
              alt=""
              fill
              draggable={false}
              className="object-cover"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 702px"
            />
          </motion.div>

          {/* Handle */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ left: handleLeft }}
          >
            <div className="absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-(--brand-accent)/60" />

            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-(--brand-accent)/50 bg-(--surface) shadow-sm ring-2 ring-(--brand-accent)/20">
                <GripVertical className="h-5 w-5 text-(--brand-accent)" aria-hidden="true" />
                <span className="sr-only">{t("slider.drag")}</span>
              </div>
            </div>
          </motion.div>
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
            onChange={(e) => motionPercent.set(Number(e.target.value))}
            className="w-full cursor-ew-resize accent-(--brand-accent)"
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
