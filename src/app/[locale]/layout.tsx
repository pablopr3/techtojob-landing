import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/json-ld";
import { CursorFx } from "@/components/ui/CursorFx";
import { InViewObserver } from "@/components/ui/InViewObserver";
import "../globals.css";

/* Sora (SIL OFL 1.1), self-hosted variable font. Only weights 400, 600 and 700 are used. */
const sora = localFont({
  src: "../../fonts/sora-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-sora",
});

type LocaleParams = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("titleShort") + ": " + t("title"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `/${locale}`,
      title: t("titleShort") + ": " + t("title"),
      description: t("description"),
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@techtojob",
      title: t("titleShort") + ": " + t("title"),
      description: t("description"),
      images: [`/og-${locale}.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sora.variable} js`} data-scroll-behavior="smooth">
      <head>
        {/* Without JavaScript the in-view animations never run, so show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.marker{background-size:100% 100%!important}.doodle *{stroke-dashoffset:0!important}`}</style>
        </noscript>
      </head>
      <body className="board-grid min-h-dvh text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <InViewObserver />
        <CursorFx />
      </body>
    </html>
  );
}
