import { AppointmentRequestForm } from "@/components/forms/AppointmentRequestForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

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

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_520px] lg:items-start">
            <div className="rounded-2xl border border-foreground/10 bg-background p-6">
              <h2 className="text-xl font-black tracking-tight text-foreground">
                {t("quickInfo.title")}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
                  <div className="text-xs font-bold tracking-widest text-[var(--brand-accent)]">
                    {t("quickInfo.phone")}
                  </div>
                  <a
                    href={`tel:${siteConfig.phoneE164}`}
                    className="mt-2 block text-sm font-black text-foreground hover:underline"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
                  <div className="text-xs font-bold tracking-widest text-[var(--brand-accent)]">
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

              <div className="mt-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-5">
                <div className="text-sm font-bold text-foreground">
                  {t("location.title")}
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                  {t("location.description")}
                </p>
                <div className="mt-4 h-56 w-full overflow-hidden rounded-xl border border-foreground/10 bg-background/70">
                  <div className="flex h-full items-center justify-center text-sm font-bold text-foreground/50">
                    {t("location.mapPlaceholder")}
                  </div>
                </div>
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

