"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { siteConfig } from "@/lib/site";
import { localizedPath, localeFromPathname } from "@/lib/i18n";
import { navItems } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const homeHref = localizedPath("/", locale);
  const isHome = pathname === homeHref;

  const t = useTranslations("Navigation");

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <Button
        variant="ghost"
        size="md"
        className="h-10 w-10 rounded-xl p-0"
        onClick={() => setOpen(true)}
        aria-label={t("openMenu")}
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileMenu")}
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
              aria-label={t("closeMenuBackdrop")}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="
                absolute right-0 top-0
                flex h-dvh
                w-[min(88vw,360px)]
                flex-col
                overflow-hidden
                border-l border-foreground/10
                bg-(--surface)
                shadow-2xl
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
            >
              {/* Drawer Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-foreground/10 px-5 py-4">
                <div className="min-w-0 truncate text-sm font-bold text-foreground">
                  {siteConfig.shortName}
                </div>

                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setOpen(false)}
                  aria-label={t("closeMenu")}
                  className="h-10 w-10 shrink-0 rounded-xl p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <nav className="grid gap-1.5">
                  {navItems.map((item) => {
                    const href = localizedPath(item.href, locale);
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        className="
                          rounded-xl
                          px-3
                          py-3
                          text-sm
                          font-semibold
                          text-foreground/90
                          transition
                          hover:bg-foreground/5
                        "
                        onClick={(e) => {
                          setOpen(false);
                          if (href === homeHref && isHome) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                      >
                        {t(item.translationKey)}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Settings */}
                <div className="mt-6 border-t border-foreground/10 pt-5">
                  <div className="rounded-2xl bg-(--background-secondary) p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground">
                        {t("language")}
                      </span>

                      <LanguageSwitcher />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground">
                        {t("theme")}
                      </span>

                      <ThemeToggle className="h-10 w-10 rounded-xl p-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div
                className="
                  shrink-0
                  border-t
                  border-foreground/10
                  p-5
                  pb-[calc(1.25rem+env(safe-area-inset-bottom))]
                "
              >
                <div className="rounded-2xl bg-foreground/5 p-4">
                  <div className="text-xs font-semibold text-foreground/70">
                    {t("contact")}
                  </div>

                  <a
                    href={`tel:${siteConfig.phoneE164}`}
                    className="mt-2 block text-sm font-bold text-foreground"
                  >
                    {siteConfig.phoneDisplay}
                  </a>

                  <Link
                    href={localizedPath("/contact", locale)}
                    onClick={() => setOpen(false)}
                    className="
                      mt-4
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      bg-foreground
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-background
                      transition
                      hover:opacity-90
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-(--brand-accent)
                    "
                  >
                    {t("sendMessage")}
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}