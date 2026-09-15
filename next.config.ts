import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Static export so the site can live on GitHub Pages, Cloudflare Pages or Vercel.
 * NEXT_PUBLIC_BASE_PATH is only needed when hosted under a sub-path
 * (e.g. "/techtojob-landing" on github.io); leave it empty on a custom domain.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
