import { AppointmentRequestForm } from "@/components/forms/AppointmentRequestForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/site/PageHero";
import { ClinicMapCard } from "@/components/site/ClinicMapCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/contact", locale),
  });
}

export default async function ContactPage({ params }: {params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  return (
    <div>
      <PageHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_520px] lg:items-start">
            <div className="rounded-2xl border border-(--border) bg-(--surface) p-6">
              <h2 className="text-xl font-black tracking-tight text-foreground">
                {t("quickInfo.title")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-(--border) bg-(--background-secondary) p-4">
                  <div className="text-xs font-bold tracking-widest text-(--brand-accent)">
                    {t("quickInfo.phone")}
                  </div>
                  <a
                    href={`tel:${siteConfig.phoneE164}`}
                    className="mt-2 block text-sm font-black text-foreground hover:underline"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="rounded-2xl border border-(--border) bg-(--background-secondary) p-4">
                  <div className="text-xs font-bold tracking-widest text-(--brand-accent)">
                    {t("quickInfo.email")}
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 block text-sm font-black text-foreground hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-(--border) bg-(--background-secondary) p-5">
                <div className="text-sm font-bold text-foreground">
                  {t("location.title")}
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                  {t("location.description")}
                </p>
                <ClinicMapCard
                  googleMapsLabel={t("location.openGoogleMaps")}
                  appleMapsLabel={t("location.openAppleMaps")}
                />
              </div>
            </div>

            <AppointmentRequestForm
              id="contact-form"
              namespace="Contact"
              heading={t("form.heading")}
              helperText={t("form.helperText")}
              submitLabel={t("form.submit")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

