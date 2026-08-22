import { blogPosts, type BlogPost, type BlogPostBlock } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

type LocalizedContent = {
  title: string;
  excerpt: string;
  tags?: string[];
  blocks?: BlogPostBlock[];
};

const enBySlug: Record<string, LocalizedContent> = {
  "smp-nedir-ve-kimlere-uygundur": {
    title: "What Is SMP? Who Is It For?",
    excerpt:
      "How does scalp micropigmentation improve hairline and density perception? What does the Istanbul consultation look like?",
    tags: ["SMP", "Guide"],
    blocks: [
      {
        type: "p",
        text: "SMP (Scalp Micropigmentation) is a technique that simulates hair follicles using micro pigment points on the scalp. Strong outcomes depend on pigment match, density planning, and proper technique.",
      },
      { type: "h2", text: "Who is a good candidate?" },
      {
        type: "ul",
        items: [
          "People with pattern hair loss or visible thinning",
          "People who want to redesign their hairline",
          "People who want to soften transplant scar visibility",
        ],
      },
      {
        type: "quote",
        text: "The right candidate plus a precise plan leads to natural-looking results.",
      },
      {
        type: "p",
        text: "In Istanbul, the process usually starts with photo-based analysis, then target zones and session planning are defined together.",
      },
    ],
  },
  "oncesi-sonrasi-ne-beklemeli": {
    title: "Before / After: What to Expect in the First Weeks",
    excerpt:
      "How does pigment settle after SMP? Key expectations and aftercare tips for the first days.",
    tags: ["Aftercare", "SMP"],
    blocks: [
      {
        type: "p",
        text: "In the first days, pigment may appear slightly stronger than expected. This is normal and usually softens as skin healing progresses.",
      },
      { type: "h2", text: "Three key aftercare rules" },
      {
        type: "ul",
        items: [
          "Use gentle cleansing and avoid harsh products",
          "Protect from direct sun exposure",
          "Follow session-specific aftercare instructions",
        ],
      },
      {
        type: "p",
        text: "Aftercare should be tailored to your skin and routine. Follow-up support helps keep results balanced and natural.",
      },
    ],
  },
  "sac-simulasyonu-ile-hacim-artisi": {
    title: "How Hair Simulation Improves Density Perception",
    excerpt:
      "How is density distribution planned in hair simulation sessions? Practical notes for natural and even results.",
    tags: ["Hair Simulation", "Istanbul"],
    blocks: [
      {
        type: "p",
        text: "Hair simulation is planned to support existing hair and reduce the contrast of sparse areas. The goal is a balanced, natural look that fits your real hair direction.",
      },
      { type: "h2", text: "What is considered during planning?" },
      {
        type: "ul",
        items: [
          "Appearance under different lighting",
          "Natural direction and spread of existing hair",
          "Skin tone and pigment harmony",
        ],
      },
      {
        type: "p",
        text: "During consultation in Istanbul, the target zone is mapped and expectations are aligned before sessions begin.",
      },
    ],
  },
};

export function getLocalizedBlogPosts(locale: Locale): BlogPost[] {
  if (locale === "tr") return blogPosts;

  return blogPosts.map((post) => {
    const translated = enBySlug[post.slug];
    if (!translated) return post;
    return {
      ...post,
      title: translated.title,
      excerpt: translated.excerpt,
      tags: translated.tags ?? post.tags,
      blocks: translated.blocks ?? post.blocks,
    };
  });
}

export function getLocalizedBlogPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  return getLocalizedBlogPosts(locale).find((p) => p.slug === slug);
}

