"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { Container } from "@/components/site/Container";
import { MobileNav } from "@/components/site/MobileNav";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { localizedPath, localeFromPathname } from "@/lib/i18n";
import { navItems } from "@/lib/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <Container>
        <div className="flex min-w-0 items-center justify-between gap-3 py-3 sm:py-4">

          {/* Logo */}
          <Link
            href={localizedPath("/", locale)}
            aria-label="SMP İstanbul ana sayfa"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/images/logo.png"
              alt="SMP İstanbul"
              width={100}
              height={30}
              priority
            /*   className="h-auto w-[120px] sm:w-[145px]" */
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(item.href, locale)}
                className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground"
              >
                {t(item.translationKey)}
              </Link>
            ))}
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