import { HeroSection } from "@/components/sections/HeroSection";
import { AppointmentRequestForm } from "@/components/forms/AppointmentRequestForm";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BeforeAfterPreview } from "@/components/gallery/BeforeAfterPreview";
import { ClinicGallery } from "@/components/gallery/ClinicGallery";
import { StatsSection } from "@/components/sections/StatsSection";
import { BlogCard } from "@/components/blog/BlogCard";
import { getLocalizedBlogPosts } from "@/lib/blog-localized";
import { buildMetadata } from "@/lib/seo";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: "Home" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/", locale),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }>; }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const t = await getTranslations("Home");
  const blogPosts = getLocalizedBlogPosts(locale);

  return (
    <div>
      <HeroSection
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        heroImageSrc="/images/procedure-1.jpg"
        primaryHref="#contact"
        primaryLabel={t("hero.cta")}
        videoSources={{
          mp4: "/videos/hero-clinic.mp4",
          webm: "/videos/hero-clinic.webm",
        }}
        videoPoster="/images/hero/smp-logo.png"
        youtubeUrl={siteConfig.heroYoutubeUrl || undefined}
        watchLabel={t("hero.watchVideo")}
      />

      <StatsSection />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: t("cards.simulation.title"),
                href: localizedPath("/sac-simulasyonu-istanbul", locale),
                text: t("cards.simulation.text"),
              },
              {
                title: t("cards.gallery.title"),
                href: localizedPath("/gallery", locale),
                text: t("cards.gallery.text"),
              },
              {
                title: t("cards.services.title"),
                href: localizedPath("/services", locale),
                text: t("cards.services.text"),
              },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-(--brand-accent)/40 hover:shadow-md"
              >
                <div className="text-sm font-black text-foreground">
                  {s.title}
                </div>
                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/70">
                  {s.text}
                </p>
                <div className="mt-4 text-sm font-black text-(--brand-accent)">
                  {t("cards.explore")}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClinicGallery />

      <BeforeAfterPreview />

      <section id="contact" className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_520px] lg:items-start">
            <div>
              <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
                {t("contact.kicker")}
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                {t("contact.title")}
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-foreground/70">
                {t("contact.subtitle")}
              </p>
              <div className="mt-6 rounded-2xl border border-(--border) bg-(--background-secondary) p-5">
                <div className="text-sm font-black text-foreground">
                  {t("contact.whatToShare")}
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm font-semibold leading-7 text-foreground/70">
                  <li>{t("contact.items.cityPhone")}</li>
                  <li>{t("contact.items.hairLossType")}</li>
                  <li>{t("contact.items.dateMessage")}</li>
                </ul>
              </div>
            </div>

            <div>
              <AppointmentRequestForm
                id="contact-form"
                namespace="Home"
                heading={t("form.heading")}
                helperText={t("form.helperText")}
                submitLabel={t("form.submit")}
              />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection locale={locale} />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
              {t("blog.kicker")}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {t("blog.title")}
            </h2>
            <p className="max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
              {t("blog.subtitle")}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-6">
            <a
              href={localizedPath("/blog", locale)}
              className="inline-flex items-center rounded-full bg-foreground/5 px-5 py-2.5 text-sm font-bold text-foreground hover:bg-foreground/10"
            >
              {t("blog.cta")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
