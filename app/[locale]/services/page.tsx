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
  const t = await getTranslations({ locale, namespace: "Services" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/services", locale),
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Services" });
  const services = [
    {
      title: t("items.smp.title"),
      description: t("items.smp.description"),
      bullets: [t("items.smp.b1"), t("items.smp.b2"), t("items.smp.b3")],
    },
    {
      title: t("items.thinning.title"),
      description: t("items.thinning.description"),
      bullets: [t("items.thinning.b1"), t("items.thinning.b2"), t("items.thinning.b3")],
    },
    {
      title: t("items.scar.title"),
      description: t("items.scar.description"),
      bullets: [t("items.scar.b1"), t("items.scar.b2"), t("items.scar.b3")],
    },
  ];

  return (
    <div>
      <div className="border-b border-foreground/10 bg-foreground/5 py-8">
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

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
              >
                <div className="text-base font-black text-foreground">
                  {s.title}
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                  {s.description}
                </p>
                <ul className="mt-4 list-disc pl-5 text-sm font-semibold leading-7 text-foreground/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="mb-1">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-foreground/10 bg-foreground/5 p-6">
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

