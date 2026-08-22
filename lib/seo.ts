import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "./site";

type SeoArgs = {
  title: string;
  description: string;
  path?: string; // e.g. "/contact"
  robots?: Metadata["robots"];
};

function joinUrl(base: string, path?: string) {
  if (!path) return base;
  if (path.startsWith("http")) return path;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function buildMetadata({ title, description, path, robots }: SeoArgs): Metadata {
  const canonicalUrl = joinUrl(siteConfig.url, path);

  const pageTitle = `${title} | ${siteConfig.shortName}`;

  const ogImageUrl = joinUrl(siteConfig.url, "/images/og/default.jpeg");

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robots ?? {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: pageTitle,
      description,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

// Convenience export for pages that need resolving metadata.
export async function defaultGenerateMetadata(
  args: SeoArgs,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  return buildMetadata(args);
}

