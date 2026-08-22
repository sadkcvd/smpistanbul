import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

function BlogBlock({ block }: { block: BlogPost["blocks"][number] }) {
  if (block.type === "p") {
    return <p className="mb-5 text-sm leading-7 text-foreground/80">{block.text}</p>;
  }
  if (block.type === "h2") {
    return <h2 className="mb-3 mt-7 text-lg font-black tracking-tight text-foreground">{block.text}</h2>;
  }
  if (block.type === "ul") {
    return (
      <ul className="mb-6 list-disc pl-5 text-sm leading-7 text-foreground/80">
        {block.items.map((it) => (
          <li key={it} className="mb-2">
            {it}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    return (
      <div className="my-6 rounded-2xl border border-foreground/10 bg-foreground/5 p-4">
        <div className="text-sm font-bold text-foreground">
          “{block.text}”
        </div>
      </div>
    );
  }
  return null;
}

export async function BlogPostTemplate({
  post,
  locale = "tr",
}: {
  post: BlogPost;
  locale?: Locale;
}) {
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";
  const t = await getTranslations({ locale, namespace: "Blog" });
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8">
        <article className="min-w-0 max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-foreground/5 px-3 py-1 text-[11px] font-bold text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {post.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-foreground/60">
            <span>
              {new Date(post.dateISO).toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span aria-hidden="true">•</span>
            <span>
              {post.readingMinutes} {t("post.readingLabel")}
            </span>
          </div>

          <div className="mt-6">
            {post.blocks.map((block, idx) => (
              <BlogBlock key={`${block.type}-${idx}`} block={block} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

