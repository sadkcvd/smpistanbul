import { FAQSection } from "@/components/sections/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "FAQ" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/faq", locale),
  });
}

export default async function FaqPage({ params }: {params: Promise<{ locale: string }>}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "FAQ" });
  return (
    <div>
      <div className="border-b border-foreground/10 bg-foreground/5 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-bold tracking-widest text-[var(--brand-accent)]">
            {t("hero.kicker")}
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>

      <FAQSection locale={locale} />
    </div>
  );
}

