import type { MetadataRoute } from "next";
import { news } from "@/lib/news";
import { owner, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNews = news.es.items.map((item) => item.date).sort().at(-1);

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/talento`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/empresas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/torneos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/noticias`, lastModified: latestNews, changeFrequency: "weekly", priority: 0.7 },
    ...news.es.items.map((item) => ({ url: `${siteUrl}/noticias/${item.slug}`, lastModified: item.date, priority: 0.6 })),
    { url: `${siteUrl}/privacidad`, lastModified: owner.legalUpdated, priority: 0.2 },
    { url: `${siteUrl}/aviso-legal`, lastModified: owner.legalUpdated, priority: 0.2 },
  ];
}
