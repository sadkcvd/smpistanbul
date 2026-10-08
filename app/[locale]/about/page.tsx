import { buildMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { PageHero } from "@/components/site/PageHero";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildMetadata({
    title: t("about.meta.title"),
    description: t("about.meta.description"),
    path: localizedPath("/about", locale),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }>}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  return (
    <div>
      <PageHero
        kicker={t("about.hero.kicker")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-(--border) bg-(--surface) p-6">
            <h2 className="text-xl font-black tracking-tight text-foreground">
              {t("about.howTitle")}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: t("about.cards.0.title"),
                  text: t("about.cards.0.text"),
                },
                {
                  title: t("about.cards.1.title"),
                  text: t("about.cards.1.text"),
                },
                {
                  title: t("about.cards.2.title"),
                  text: t("about.cards.2.text"),
                },
                {
                  title: t("about.cards.3.title"),
                  text: t("about.cards.3.text"),
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-(--border) bg-(--background-secondary) p-4"
                >
                  <div className="text-sm font-black text-foreground">{c.title}</div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-(--border) bg-(--background-secondary) p-6">
              <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
                {t("about.noteTitle")}
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-foreground/70">
                {t("about.noteText")}
              </p>
            </div>

            <a
              href={localizedPath("/contact", locale)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background hover:opacity-90"
            >
              {t("about.cta")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

