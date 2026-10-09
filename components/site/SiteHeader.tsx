"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { MobileNav } from "@/components/site/MobileNav";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { localizedPath, localeFromPathname } from "@/lib/i18n";
import { navItems } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = useTranslations("Navigation");
  const homeHref = localizedPath("/", locale);
  const isHome = pathname === homeHref;

  const scrollToTopIfHome = (href: string) => (e: React.MouseEvent) => {
    if (href === homeHref && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--surface)/90 backdrop-blur">
      <Container>
        <div className="flex min-w-0 items-center justify-between gap-3 py-3 sm:py-4">

          {/* Logo */}
          <Link
            href={homeHref}
            aria-label="SMP İstanbul Ana Sayfa"
            className="flex shrink-0 items-center"
            onClick={scrollToTopIfHome(homeHref)}
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          >
            {navItems.map((item) => {
              const href = localizedPath(item.href, locale);
              return (
                <Link
                  key={item.href}
                  href={href}
                  className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground"
                  onClick={scrollToTopIfHome(href)}
                >
                  {t(item.translationKey)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageSwitcher />

            <ThemeToggle className="h-10 w-10 rounded-xl p-0" />
          </div>

          {/* Mobile Menu */}
          <div className="shrink-0 lg:hidden">
            <MobileNav />
          </div>

        </div>
      </Container>
    </header>
  );
}