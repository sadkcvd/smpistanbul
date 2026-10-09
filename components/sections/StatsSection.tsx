"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";

type StatItem = {
  value: string;
  label: string;
};

function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  const [, prefix, numberStr, suffix] = match;
  return { prefix, number: Number(numberStr), suffix };
}

function StatCard({ value, label }: StatItem) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const { prefix, number, suffix } = React.useMemo(
    () => parseValue(value),
    [value]
  );

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });
  const [display, setDisplay] = React.useState(0);
  useMotionValueEvent(springValue, "change", (latest) =>
    setDisplay(Math.round(latest))
  );

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(number);
    }
  }, [isInView, number, motionValue]);

  const shownValue = shouldReduceMotion ? value : `${prefix}${display}${suffix}`;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-(--border) bg-(--surface) p-6 text-center"
    >
      <div className="text-3xl font-black tracking-tight text-(--brand-accent)">
        {shownValue}
      </div>
      <div className="mt-2 text-sm font-semibold text-foreground/70">
        {label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const t = useTranslations("Home.stats");

  const items: StatItem[] = [
    {
      value: t("items.clients.value"),
      label: t("items.clients.label"),
    },
    {
      value: t("items.experience.value"),
      label: t("items.experience.label"),
    },
    {
      value: t("items.satisfaction.value"),
      label: t("items.satisfaction.label"),
    },
  ];

  return (
    <section className="py-10" aria-label={t("kicker")}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm font-bold tracking-widest text-(--secondary-accent)">
          {t("kicker")}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
