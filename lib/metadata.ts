import type { Metadata } from "next";

const socialImage = { url: "/images/og-cover.png", width: 1200, height: 630, alt: "TechToJob" };

/** Metadatos de una página interior: título, descripción, canonical y tarjetas sociales. */
export function pageMetadata({ title, description, path, type = "website" }: Readonly<{
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}>): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | TechToJob`,
      description,
      url: path,
      type,
      locale: "es_ES",
      siteName: "TechToJob",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title: `${title} | TechToJob`, description, images: [socialImage] },
  };
}
