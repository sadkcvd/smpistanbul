import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

function url(path: string) {
  const base = siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/sac-simulasyonu-istanbul",
    "/gallery",
    "/services",
    "/about",
    "/faq",
    "/contact",
    "/blog",
  ];

  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);

  const all = [...staticPaths, ...blogPaths];

  return all.map((u, idx) => {
    const post = blogPosts.find((p) => `/blog/${p.slug}` === u);
    const lastModified = post ? new Date(post.dateISO) : new Date();

    return {
      url: url(u),
      lastModified,
      changeFrequency: idx === 0 ? "weekly" : "monthly",
      priority: u === "/" ? 1 : u.startsWith("/blog") ? 0.4 : 0.7,
    };
  });
}

