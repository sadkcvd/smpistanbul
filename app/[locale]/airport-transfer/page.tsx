import { buildMetadata } from "@/lib/seo";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/site/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "AirportTransfer" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/airport-transfer", locale),
  });
}

export default async function AirportTransferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "AirportTransfer" });

  const directions = [
    {
      title: t("directions.toClinic.title"),
      description: t("directions.toClinic.description"),
    },
    {
      title: t("directions.toAirport.title"),
      description: t("directions.toAirport.description"),
    },
  ];

  const detailItems = [
    t("details.items.0"),
    t("details.items.1"),
    t("details.items.2"),
  ];

  return (
    <div>
      <PageHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        className="py-8"
      />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {directions.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm"
              >
                <div className="text-base font-black text-foreground">
                  {d.title}
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                  {d.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-(--border) bg-(--background-secondary) p-6">
            <div className="text-base font-black text-foreground">
              {t("details.title")}
            </div>
            <ul className="mt-3 list-disc pl-5 text-sm font-semibold leading-7 text-foreground/70">
              {detailItems.map((item) => (
                <li key={item} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-(--border) bg-(--background-secondary) p-6">
            <h2 className="text-xl font-black tracking-tight text-foreground">
              {t("contact.title")}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-foreground/70">
              {t("contact.subtitle")}
            </p>
            <a
              href={localizedPath("/contact", locale)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:opacity-90"
            >
              {t("contact.cta")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
