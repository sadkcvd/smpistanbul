import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { BeforeAfterPreview } from "@/components/gallery/BeforeAfterPreview";
import { getTranslations } from "next-intl/server";
import { localizedPath, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Services" });
  return buildMetadata({
    title: t("simulation.meta.title"),
    description: t("simulation.meta.description"),
    path: localizedPath("/sac-simulasyonu-istanbul", locale),
  });
}

export default async function SacSimulasyonuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Services" });
  return (
    <div>
      <div className="border-b border-foreground/10 bg-foreground/5 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-bold tracking-widest text-[var(--brand-accent)]">
            {t("simulation.hero.kicker")}
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {t("simulation.hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
            {t("simulation.hero.subtitle")}
          </p>
        </div>
      </div>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            <div className="rounded-2xl border border-foreground/10 bg-background p-6 max-w-6xl">
              <h2 className="text-xl font-black tracking-tight text-foreground">
                {t("simulation.suitableTitle")}
              </h2>
              <ul className="mt-4 list-disc pl-5 text-sm font-semibold leading-7 text-foreground/70">
                <li>{t("simulation.suitableItems.0")}</li>
                <li>{t("simulation.suitableItems.1")}</li>
                <li>{t("simulation.suitableItems.2")}</li>
              </ul>

              <h2 className="mt-8 text-xl font-black tracking-tight text-foreground">
                {t("simulation.planningTitle")}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-foreground/70">
                {t("simulation.planningText")}
              </p>

              <div className="mt-10">
                <BeforeAfterPreview />
              </div>

              <a
                href={localizedPath("/contact", locale)}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:opacity-90"
              >
                {t("simulation.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FAQSection locale={locale} />
    </div>
  );
}

