"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/site/Container";
import { siteConfig } from "@/lib/site";
import { localizedPath, localeFromPathname } from "@/lib/i18n";
import { useTranslations } from "next-intl";

const footerLinks = ["/services", "/gallery", "/about", "/faq", "/blog"] as const;

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = useTranslations("Footer");

  return (
    <footer className="mt-16 border-t border-(--border) bg-(--background-secondary)">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-black text-foreground">
              {siteConfig.shortName}
            </div>
            <p className="text-sm leading-6 text-foreground/70">
              {t("description")}
            </p>
            <div className="text-sm font-semibold text-foreground/80">
              {siteConfig.address}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {footerLinks.map((href) => (
              <Link
                key={href}
                href={localizedPath(href, locale)}
                className="rounded-xl px-2 py-1 text-sm font-semibold text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
              >
                {href === "/services"
                  ? t("services")
                  : href === "/gallery"
                    ? t("gallery")
                    : href === "/about"
                      ? t("about")
                      : href === "/faq"
                        ? t("faq")
                        : t("blog")}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <div className="text-sm font-bold text-foreground">{t("contact")}</div>
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="block text-sm font-semibold text-foreground/80 hover:text-foreground"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-sm font-semibold text-foreground/80 hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <div className="text-xs font-semibold text-foreground/60">
              © {new Date().getFullYear()} {siteConfig.shortName}. {t("rights")}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

