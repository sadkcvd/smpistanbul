import { BlogCard } from "@/components/blog/BlogCard";
import { getLocalizedBlogPosts } from "@/lib/blog-localized";
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
  const t = await getTranslations({ locale, namespace: "Blog" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/blog", locale),
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const blogPosts = getLocalizedBlogPosts(locale);
  return (
    <div>
      <PageHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

