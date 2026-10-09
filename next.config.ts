import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Export estático: `pnpm build` genera la carpeta `out/`, que Cloudflare sirve tal cual.
const nextConfig: NextConfig = {
  output: "export",
  // El optimizador de imágenes de Next necesita servidor; en estático se sirven los originales.
  images: { unoptimized: true },
};
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
