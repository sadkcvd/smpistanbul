"use client";

import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HeroHeadline({
  kicker,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  youtubeUrl,
  watchLabel,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
  youtubeUrl?: string;
  watchLabel?: string;
}) {
  return (
    <motion.div initial="hidden" animate="show" variants={container}>
      <motion.div
        variants={item}
        className="text-sm font-bold tracking-widest text-(--brand-accent)"
      >
        {kicker}
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-foreground/70"
      >
        {subtitle}
      </motion.p>

      {primaryHref || youtubeUrl ? (
        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          {primaryHref ? (
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-(--cta-gold) px-6 py-3 text-sm font-bold text-(--text-on-cta) shadow-sm transition hover:bg-(--cta-gold-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--cta-gold)/45"
            >
              {primaryLabel}
            </a>
          ) : null}

          {youtubeUrl ? (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-(--secondary-accent)/40 px-5 py-3 text-sm font-bold text-(--secondary-accent) transition hover:bg-(--secondary-accent)/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--secondary-accent)/45"
            >
              <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              {watchLabel}
            </a>
          ) : null}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
