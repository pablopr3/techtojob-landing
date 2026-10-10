import type { MetadataRoute } from "next";
import { about } from "@/lib/about";
import { news } from "@/lib/news";
import { owner, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestNews = news.es.items.map((item) => item.date).sort().at(-1);
  const page = (path: string, priority: number) => ({ url: `${siteUrl}${path}`, lastModified: about.updated, priority });

  return [
    { ...page("", 1), changeFrequency: "weekly" },
    page("/talento", 0.8),
    page("/empresas", 0.8),
    page("/torneos", 0.8),
    page("/quienes-somos", 0.7),
    { url: `${siteUrl}/noticias`, lastModified: latestNews, changeFrequency: "weekly", priority: 0.7 },
    ...news.es.items.map((item) => ({ url: `${siteUrl}/noticias/${item.slug}`, lastModified: item.date, priority: 0.6 })),
    { url: `${siteUrl}/privacidad`, lastModified: owner.legalUpdated, priority: 0.2 },
    { url: `${siteUrl}/aviso-legal`, lastModified: owner.legalUpdated, priority: 0.2 },
  ];
}
