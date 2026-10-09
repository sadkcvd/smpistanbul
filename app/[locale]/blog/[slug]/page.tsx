import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocalizedBlogPostBySlug, getLocalizedBlogPosts } from "@/lib/blog-localized";
import { buildMetadata } from "@/lib/seo";
import { BlogPostTemplate } from "@/components/blog/BlogPostTemplate";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    getLocalizedBlogPosts(locale as "tr" | "en").map((p) => ({
      locale,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getLocalizedBlogPostBySlug(locale, slug);
  if (!post) {
    return buildMetadata({
      title: t("meta.title"),
      description: "",
      path: localizedPath("/blog", locale),
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: localizedPath(`/blog/${post.slug}`, locale),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = getLocalizedBlogPostBySlug(locale, slug);
  if (!post) notFound();

  return (
    <div>
      <div className="border-b border-(--border) bg-(--background-secondary) py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
            <Link href={localizedPath("/blog", locale)} className="hover:text-foreground">
              {t("meta.title")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground/90">{post.title}</span>
          </div>
        </div>
      </div>
      <BlogPostTemplate post={post} locale={locale} />
    </div>
  );
}

