import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

export async function BlogCard({
  post,
  locale = "tr",
}: {
  post: BlogPost;
  locale?: Locale;
}) {
  const href = localizedPath(`/blog/${post.slug}`, locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-foreground/5">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
        />
      </div>

      {/* Tags */}
      <div className="mt-4 flex items-center gap-2">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] font-bold text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div>
        <h3 className="mt-3 text-base font-black tracking-tight text-foreground">
          {post.title}
        </h3>

        <p className="mt-2 text-sm font-semibold leading-6 text-foreground/70">
          {post.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <div className="text-xs font-semibold text-foreground/60">
          {new Date(post.dateISO).toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          • {post.readingMinutes} {t("card.readingMinutesLabel")}
        </div>

        <Link
          href={href}
          className="hidden rounded-full px-4 py-2 text-sm font-bold text-(--brand-accent) hover:bg-foreground/5 md:inline-flex"
        >
          {t("card.read")}
        </Link>

        <Link
          href={href}
          className="text-sm font-bold text-(--brand-accent) underline underline-offset-4 md:hidden"
        >
          {t("card.readMore")}
        </Link>
      </div>
    </article>
  );
}
