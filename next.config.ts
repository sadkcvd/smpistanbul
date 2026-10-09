import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // lucide-react is already optimized by Next.js by default; these two are not.
    optimizePackageImports: ["framer-motion", "embla-carousel-react"],
  },
};

export default withNextIntl(nextConfig);
