"use client";

import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Stable AnimatePresence host — stays mounted across navigations (lives in
 * layout.tsx). The actual enter/exit animation lives in `app/[locale]/template.tsx`,
 * which Next.js remounts with a real key on every navigation; that real
 * remount is what lets AnimatePresence detect and sequence the exit/enter
 * correctly instead of racing the synchronous RSC content swap.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
